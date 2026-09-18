import { describe, expect, jest } from "@jest/globals";

const mockUserQuery = {
  asyncFindByEmail: jest.fn()
}
const mockUserEncryption = {
  asyncGenerateHash: jest.fn(),
  asyncCompareHash: jest.fn()
}
const mockAuthToken = {
  generateJWT: jest.fn()
}
jest.unstable_mockModule(
  '#repositories/users.repositories.js',
  () => ({
    default: {
      userRegister: jest.fn()
    }
  })
);
jest.unstable_mockModule(
  '#services/UserQuery.js',
  () => ({
    UserQuery: jest.fn().mockImplementation(() => {
      return mockUserQuery;
    })
  })
);
jest.unstable_mockModule(
  '#services/UserEncryption.js',
  () => ({
    UserEncryption: jest.fn().mockImplementation(() => {
      return mockUserEncryption;
    })
  })
);
jest.unstable_mockModule(
  '#services/AuthToken.js',
  () => ({
    AuthToken: jest.fn().mockImplementation(() => {
      return mockAuthToken;
    })
  })
);

describe('Testing userService.userRegister', () => {

  it('should return an object with registered user, with hash password, if findByEmail returns undefined', async () => {

    // Arrangement
    const newUser = { email: 'lucianogasp999@gmail.com', password: '123' };
    const mockTimes = 1;

    mockUserQuery.asyncFindByEmail.mockResolvedValue(undefined);
    mockUserEncryption.asyncGenerateHash.mockResolvedValue('_hash_');
    const {default: userRepository} = await import('#repositories/users.repositories.js');
    userRepository.userRegister.mockResolvedValue({
      id: 1,
      email: "lucianogasp999@gmail",
      hash: "_hash_"
    });
    mockAuthToken.generateJWT.mockReturnValue('_token_');

    const {default: userService} = await import('#services/users.services.js');

    // Act
    const result = await userService.userRegister(newUser);

    // Assertion
    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledWith(newUser.email);
    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledTimes(mockTimes);
    
    expect(mockUserEncryption.asyncGenerateHash).toHaveBeenCalledWith(newUser.password);
    expect(mockUserEncryption.asyncGenerateHash).toHaveBeenCalledTimes(mockTimes);

    expect(mockAuthToken.generateJWT).toHaveBeenCalledWith(1);
    expect(mockAuthToken.generateJWT).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual({
      token: '_token_'
    });
  });

  it('should throw an Error with an object alert message if findByEmail returns a register', async () => {

    // Arrangement
    const newUser = { email: 'lucianogasp1@gmail.com', password: '123' };
    const mockTimes = 1;

    mockUserQuery.asyncFindByEmail.mockResolvedValue(
      { message: "User with this email already exists!" }
    );
    const {default: userService} = await import('#services/users.services.js');

    // Act
    const result = userService.userRegister;

    // Assertion
    await expect(result(newUser)).rejects.toThrow("User with this email already exists!");

    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledWith(newUser.email);
    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledTimes(mockTimes);
  });
});

describe('Testing userService.userLogin', () => {

  it('should return an object with an logged-in user, with hash password, if findByEmail returns a register', async () => {

    // Arrangement
    const newUser = { email: "lucianogasp1@gmail", password: "123" };
    const mockTimes = 1;

    mockUserQuery.asyncFindByEmail.mockResolvedValue({
      id: 1,
      email: "lucianogasp1@gmail",
      password: "_hash_"
    });
    mockAuthToken.generateJWT.mockReturnValue('_token_');
    mockUserEncryption.asyncCompareHash.mockResolvedValue(true);
    const {default: userService} = await import('#services/users.services.js');

    // Act
    const result = await userService.userLogin(newUser);

    // Assertion
    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledWith(newUser.email);
    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledTimes(mockTimes);

    expect(mockUserEncryption.asyncCompareHash).toHaveBeenCalledWith(newUser.password, '_hash_');
    expect(mockUserEncryption.asyncCompareHash).toHaveBeenCalledTimes(mockTimes);

    expect(mockAuthToken.generateJWT).toHaveBeenCalledWith(1);
    expect(mockAuthToken.generateJWT).toHaveBeenCalledTimes(mockTimes);

    expect(result).toEqual({
      token: '_token_'
    });
  });

  it('should throw an Error with an object alert message if findByEmail return undefined,', async () => {

    // Arrangement
    const newUser = { email: "lucianogasp999@gmail", password: '123' };
    const mockTimes = 1;
    
    mockUserQuery.asyncFindByEmail.mockResolvedValue(undefined);
    const {default: userService} = await import('#services/users.services.js');
    
    // Act
    const result = userService.userLogin;

    // Assertion
    await expect(result(newUser)).rejects.toThrow('Invalid Email or Password!');

    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledWith(newUser.email);
    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledTimes(mockTimes);
  });

  it('should throw an Error with an object alert message if password does not match correctly the one in the database', async () => {

    // Arrangement
    const newUser = { email: "lucianogasp1@gmail.com", password: 'incorrect' };
    const mockTimes = 1;

    mockUserQuery.asyncFindByEmail.mockResolvedValue({
      id: 1,
      email: "lucianogasp1@gmail",
      password: "_hash_"
    });
    mockUserEncryption.asyncCompareHash.mockResolvedValue(false);
    const {default: userService} = await import('#services/users.services.js');

    // Act
    const result = userService.userLogin;

    // Assertion
    await expect(result(newUser)).rejects.toThrow('Invalid Email or Password!');

    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledWith(newUser.email);
    expect(mockUserQuery.asyncFindByEmail).toHaveBeenCalledTimes(mockTimes);

    expect(mockUserEncryption.asyncCompareHash).toHaveBeenCalledWith(newUser.password, "_hash_");
    expect(mockUserEncryption.asyncCompareHash).toHaveBeenCalledTimes(mockTimes);
  });
});