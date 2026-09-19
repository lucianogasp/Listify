import userRepository from "#repositories/users.repositories.js";
import { AppError } from "#errors/app.error.js";
import { UserQuery } from './UserQuery.js';
import { UserEncryption } from "./UserEncryption.js";
import { AuthToken } from "./AuthToken.js";

const userQuery = new UserQuery();
const userEncryption = new UserEncryption();
const authToken = new AuthToken();

const userRegister = async (newUser) => {
  const {email, password} = newUser;
  const userByEmail = await userQuery.asyncFindByEmail(email);
  if(userByEmail) throw new AppError(409, `User with this email already exists!`);
  
  const hash = await userEncryption.asyncGenerateHash(password);
  const userRegistered = await userRepository.userRegister(email, hash);

  const token = authToken.generateJWT(userRegistered.id);
  return { token };
}

const userLogin = async (newUser) => {
  const {email, password} = newUser;
  const userByEmail = await userQuery.asyncFindByEmail(email);
  if(!userByEmail) throw new AppError(401, `Invalid Email or Password!`);

  const isHashValid = await userEncryption.asyncCompareHash(password, userByEmail.password);
  if(!isHashValid) throw new AppError(401, `Invalid Email or Password!`);
  
  const token = authToken.generateJWT(userByEmail.id);
  return { token };
}

export default {
  userRegister,
  userLogin
}