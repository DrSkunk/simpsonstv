import { useEffect, useState, useRef } from 'react';
import { VolumeBar } from '../components/VolumeBar';

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export function Video({ maxVolume, season, episode, src }) {
  const videoRef = useRef(null);
  const pausedTimerRef = useRef(null);
  const volumeTimerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [timestamp, setTimestamp] = useState('0:00:0');
  const [volume, setVolume] = useState(0);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    videoRef.current.volume = volume / maxVolume;
  }, [videoRef, volume]);

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

  useEffect(() => {
    function downHandler({ key }) {
      if (key === ' ') {
        setIsPlaying((playing) => {
          if (playing) {
            videoRef.current.pause();
            setShowPlay(true);
            clearTimeout(pausedTimerRef.current);
            pausedTimerRef.current = setTimeout(() => setShowPlay(false), 3000);
          } else {
            videoRef.current.play();
          }
          return !playing;
        });
      } else if (key === 'ArrowUp') {
        setVolume((currentVolume) => Math.min(currentVolume + 1, 255));
        clearTimeout(volumeTimerRef.current);
        setShowVolume(true);
        volumeTimerRef.current = setTimeout(() => setShowVolume(false), 1000);
      } else if (key === 'ArrowDown') {
        setVolume((currentVolume) => Math.max(currentVolume - 1, 0));
        clearTimeout(volumeTimerRef.current);
        setShowVolume(true);
        volumeTimerRef.current = setTimeout(() => setShowVolume(false), 1000);
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
    <div className="h-screen w-screen text-3xl text-outline font-vcr">
      <div className="absolute left-7 top-6 z-10">
        {showPlay && isPlaying && 'PLAY►'}
        {!isPlaying && 'PAUSED||'}
      </div>
      {(showPlay || !isPlaying) && (
        <>
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
            <VolumeBar volume={volume} maxVolume={maxVolume} />
          </div>
        </div>
      )}

      <div
        className={classNames('w-full h-full', !isPlaying && 'animate-glitch')}
      >
        <video
          autoPlay={isPlaying}
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          loop
          src={src}
        />
        {!isPlaying && (
          <video
            className="absolute w-full h-full object-cover mix-blend-screen"
            autoPlay
            muted
            loop
            src="/glitch.webm"
          />
        )}
      </div>
    </div>
  );
}
Video.defaultProps = { maxVolume: 255, season: 1, episode: 1 };
