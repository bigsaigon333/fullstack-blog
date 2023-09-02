import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
const Container = ({ children }: Props) => {
  return <div className="container mx-auto my-8 p-8">{children}</div>;
};

export default Container;
