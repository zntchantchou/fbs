type HeaderProps = {
  name: string;
};

function Header({ name }: HeaderProps) {
  return (
    <h1 className="h-1 mb-10 text-2xl font-semibold text-gray-700"> {name} </h1>
  );
}

export default Header;
