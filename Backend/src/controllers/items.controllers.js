import itemsService from "#services/items.service.js";

const getItemsByUserId = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  try {
    const userItems = await itemsService.getItemsByUserId(userId);
    return res.status(200).json({items: userItems});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

const createItem = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  const {list_id} = req.params;
  const newItem = req.body;
  try {
    const item_id = await itemsService.createItem(list_id, userId, newItem);
    return res.status(201).json({item_id});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

const deleteItem = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  const {item_id, list_id} = req.params;
  try {
    const deletedItem = await itemsService.deleteItem(item_id, list_id, userId);
    return res.status(200).json(deletedItem);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}
const updateItem = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  const {list_id, item_id} = req.params;
  const updateFields = req.body;
  try {
    const updatedItem = await itemsService.updateItem(updateFields, item_id, list_id, userId);
    return res.status(200).json(updatedItem);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export default {
  getItemsByUserId,
  createItem,
  deleteItem,
  updateItem
}