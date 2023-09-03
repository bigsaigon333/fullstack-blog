type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <header className="text-2xl font-semibold py-12 md:text-4xl">
      {title}
    </header>
  );
};

export default Header;
