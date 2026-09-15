import { describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule(
  '#repositories/lists.repositories.js',
  () => {
    return {
      default: {
        getListsByUserId: jest.fn(),
        createList: jest.fn()
      }
    }
  }
);

describe('Testing listsService.getListByUserId', () => {

  it('should return an array of lists from repository', async () => {

    // Arrangement
    const userId = 1;
    const mockTimes = 1;

    const {default: listsRepository} = await import('#repositories/lists.repositories.js');
    listsRepository.getListsByUserId.mockResolvedValue([
      { id: 1, user_id: 1, name: "compras", description: "lista de compras" },
      { id: 2, user_id: 1, name: "trabalho", description: "lista de pendências" }
    ]);
    const {default: listsService} = await import('#services/lists.services.js');
    
    // Act
    const result = await listsService.getListsByUserId(userId);

    // Assertion
    expect(listsRepository.getListsByUserId).toHaveBeenCalled();
    expect(listsRepository.getListsByUserId).toHaveBeenCalledWith(userId);
    expect(listsRepository.getListsByUserId).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual([
      { id: 1, user_id: 1, name: "compras", description: "lista de compras" },
      { id: 2, user_id: 1, name: "trabalho", description: "lista de pendências" }
    ]);
  });

  it('should return an empty array from repository if query does not match any userId', async () => {

    // Arrengement
    const userId = 999;
    const mockTimes = 1;

    const {default: listsRepository} = await import('#repositories/lists.repositories.js');
    listsRepository.getListsByUserId.mockResolvedValue([]);
    const {default: listsService} = await import('#services/lists.services.js');

    // Act
    const result = await listsService.getListsByUserId(userId);

    // Assertion
    expect(listsRepository.getListsByUserId).toHaveBeenCalled();
    expect(listsRepository.getListsByUserId).toHaveBeenCalledWith(userId);
    expect(listsRepository.getListsByUserId).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual([]);
  });
});

describe('Testing listsService.createList', () => {

  it('should return an object containing a success message and id of a created list', async () => {

    // Arrangement
    const newList = { name: "Name test", description: "description test" };
    const mockTimes = 1;

    const {default: listsRepository} = await import('#repositories/lists.repositories.js');
    listsRepository.createList.mockResolvedValue(
      { message: "list created successfully", id: 4 }
    );
    const {default: listsService} = await import('#services/lists.services.js');

    // Act
    const result = await listsService.createList(newList);

    // Assertion
    expect(listsRepository.createList).toHaveBeenCalled();
    expect(listsRepository.createList).toHaveBeenCalledWith(newList);
    expect(listsRepository.createList).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual(
      { message: "list created successfully", id: 4 }
    );
  });
});