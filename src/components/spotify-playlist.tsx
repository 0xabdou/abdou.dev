import {timeAgo} from "../shared/use-time-ago";
import {Track} from "../lib/spotify";
import {ReactNode} from "react";

type SpotifyPlaylistProps = {
  name: string,
  tracks: Track[]
}

const SpotifyPlaylist = ({name, tracks}: SpotifyPlaylistProps) => {
  return (
    <div
      className="flex flex-col space-y-3 mt-8
        text-sm text-black dark:text-white text-opacity-80 dark:text-opacity-80"
    >
      {/*
        The header of the playlist, it displays the name of he playlist,
        and its "sections" (e.g: "#", "TITLE"... and it has a sticky position
      */}
      <PlaylistRow header={name} key={`${name}_header`}/>
      {/* The rest of the playlist rows, each displays a track*/}
      {tracks.map((track, idx) => (
        <PlaylistRow key={`${name}_row_${idx}`}>
          {/*First child: The index of the song*/}
          {idx + 1}
          {/*Second child: The track image, title, and artists*/}
          <div className="flex">
            {/*The image*/}
            <a
              className="flex-shrink-0"
              href={track.album.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                className="w-10 h-10 mr-4"
                src={track.album.imageURL}
                alt="Track cover"
                width={64}
                height={64}
              />
            </a>
            <div className="flex flex-col justify-center">
              {/*The title*/}
              <a
                className="leading-4 line-clamp-1 font-bold text-base hover:underline"
                href={track.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {track.title}
              </a>
              {/*The artists*/}
              <div
                className="flex text-sm leading-4 line-clamp-1">
                {track.artists.map((artist, idx) => (
                  <span key={`${track.id}_artist_${idx}`}>
                      {!!idx && ", "}
                    <a
                      className="hover:underline"
                      href={artist.url}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                        {artist.name}
                      </a>
                    </span>
                ))}
              </div>
            </div>
          </div>
          {/*Third child: The album name, only visible after the sm breakpoint*/}
          <a
            className="line-clamp-1 hover:underline"
            href={track.album.url}
          >
            {track.album.title}
          </a>
          {/*Fourth child: The album name, only visible after the sm breakpoint*/}
          {timeAgo.format(track.date)}
          {/*Fifth child: The album name, only visible before the sm breakpoint*/}
          {timeAgo.format(track.date, "mini")}
        </PlaylistRow>
      ))}
    </div>
  );
};

type PlaylistRowProps = {
  header?: string,
  children?: ReactNode[]
}

const PlaylistRow = ({children, header}: PlaylistRowProps) => {
  const isHeader = !children;
  let actualChildren = children;
  if (!actualChildren) actualChildren = [
    "#",
    "TITLE",
    "ALBUM",
    "DATE ADDED",
    "DATE"
  ];

  const actualRow = (
    <div className="flex">
      <div className="flex justify-center items-center w-12 flex-shrink-0">
        {actualChildren[0]}
      </div>
      <div className="flex-grow pr-2">
        {actualChildren[1]}
      </div>
      <div className="hidden sm:flex items-center w-56 flex-shrink-0 pr-2">
        {actualChildren[2]}
      </div>
      <div className="hidden sm:flex items-center w-28 flex-shrink-0">
        {actualChildren[3]}
      </div>
      <div className="flex sm:hidden items-center w-16 flex-shrink-0">
        {actualChildren[4]}
      </div>
    </div>
  );

  return isHeader
    ? (
      <div
        className="flex flex-col sticky top-14 bg-old dark:bg-knight-dark
          border-b border-black dark:border-white border-opacity-20 dark:border-opacity-20"
      >
        <h2 className="text-markup-h2 font-bold m-2 mt-4">{header}</h2>
        {actualRow}
      </div>
    )
    : actualRow;
};

export default SpotifyPlaylist;