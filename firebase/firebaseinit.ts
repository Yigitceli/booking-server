import { initializeApp, applicationDefault,cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv"

dotenv.config()

const app = initializeApp({
  credential: cert({
    "projectId":process.env.FIREBASE_PROJECT_ID,
    "privateKey":process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    "clientEmail":process.env.FIREBASE_CLIENT_EMAIL
  }),
});

export const auth = getAuth(app);
