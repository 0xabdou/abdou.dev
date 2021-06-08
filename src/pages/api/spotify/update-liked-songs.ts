import {NextApiHandler} from "next";
import {updateLikedSongsPlaylist} from "../../../lib/spotify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "PUT") {
    return res
      .status(400)
      .json({error: `Can't ${req.method} /api/spotify/update-liked-songs`});
  }
  console.log("BODY: ", req.body);
  const json = JSON.parse(req.body);
  console.log("JSON: ", json);
  const secret = json.secret;

  if (secret != process.env.SPOTIFY_CLIENT_SECRET) {
    return res
      .status(401)
      .json({error: "Invalid client secret", secret});
  }
  await updateLikedSongsPlaylist();
  res.status(201).json({message: "Updated successfully"});
};

export default handler;