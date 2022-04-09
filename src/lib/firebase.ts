import admin from "firebase-admin";

const privateKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY as string,
  "base64"
).toString("ascii");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}

export default admin.firestore();
