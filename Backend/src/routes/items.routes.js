import { Router } from "express";
import { getItemsByUserIdController } from "#controllers/items.controllers.js";

const router = Router();

// SELECT items.* FROM items JOIN lists ON ... associated to an user_id
router.get('/items', getItemsByUserIdController);

export default router;