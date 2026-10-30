import { useState, useEffect } from 'react';

// import components
import { ListCard } from '@/components/ListCard/ListCard';
import { AddingNewList } from '@/components/AddingNewList/AddingNewList';
import { AddNewList } from '@/components/AddNewList/AddNewList';
import { PostListButton } from '@/components/PostListButton/PostListButton';

// import modules
import { ApiService } from '@/services/ApiService';
import { ApiHandler } from '@/services/ApiHandler';
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

export const Dashboard = () => {

  const [listArr, setListArr] = useState<ListApi[]>([]);
  const [itemArr, setItemArr] = useState<ItemApi[]>([]);
  const [isAddingNewList, setIsAddingNewList] = useState<boolean>(false);

  const updateArr = (listsData: ListsData, itemsData: ItemsData): void => {
    if(listsData) setListArr(listsData.lists);
    if(itemsData) setItemArr(itemsData.items);
  };

  const getAllLists = async <TData,>(): Promise<TData| undefined>  => {
    const token = localStorage.getItem('token') ?? undefined;
    try {
      const listsApiService = ApiHandler.createInstance(
        'http://localhost:3000/lists',
        token
      );
      const data = await ApiHandler.request<TData>(
        listsApiService,
        'GET'
      );
      return data;
    } catch(err) {
      console.error(err);
    }
  };
  const getAllItems = async <TData,>(): Promise<TData| undefined>  => {
    const token = localStorage.getItem('token') ?? undefined;
    try {
      const itemsApiService = ApiHandler.createInstance(
        'http://localhost:3000/lists/items',
        token
      );
      const data = await ApiHandler.request<TData>(
        itemsApiService,
        'GET'
      );
      return data;
    } catch(err) {
      console.error(err);
    }
  };

  const handlePostList = (): void => {
    if(isAddingNewList) {      
      console.log('handle post list activate...');
    }

    setIsAddingNewList(false);
  };
  
  useEffect((): void => {

    (async (): Promise<void> => {
      const listsData = await getAllLists<ListsData>();
      const itmesData = await getAllItems<ItemsData>();
      updateArr(listsData, itmesData);
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
        {isAddingNewList ? (<AddingNewList />) : (<AddNewList createNewList={() => setIsAddingNewList(true)} />)}
      </li>

      <li>
        <PostListButton onPost={handlePostList} />
      </li>
    </ul>
    </main>
  );
}