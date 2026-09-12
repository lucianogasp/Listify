import { getItemsByUserIdRepository, createItemRepository } from "#repositories/items.repositories.js";

export const getItemsByUserIdService = async (userId) => {
  const userItems = await getItemsByUserIdRepository(userId);
  return userItems;
}

export const createItemService = async (newItem) => {
  const item_id = await createItemRepository(newItem);
  return item_id;
}