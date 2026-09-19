import itemsRepository from "#repositories/items.repositories.js";
import { AppError } from "#errors/app.error.js";
import { ItemQuery } from "./ItemQuery.js";
import { ListQuery } from "./ListQuery.js";

const itemQuery = new ItemQuery();
const listQuery = new ListQuery();

const getItemsByUserId = async (userId) => {
  const userItems = await itemsRepository.getItemsByUserId(userId);
  return userItems;
}

const createItem = async (list_id, userId, newItem) => {
  const list = await listQuery.asyncGetListById(list_id, userId);
  if(!list) throw new AppError(404, 'list associated with the item does not exists to be created!');

  const createdItem = await itemsRepository.createItem(list_id, userId, newItem);
  return createdItem;
}

const deleteItem = async (item_id, list_id, userId) => {
  const list = await listQuery.asyncGetListById(list_id, userId);
  if(!list) throw new AppError(404, 'list associated with the item does not exists to be deleted!');

  const item = await itemQuery.asyncGetItemById(item_id, list_id, userId);
  if(!item) throw new AppError(404, 'item does not exists to be deleted!');

  const message = await itemsRepository.deleteItem(item_id, list_id, userId);
  return {...message, ...item};
}

const updateItem = async (updateFields, item_id, list_id, userId) => {
  const list = await listQuery.asyncGetListById(list_id, userId);
  if(!list) throw new AppError(404, 'list associated with the item does not exists to be updated!');

  const item = await itemQuery.asyncGetItemById(item_id, list_id, userId);
  if(!item) throw new AppError(404, 'item does not exists to be updated!');
  
  const message = await itemsRepository.updateItem(updateFields, item_id, list_id, userId);

  const updatedItem = await itemQuery.asyncGetItemById(item_id, list_id, userId);
  return {...message, ...updatedItem};
}

export default {
  getItemsByUserId,
  createItem,
  deleteItem,
  updateItem
}