import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req, res) => {
  const code = req.query.code as string | undefined;
  if (!code) return res.status(401).json({error: "Access denied"});
  const tokenURL = "https://accounts.spotify.com/api/token";
  const redirect_uri = "http://localhost:3000/api/temp-spotify/callback/";
  const response = await fetch(
    tokenURL,
    {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        client_id: `${process.env.SPOTIFY_CLIENT_ID}`,
        client_secret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
      })
    }
  );
  const {refresh_token} = (await response.json());
  res.status(200).json({refresh_token});
};

export default handler;