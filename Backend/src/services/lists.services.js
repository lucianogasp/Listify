import { getListsByUserIdRepository } from '#repositories/lists.repositories.js';

export const getListsByUserIdService = async (userId) => {
  const userLists = await getListsByUserIdRepository(userId);
  return userLists;
}