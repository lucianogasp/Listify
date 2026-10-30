import { useNavigate } from 'react-router-dom';

// import modules
import { ApiHandler } from '@/services/ApiHandler';
import { ValidateFormData } from '@/utils/ValidateFormData';
import './LoginForm.css';

type TokenResponse = {
  token: string
}

export const LoginForm = () => {
  const navigate = useNavigate();

  const postLoginOrRegister = async <TData,>(formData: FormData, endpoint: string): Promise<TData | undefined> => {
    try {
      const emailForm = formData.get('email');
      const passwordForm = formData.get('password');
      ValidateFormData.validateType(emailForm, 'string');
      ValidateFormData.validateType(passwordForm, 'string');

      const apiService = ApiHandler.createInstance(
        endpoint
      );
      const data = await ApiHandler.request<TData>(
        apiService,
        'POST',
        {
          email: emailForm as string,
          password: passwordForm as string
        }
      );
      return data;
    } catch(err) {
      console.error(err);
    }
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    try {
      const action = (event.nativeEvent.submitter as HTMLButtonElement).value;
      let endpoint: string | undefined;
      if(action === 'login') {
        endpoint = 'http://localhost:3000/login';
      } else if (action === 'register') {
        endpoint = 'http://localhost:3000/register';
      }

      if(!endpoint) {
        throw new Error('Invalid action. Must be: "login" or "register"');
      }
      const data = await postLoginOrRegister<TokenResponse>(
        formData,
        endpoint
      );
      if(data) {
        localStorage.setItem('token', data.token);
      }
    } catch(err) {
      console.error(err);

    } finally {
      navigate('/dashboard');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='email' type="text" placeholder='Email' required/>
      <input name='password' type="text" placeholder='Password' required/>

      <button value='login'>Login</button>
      <button value='register'>Register</button>
    </form>
  );
}