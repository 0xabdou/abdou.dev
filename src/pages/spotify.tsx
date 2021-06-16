import Head from "next/head";
import SpotifyCurrentlyPlaying from "../components/spotify-currently-playing";
import SocialSharePreview from "../components/social-share-preview";
import {getLikedSongsPlaylist} from "../lib/spotify";
import {GetStaticProps} from "next";
import TitleWithDescription from "../components/title-with-description";
import SpotifyPlaylist from "../components/spotify-playlist";
import {Playlist} from "../lib/spotify/types";
import {isSpotifyError} from "../lib/spotify/spotify-error";

type SpotifyPageProps = {
  likedSongs: Playlist
}

const SpotifyPage = (props: SpotifyPageProps) => {
  const title = "Abdou Ouahib | Spotify";
  const description = "Welcome to my lounge, here you can find the current track" +
    " I'm listening to, and also my most recent 20 Liked Songs, enjoy!";
  return (
    <div className="relative flex flex-col w-full max-w-screen-md mb-10">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
      </Head>
      <SocialSharePreview
        image="/static/images/social-share-preview/spotify.png"
        title={title}
        description={description}
      />
      <TitleWithDescription title="Spotify" description={description}/>
      <SpotifyCurrentlyPlaying/>
      <SpotifyPlaylist playlist={props.likedSongs}/>
    </div>
  );
};


export const getStaticProps: GetStaticProps<SpotifyPageProps> = async () => {
  //const auth = await getAuthorization();
  //if (isSpotifyError(auth)) throw new Error(auth.error);
  //const updateResult = await updateLikedSongsPlaylist(auth);
  //if (isSpotifyError(updateResult)) throw updateResult;
  const likedSongs = await getLikedSongsPlaylist();
  if (isSpotifyError(likedSongs)) throw new Error(likedSongs.error);
  return {
    props: {likedSongs},
    revalidate: 3600, // 1 hour
  };
};

export default SpotifyPage;