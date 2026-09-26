import './LoginForm.css';

export const LoginForm = () => {

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const emailForm = formData.get('email');
    const passwordForm = formData.get('password');

    const requestConfig: RequestInit = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailForm,
        password: passwordForm
      })
    }

    const registerApi: string = 'http://localhost:3000/register';
    try {
      const responseApi = await fetch(
        registerApi,
        requestConfig
      );
      const data = await responseApi.json();

      localStorage.setItem('token', data.token);
      console.log(data);

    } catch(err) {
      console.log('__Catched an Error__');
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='email' type="text" placeholder='Email' required/>
      <input name='password' type="text" placeholder='Password' required/>

      <button>Login</button>
      <button>Sign In</button>
    </form>
  );
}