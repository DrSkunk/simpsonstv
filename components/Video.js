import { useEffect, useState, useRef } from 'react';
import { VolumeBar } from '../components/VolumeBar';

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export function Video({ maxVolume, amountOfBars, season, episode, src }) {
  const videoRef = useRef(null);
  const pausedTimerRef = useRef(null);
  const volumeTimerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [timestamp, setTimestamp] = useState('0:00:0');
  const [volume, setVolume] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [tvOn, setTvOn] = useState(false);

  // Make the video volume follow the UI volume
  useEffect(() => {
    videoRef.current.volume = volume / maxVolume;
  }, [videoRef, volume]);

  // Bind the timecode string
  useEffect(() => {
    function updateTime(e) {
      const time = e.target.currentTime;
      const h = Math.floor(time / 3600);
      const m = Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, '0');
      const s = Math.floor((time % 3600) % 60)
        .toString()
        .padStart(2, '0');
      setTimestamp(`${h}:${m}:${s}`);
    }
    videoRef.current.addEventListener('timeupdate', updateTime);
    return () => {
      videoRef.current.removeEventListener('timeupdate', updateTime);
    };
  }, [videoRef, setTimestamp]);

  // Listen to keypresses
  useEffect(() => {
    function downHandler({ key }) {
      if (key === ' ') {
        clearTimeout(pausedTimerRef.current);
        setShowPlay(true);
        pausedTimerRef.current = setTimeout(() => setShowPlay(false), 3000);
        setIsPlaying((playing) => {
          if (playing) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }
          return !playing;
        });
      } else if (key === 'ArrowUp') {
        setVolume((currentVolume) => Math.min(currentVolume + 1, maxVolume));
        clearTimeout(volumeTimerRef.current);
        setShowVolume(true);
        volumeTimerRef.current = setTimeout(() => setShowVolume(false), 1000);
      } else if (key === 'ArrowDown') {
        setVolume((currentVolume) => Math.max(currentVolume - 1, 0));
        clearTimeout(volumeTimerRef.current);
        setShowVolume(true);
        volumeTimerRef.current = setTimeout(() => setShowVolume(false), 1000);
      } else if (key === 'p') {
        setTvOn((tvOn) => !tvOn);
      }
    }
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [
    videoRef,
    pausedTimerRef,
    volumeTimerRef,
    setIsPlaying,
    setShowPlay,
    setVolume,
    setShowVolume,
  ]);

  return (
    <>
      <div className="absolute flex w-full h-full justify-center items-center">
        <div
          className={[
            'w-10 h-10 blur rounded-full opacity-0 bg-white z-20',
            tvOn ? 'animate-tv-off-dot' : 'animate-tv-on-dot',
          ].join('')}
        ></div>
      </div>
      <div
        className={[
          'h-screen w-screen text-3xl text-outline font-vcr',
          tvOn ? 'animate-tv-off-line' : 'animate-tv-on-line',
        ].join(' ')}
      >
        {(showPlay || !isPlaying) && (
          <>
            <div className="absolute left-7 top-6 z-10">
              {showPlay && isPlaying && 'PLAY►'}
              {!isPlaying && 'PAUSED||'}
            </div>
            <div className="absolute right-7 top-6 z-10 ">
              {season.toString().padStart(2, '0')}:
              {episode.toString().padStart(2, '0')}
            </div>

            <div className="absolute left-7 bottom-6 z-10 ">SLP</div>

            <div className="absolute right-7 bottom-6 z-10 ">{timestamp}</div>
          </>
        )}

        {showVolume && (
          <div className="absolute w-full z-10 flex justify-center h-full items-end">
            <div className="mb-20">
              <VolumeBar
                volume={volume}
                maxVolume={maxVolume}
                amountOfBars={amountOfBars}
              />
            </div>
          </div>
        )}

        <div
          className={classNames(
            'w-full h-full',
            !isPlaying && 'animate-glitch'
          )}
        >
          <video
            autoPlay={isPlaying}
            ref={videoRef}
            className="absolute w-full h-full object-cover"
            loop
            src={src}
          />
          <video
            className={classNames(
              'absolute w-full h-full object-cover mix-blend-screen',
              !isPlaying && 'invisible'
            )}
            autoPlay
            muted
            loop
            src="/glitch.webm"
          />
        </div>
      </div>
    </>
  );
}
Video.defaultProps = { maxVolume: 16, amountOfBars: 16, season: 1, episode: 1 };
