import {NextApiHandler} from "next";
import {getLikedSongsPlaylist, isSpotifyError} from "../../../lib/spotify";

const handler: NextApiHandler = async (req, res) => {
  const items = await getLikedSongsPlaylist();
  if (isSpotifyError(items)) {
    return res.status(items.status).json({error: items.error});
  }
  return res.status(200).json({items});
};

export default handler;