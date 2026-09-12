import { getItemsByUserIdRepository } from "#repositories/items.repositories.js";

export const getItemsByUserIdService = async (userId) => {
  const userItems = await getItemsByUserIdRepository(userId);
  return userItems;
}