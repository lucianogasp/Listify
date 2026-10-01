import { useNavigate, type NavigateFunction } from 'react-router-dom';

// import components
import './LoginForm.css';

// import modules
import { ApiService } from '@/services/ApiService';
import { ValidateFormData } from '@/utils/ValidateFormData';
import { ResponseErrorHandler } from '@/errorHandlers/ResponseErrorHandler';

// import types
import { type MethodApi } from '@/pages/Dashboard/Dashboard.data';
type BodyObject = {
  email: string,
  password: string
}
type TokenResponse = {
  token: string
}

const postRegisterApi = async <TData,>(endpoint: string, method: MethodApi, bodyObject: BodyObject): Promise<TData> => {
  const apiService = new ApiService(endpoint);
  const responseApi = await apiService.fetchApi<BodyObject>(
    method,
    bodyObject
  );
  ResponseErrorHandler.responseIsOk(responseApi);

  const data: TData = await responseApi.json();
  return data;
}

export const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const emailForm = formData.get('email');
    const passwordForm = formData.get('password');

    const action = (event.nativeEvent.submitter as HTMLButtonElement).value;
    let endpoint;
    if(action === 'login') {
      endpoint = 'http://localhost:3000/login';
    }
    if (action === 'register') {
      endpoint = 'http://localhost:3000/register';
    }

    try {
      ValidateFormData.validateType(emailForm, 'string');
      ValidateFormData.validateType(passwordForm, 'string');

      const dataToken = await postRegisterApi<TokenResponse>(
        endpoint as string,
        'POST',
        {
          email: emailForm as string,
          password: passwordForm as string
        }
      );

      localStorage.setItem('token', dataToken.token);

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
      <button value='register'>Sign In</button>
    </form>
  );
}