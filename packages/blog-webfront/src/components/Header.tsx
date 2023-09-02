type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return <header className="text-4xl font-semibold py-12">{title}</header>;
};

export default Header;
