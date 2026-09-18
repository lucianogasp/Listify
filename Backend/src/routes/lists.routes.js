import { Router } from 'express';
import { authMiddleware } from '#middlewares/auth.middleware.js';
import listsController from '#controllers/lists.controllers.js';

const router = Router();

// SELECT * FROM lists associated to an user_id
router.get('/lists', authMiddleware, listsController.getListsByUserId);

// INSERT INTO lists new records
router.post('/lists', listsController.createList);

// DELETE FROM lists WHERE id associated to an user_id
router.delete('/lists/:list_id', listsController.deleteList);

// UPDATE lists ... WHERE id associated to an user_id
router.patch('/lists/:list_id', listsController.updateList);

export default router;