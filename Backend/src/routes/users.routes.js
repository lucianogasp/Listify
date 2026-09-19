// import modules
import { Router } from "express";
import userController from '#controllers/users.controllers.js';

import { schemaMiddleware } from "#middlewares/schema.middleware.js";
import schemas from '#schemas/users.schema.js';

const router = Router();

// INSERT INTO users (email, password); encript password
router.post(
  '/register', 
  schemaMiddleware(schemas.UserRegisterSchema),
  userController.userRegister
);

// SELECT email, password FROM users; compare encript password and email
router.post(
  '/login', 
  schemaMiddleware(schemas.UserLoginSchema),
  userController.userLogin
);

export default router;