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

const getAccessToken = async (): Promise<SpotifyError | string> => {
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
  return (await response.json()).access_token;
};

export const getCurrentlyPlaying = async (): Promise<SpotifyError | Track> => {
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  const access_token = await getAccessToken();
  if (isSpotifyError(access_token)) return access_token;
  const response = await fetch(
    url,
    {headers: {"Authorization": `Bearer ${access_token}`}}
  );
  if (response.status != 200) return getSpotifyError(response);
  return parseTrack(await response.json());
};

export const getRecentlyPlayed = async (): Promise<SpotifyError | Track> => {
  const limit = 1;
  const url = "https://api.spotify.com/v1/me/player/recently-played";
  const access_token = await getAccessToken();
  if (isSpotifyError(access_token)) return access_token;
  const response = await fetch(
    `${url}?limit=${limit}`,
    {headers: {"Authorization": `Bearer ${access_token}`}}
  );
  if (response.status != 200) return getSpotifyError(response);
  return parseTrack(await response.json());
};

const parseTrack = (json: any): Track => {
  let isPlaying = json.is_playing;
  console.log("isPLaying: ", isPlaying);
  let date: number;
  let item: any;
  if (isPlaying == undefined) {
    item = json.items[0].track;
    date = new Date(json.items[0].played_at).getTime();
  } else {
    item = json.item;
    date = json.timestamp;
  }
  return {
    id: item.id,
    title: item.name,
    url: item.external_urls.spotify,
    imageURL: item.album.images[1].url,
    artists: (item.artists as any[]).map(artist => ({
      name: artist.name,
      url: artist.external_urls.spotify
    })),
    isPlaying: !!isPlaying,
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