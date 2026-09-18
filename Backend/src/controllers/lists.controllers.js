import listsService from "#services/lists.services.js";

const getListsByUserId = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  try {
    const userLists = await listsService.getListsByUserId(userId);
    return res.status(200).json({lists: userLists});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

const createList = async (req, res) => {
  const userId = req.userId || 2 // implementar userId em payload durante jwt midd auth
  const newList = req.body;
  try {
    const list_id = await listsService.createList({userId, ...newList});
    return res.status(201).json({list_id});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

const deleteList = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  const {list_id} = req.params;
  try {
    const deletedList = await listsService.deleteList(list_id, userId);
    return res.status(200).json(deletedList);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

const updateList = async (req, res) => {
  const userId = req.userId || 1; // implementar userId em payload durante jwt midd auth
  const {list_id} = req.params;
  const updateFields = req.body;
  try {
    const updatedList = await listsService.updateList(updateFields, list_id, userId);
    return res.status(200).json(updatedList);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export default {
  getListsByUserId,
  createList,
  deleteList,
  updateList
}