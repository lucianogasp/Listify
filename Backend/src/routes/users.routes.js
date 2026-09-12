import { Router } from "express";
import { userLoginController, userRegisterController } from '#controllers/users.controllers.js';

const router = Router();

// INSERT INTO users (email, password); encript password
router.post('/register', userRegisterController);

// SELECT email, password FROM users; compare encript password and email
router.post('/login', userLoginController);

export default router;