import { useState } from 'react';

import { ListCard } from '@/components/ListCard/ListCard';
import { AddListCard } from '@/components/AddListCard/AddListCard';
import './Dashboard.css';

import { ApiService } from '@/services/ApiService';
import { TokenErrorHandler } from '@/errorHandlers/TokenErrorHandler';
import { ResponseErrorHandler } from '@/errorHandlers/ResponseErrorHandler';

import type { ListApi, ItemApi } from './Dashboard.data';

const token = localStorage.getItem('token');

interface ListsData {
  lists: ListApi[]
}
interface ItemsData {
  items: ItemApi[]
}

const getAllLists = async (): Promise<ListsData | undefined> => {
  try {
    TokenErrorHandler.verifyToken(token);

    const listsService = new ApiService(
      'http://localhost:3000/lists',
      token as string
    );
    const listsResponseApi = await listsService.fetchApi('GET');

    ResponseErrorHandler.responseIsOk(listsResponseApi);
    const listsData: ListsData = await listsResponseApi.json();

    return listsData;
  } catch(err) {
    console.error(err);
  }
}

const getAllItems = async (): Promise<ItemsData | undefined> => {
  try {
    TokenErrorHandler.verifyToken(token);

    const itemsService = new ApiService(
      'http://localhost:3000/lists/items',
      token as string
    );
    const itemsResponseApi = await itemsService.fetchApi('GET');

    ResponseErrorHandler.responseIsOk(itemsResponseApi);
    const itemsData: ItemsData = await itemsResponseApi.json();

    return itemsData;
  } catch(err) {
    console.error(err);
  }
}

export const Dashboard = async () => {
  
  const [lists, setLists] = useState(await getAllLists());
  const [items, setItems] = useState(await getAllItems());


  return (
    <main className='dashboard-main-container'>
      <ListCard />
      <AddListCard />
    </main>
  );
}