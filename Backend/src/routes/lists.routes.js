import { Router } from 'express';
import { getListsByUserIdController, createListController } from '#controllers/lists.controllers.js';

const router = Router();

// SELECT * FROM lists associated to an user_id
router.get('/lists', getListsByUserIdController);

// INSERT INTO lists new records
router.post('/lists', createListController);

export default router;