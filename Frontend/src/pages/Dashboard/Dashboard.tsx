import { useState, useEffect } from 'react';

// import components
import { ListCard } from '@/components/ListCard/ListCard';
import { ItemCard } from '@/components/ItemCard/ItemCard';
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

  return (
    <main className='dashboard-main-container'>
      {listArr
        .map((list) => (
          <ListCard key={list.id} name={list.name} description={list.description}>
            {itemArr
              .filter((item) => (item.list_id === list.id))
              .map((item) => (
                <ItemCard 
                  key={item.id} 
                  title={item.title} 
                  is_prioritized={item.is_prioritized} 
                  status={item.status}
                />
              ))
            }
          </ListCard>
        ))
      }
      <AddListCard />
    </main>
  );
}