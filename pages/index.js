import { Video } from '../components/Video';

const season = 1;
const episode = 1;

export default function Home() {
  return (
    <Video
      season={season}
      episode={episode}
      src="https://upload.wikimedia.org/wikipedia/commons/8/88/Big_Buck_Bunny_alt.webm"
    />
  );
}
