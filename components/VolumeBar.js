const map = (value, x1, y1, x2, y2) => (value * y2) / y1;

export function VolumeBar({ volume, maxVolume, amountOfBars }) {
  let barsFilled;
  if (volume / maxVolume < 0.5) {
    barsFilled = Math.ceil((volume * amountOfBars) / maxVolume);
  } else if (volume === maxVolume) {
    barsFilled = amountOfBars;
  } else {
    barsFilled = Math.floor((volume * amountOfBars) / maxVolume);
  }

  const bars = 'X'.repeat(barsFilled); //█ or ▌
  const dots = '-'.repeat(amountOfBars - barsFilled);
  // TODO add volume bar and speaker like here https://i.redd.it/4bxf2aiv9y511.jpg
  // TODO mute speaker icon when muted
  return (
    <div className="text-oldgreen text-xl">
      <div className="flex w-full justify-between">
        <div>VOLUME</div>
        <span>{volume === 0 ? 'MUTED' : volume}</span>
      </div>
      <div>
        <span className="">
          {bars}
          {dots}
        </span>
      </div>
    </div>
  );
}
VolumeBar.defaultProps = {
  volume: 0,
  maxVolume: 255,
  amountOfBars: 16,
};
