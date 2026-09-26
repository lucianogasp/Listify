import type { ReactNode } from 'react';
import './Card.css';

type CardChildren = {
  children: ReactNode;
};

export const Card = ({ children }: CardChildren) => {
  return(
    <div className="card">
      {children}
    </div>
  );
}