import { Router } from "express";
import { getItemsByUserIdController, createItemController } from "#controllers/items.controllers.js";

const router = Router();

// SELECT items.* FROM items JOIN lists ON ... associated to an user_id
router.get('/lists/items', getItemsByUserIdController);

// INSERT INTO items new records
router.post('/lists/:list_id/items', createItemController);

export default router;