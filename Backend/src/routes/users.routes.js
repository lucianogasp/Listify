// import modules
import { Router } from "express";
import userController from '#controllers/users.controllers.js';

const router = Router();

// INSERT INTO users (email, password); encript password
router.post('/register', userController.userRegister);

// SELECT email, password FROM users; compare encript password and email
router.post('/login', userController.userLogin);

export default router;