import {Track} from "../lib/spotify/types";
import useTimeAgo from "../shared/use-time-ago";
import useSWR from "swr";
import styled from "styled-components";
import {ThemeContextType, useTheme} from "../shared/theme-context";
import {ReactNode} from "react";

const SpotifyCurrentlyPlaying = () => {
  const {data: track} = useSWR(
    "/api/spotify/currently-playing",
    {
      refreshInterval: 10000,
      compare: (a: Track | undefined, b: Track | undefined) =>
        !!a && !!b
        && a.id == b.id
        && a.isPlaying == b.isPlaying,
    }
  );

  if (track) return <TrackCard track={track}/>;
  return <TrackLoadingCard/>;
};

const cardContainerClass = "relative w-full max-w-lg mx-auto rounded-2xl " +
  "shadow-md bg-white dark:bg-knight px-4 py-2";
const cardImageClass = "w-24 h-24 sm:w-28 sm:h-28 rounded-xl mr-4";
const cardTopInfoClass = "h-6 font-bold text-sm mb-1";

const TrackCard = ({track}: { track: Track }) => {
  const ago = useTimeAgo(track?.date);
  return (
    <div className={cardContainerClass}
    >
      {track.isPlaying && <Bars/>}
      {!track.isPlaying &&
      <time
        className="absolute right-4 font-bold text-sm text-gray-500 dark:text-gray-400"
        dateTime={new Date(track.date).toDateString()}
      >
        {ago}
      </time>}
      <div className={cardTopInfoClass}>
        {track.isPlaying && "CURRENTLY LISTENING TO"}
        {!track.isPlaying && "LAST LISTENED TO"}
      </div>
      <div className="flex items-center">
        <img
          className={cardImageClass}
          src={track.album.imageURL}
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
  const colorClass = "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 animate-pulse";
  return (
    <div className={cardContainerClass}>
      <div className={cardTopInfoClass}>
        <div className={`${colorClass} h-3 w-44 rounded`}/>
      </div>
      <div className="flex items-center">
        <div className={`${cardImageClass} ${colorClass}`}/>
        <div className="flex flex-col justify-center">
          <div className={`${colorClass} h-6 my-1 w-44`}/>
          <div className={`${colorClass} h-4 my-1 w-32`}/>
        </div>
      </div>
    </div>
  );
};

const SpotifyBarContainer = styled.div`
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

const SpotifyBar = styled.div<{ speed: number, theme: ThemeContextType["theme"] }>`
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
      <SpotifyBar
        speed={0.5 + i * 0.2}
        theme={theme}
        key={`spotify-bar-${i}`}
      />
    );
  }
  return <SpotifyBarContainer>{children}</SpotifyBarContainer>;
};

export default SpotifyCurrentlyPlaying;