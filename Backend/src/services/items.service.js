import itemsRepository from "#repositories/items.repositories.js";

const getItemsByUserId = async (userId) => {
  const userItems = await itemsRepository.getItemsByUserId(userId);
  return userItems;
}

const createItem = async (newItem) => {
  const item_id = await itemsRepository.createItem(newItem);
  return item_id;
}

export default {
  getItemsByUserId,
  createItem
}