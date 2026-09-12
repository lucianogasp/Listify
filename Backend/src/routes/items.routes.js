import { Router } from "express";
import { getItemsByUserIdController, createItemController } from "#controllers/items.controllers.js";

const router = Router();

// SELECT items.* FROM items JOIN lists ON ... associated to an user_id
router.get('/items', getItemsByUserIdController);

// INSERT INTO items new records
router.post('/items', createItemController);

export default router;