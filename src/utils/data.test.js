/* eslint-disable no-console */
import dataServices from './data.js';
import fs from 'node:fs/promises';

const {
  dataUrl,
  getData,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  userLogin,
  getBalance,
  updateBalance,
  getTransactions,
  addTransaction,
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} = dataServices();

jest.mock('node:fs/promises');

const mockData = {
  users: [
    { uid: 1, email: 'user1@test.com', password: 'password123' },
    { uid: 2, email: 'user2@test.com', password: 'password456' },
  ],
};

beforeEach(() => {
  fs.readFile.mockReset();
});

beforeEach(() => {
  fs.writeFile.mockReset();
});

describe('dataServices', () => {
  it('should be a function', () => {
    expect(typeof dataServices).toBe('function');
  });
});

describe('dataUrl', () => {
  it('should be a string', () => {
    expect(typeof dataUrl).toBe('string');
  });
});

describe('getData', () => {
  it('should be a function', () => {
    expect(typeof getData).toBe('function');
  });
  it('should return parsed data from file', async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));
    const result = await getData();
    expect(result).toEqual(mockData);
  });
  it('should handle errors when reading file', async () => {
    fs.readFile.mockRejectedValue(new Error('File read error'));
    await expect(getData()).rejects.toThrow('File read error');
  });
});

describe('getUsers', () => {
  it('should be a function', () => {
    expect(typeof getUsers).toBe('function');
  });
  it('should return users from data', () => {
    const result = getUsers(mockData);
    expect(result).toEqual(mockData.users);
  });
});

describe('getUserById', () => {
  it('should be a function', () => {
    expect(typeof getUserById).toBe('function');
  });
  it('should return user by id', () => {
    const result = getUserById(mockData, 1);
    expect(result).toEqual(mockData.users[0]);
  });

  it('should throw error for invalid arguments', () => {
    expect(() => getUserById()).toThrow('Wrong argument types');
  });

  it('should throw error if user not found', () => {
    expect(() => getUserById(mockData, 3)).toThrow('Unable to find user');
  });
});

describe('getUserByEmail', () => {
  it('should be a function', () => {
    expect(typeof getUserByEmail).toBe('function');
  });
  it('should return user by email', () => {
    const result = getUserByEmail(mockData, 'user1@test.com');
    expect(result).toEqual(mockData.users[0]);
  });

  it('should throw error for invalid arguments', () => {
    expect(() => getUserByEmail()).toThrow('Wrong argument types');
  });

  it('should throw error if user not found', () => {
    expect(() => getUserByEmail(mockData, 'nonexistent@test.com')).toThrow(
      'Unable to find user'
    );
  });
});

describe('createUser', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });
  it('should create a new user', async () => {
    const newUser = await createUser(
      mockData,
      'Juan',
      'Perez',
      'juan@test.com',
      'password123'
    );
    expect(newUser).toHaveProperty('uid');
    expect(newUser.name).toBe('Juan');
    expect(newUser.lastname).toBe('Perez');
    expect(newUser.email).toBe('juan@test.com');
    expect(newUser.password).toBe('password123');
    expect(newUser.role).toBe('user');
    expect(newUser.balance).toBe(0);
    expect(newUser.transactions).toEqual([]);
    expect(newUser.contacts).toEqual([]);
  });

  it('should throw an error for missing arguments', async () => {
    await expect(createUser()).rejects.toThrow('Missing arguments');
  });

  it('should throw an error for invalid argument types', async () => {
    await expect(
      createUser(mockData, 'Juan', 'Perez', 'juan@test.com', 123456)
    ).rejects.toThrow('Wrong argument types');
  });
});

describe('updateUser', () => {
  it('should be a function', () => {
    expect(typeof updateUser).toBe('function');
  });
  it('should update an existing user', async () => {
    mockData.users.push({
      uid: 4,
      name: 'Pepito',
      lastname: 'Palotes',
      email: 'pepito@test.com',
      password: 'password123',
    });
    const updatedUser = await updateUser(
      mockData,
      4,
      'Pepito',
      'Palotes',
      'newpassword456'
    );
    expect(updatedUser).toHaveProperty('uid', 4);
    expect(updatedUser.name).toBe('Pepito');
    expect(updatedUser.lastname).toBe('Palotes');
    expect(updatedUser.email).toBe('pepito@test.com');
    expect(updatedUser.password).toBe('newpassword456');
  });
  it('should throw an error for invalid argument types', async () => {
    await expect(
      updateUser(mockData, 'Juan', 'Perez', 'juan@test.com', 123456)
    ).rejects.toThrow('Id of type number is required');
  });
});

describe('userLogin', () => {
  it('should be a function', () => {
    expect(typeof userLogin).toBe('function');
  });
  it('should login a user with correct credentials', async () => {
    const loggedInUser = await userLogin(
      mockData,
      'user1@test.com',
      'password123'
    );
    expect(loggedInUser).toEqual({
      uid: 1,
      email: 'user1@test.com',
      password: 'password123',
    });
  });

  it('should throw an error for incorrect credentials', async () => {
    await expect(
      userLogin(mockData, 'user1@test.com', 'wrongpassword')
    ).rejects.toThrow('Wrong credentials');
  });

  it('should throw an error for wrong argument types', async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));
    await expect(userLogin(mockData, null, 'password123')).rejects.toThrow(
      'Wrong argument types'
    );
    await expect(userLogin(mockData, 'user@example.com', null)).rejects.toThrow(
      'Wrong argument types'
    );
    await expect(userLogin(mockData, 123, 'password123')).rejects.toThrow(
      'Wrong argument types'
    );
    await expect(userLogin(mockData, 'user@example.com', 123)).rejects.toThrow(
      'Wrong argument types'
    );
  });

  it('should throw an error if data is missing', async () => {
    await expect(
      userLogin(null, 'user@example.com', 'password123')
    ).rejects.toThrow('Wrong argument types');
  });
});

describe('getBalance', () => {
  it('should be a function', () => {
    expect(typeof getBalance).toBe('function');
  });
});

describe('updateBalance', () => {
  it('should be a function', () => {
    expect(typeof updateBalance).toBe('function');
  });
});

describe('getTransactions', () => {
  it('should be a function', () => {
    expect(typeof getTransactions).toBe('function');
  });
});

describe('addTransaction', () => {
  it('should be a function', () => {
    expect(typeof addTransaction).toBe('function');
  });
});

describe('getContacts', () => {
  it('should be a function', () => {
    expect(typeof getContacts).toBe('function');
  });
});

describe('getContactById', () => {
  it('should be a function', () => {
    expect(typeof getContactById).toBe('function');
  });
});

describe('addContact', () => {
  it('should be a function', () => {
    expect(typeof addContact).toBe('function');
  });
});

describe('updateContact', () => {
  it('should be a function', () => {
    expect(typeof updateContact).toBe('function');
  });
});

describe('deleteContact', () => {
  it('should be a function', () => {
    expect(typeof deleteContact).toBe('function');
  });
});
