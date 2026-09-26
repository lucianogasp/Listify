import type { ReactNode } from 'react';
import './ListCard.css';

type ListCardChildren = {
  children: ReactNode
}

export const ListCard = ({ children }: ListCardChildren) => {
  return (
    <div className='list-card'>
      {children}
    </div>
  );
}