import { useState, useEffect } from 'react';

// import components
import { ListCard } from '@/components/ListCard/ListCard';
import { AddListCard } from '@/components/AddListCard/AddListCard';
import './Dashboard.css';

// import modules
import { ApiService } from '@/services/ApiService';
import { TokenErrorHandler } from '@/errorHandlers/TokenErrorHandler';
import { ResponseErrorHandler } from '@/errorHandlers/ResponseErrorHandler';

// import types
import { 
  type ListApi, 
  type ItemApi, 
  type ListsData, 
  type ItemsData, 
  type MethodApi 
} from './Dashboard.data';

const token = localStorage.getItem('token');
console.log(token);

const getAllRegistersApi = async <TData,>(
  token: string | null, 
  url: string, 
  method: MethodApi
): Promise<TData | undefined> => {
  try {
    TokenErrorHandler.verifyToken(token);
    const apiService = new ApiService(url, token as string);
    const response = await apiService.fetchApi<undefined>(method);

    ResponseErrorHandler.responseIsOk(response);
    const data: TData = await response.json();
    return data;
  } catch(err) {
    console.error(err);
  }
}

export const Dashboard = () => {

  const [listArr, setLists] = useState<ListApi[]>([]);
  const [itemArr, setItems] = useState<ItemApi[]>([]);

  useEffect((): void => {
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

    getAllApi();
  }, []);
  
  console.log(listArr);
  console.log(itemArr);
  return (
    <main className='dashboard-main-container'>
      {listArr.length > 0 && listArr.map((list) => (
        itemArr
          .filter((item) => {
            return item.list_id === list.id
          })
          .map((item) => {
            return <ListCard key={item.id} list={list} item={item}/>
        })
      ))}
      <AddListCard />
    </main>
  );
}