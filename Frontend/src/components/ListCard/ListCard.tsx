import { ItemCard } from '../ItemCard/ItemCard';
import './ListCard.css';

import type { ItemApi } from '@/pages/Dashboard/Dashboard.data';

type ListCardProps = {
  name: string,
  description: string,
  items: ItemApi[]
};

export const ListCard = ({ name, description, items }: ListCardProps) => {
  return (
    <section className='list-card'>
      <div className='name-field'>
        <h1>{name}</h1>
      </div>
      <div>
        <p>{description}</p>
      </div>
      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ItemCard
              title={item.title}
              is_prioritized={item.is_prioritized}
              status={item.status}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}