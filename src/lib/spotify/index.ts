import {getSpotifyError, isSpotifyError, SpotifyError} from "./spotify-error";
import {Playlist, Track} from "./types";
import {AuthorizationHeader, getAuthorization} from "./auth";
import {
  clearLikedSongsPlaylist,
  copyLikedSongsToLikedSongsPlaylist
} from "./playlist";
import {spotifySuccess, SpotifySuccess} from "./spotify-success";

export const getCurrentlyPlaying = async (): Promise<SpotifyError | Track> => {
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  const headers = await getAuthorization();
  if (isSpotifyError(headers)) return headers;
  const response = await fetch(url, {headers});
  if (response.status != 200) return getSpotifyError(response);
  return parseTrack(await response.json(), "currently");
};

export const getRecentlyPlayed = async (): Promise<SpotifyError | Track> => {
  const limit = 1;
  const url = "https://api.spotify.com/v1/me/player/recently-played";
  const headers = await getAuthorization();
  if (isSpotifyError(headers)) return headers;
  const response = await fetch(`${url}?limit=${limit}`, {headers});
  if (response.status != 200) return getSpotifyError(response);
  return parseTrack(await response.json(), "recently");
};

export const getLikedSongsPlaylist = async (auth?: AuthorizationHeader): Promise<SpotifyError | Playlist> => {
  const headers = await maybeGetAuth(auth);
  if (isSpotifyError(headers)) return headers;
  const url = "https://api.spotify.com/v1/me/tracks";
  const response = await fetch(url, {headers});
  if (response.status != 200) return getSpotifyError(response);
  const tracks: any[] = (await response.json()).items;
  return {
    name: "Liked Songs",
    url: `https://open.spotify.com/playlist/${process.env.SPOTIFY_LIKED_SONGS_PLAYLIST_ID}`,
    tracks: tracks.map(track => parseTrack(track, "liked"))
  };
};

export const updateLikedSongsPlaylist = async (auth?: AuthorizationHeader): Promise<SpotifyError | SpotifySuccess> => {
  const headers = await maybeGetAuth(auth);
  if (isSpotifyError(headers)) return headers;
  const clearResult = await clearLikedSongsPlaylist(headers);
  if (isSpotifyError(clearResult)) return clearResult;
  const copyResult = await copyLikedSongsToLikedSongsPlaylist(headers);
  if (isSpotifyError(copyResult)) return copyResult;
  return spotifySuccess;
};

const maybeGetAuth = async (auth?: AuthorizationHeader): Promise<SpotifyError | AuthorizationHeader> => {
  if (auth) return auth;
  return getAuthorization();
};

const parseTrack = (json: any, type: "currently" | "recently" | "liked"): Track => {
  let isPlaying: boolean;
  let date: number;
  let item: any;
  let imgIdx = 1;
  if (type == "currently") {
    item = json.item;
    isPlaying = json.is_playing;
    date = json.timestamp;
  } else if (type == "recently") {
    item = json.items[0].track;
    isPlaying = false;
    date = new Date(json.items[0].played_at).getTime();
  } else {
    item = json.track;
    isPlaying = false;
    date = new Date(json.added_at).getTime();
    imgIdx = 2;
  }
  return {
    id: item.id,
    title: item.name,
    url: item.external_urls.spotify,
    album: {
      title: item.album.name,
      imageURL: item.album.images[imgIdx].url,
      url: item.album.external_urls.spotify
    },
    artists: (item.artists as any[]).map(artist => ({
      name: artist.name,
      url: artist.external_urls.spotify
    })),
    isPlaying,
    date,
  };
};
