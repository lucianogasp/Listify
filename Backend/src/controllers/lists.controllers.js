import { getListsByUserIdService, createListService } from "#services/lists.services.js";

export const getListsByUserIdController = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  try {
    const userLists = await getListsByUserIdService(userId);
    return res.status(200).json({lists: userLists});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export const createListController = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  const newList = req.body;
  try {
    const list_id = await createListService({userId, ...newList});
    return res.status(201).json({list_id});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}