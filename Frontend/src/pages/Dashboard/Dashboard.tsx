import { useState, useEffect } from 'react';

// import components
import { ListCard } from '@/components/ListCard/ListCard';
import { AddingNewList } from '@/components/AddingNewList/AddingNewList';
import { AddNewList } from '@/components/AddNewList/AddNewList';
import { PostListButton } from '@/components/PostListButton/PostListButton';

// import modules
import { ApiHandler } from '@/services/ApiHandler';
import { ValidateFormData } from '@/utils/ValidateFormData';
import './Dashboard.css';

// import types
import { 
  type ListApi, 
  type ItemApi, 
  type ListsData, 
  type ItemsData, 
} from './Dashboard.data';

export const Dashboard = () => {

  const [listArr, setListArr] = useState<ListApi[]>([]);
  const [itemArr, setItemArr] = useState<ItemApi[]>([]);
  const [isAddingNewList, setIsAddingNewList] = useState<boolean>(false);

  const updateDashboardArray = async (): Promise<void> => {
    try {
      const listsData = await getAllApi<ListsData>('http://localhost:3000/lists');
      const itemsData = await getAllApi<ItemsData>('http://localhost:3000/lists/items');

      if(listsData) setListArr(listsData.lists);
      if(itemsData) setItemArr(itemsData.items);
    } catch(err) {
      console.error(err);
    }
  };

  const getAllApi = async <TData,>(endpoint: string): Promise<TData | undefined> => {
    const token = localStorage.getItem('token') ?? undefined;

    const apiService = ApiHandler.createInstance(
      endpoint,
      token
    );
    const data = await ApiHandler.request<TData>(
      apiService,
      'GET'
    );
    return data;
  };

  const handlePostList = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if(!isAddingNewList) return;

    const token = localStorage.getItem('token') ?? undefined;

    const formData = new FormData(event.currentTarget);
    const nameForm = formData.get('name');
    const descriptionForm = formData.get('description');
    try {
      ValidateFormData.validateType(nameForm, 'string');
      ValidateFormData.validateType(descriptionForm, 'string');

      const apiService = ApiHandler.createInstance(
        'http://localhost:3000/lists',
        token
      );
      await ApiHandler.request<unknown>(
        apiService,
        'POST',
        {
          name: nameForm as string,
          description: descriptionForm as string
        }
      );

      await updateDashboardArray();
      
      setIsAddingNewList(false);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      await updateDashboardArray();
    })();
  }, []);

  return (
    <main className='dashboard-main-container'>
    <ul>
      {listArr.map((list) => (
        <li key={list.id}>
          <ListCard 
            name={list.name} 
            description={list.description}
            items={itemArr.filter((item) => item.list_id === list.id)}
          >
          </ListCard>
        </li>
      ))}
      
      <li>
        {isAddingNewList ? (<AddingNewList onPost={handlePostList} />) : (<AddNewList createNewList={() => setIsAddingNewList(true)} />)}
      </li>

      <li>
        <PostListButton />
      </li>
    </ul>
    </main>
  );
}