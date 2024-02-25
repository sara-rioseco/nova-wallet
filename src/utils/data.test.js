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
    { uid: 1, email: 'user1@test.com' },
    { uid: 2, email: 'user2@test.com' },
  ],
};

beforeEach(() => {
  fs.readFile.mockReset();
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

  it('should throw error if user is not found', () => {
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

  it('should throw error if user not found', () => {
    expect(() => getUserByEmail(mockData, 'nonexistent@test.com')).toThrow(
      'Unable to find user'
    );
  });

  it('should throw error for invalid arguments', () => {
    expect(() => dataServices().getUserByEmail()).toThrow(
      'Wrong argument types'
    );
  });
});

describe('createUser', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });
});

describe('updateUser', () => {
  it('should be a function', () => {
    expect(typeof updateUser).toBe('function');
  });
});

describe('userLogin', () => {
  it('should be a function', () => {
    expect(typeof userLogin).toBe('function');
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
