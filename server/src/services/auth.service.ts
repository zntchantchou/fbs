import admin from "firebase-admin";
import * as serviceAccountKey from "../../firebase-service-account.json";
import { Auth, getAuth } from "firebase-admin/auth";

class Authentication {
  app = admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(JSON.stringify(serviceAccountKey))
    ),
  });

  public getAuthentication(): Auth {
    return getAuth(this.app);
  }
}

const AuthService = new Authentication();

export default AuthService;
