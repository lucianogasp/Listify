export interface ListApi {
  id: number;
  user_id: number;
  name: string;
  description: string;
}

export interface ItemApi {
  id: number;
  list_id: number;
  title: string;
  is_prioritized: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export type ListsData = {
  lists: ListApi[]
} | undefined;

export type ItemsData = {
  items: ItemApi[]
} | undefined;

export type MethodApi = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';