import {NextApiHandler} from "next";
import {getRecentlyPlayed} from "../../../lib/spotify";
import {isSpotifyError} from "../../../lib/spotify/spotify-error";

const handler: NextApiHandler = async (req, res) => {
  const response = await getRecentlyPlayed();
  if (isSpotifyError(response)) {
    const {error, status} = response;
    return res.status(status).json({error});
  }
  res.status(200).json(response);
};

export default handler;