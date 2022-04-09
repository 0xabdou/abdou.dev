import db from "lib/firebase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const slug = `${req.query.slug}`;
  let views = 1;
  await db.runTransaction(async (t) => {
    const ref = db.collection("views").doc(slug);
    const data = (await t.get(ref)).data();
    if (!data) {
      t.create(ref, { views });
    } else {
      views = data.views + 1;
      t.update(ref, { views });
    }
  });
  res.status(200).json({ views });
};

export default handler;
