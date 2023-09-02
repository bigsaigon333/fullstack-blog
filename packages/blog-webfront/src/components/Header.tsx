type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return <header className="text-3xl font-semibold">{title}</header>;
};

export default Header;
