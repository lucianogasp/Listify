import './AddingNewList.css';

export const AddingNewList = () => {
  return(
    <section className='adding-new-list'>
      <div className='name-field'>
        <input name='name' type="text" required autoFocus />
      </div>
      <div>
        <input name='description' type="text" />
      </div>
    </section>
  )
}