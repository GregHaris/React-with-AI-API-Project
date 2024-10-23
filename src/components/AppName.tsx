import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AppName = ({ children }: Props) => {
  return <div className="title">{children}</div>;
};

export default AppName;
