type Props = {
  value: number;
};

function Bubble({ value }: Props) {
  return (
    <span className="absolute text-sm -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] h-5 w-5 leading-none font-semibold text-red-100 bg-red-400 rounded-full">
      {value}
    </span>
  );
}

export default Bubble;
