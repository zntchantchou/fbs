import LoginButton from "@/app/(components)/LoginButton/LogginButton";

function Register() {
  const conditionsText =
    "En créant un compte, vous acceptez nos Conditions d'utilisation. Découvrez comment nous traitons vos données dans notre Politique de confidentialité.";
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden bg-slate-50 md:bg-slate-500 flex flex-col justify-center items-center">
      {/* container  */}
      <div className="md:shadow-md rounded-md bg-slate-50 p-6 w-full min-w-96 max-w-40 flex-col justify-items-center">
        {/* HEADER */}
        <div className="w-full text-center p-2 text-xl">Créer un compte</div>
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
            placeholder="mot de passe"
            className="px-4 p-2 mb-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
          />
          <LoginButton variant="default" text="continuer" />
          <span className="text-xs text-gray-100 mt-2">{conditionsText}</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
