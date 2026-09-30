import './ItemCard.css';

type ItemCardProps = {
  title: string,
  is_prioritized: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
}

export const ItemCard = ({ title, is_prioritized, status }: ItemCardProps) => {
  return (
    <section className='item-card'>
      <h1>{title}</h1>
      <span>...</span>
    </section>
  );
}