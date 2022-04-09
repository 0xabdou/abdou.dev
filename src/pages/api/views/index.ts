import { NextApiHandler } from "next";
import db from "../../../lib/firebase";

const handler: NextApiHandler = async (req, res) => {
  const collection = await db.collection("views").get();
  const views: { [slug: string]: number } = {};
  collection.docs.forEach((doc) => {
    views[doc.id] = doc.get("views");
  });
  res.status(200).json({ views });
};

export default handler;
