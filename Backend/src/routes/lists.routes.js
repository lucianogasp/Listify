import { Router } from 'express';
import { getListsByUserController } from '#controllers/lists.controllers.js';

const router = Router();

// GET /lists >> SELECT * FROM lists, items associated to a user_id
router.get('/lists', getListsByUserController);

export default router;