import { Router } from "express";
import itemsController from "#controllers/items.controllers.js";

const router = Router();

// SELECT items.* FROM items JOIN lists ON ... associated to an user_id
router.get('/lists/items', itemsController.getItemsByUserId);

// INSERT INTO items new records
router.post('/lists/:list_id/items', itemsController.createItem);

export default router;