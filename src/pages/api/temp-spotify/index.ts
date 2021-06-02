import {NextApiHandler} from "next";

const handler: NextApiHandler = (req, res) => {
  const authURL = "https://accounts.spotify.com/authorize";
  const redirect_uri = "http://localhost:3000/api/temp-spotify/callback/";
  const scope = [
    "user-read-currently-playing",
    "user-read-playback-state"
  ].join(" ");
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    redirect_uri,
    scope,
    response_type: "code",
  });
  res.redirect(`${authURL}?${params.toString()}`);
};

export default handler;