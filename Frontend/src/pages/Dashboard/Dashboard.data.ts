interface ListApi {
  id: number;
  user_id: number;
  name: string;
  description: string;
}
interface ItemApi {
  id: number;
  list_id: number;
  title: string;
  is_prioritized: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface ListsData {
  lists: ListApi[]
}
export interface ItemsData {
  items: ItemApi[]
}
export type MethodApi = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
