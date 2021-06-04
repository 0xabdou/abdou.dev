import {getAccessToken} from "../pages/api/spotify/access-token";

export type SpotifyError = {
  status: number,
  error: string,
}

export type Artist = {
  name: string,
  url: string,
}

export type Track = {
  title: string,
  url: string
  imageURL: string,
  artists: Artist[],
  isPlaying: boolean,
  date: number,
}

export const getRecentlyPlayed = async (): Promise<SpotifyError | any> => {
  const limit = 1;
  const url = "https://api.spotify.com/v1/me/player/recently-played";
  const access_token = await getAccessToken();
  const response = await fetch(
    `${url}?limit=${limit}`,
    {headers: {"Authorization": `Bearer ${access_token}`}}
  );
  if (response.status != 200) return getSpotifyError(response);
  return response.json();
};

export const parseTrack = (json: any): Track => {
  const isPLaying = json.is_playing;
  const item = isPLaying == undefined ? json : json.item;
  return {
    title: item.name,
    url: item.external_urls.spotify,
    imageURL: item.album.images[1].url,
    artists: (item.artists as any[]).map(artist => ({
      name: artist.name,
      url: artist.external_urls.spotify
    })),
    isPlaying: !!isPLaying,
    date: json.timestamp
  };
};

export const getSpotifyError = async (response: Response): Promise<SpotifyError> => {
  const error: SpotifyError = {
    status: response.status,
    error: await response.text(),
  };
  console.log("ERROR: ", error);
  return error;
};