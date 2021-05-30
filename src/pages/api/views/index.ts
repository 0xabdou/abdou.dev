import db from "../../../lib/firebase";
import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req, res) => {
  const collection = await db.collection("views").get();
  let views: { [slug: string]: number } = {};
  collection.docs.forEach(doc => {
    views[doc.id] = doc.get("views");
  });
  res.status(200).json({views});
};

export default handler;