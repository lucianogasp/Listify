import listsRepository from '#repositories/lists.repositories.js';
import { ListQuery } from './ListQuery.js';

const listQuery = new ListQuery();

const getListsByUserId = async (userId) => {
  const userLists = await listsRepository.getListsByUserId(userId);
  return userLists;
}

const createList = async (newList) => {
  const list_id = await listsRepository.createList(newList);
  return list_id;
}

const deleteList = async (list_id, userId) => {
  const list = await listQuery.asyncGetListById(list_id, userId);
  if(!list) throw new Error('list does not exists to be deleted!');

  const message = await listsRepository.deleteList(list_id, userId);
  return {...message, ...list};
}

const updateList = async (updateFields, list_id, userId) => {
  const list = await listQuery.asyncGetListById(list_id, userId);
  if(!list) throw new Error('list does not exists do be updated!');

  const message = await listsRepository.updateList(updateFields, list_id, userId);

  const updatedList = await listQuery.asyncGetListById(list_id, userId);
  return {...message, ...updatedList};
}

export default {
  getListsByUserId,
  createList,
  deleteList,
  updateList
}