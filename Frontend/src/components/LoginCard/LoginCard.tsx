import './LoginCard.css';

// import types
import type { ReactNode } from 'react';

type LoginCardChildren = {
  children: ReactNode;
};

export const LoginCard = ({ children }: LoginCardChildren) => {
  return (
    <div className="login-card">
      {children}
    </div>
  );
}