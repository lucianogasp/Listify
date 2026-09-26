import type { ReactNode } from 'react';
import './LoginCard.css';

type LoginCardChildren = {
  children: ReactNode;
};

export const LoginCard = ({ children }: LoginCardChildren) => {
  return(
    <div className="login-card">
      {children}
    </div>
  );
}