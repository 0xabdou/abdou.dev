import {getSpotifyError, isSpotifyError, SpotifyError} from "./spotify-error";
import {spotifySuccess, SpotifySuccess} from "./spotify-success";
import {AuthorizationHeader} from "./auth";

const likedSongsPlaylistID = process.env.SPOTIFY_LIKED_SONGS_PLAYLIST_ID as string;
const likedSongsPlaylistURL = `https://api.spotify.com/v1/playlists/${likedSongsPlaylistID}/tracks`;

export const clearLikedSongsPlaylist = async (auth: AuthorizationHeader): Promise<SpotifyError | SpotifySuccess> => {
  const baseURL = likedSongsPlaylistURL;
  const uris = await gatherURIs({baseURL, headers: auth});
  if (isSpotifyError(uris)) return uris;
  return actOnURIs({
    baseURL,
    uris,
    headers: auth,
    act: "DELETE"
  });
};

export const copyLikedSongsToLikedSongsPlaylist = async (auth: AuthorizationHeader): Promise<SpotifyError | SpotifySuccess> => {
  const uris = await gatherURIs({
    baseURL: "https://api.spotify.com/v1/me/tracks?limit=50",
    headers: auth
  });
  if (isSpotifyError(uris)) return uris;
  return actOnURIs({
    baseURL: likedSongsPlaylistURL,
    uris,
    headers: auth,
    act: "POST"
  });
};

type GatherURIsProps = {
  baseURL: string,
  headers: AuthorizationHeader
}

const gatherURIs = async (props: GatherURIsProps): Promise<SpotifyError | string[]> => {
  const {baseURL, headers} = props;
  let url: string | null = baseURL;
  const uris: string[] = [];
  while (url) {
    const response = await fetch(url, {headers});
    if (response.status != 200) {
      return getSpotifyError(response);
    } else {
      const json = await response.json();
      (json.items as any[]).forEach(item => uris.push(item.track.uri));
      url = json.next as string | null;
    }
  }
  console.log(`GATHERED ${uris.length} URIs`);
  return uris;
};

type ActOnURIsProps = {
  baseURL: string,
  uris: string[],
  headers: AuthorizationHeader,
  act: "DELETE" | "POST"
}

const actOnURIs = async (props: ActOnURIsProps): Promise<SpotifyError | SpotifySuccess> => {
  const {baseURL, uris, headers, act} = props;
  let i = 0;
  while (i < uris.length) {
    let j = 0;
    const urisToActUpon: string[] = [];
    while (j < 100 && i < uris.length) {
      urisToActUpon.push(uris[i]);
      i++;
      j++;
    }
    const response = await fetch(
      baseURL,
      {
        method: act,
        headers: {
          ...headers,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({uris: urisToActUpon})
      }
    );
    if (response.status != 200 && response.status != 201)
      return getSpotifyError(response);
    console.log(`${act} ${i} URIs`);
  }
  console.log(`${act} TOTAL ${uris.length} URIs`);
  return spotifySuccess;
};

