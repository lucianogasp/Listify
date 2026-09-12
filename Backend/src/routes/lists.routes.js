import { Router } from 'express';
import { getListsByUserIdController } from '#controllers/lists.controllers.js';

const router = Router();

// SELECT * FROM lists associated to an user_id
router.get('/lists', getListsByUserIdController);

export default router;