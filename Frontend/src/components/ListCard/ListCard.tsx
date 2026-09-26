// import type { ReactNode } from 'react';
import './ListCard.css';

export const ListCard = () => {
  return (
    <section className='list-card'>
      <div className='title-field'>
        <h1>Title Title Title Title Title</h1>
      </div>
      <ul className='items-field'>
        <li>
          <p>item 1</p>
          <p>sei lá</p>
        </li>
        <li>
          <p>item 2</p>
          <p>sei lá</p>
        </li>
        <li>
          <p>item 3</p>
          <p>sei lá</p>
        </li>
      </ul>
    </section>
  );
}