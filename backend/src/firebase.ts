import { initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Original Firebase configuration - commented out for now
/*
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error(
    "GOOGLE_APPLICATION_CREDENTIALS is not set. Please set it in the .env file or in Secrets tab on Replit"
  );
}

initializeApp({
  credential: applicationDefault(),
});

export const auth = getAuth();
*/

// Stub Firebase configuration for development
const app = initializeApp({
  projectId: 'formflow-dev',
  storageBucket: 'formflow-dev.appspot.com',
});

export const auth = getAuth(app);

// Mock auth methods for development
export const mockAuth = {
  verifyIdToken: async (token: string) => ({ uid: 'mock-user-id' }),
  createCustomToken: async (uid: string) => 'mock-token',
};
