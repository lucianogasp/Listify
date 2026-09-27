import './LoginForm.css';

import { AuthErrorHandler } from '@/errorHandlers/AuthErrorHandler';
import { AuthService } from '@/services/AuthService';

export const LoginForm = () => {

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const action = (event.nativeEvent.submitter as HTMLButtonElement).value;
    if(action === 'login') {
      handleLogin(formData);
    }
    if (action === 'register') {
      handleRegister(formData);
    }
  }

  const handleRegister = async (formData: FormData): Promise<void> => {
    
    interface RegisterBodyRequest {
      email: string,
      password: string
    }
    interface DataResponse {
      token: string
    }
    
    const emailForm = formData.get('email');
    const passwordForm = formData.get('password');

    try {
      AuthErrorHandler.validateFormDataValueType(emailForm, 'string');
      AuthErrorHandler.validateFormDataValueType(passwordForm, 'string');

      const registerAuthService = new AuthService<RegisterBodyRequest>(
        'http://localhost:3000/register',
        {
          email: emailForm as string,
          password: passwordForm as string
        }
      );
      const responseApi: Response = await registerAuthService.fetchApi();

      AuthErrorHandler.authResponseIsOk(responseApi);

      const data: DataResponse = await responseApi.json();
      localStorage.setItem('token', data.token);
      
    } catch(err) {
      console.error(err);
    }
  }

  const handleLogin = async (formData: FormData) => {
    
    interface LoginBodyRequest {
      email: string,
      password: string
    }
    interface DataResponse {
      token: string
    }
    
    const emailForm = formData.get('email');
    const passwordForm = formData.get('password');

    try {
      AuthErrorHandler.validateFormDataValueType(emailForm, 'string');
      AuthErrorHandler.validateFormDataValueType(passwordForm, 'string');

      const loginAuthService = new AuthService<LoginBodyRequest>(
        'http://localhost:3000/login',
        {
          email: emailForm as string,
          password: passwordForm as string
        }
      );
      const responseApi: Response = await loginAuthService.fetchApi();

      AuthErrorHandler.authResponseIsOk(responseApi);

      const data: DataResponse = await responseApi.json();
      localStorage.setItem('token', data.token);
      
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='email' type="text" placeholder='Email' required/>
      <input name='password' type="text" placeholder='Password' required/>

      <button value='login'>Login</button>
      <button value='register'>Sign In</button>
    </form>
  );
}