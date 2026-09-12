import { getListsByUserIdRepository, createListRepository } from '#repositories/lists.repositories.js';

export const getListsByUserIdService = async (userId) => {
  const userLists = await getListsByUserIdRepository(userId);
  return userLists;
}

export const createListService = async (newList) => {
  const list_id = await createListRepository(newList);
  return list_id;
}