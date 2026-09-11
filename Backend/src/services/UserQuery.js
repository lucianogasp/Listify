import { getUserByEmailRepository } from "#repositories/users.repositories.js";

export class UserQuery {

  async asyncFindByEmail(email) {
    return await getUserByEmailRepository(email);
  }
}