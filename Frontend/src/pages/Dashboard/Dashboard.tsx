import { useState, useEffect } from 'react';

// import components
import { ListCard } from '@/components/ListCard/ListCard';
import { AddListCard } from '@/components/AddListCard/AddListCard';
import { UpdateButton } from '@/components/UpdateButton/UpdateButton';

// import modules
import { ApiService } from '@/services/ApiService';
import { TokenErrorHandler } from '@/errorHandlers/TokenErrorHandler';
import { ResponseErrorHandler } from '@/errorHandlers/ResponseErrorHandler';
import './Dashboard.css';

// import types
import { 
  type ListApi, 
  type ItemApi, 
  type ListsData, 
  type ItemsData, 
  type MethodApi 
} from './Dashboard.data';

const getAllRegistersApi = async <TData,>(
  token: string | null, 
  endpoint: string, 
  method: MethodApi
): Promise<TData | undefined> => {
  try {
    TokenErrorHandler.verifyToken(token);

    const apiService = new ApiService(endpoint, token as string);
    const response = await apiService.fetchApi<null>(method);
    const data: TData = await response.json();
    
    ResponseErrorHandler.verifyHTTPResponse(response, data);
    return data;
  } catch(err) {
    console.error(err);
  }
}

const handleUpdate = (): void => {
  console.log('handle update activate...');
}

export const Dashboard = () => {

  const [listArr, setLists] = useState<ListApi[]>([]);
  const [itemArr, setItems] = useState<ItemApi[]>([]);

  const token = localStorage.getItem('token');

  const getAllApi = async (): Promise<void> => {
    const listsData = await getAllRegistersApi<ListsData>(
      token,
      'http://localhost:3000/lists',
      'GET'
    );
    const itemsData = await getAllRegistersApi<ItemsData>(
      token,
      'http://localhost:3000/lists/items',
      'GET'
    );

    if(listsData) setLists(listsData.lists);
    if(itemsData) setItems(itemsData.items);
  }
  
  useEffect((): void => {

    getAllApi();
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
      
      <li><AddListCard /></li>

      <li><UpdateButton onUpdate={handleUpdate} /></li>
    </ul>
    </main>
  );
}