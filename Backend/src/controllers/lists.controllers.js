import { getListsByUserService } from "#services/lists.services.js";

export const getListsByUserController = async (req, res) => {
  const userId = req.userId; // implementar userId em payload durante jwt midd auth
  try {
    const userLists = await getListsByUserService(userId);
    return res.status(200).json({lists: userLists});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}