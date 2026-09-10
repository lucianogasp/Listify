import { Router } from "express";
import { userLoginController, userRegisterController } from '#controllers/users.controllers.js';

const router = Router();

// POST /register >> INSERT INTO users (email, password); encript password
router.post('/register', userRegisterController);

// POST /login >> SELECT email, password FROM users; compare encript password and email
router.post('/login', userLoginController);

export default router;