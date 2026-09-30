import './ListCard.css';

type ListCardProps = {
  name: string,
  description: string,
  children: React.ReactNode
};

export const ListCard = ({ name, description, children }: ListCardProps) => {
  return (
    <section className='list-card'>
      <div className='name-field'>
        <h1>{name}</h1>
      </div>
      <div className='description-field'>
        <p>{description}</p>
      </div>
      <ul>
        <li>{children}</li>
      </ul>
    </section>
  );
}