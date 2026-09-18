import listsRepository from "#repositories/lists.repositories.js";

export class ListQuery {

  async asyncGetListById(list_id, userId) {
    return await listsRepository.getListById(list_id, userId);
  }
}