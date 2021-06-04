import {NextApiHandler} from "next";
import {getRecentlyPlayed} from "../../../lib/spotify";

const handler: NextApiHandler = async (req, res) => {
  const x = await getRecentlyPlayed();
  res.status(200).json(x);
};

export default handler;