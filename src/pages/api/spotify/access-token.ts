import {NextApiHandler} from "next";

export const getAccessToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const auth = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
  console.log("AUTH: ", btoa(auth));
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
  const {access_token} = await response.json();
  console.log("GOT ACCESS TOKEN: ", access_token);
  return access_token;
};

const handler: NextApiHandler = async (req, res) => {
  res.status(404).redirect("/404");
};

export default handler;