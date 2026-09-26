import { LoginCard } from '@/components/LoginCard/LoginCard';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import './Login.css';

export const Login = () => {
  return (
    <main className='main-container'>
      <LoginCard>
        <LoginForm />
      </LoginCard>
    </main>
  );
}