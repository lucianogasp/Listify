import './PostListButton.css';

type PostListButtonProps = {
  onPost: () => void;
}

export const PostListButton = ({onPost}: PostListButtonProps) => {
  return (
    <section className='post-list-button'>
      <button onClick={onPost}>Post List</button>
    </section>
  );
}