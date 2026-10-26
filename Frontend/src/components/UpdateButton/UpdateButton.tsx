import './UpdateButton.css';

type UpdateButtonProps = {
  onUpdate: () => void;
}

export const UpdateButton = ({onUpdate}: UpdateButtonProps) => {
  return (
    <section className='update-button'>
      <button onClick={onUpdate}>Update Post / Patch</button>
    </section>
  );
}