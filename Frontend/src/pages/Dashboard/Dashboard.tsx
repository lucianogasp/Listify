import { useState } from 'react';

// import components
import { ListCard } from '@/components/ListCard/ListCard';
import { AddListCard } from '@/components/AddListCard/AddListCard';
import './Dashboard.css';

// import modules
import { ApiService } from '@/services/ApiService';
import { TokenErrorHandler } from '@/errorHandlers/TokenErrorHandler';
import { ResponseErrorHandler } from '@/errorHandlers/ResponseErrorHandler';

// import types
import type { ListsData, ItemsData, MethodApi } from './Dashboard.data';

const token = localStorage.getItem('token');

const getAllRegistersApi = async <TData,>(
  token: string | null, 
  url: string, 
  method: MethodApi
): Promise<TData | undefined> => {
  try {
    TokenErrorHandler.verifyToken(token);
    const apiService = new ApiService(url, token as string);
    const response = await apiService.fetchApi(method);

    ResponseErrorHandler.responseIsOk(response);
    const data: TData = await response.json();
    return data;
  } catch(err) {
    console.error(err);
  }
}

export const Dashboard = async () => {
  const [lists, setLists] = useState(await getAllRegistersApi<ListsData>(
    token,
    'http://localhost:3000/lists',
    'GET'
  ));
  const [items, setItems] = useState(await getAllRegistersApi<ItemsData>(
    token,
    'http://localhost:3000/lists/items',
    'GET'
  ));

  return (
    <main className='dashboard-main-container'>
      <ListCard />
      <AddListCard />
    </main>
  );
}