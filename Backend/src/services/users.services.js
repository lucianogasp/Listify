// import modules
import userRepository from "#repositories/users.repositories.js";

// import classes
import { UserQuery } from './UserQuery.js';
import { UserEncryption } from "./UserEncription.js";

const userQuery = new UserQuery();
const userEncription = new UserEncryption();

export const userRegister = async (newUser) => {
  const {email, password} = newUser;
  const userByEmail = await userQuery.asyncFindByEmail(email);
  if(userByEmail) throw new Error(`User with this email already exists!`);
  
  const hash = await userEncription.asyncGenerateHash(password);
  const userRegistered = await userRepository.userRegister(email, hash);

  // Logic to create Authentication Token
  return userRegistered;
}

export const userLogin = async (newUser) => {
  const {email, password} = newUser;
  const userByEmail = await userQuery.asyncFindByEmail(email);
  if(!userByEmail) throw new Error(`Invalid Email or Password!`);

  const isHashValid = await userEncription.asyncCompareHash(password, userByEmail.password);
  if(!isHashValid) throw new Error(`Invalid Email or Password  !!!`);
  
  // Logic to create Authentication Token
  return { message: 'Login successful', ...userByEmail }
}

export default {
  userRegister,
  userLogin
}