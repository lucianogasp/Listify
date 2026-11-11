import './AddNewItem.css';

type AddNewItemProps = {
  createNewItem: () => void;
}

export const AddNewItem = ({createNewItem}: AddNewItemProps) => {
  return (
    <section className='add-new-item'>
      <div onClick={createNewItem}>
        <h1>+</h1>
      </div>
    </section>
  );
}