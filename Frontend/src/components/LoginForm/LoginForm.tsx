import './LoginForm.css';

import { ApiService } from '@/services/ApiService';
import { ValidateFormData } from '@/utils/ValidateFormData';
import { ResponseErrorHandler } from '@/errorHandlers/ResponseErrorHandler';

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
      ValidateFormData.validateType(emailForm, 'string');
      ValidateFormData.validateType(passwordForm, 'string');

      const registerService = new ApiService(
        'http://localhost:3000/register'
      );
      const responseApi = await registerService.fetchApi<RegisterBodyRequest>(
        'POST',
        {
          email: emailForm as string,
          password: passwordForm as string
        }
      );

      ResponseErrorHandler.responseIsOk(responseApi);

      const data: DataResponse = await responseApi.json();
      localStorage.setItem('token', data.token);
      
    } catch(err) {
      console.error(err);
    }
  }

  const handleLogin = async (formData: FormData): Promise<void> => {
    
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
      ValidateFormData.validateType(emailForm, 'string');
      ValidateFormData.validateType(passwordForm, 'string');

      const loginService = new ApiService(
        'http://localhost:3000/login'
      );
      const responseApi = await loginService.fetchApi<LoginBodyRequest>(
        'POST',
        {
          email: emailForm as string,
          password: passwordForm as string
        }
      );

      ResponseErrorHandler.responseIsOk(responseApi);

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