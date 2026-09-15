import { expect, jest } from "@jest/globals";

describe('listsService.getListsByUserId', () => {

  jest.unstable_mockModule(
    '#repositories/lists.repositories.js',
    () => {
      return {
        default: {
          getListsByUserId: jest.fn()
        }
      }
    }
  );


  it('should return an array of lists from repository', async () => {

    // Arrangement
    const userId = 1;
    const times = 1;

    const { default: listsRepository } = await import('#repositories/lists.repositories.js');
    listsRepository.getListsByUserId.mockResolvedValue([
      {id: 1, user_id: 1, name: "compras", description: "lista de compras"},
      {id: 2, user_id: 1, name: "trabalho", description: "lista de pendências"}
    ]);
    const { default: listsService } = await import('#services/lists.services.js');
    
    // Act
    const result = await listsService.getListsByUserId(userId);

    // Assertion
    expect(listsRepository.getListsByUserId).toHaveBeenCalled();
    expect(listsRepository.getListsByUserId).toHaveBeenCalledWith(userId);
    expect(listsRepository.getListsByUserId).toHaveBeenCalledTimes(times);

    expect(result).toEqual([
      {id: 1, user_id: 1, name: "compras", description: "lista de compras"},
      {id: 2, user_id: 1, name: "trabalho", description: "lista de pendências"}
    ]);
  });

  it('should return an empty array from repository if query does not match any userId', async () => {

    // Arrengement
    const userId = 999;
    const times = 1;

    const { default: listsRepository } = await import('#repositories/lists.repositories.js');
    listsRepository.getListsByUserId.mockResolvedValue([]);
    const { default: listsService } = await import('#services/lists.services.js');

    // Act
    const result = await listsService.getListsByUserId(userId);

    // Assertion
    expect(listsRepository.getListsByUserId).toHaveBeenCalled();
    expect(listsRepository.getListsByUserId).toHaveBeenCalledWith(userId);
    expect(listsRepository.getListsByUserId).toHaveBeenCalledTimes(times);

    expect(result).toEqual([]);
  });
});