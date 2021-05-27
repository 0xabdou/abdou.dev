import db from "../../lib/firebase";
import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "PUT") {
    const slug = JSON.parse(req.body).slug;
    let views = 1;
    await db.runTransaction(async t => {
      const ref = db.collection("views").doc(slug);
      const data = (await t.get(ref)).data();
      if (!data) {
        await t.create(ref, {views});
      } else {
        views = data.views + 1;
        t.update(ref, {views});
      }
    });
    res.status(200).json({views});
  } else if (req.method == "GET") {
    const ref = db.collection("views").doc(req.query.slug as string);
    const data = (await ref.get()).data();
    res.status(200).json({views: data?.views ?? 1});
  }
};

export default handler;