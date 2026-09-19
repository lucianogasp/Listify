import { Router } from 'express';
import listsController from '#controllers/lists.controllers.js';

import { authMiddleware } from '#middlewares/auth.middleware.js';
import { schemaMiddleware } from '#middlewares/schema.middleware.js';
import schemas from '#schemas/lists.schema.js';

const router = Router();

router.use(authMiddleware);

// SELECT * FROM lists associated to an user_id
router.get(
  '/lists',
  listsController.getListsByUserId
);

// INSERT INTO lists new records
router.post(
  '/lists', 
  schemaMiddleware(schemas.ListPostSchema),  
  listsController.createList
);

// DELETE FROM lists WHERE id associated to an user_id
router.delete(
  '/lists/:list_id', 
  listsController.deleteList
);

// UPDATE lists ... WHERE id associated to an user_id
router.patch(
  '/lists/:list_id', 
  schemaMiddleware(schemas.ListPatchSchema),  
  listsController.updateList
);

export default router;