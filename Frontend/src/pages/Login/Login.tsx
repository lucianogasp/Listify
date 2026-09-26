import { Card } from '@/components/Card/Card';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import './Login.css';

export const Login = () => {
  return (
    <main className='main-container'>
      <Card>
        <LoginForm />
      </Card>
    </main>
  );
}