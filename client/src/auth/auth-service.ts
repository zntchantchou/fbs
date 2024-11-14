import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};

export class AuthService {
  public firebaseAuth = getAuth(initializeApp(firebaseConfig));

  public loginWithGoogle = async (): Promise<UserCredential | null> => {
    console.log("[handleGoogleLogin]");
    try {
      const credentials = await signInWithPopup(
        this.firebaseAuth,
        new GoogleAuthProvider()
      );
      console.log("[AuthService] GoogleSignIn: ", credentials);
      return credentials || null;
    } catch (e) {
      console.log("error opening google popup :", e);
      return null;
    }
  };

  public loginWithGithub = async (): Promise<UserCredential | null> => {
    console.log("[handleGoogleLogin]");
    try {
      const credentials = await signInWithPopup(
        this.firebaseAuth,
        new GithubAuthProvider()
      );
      console.log("[AuthService] GoogleSignIn: ", credentials);
      return credentials || null;
    } catch (e) {
      console.log("error opening google popup :", e);
      return null;
    }
  };

  public signOut() {
    try {
      console.log("[AuthService] signout");
      return this.firebaseAuth.signOut();
    } catch (e) {
      console.log("Error signing out: ", e);
    }
  }
}

export const AuthenticationService = new AuthService();
