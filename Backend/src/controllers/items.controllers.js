import { getItemsByUserIdService, createItemService } from "#services/items.service.js";

export const getItemsByUserIdController = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  try {
    const userItems = await getItemsByUserIdService(userId);
    return res.status(200).json({items: userItems});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export const createItemController = async (req, res) => {
  const {list_id} = req.params;
  const newItem = req.body;
  try {
    const item_id = await createItemService({list_id, ...newItem});
    return res.status(201).json({item_id});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}