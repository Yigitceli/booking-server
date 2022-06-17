declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_CLIENT_EMAIL: string;
      ACCESS_TOKEN:string
      REFRESH_TOKEN:string
    }
  }
}

export {};
