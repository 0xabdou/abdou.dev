import {NextApiHandler} from "next";
import {updateLikedSongsPlaylist} from "../../../lib/spotify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    return res
      .status(400)
      .json({error: `Can't ${req.method} /api/spotify/update-liked-songs`});
  }
  const secret = req.body.secret;
  if (secret != process.env.SPOTIFY_CLIENT_SECRET) {
    return res
      .status(401)
      .json({error: "Invalid client secret"});
  }
  await updateLikedSongsPlaylist();
  res.status(201).json({message: "Updated successfully"});
};

export default handler;