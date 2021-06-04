import {NextApiHandler} from "next";
import {getAccessToken} from "./access-token";

const handler: NextApiHandler = async (_, res) => {
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  const access_token = await getAccessToken();
  const response = await fetch(
    url,
    {headers: {"Authorization": `Bearer ${access_token}`}}
  );
  const json = await response.json();
  res.status(200).json(json);
};

export default handler;