"use client";

import LoginButton from "@/app/(components)/LoginButton/LogginButton";
import Image from "next/image";
import BassIcon from "@/assets/bass.svg";
import GoogleIcon from "@/assets/google.png";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden bg-slate-500 flex flex-col justify-center items-center">
      {/* container  */}
      <div className="shadow-md rounded-md bg-slate-50 p-6 w-full min-w-96 md:w-1/2 lg:w-1/4 flex-col justify-items-center">
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
            className="px-4 p-2 mb-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="px-4 p-2 mb-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
          />
          <LoginButton variant="default" text="continuer" />
          <LoginButton
            variant="light"
            text="continuer avec google"
            iconSrc={GoogleIcon}
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
