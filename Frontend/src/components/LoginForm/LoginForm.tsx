import './LoginForm.css';

export const LoginForm = () => {

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Submitted...');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id='email' type="text" placeholder='Email' required/>
      <input id='password' type="text" placeholder='Password' required/>

      <button>Login</button>
      <button>Sign In</button>
    </form>
  );
}