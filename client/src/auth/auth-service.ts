import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getAuth,
  getIdToken,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { getInstallations, getToken } from "firebase/installations";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};

class AuthService {
  private app = initializeApp(firebaseConfig);
  public firebaseAuth = getAuth(this.app);

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

  public async signOut(): Promise<void | null> {
    try {
      console.log("[AuthService] signout");
      return this.firebaseAuth.signOut();
    } catch (e) {
      console.log("Error signing out: ", e);
      return null;
    }
  }

  private async getCurrentIdToken(): Promise<string | null> {
    await this.firebaseAuth.authStateReady();
    if (!this.firebaseAuth.currentUser) return null;
    return getIdToken(this.firebaseAuth.currentUser);
  }

  public async getTokens() {
    const installations = getInstallations(this.app);
    const installationToken = getToken(installations);
    const authIdToken = await this.getCurrentIdToken();
    return { authIdToken, installationToken };
  }
}

export const AuthenticationService = new AuthService();
