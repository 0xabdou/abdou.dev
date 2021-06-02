import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    const secret = req.body.secret;
    console.log("SECRET: ", secret);
    if (secret != process.env.SPOTIFY_CLIENT_SECRET) {
      return res.status(401).json({error: "Invalid secret"});
    }
    const url = "https://accounts.spotify.com/api/token";
    const auth = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(auth)}`
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: `${process.env.SPOTIFY_REFRESH_TOKEN}`
        })
      }
    );
    const {access_token} = await response.json();
    console.log("GOT ACCESS TOKEN: ", access_token);
    return res.status(200).json({access_token});
  }
  res
    .status(400)
    .json({"error": `Can't ${req.method} to /spotify/access-token`});
};

export default handler;