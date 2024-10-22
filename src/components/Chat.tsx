import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Chat = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Chat;