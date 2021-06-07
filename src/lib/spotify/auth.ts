import {getSpotifyError, SpotifyError} from "./spotify-error";

export type AuthorizationHeader = {
  Authorization: string
}

export const getAuthorization = async (): Promise<SpotifyError | AuthorizationHeader> => {
  const url = "https://accounts.spotify.com/api/token";
  const response = await fetch(
    url,
    {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: `${process.env.SPOTIFY_REFRESH_TOKEN}`,
        client_id: `${process.env.SPOTIFY_CLIENT_ID}`,
        client_secret: `${process.env.SPOTIFY_CLIENT_SECRET}`
      })
    }
  );
  if (response.status != 200) return getSpotifyError(response);
  const json = await response.json();
  return {Authorization: `Bearer ${json.access_token}`};
};
