import { ListCard } from '@/components/ListCard/ListCard';
import { AddListCard } from '@/components/AddListCard/AddListCard';
import './Dashboard.css';

// const listsApi: string = 'http://localhost:3000/lists';
// type LoginPost = {
//   email: string,
//   password: string
// }
// const loginObject: LoginPost = {
//   email: 'lucianogasp1@gmail',
//   password: '123123'
// }
// type requestConfig = {
//   method: string,
//   headers: {
//     'content_Type': string,
//   },
//   body: string
// }
// const requestObject: requestConfig = {
//   method: 'POST',
//   headers: {
//     'content_Type': 'application/json'
//   },
//   body: JSON.stringify(loginObject)
// }

export const Dashboard = () => {

  // try {
  //   const response: Response = await fetch(
  //     listsApi,
  //     requestObject
  //   );
  //   const token: string = await response.json();

  // } catch(err) {
  //   console.log('__Stuck in error log__');
  //   console.error(err);
  // }

  return (
    <main className='dashboard-main-container'>
      <ListCard />
      <AddListCard />
    </main>
  );
}