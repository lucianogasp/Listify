import './AddingNewList.css';

type AddingNewListProps = {
  onPost: (event: React.SubmitEvent<HTMLFormElement>) => void
}

export const AddingNewList = ({onPost}: AddingNewListProps) => {
  return(
    <form 
      id='adding-list-form' 
      className='adding-new-list'
      onSubmit={onPost}
    >
      <div className='name-field'>
        <input name='name' type="text" required autoFocus />
      </div>
      <div>
        <input name='description' type="text" />
      </div>
    </form>
  )
}