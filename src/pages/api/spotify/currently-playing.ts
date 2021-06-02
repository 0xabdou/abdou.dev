import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req, res) => {
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  const host = process.env.NODE_ENV == "production"
    ? "https://www.abdou.dev"
    : "http://localhost:3000";
  const response1 = await fetch(
    `${host}/api/spotify/access-token`,
    {
      method: "POST",
      body: new URLSearchParams({
        secret: `${process.env.SPOTIFY_CLIENT_SECRET}`
      })
    }
  );
  //console.log("RESPONSE: ", response1);
  const {access_token} = await response1.json();
  const response = await fetch(
    url,
    {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log("RESP: ", response);
  const json = await response.json();
  res.status(200).json(json);
};

export default handler;