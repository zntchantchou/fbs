"use client";

import LoginButton from "@/app/(components)/LoginButton/LogginButton";
import Image from "next/image";
import BassIcon from "@/assets/bass.svg";
import GoogleIcon from "@/assets/google.png";
import { useRouter } from "next/navigation";
import { auth } from "firebaseui";
import { AuthenticationService } from "@/auth/auth-service";

function Login() {
  console.log("AUTH: ", auth);
  console.log("FirebaseAuth: ", AuthenticationService.firebaseAuth);

  const router = useRouter();
  const handleGoogleLogin = async () => {
    try {
      const credentials = await AuthenticationService.loginWithGoogle();
      if (credentials) {
        router.push("/shop");
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.log("error opening google popup :", e);
    }
    console.log("[handleGoogleLogin]");
  };

  const handleGithubLogin = async () => {
    try {
      const credentials = await AuthenticationService.loginWithGithub();
      if (credentials) {
        router.push("/shop");
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.log("error opening google popup :", e);
    }
    console.log("[handleGithubLogin]");
  };

  const inputClassnames =
    "h-12 px-4 p-2 mb-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500";
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden bg-slate-50 md:bg-slate-500 flex flex-col justify-center items-center">
      {/* container  */}
      <div className="md:shadow-md rounded-md bg-slate-50 p-6 w-full min-w-96 max-w-40 flex-col justify-items-center">
        <div className="w-full flex items-center justify-center">
          <Image src={BassIcon} alt="black and white bass icon" height={100} />
        </div>

        {/* HEADER */}
        <div className="w-full text-center p-2 text-xl">Se connecter</div>
        {/* CONTENT */}
        <div className="h-fit flex flex-col w-full pt-2">
          <input
            type="text"
            id="email"
            placeholder="email"
            className={inputClassnames}
          />
          <input
            type="password"
            id="password"
            placeholder="mot de passe"
            className={inputClassnames}
          />
          <LoginButton variant="default" text="continuer" />
          <LoginButton
            variant="light"
            text="continuer avec google"
            iconSrc={GoogleIcon}
            onClick={handleGoogleLogin}
          />
          <LoginButton
            variant="light"
            text="continuer avec github"
            iconSrc={GoogleIcon}
            onClick={handleGithubLogin}
          />
          <hr className="bg-slate-600" />
          <LoginButton
            variant="default"
            text="créer un compte"
            onClick={() => router.push("/register")}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
