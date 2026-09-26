import { ListCard } from '@/components/ListCard/ListCard';
import { AddListCard } from '@/components/AddListCard/AddListCard';
import './Dashboard.css';

export const Dashboard = () => {
  return (
    <main className='dashboard-main-container'>
      <ListCard />
      <AddListCard />
    </main>
  );
}