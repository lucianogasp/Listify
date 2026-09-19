import listsService from "#services/lists.services.js";

const getListsByUserId = async (req, res, next) => {
  const userId = req.userId || null; 
  try {
    const userLists = await listsService.getListsByUserId(userId);
    return res.status(200).json({lists: userLists});
  } catch(err) {
    next(err)
  }
}

const createList = async (req, res, next) => {
  const userId = req.userId || null;
  const newList = req.body;
  try {
    const list_id = await listsService.createList({userId, ...newList});
    return res.status(201).json(list_id);
  } catch(err) {
    next(err)
  }
}

const deleteList = async (req, res, next) => {
  const userId = req.userId || null;
  const {list_id} = req.params;
  try {
    const deletedList = await listsService.deleteList(list_id, userId);
    return res.status(200).json(deletedList);
  } catch(err) {
    next(err)
  }
}

const updateList = async (req, res, next) => {
  const userId = req.userId || null;
  const {list_id} = req.params;
  const updateFields = req.body;
  try {
    const updatedList = await listsService.updateList(updateFields, list_id, userId);
    return res.status(200).json(updatedList);
  } catch(err) {
    next(err)
  }
}

export default {
  getListsByUserId,
  createList,
  deleteList,
  updateList
}