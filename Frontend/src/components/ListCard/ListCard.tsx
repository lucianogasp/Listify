import { useState } from 'react';

// import components
import { ItemCard } from '../ItemCard/ItemCard';
import { AddingNewItem } from '../AddingNewItem/AddingNewItem';
import { AddNewItem } from '../AddNewItem/AddNewItem';
import { PostItemButton } from '../PostItemButton/PostItemButton';
import './ListCard.css';

// import types
import type { ItemApi } from '@/pages/Dashboard/Dashboard.data';

type ListCardProps = {
  name: string;
  description: string;
  items: ItemApi[];
};

export const ListCard = ({ name, description, items }: ListCardProps) => {
  const [isAddingNewItem, setIsAddingNewItem] = useState<Boolean>(false);

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
        
        <li>
          {isAddingNewItem ? (<AddingNewItem onPost={handlePostItem} />) : (<AddNewItem createNewItem={() => setIsAddingNewItem(true)} />)}
        </li>

        <li><PostItemButton /></li>
      </ul>
    </section>
  );
}