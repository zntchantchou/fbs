"use client";

import Image, { StaticImageData } from "next/image";

const variantStyles = {
  default: "bg-slate-900 text-slate-50 hover:bg-slate-800",
  light:
    "bg-transparent hover:bg-slate-200 hover:border-none text-slate-900 border-slate-300 border-2",
};

type Props = {
  text: string;
  variant?: keyof typeof variantStyles;
  onClick?: () => void;
  iconSrc?: StaticImageData;
};

const defaultFn = () => {
  console.log("Loggin button onclick");
};

function LoginButton({
  text,
  variant = "default",
  onClick = defaultFn,
  iconSrc,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full my-2 h-12 ${variantStyles[variant]} flex items-center justify-center text-slate-50 text-center text-lg rounded-lg`}
    >
      {iconSrc && <Image src={iconSrc} alt="" height={24} className="mr-2" />}
      {text}
    </div>
  );
}

export default LoginButton;
