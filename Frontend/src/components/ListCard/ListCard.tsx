// import type { ReactNode } from 'react';
import './ListCard.css';

import { type ListApi } from '@/pages/Dashboard/Dashboard.data';
import { type ItemApi } from '@/pages/Dashboard/Dashboard.data';

type ListCardProps = {
  list: ListApi,
  item: ItemApi
}

export const ListCard = ({ list, item }: ListCardProps) => {
  return (
    <section className='list-card'>
      <div className='title-field'>
        <h1>{list.name}</h1>
      </div>
      <ul>
        <li>{item.title}</li>
        <span>{item.status}</span>
      </ul>
    </section>
  );
}