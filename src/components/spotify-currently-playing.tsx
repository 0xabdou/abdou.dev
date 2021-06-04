import {parseTrack, Track} from "../lib/spotify";
import useTimeAgo from "../shared/use-time-ago";
import useSWR from "swr";
import styled from "styled-components";
import {ThemeContextType, useTheme} from "../shared/theme-context";
import {ReactNode} from "react";

const SpotifyCurrentlyPlaying = () => {
  const {data} = useSWR(
    "/api/spotify/currently-playing",
    {
      refreshInterval: 10000,
      compare: (a, b) =>
        !!a && !!b
        && a.item.id == b.item.id
        && a.is_playing == b.is_playing,
    }
  );
  const track = data && parseTrack(data);
  if (track) return <TrackCard track={track}/>;
  return <TrackLoadingCard/>;
};

const TrackCard = ({track}: { track: Track }) => {
  const ago = useTimeAgo(track?.date);
  return (
    <div className="relative w-full max-w-lg mx-auto rounded-2xl
       shadow-md bg-white dark:bg-knight px-4 py-2"
    >
      {track.isPlaying && <Bars/>}
      {!track.isPlaying &&
      <time
        className="absolute right-4 font-bold text-sm text-gray-500 dark:text-gray-400"
        dateTime={new Date(track.date).toDateString()}
      >
        {ago}
      </time>}
      <div className="font-bold text-sm mb-2">
        {track.isPlaying && "CURRENTLY LISTENING TO"}
        {!track.isPlaying && "LAST LISTENED TO"}
      </div>
      <div className="flex items-center h:24 sm:h-28">
        <img
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl mr-4"
          src={track.imageURL}
          alt="Track cover"
          height={300}
          width={300}
        />
        <div className="flex flex-col justify-center">
          <a
            className="font-bold text-lg sm:text-2xl line-clamp-1 hover:underline"
            href={track.url}
          >
            {track.title}
          </a>
          <div className="sm:text-lg line-clamp-2">
            by&nbsp;
            {track.artists.map((artist, idx) => (
              <span key={artist.name}>
                  {!!idx &&
                  ", "}
                <a
                  className="hover:underline"
                  href={artist.url}
                  key={artist.name}
                >
                    {artist.name}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackLoadingCard = () => {
  return (
    <div/>
  );
};
const XD = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  right: 1rem;
  height: 1rem;
  @keyframes spotify-bars {
    0% {
      height: 10%;
    }

    50% {
      height: 100%;
    }

    100% {
      height: 0;
    }
  }
`;

const LMAO = styled.div<{ speed: number, theme: ThemeContextType["theme"] }>`
  background: ${props => props.theme == "dark" ? "white" : "black"};
  width: 2px;
  margin: 1px;
  animation: spotify-bars ${props => props.speed}s ease-in infinite;
`;

const Bars = () => {
  const {theme} = useTheme();
  const count = 5;
  const children: ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    children.push(
      <LMAO
        speed={0.5 + i * 0.2}
        theme={theme}
        key={`spotify-bar-${i}`}
      />
    );
  }
  return <XD>{children}</XD>;
};

export default SpotifyCurrentlyPlaying;