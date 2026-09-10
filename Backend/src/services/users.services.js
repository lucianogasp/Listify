import bcrypt from 'bcrypt';
import { getUserByEmailRepository } from "#repositories/users.repositories.js";
import { userRegisterRepository } from "#repositories/users.repositories.js";

export const userRegisterService = async (newUser) => {
  const {email, password} = newUser;
  const userByEmail = await getUserByEmailRepository(email);
  if(userByEmail) throw new Error(`User with email ${email} already exists!`);
  
  const hash = await bcrypt.hash(password, 10);
  const userRegistered = await userRegisterRepository(email, hash);
  return userRegistered;
}