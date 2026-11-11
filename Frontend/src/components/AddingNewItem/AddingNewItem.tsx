import './AddingNewItem.css';

type AddingNewItemProps = {
  onPost: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export const AddingNewItem = ({onPost}: AddingNewItemProps) => {
  return (
    <form
      id='adding-item-form'
      className='adding-new-item'
      onSubmit={onPost}
    >
      <input type="text" />
      <select name="item_status">
        <option value="pending">PENDING</option>
        <option value="in_progress">IN PROGRESS</option>
        <option value="completed">COMPLETED</option>
        <option value="cancelled">CANCELLED</option>
      </select>
    </form>
  );
} 