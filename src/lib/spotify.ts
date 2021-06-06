export type SpotifyError = {
  __typename: "SpotifyError",
  status: number,
  error: string,
}

export type Artist = {
  name: string,
  url: string,
}

export type Track = {
  id: string,
  title: string,
  url: string
  imageURL: string,
  artists: Artist[],
  isPlaying: boolean,
  date: number,
}

const getAuthorization = async (): Promise<SpotifyError | { Authorization: string }> => {
  const url = "https://accounts.spotify.com/api/token";
  const response = await fetch(
    url,
    {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: `${process.env.SPOTIFY_REFRESH_TOKEN}`,
        client_id: `4252246e16d94478a423d340eda0cba0`,
        client_secret: `c82cd54afa90481889d4056fa1781361`
      })
    }
  );
  if (response.status != 200) return getSpotifyError(response);
  const json = await response.json();
  return {Authorization: `Bearer ${json.access_token}`};
};

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

export const getLiked = async (): Promise<SpotifyError | Track[]> => {
  const url = "https://api.spotify.com/v1/me/tracks";
  const headers = await getAuthorization();
  if (isSpotifyError(headers)) return headers;
  const response = await fetch(url, {headers});
  if (response.status != 200) return getSpotifyError(response);
  const tracks: any[] = (await response.json()).items;
  return tracks.map(track => parseTrack(track, "liked"));
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
    imageURL: item.album.images[imgIdx].url,
    artists: (item.artists as any[]).map(artist => ({
      name: artist.name,
      url: artist.external_urls.spotify
    })),
    isPlaying,
    date,
  };
};

const getSpotifyError = async (response: Response): Promise<SpotifyError> => {
  const error: SpotifyError = {
    __typename: "SpotifyError",
    status: response.status,
    error: await response.text(),
  };
  console.log("ERROR: ", error);
  return error;
};

export const isSpotifyError = (object: any): object is SpotifyError => {
  return object.__typename == "SpotifyError";
};