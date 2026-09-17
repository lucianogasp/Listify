import { describe, expect, jest } from "@jest/globals";

const mockAsyncGetItemById = {
  asyncGetItemById: jest.fn()
}
const mockAsyncGetListById = {
  asyncGetListById: jest.fn()
}

jest.unstable_mockModule(
  '#repositories/items.repositories.js',
  () => {
    return {
      default: {
        getItemsByUserId: jest.fn(),
        createItem: jest.fn(),
        deleteItem: jest.fn()
      }
    }
  }
);
jest.unstable_mockModule(
  '#services/ItemQuery.js',
  () => ({
    ItemQuery: jest.fn().mockImplementation(() => {
      return mockAsyncGetItemById;
    })
  })
);
jest.unstable_mockModule(
  '#services/ListQuery.js',
  () => ({
    ListQuery: jest.fn().mockImplementation(() => {
      return mockAsyncGetListById;
    })
  })
);

describe('Testing itemsService.getItemsByUserId', () => {

  it('should return an array of items from repository', async () => {

    // Arrangement
    const userId = 1;
    const mockTimes = 1;

    const {default: itemsRepository} = await import('#repositories/items.repositories.js');
    itemsRepository.getItemsByUserId.mockResolvedValue([
      { id: 1, list_id: 1, title: "title test", is_prioritized: "prioritized test", status: "status test" },
      { id: 2, list_id: 1, title: "title test 2", is_prioritized: "prioritized test 2", status: "status test 2" }
    ]);
    const {default: itemsService} = await import('#services/items.service.js');

    // Act
    const result = await itemsService.getItemsByUserId(userId);

    // Assertion
    expect(itemsRepository.getItemsByUserId).toHaveBeenCalled();
    expect(itemsRepository.getItemsByUserId).toHaveBeenCalledWith(userId);
    expect(itemsRepository.getItemsByUserId).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual([
      { id: 1, list_id: 1, title: "title test", is_prioritized: "prioritized test", status: "status test" },
      { id: 2, list_id: 1, title: "title test 2", is_prioritized: "prioritized test 2", status: "status test 2" }
    ]);
  });

  it('should return an empty array of items from repository if query does not match any userId', async () => {
    
    // Arrangement
    const userId = 999;
    const mockTimes = 1;

    const {default: itemsRepository} = await import('#repositories/items.repositories.js');
    itemsRepository.getItemsByUserId.mockResolvedValue([]);
    const {default: itemsService} = await import('#services/items.service.js');

    // Act
    const result = await itemsService.getItemsByUserId(userId);

    // Assertion
    expect(itemsRepository.getItemsByUserId).toHaveBeenCalled();
    expect(itemsRepository.getItemsByUserId).toHaveBeenCalledWith(userId);
    expect(itemsRepository.getItemsByUserId).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual([]);
  });
});

describe('Testing itemsService.createItem', () => {

  it('should return an object containing a success message and id of a created item', async () => {

    // Arrangement
    const newItem = {
      title: "myTitle item",
      is_prioritized: "prioridade",
      status: "status"
    }
    const mockTimes = 1;

    const {default: itemsRepository} = await import('#repositories/items.repositories.js');
    itemsRepository.createItem.mockResolvedValue(
      { message: "item created successfully", id: 1 }
    );
    const {default: itemsService} = await import('#services/items.service.js');

    // Act
    const result = await itemsService.createItem(newItem);

    // Assertion
    expect(itemsRepository.createItem).toHaveBeenCalled();
    expect(itemsRepository.createItem).toHaveBeenCalledWith(newItem);
    expect(itemsRepository.createItem).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual(
      { message: "item created successfully", id: 1 }
    );
  });
});

describe('Testing itemsService.deleteItem', () => {

  it('should return an object containing the item deleted form repository', async () => {

    // Arrangemet
    const item_id = 1;
    const list_id = 1;
    const userId = 1;
    const mockTimes = 1;

    mockAsyncGetListById.asyncGetListById.mockResolvedValue({
      id: 1, 
      user_id: 1, 
      name: "compras", 
      description: "lista de compras" 
    });
    mockAsyncGetItemById.asyncGetItemById.mockResolvedValue({
      id: 1,
      list_id: 1,
      title: "pão",
      is_prioritized: "prioridade",
      status: "status"
    });
    const {default: itemsRepository} = await import('#repositories/items.repositories.js');
    itemsRepository.deleteItem.mockResolvedValue({message: 'item deleted successfully!'});
    const {default: itemsServices} = await import('#services/items.service.js');

    // Act
    const result = await itemsServices.deleteItem(item_id, list_id, userId);

    // Assertion
    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalled();
    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalledWith(list_id);
    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalledTimes(mockTimes);

    expect(mockAsyncGetItemById.asyncGetItemById).toHaveBeenCalled();
    expect(mockAsyncGetItemById.asyncGetItemById).toHaveBeenCalledWith(item_id);
    expect(mockAsyncGetItemById.asyncGetItemById).toHaveBeenCalledTimes(mockTimes);
    
    expect(itemsRepository.deleteItem).toHaveBeenCalled();
    expect(itemsRepository.deleteItem).toHaveBeenCalledWith(item_id, list_id, userId);
    expect(itemsRepository.deleteItem).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual({
      message: "item deleted successfully!",
      id: 1,
      list_id: 1,
      title: "pão",
      is_prioritized: "prioridade",
      status: "status"
    });
  });

  it('should throw an Error with an object alert message if getListById return undefined', async () => {

    // Arrangement
    const list_id = 999;
    const mockTimes = 1;

    mockAsyncGetListById.asyncGetListById.mockResolvedValue(undefined);
    const {default: itemsService} = await import('#services/items.service.js');
    
    // Act
    const result = itemsService.deleteItem;

    // Assertion
    await expect(result(null, list_id, null)).rejects.toThrow('list associated with the item does not exists to be deleted!');

    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalled();
    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalledWith(list_id);
    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalledTimes(mockTimes);
  });
  it('should throw an Error with an object alert message if getItemById return undefined', async () => {

    // Arrangement
    const item_id = 999;
    const list_id = 1;
    const mockTimes = 1;

    mockAsyncGetListById.asyncGetListById.mockResolvedValue({
      id: 1, 
      user_id: 1, 
      name: "compras", 
      description: "lista de compras" 
    });
    mockAsyncGetItemById.asyncGetItemById.mockResolvedValue(undefined);
    const {default: itemsService} = await import("#services/items.service.js");

    // Act
    const result = itemsService.deleteItem;

    // Assertion
    await expect(result(item_id, list_id, null)).rejects.toThrow('item does not exists to be deleted!');

    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalled();
    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalledWith(list_id);
    expect(mockAsyncGetListById.asyncGetListById).toHaveBeenCalledTimes(mockTimes);
    expect(mockAsyncGetItemById.asyncGetItemById).toHaveBeenCalled();
    expect(mockAsyncGetItemById.asyncGetItemById).toHaveBeenCalledWith(item_id);
    expect(mockAsyncGetItemById.asyncGetItemById).toHaveBeenCalledTimes(mockTimes);
  });
});