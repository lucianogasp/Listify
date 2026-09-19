import itemsService from "#services/items.service.js";

const getItemsByUserId = async (req, res, next) => {
  const userId = req.userId || null;
  try {
    const userItems = await itemsService.getItemsByUserId(userId);
    return res.status(200).json({items: userItems});
  } catch(err) {
    next(err);
  }
}

const createItem = async (req, res, next) => {
  const userId = req.userId || null;
  const {list_id} = req.params;
  const newItem = req.body;
  try {
    const createdItem = await itemsService.createItem(list_id, userId, newItem);
    return res.status(201).json(createdItem);
  } catch(err) {
    next(err);
  }
}

const deleteItem = async (req, res, next) => {
  const userId = req.userId || null;
  const {item_id, list_id} = req.params;
  try {
    const deletedItem = await itemsService.deleteItem(item_id, list_id, userId);
    return res.status(200).json(deletedItem);
  } catch(err) {
    next(err);
  }
}
const updateItem = async (req, res, next) => {
  const userId = req.userId || null;
  const {list_id, item_id} = req.params;
  const updateFields = req.body;
  try {
    const updatedItem = await itemsService.updateItem(updateFields, item_id, list_id, userId);
    return res.status(200).json(updatedItem);
  } catch(err) {
    next(err);
  }
}

export default {
  getItemsByUserId,
  createItem,
  deleteItem,
  updateItem
}