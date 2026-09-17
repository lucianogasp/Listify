import itemsRepository from "#repositories/items.repositories.js";
import { ItemQuery } from "./ItemQuery.js";
import { ListQuery } from "./ListQuery.js";

const itemQuery = new ItemQuery();
const listQuery = new ListQuery();

const getItemsByUserId = async (userId) => {
  const userItems = await itemsRepository.getItemsByUserId(userId);
  return userItems;
}

const createItem = async (newItem) => {
  const item_id = await itemsRepository.createItem(newItem);
  return item_id;
}

const deleteItem = async (item_id, list_id, userId) => {
  const list = await listQuery.asyncGetListById(list_id);
  if(!list) throw new Error('list associated with the item does not exists to be deleted!');

  const item = await itemQuery.asyncGetItemById(item_id);
  if(!item) throw new Error('item does not exists to be deleted!');

  const message = await itemsRepository.deleteItem(item_id, list_id, userId);
  return {...message, ...item};
}

export default {
  getItemsByUserId,
  createItem,
  deleteItem
}