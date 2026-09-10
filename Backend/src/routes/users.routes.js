import { Router } from "express";
import { userRegisterController } from '#controllers/users.controllers.js';

const router = Router();

// POST /register >> INSERT INTO users (email, password); incript password
router.post('/register', userRegisterController);

// POST /login >> SELECT email, password FROM users; compare incript password and email
// router.post('/login');

export default router;