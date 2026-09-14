import listsRepository from '#repositories/lists.repositories.js';

export const getListsByUserId = async (userId) => {
  const userLists = await listsRepository.getListsByUserId(userId);
  return userLists;
}

export const createList = async (newList) => {
  const list_id = await listsRepository.createList(newList);
  return list_id;
}

export default {
  getListsByUserId,
  createList
}