import {NextApiHandler} from "next";
import {getLiked, isSpotifyError} from "../../../lib/spotify";

const handler: NextApiHandler = async (req, res) => {
  const items = await getLiked();
  if (isSpotifyError(items)) {
    return res.status(items.status).json({error: items.error});
  }
  return res.status(200).json({items});
};

export default handler;