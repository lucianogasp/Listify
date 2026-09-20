import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login.tsx';

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
    </Routes>
  );
}
