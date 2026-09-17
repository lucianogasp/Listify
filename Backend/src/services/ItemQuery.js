import itemsRepository from "#repositories/items.repositories.js";

export class ItemQuery {

  async asyncGetItemById(item_id) {
    return await itemsRepository.getItemById(item_id);
  }
}