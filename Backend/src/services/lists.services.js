import { getListsByUserRepository } from '#repositories/lists.repositories.js';

export const getListsByUserService = async (userId) => {
  const userLists = await getListsByUserRepository(userId);
  return userLists;
}