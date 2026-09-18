import itemsRepository from "#repositories/items.repositories.js";

export class ItemQuery {

  async asyncGetItemById(item_id, list_id, userId) {
    return await itemsRepository.getItemById(item_id, list_id, userId);
  }
}