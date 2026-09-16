import listsRepository from '#repositories/lists.repositories.js';

const getListsByUserId = async (userId) => {
  const userLists = await listsRepository.getListsByUserId(userId);
  return userLists;
}

const createList = async (newList) => {
  const list_id = await listsRepository.createList(newList);
  return list_id;
}

export default {
  getListsByUserId,
  createList
}