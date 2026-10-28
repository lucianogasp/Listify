import './AddNewList.css';

type addNewListProps = {
  createNewList: () => void;
}

export const AddNewList = ({createNewList}: addNewListProps) => {
  return (
    <section className='add-new-list'>
      <div onClick={createNewList}>
        <h1>+</h1>
      </div>
    </section>
  );
}