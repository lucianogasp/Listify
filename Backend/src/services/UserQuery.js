import userRepository from "#repositories/users.repositories.js";

export class UserQuery {

  async asyncFindByEmail(email) {
    return await userRepository.getUserByEmail(email);
  }
}