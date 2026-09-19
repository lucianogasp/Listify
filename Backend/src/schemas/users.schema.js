import { z } from 'zod';

const UserRegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(7)
});

const UserLoginSchema = UserRegisterSchema;

export default {
  UserRegisterSchema,
  UserLoginSchema
};