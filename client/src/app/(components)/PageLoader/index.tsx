import { Loader } from "lucide-react";
type Props = { text?: string };
function PageLoader({ text }: Props) {
  const message = text ? <p>{text}</p> : null;
  return (
    <div className="absolute right-0 left-0 bottom-0 top-0 bg-blue-200 flex justify-center items-center">
      <Loader height={50} width={50} className="animate-spin-slow mr-5" />
      {message}
    </div>
  );
}

export default PageLoader;
