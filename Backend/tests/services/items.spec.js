import { describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule(
  '#repositories/items.repositories.js',
  () => {
    return {
      default: {
        getItemsByUserId: jest.fn(),
        createItem: jest.fn()
      }
    }
  }
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