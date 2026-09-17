import { Router } from 'express';
import listsController from '#controllers/lists.controllers.js';

const router = Router();

// SELECT * FROM lists associated to an user_id
router.get('/lists', listsController.getListsByUserId);

// INSERT INTO lists new records
router.post('/lists', listsController.createList);

// DELETE lists associaed to an user_id
router.delete('/lists/:list_id', listsController.deleteList);

export default router;