import {NextApiHandler} from "next";
import {getAccessToken} from "./access-token";

const handler: NextApiHandler = async (_, res) => {
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  const access_token = await getAccessToken();
  const response = await fetch(
    url,
    {headers: {"Authorization": `Bearer ${access_token}`}}
  );
  if (response.status != 200) {
    const error = {
      status: response.status,
      statusText: response.statusText,
      error: await response.text(),
    };
    console.log("ERROR: ", error);
    return res.status(response.status).json(error);
  }
  const json = await response.json();
  res.status(200).json(json);
};

export default handler;