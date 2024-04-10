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
  getContactByName,
  addContact,
  updateContact,
  deleteContact,
} = dataServices();

jest.mock('node:fs/promises');

const mockData = {
  users: [
    {
      id: 1,
      email: 'user1@test.com',
      password: '$2a$11$ztL8TxXjkGMTuzsh.p9YJ.2BsDpZeuX7xlCZUuYAXv0z7sUaWTRzW',
      balance: 100,
      contacts: [],
    },
    {
      id: 2,
      email: 'user2@test.com',
      password: '$2a$11$rvXvYuy9MMFoq8gu7JgdMOevuawfSQiI0VqSnU9VnyRHnkvNfyTJe',
      balance: 200,
      contacts: [
        {
          id: 1,
          name: 'Juanito',
          lastname: 'Gonzalez',
          email: 'juanito@test.com',
        },
      ],
    },
  ],
};

beforeEach(() => {
  fs.readFile.mockReset();
});

beforeEach(() => {
  fs.writeFile.mockReset();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe('dataServices', () => {
  describe('dataUrl', () => {
    it('should be a string', () => {
      expect(typeof dataUrl).toBe('string');
    });
  });

  describe('getData', () => {
    it('should return parsed data from file', async () => {
      fs.readFile.mockResolvedValue(JSON.stringify(mockData));
      const result = await getData();
      expect(result).toEqual(mockData);
    });
    it('should handle errors when reading file', async () => {
      fs.readFile.mockRejectedValue(new Error('File read error'));
      fetch.mockRejectedValue(new Error('File read error'));
      await expect(getData()).rejects.toThrow('File read error');
    });
  });

  describe('getUsers', () => {
    it('should return users from data', () => {
      const result = getUsers(mockData);
      expect(result).toEqual(mockData.users);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', () => {
      const result = getUserById(mockData.users, 1);
      expect(result).toEqual(mockData.users[0]);
    });

    it('should throw error for invalid arguments', () => {
      expect(() => getUserById()).toThrow('Wrong argument types');
    });

    it('should throw error if user not found', () => {
      expect(() => getUserById(mockData.users, 3)).toThrow(
        'Unable to find user'
      );
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', () => {
      const result = getUserByEmail(mockData.users, 'user1@test.com');
      expect(result).toEqual(mockData.users[0]);
    });

    it('should throw error for invalid arguments', () => {
      expect(() => getUserByEmail()).toThrow('Wrong argument types');
    });

    it('should throw error if user not found', () => {
      expect(() =>
        getUserByEmail(mockData.users, 'nonexistent@test.com')
      ).toThrow('Unable to find user');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = await createUser(
        mockData,
        'Juan',
        'Perez',
        'juan@test.com',
        'password123'
      );
      expect(newUser).toHaveProperty('id');
      expect(newUser.name).toBe('Juan');
      expect(newUser.lastname).toBe('Perez');
      expect(newUser.email).toBe('juan@test.com');
      expect(newUser.password).toBe('password123');
      expect(newUser.role).toBe('user');
      expect(newUser.balance).toBe(0);
      expect(newUser.transactions).toEqual([]);
      expect(newUser.contacts).toEqual([]);
    });
    it('should spread error if fs.writeFile is rejected', async () => {
      fs.writeFile.mockRejectedValue('Error');
      await expect(
        createUser(
          mockData,
          'Fulanita',
          'Rodriguez',
          'fulanita@mail.com',
          'test-password'
        )
      ).rejects.toThrow(new Error('Error'));
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
    it("should update an existing user's name", async () => {
      mockData.users.push({
        id: 7,
        name: 'Pepito',
        lastname: 'Palotes',
        email: 'pepito@test.com',
        password: 'password123',
      });
      const updatedUser = await updateUser(mockData.users, 7, {
        name: 'Juanito',
      });
      expect(updatedUser).toHaveProperty('id', 7);
      expect(updatedUser.name).toBe('Juanito');
      expect(updatedUser.lastname).toBe('Palotes');
      expect(updatedUser.email).toBe('pepito@test.com');
      expect(updatedUser.password).toBe('password123');
    });
    it("should update an existing user's lastname, email and password", async () => {
      const updatedUser = await updateUser(mockData.users, 7, {
        lastname: 'Perez',
        password: 'newpassword456',
      });
      expect(updatedUser).toHaveProperty('id', 7);
      expect(updatedUser.name).toBe('Juanito');
      expect(updatedUser.lastname).toBe('Perez');
      expect(updatedUser.email).toBe('pepito@test.com');
      expect(updatedUser.password).toBe(
        '$2a$11$UaHqlvPkNBRWRwrkjHlHE.gbPyGIZ4levtrQ2o1GngGIsl9sX2K0K'
      );
    });
    it('should throw an error if user not found', async () => {
      await expect(
        updateUser(mockData.users, 25, {
          name: 'Juan',
          lastname: 'Perez',
          password: '123456',
        })
      ).rejects.toThrow('Unable to find user');
    });
    it('should spread error if fs.writeFile is rejected', async () => {
      fs.writeFile.mockRejectedValue('Error');
      await expect(
        updateUser(mockData.users, 3, 'Carla', 'Perez', 'supersecurepassword')
      ).rejects.toThrow(new Error('Error'));
    });
    it('should throw an error for invalid argument types', async () => {
      await expect(
        updateUser(mockData.users, 'Juan', 'Perez', 'juan@test.com', 123456)
      ).rejects.toThrow('Id of type number is required');
    });
  });

  describe('userLogin', () => {
    it('should login a user with correct credentials', async () => {
      const loggedInUser = await userLogin(
        mockData.users,
        'user1@test.com',
        'password123'
      );
      expect(loggedInUser).toEqual({
        id: 1,
        email: 'user1@test.com',
        password:
          '$2a$11$ztL8TxXjkGMTuzsh.p9YJ.2BsDpZeuX7xlCZUuYAXv0z7sUaWTRzW',
        balance: 100,
        contacts: [],
      });
    });

    it('should throw an error for incorrect credentials', async () => {
      await expect(
        userLogin(mockData.users, 'user1@test.com', 'wrongpassword')
      ).rejects.toThrow('Wrong credentials');
    });

    it('should throw an error for wrong argument types', async () => {
      await expect(
        userLogin(mockData.users, null, 'password123')
      ).rejects.toThrow('Wrong argument types');
      await expect(
        userLogin(mockData.users, 'user@test.com', null)
      ).rejects.toThrow('Wrong argument types');
      await expect(
        userLogin(mockData.users, 123, 'password123')
      ).rejects.toThrow('Wrong argument types');
      await expect(
        userLogin(mockData.users, 'user@test.com', 123)
      ).rejects.toThrow('Wrong argument types');
    });

    it('should throw an error if data is missing', async () => {
      await expect(
        userLogin(null, 'user@test.com', 'password123')
      ).rejects.toThrow('Wrong argument types');
    });
  });

  describe('getBalance', () => {
    it('should return balance of a user', () => {
      const user = { id: 1, balance: 100 };
      const balance = getBalance(user);
      expect(balance).toBe(100);
    });
  });

  describe('updateBalance', () => {
    it('should update balance of a user', async () => {
      fs.writeFile.mockResolvedValue();
      const updatedBalance = await updateBalance(mockData.users, 1, {
        amount: 50,
      });
      expect(updatedBalance).toBe(150);
    });
    it('should spread error if fs.writeFile is rejected', async () => {
      fs.writeFile.mockRejectedValue('Error');
      await expect(
        updateBalance(mockData.users, 1, {
          date: 'some date string',
          amount: 50,
          type: 'deposit',
        })
      ).rejects.toThrow(new Error('Error'));
    });
    it('should throw an error for missing arguments', async () => {
      await expect(updateBalance()).rejects.toThrow('Wrong argument types');
    });
    it('should throw an error for incorrect user id', async () => {
      await expect(
        updateBalance(mockData.users, 8, { amount: 50 })
      ).rejects.toThrow('Unable to find user');
    });
    it('should throw an error for non-numeric user id', async () => {
      await expect(
        updateBalance(mockData.users, 'abc', { amount: 50 })
      ).rejects.toThrow('Wrong argument types');
    });

    it('should throw an error for non-numeric transaction amount', async () => {
      await expect(
        updateBalance(mockData.users, 1, { amount: 'abc' })
      ).rejects.toThrow('Wrong argument types');
    });
  });

  describe('getTransactions', () => {
    it('should return transactions of a user', () => {
      const user = { id: 1, transactions: [] };
      const transactions = getTransactions(user);
      expect(transactions).toEqual([]);
    });
  });

  describe('addTransaction', () => {
    it('should add a transaction for a user', async () => {
      fs.writeFile.mockResolvedValue();
      const newTransaction = await addTransaction(mockData.users, 1, 50);
      expect(newTransaction).toEqual({
        date: expect.any(String),
        amount: 50,
        type: 'deposit',
      });
    });
    it('should add a transaction of type transfer with negative amount', async () => {
      fs.writeFile.mockResolvedValue();
      const newTransaction = await addTransaction(mockData.users, 1, -50);
      expect(newTransaction).toEqual({
        date: expect.any(String),
        amount: -50,
        type: 'transfer',
      });
    });
    it('should spread error if fs.writeFile is rejected', async () => {
      fs.writeFile.mockRejectedValue('Error');
      await expect(addTransaction(mockData.users, 1, 100)).rejects.toThrow(
        new Error('Error')
      );
    });
    it('should throw an error for missing arguments', async () => {
      await expect(addTransaction()).rejects.toThrow('Wrong argument types');
    });

    it('should throw an error for incorrect user id', async () => {
      await expect(addTransaction(mockData.users, 9, 50)).rejects.toThrow(
        'Unable to find user'
      );
    });

    it('should throw an error for non-numeric user id', async () => {
      await expect(addTransaction(mockData.users, 'abc', 50)).rejects.toThrow(
        'Wrong argument types'
      );
    });

    it('should throw an error for non-numeric transaction amount', async () => {
      await expect(addTransaction(mockData.users, 1, 'abc')).rejects.toThrow(
        'Wrong argument types'
      );
    });
  });

  describe('getContacts', () => {
    it('should return contacts of a user', () => {
      const user = {
        id: 1,
        contacts: [
          {
            id: 1,
            name: 'Juanito',
            lastname: 'Gonzalez',
            email: 'juanito@test.com',
          },
        ],
      };
      const contacts = getContacts(user);
      expect(contacts).toEqual([
        {
          id: 1,
          name: 'Juanito',
          lastname: 'Gonzalez',
          email: 'juanito@test.com',
        },
      ]);
    });
    it('should return empty array if no contacts', () => {
      const contacts = getContacts();
      expect(contacts).toEqual([]);
    });
  });

  describe('getContactById', () => {
    it('should return a contact by id', () => {
      const contact = getContactById(mockData.users, 2, 1);
      expect(contact).toEqual({
        id: 1,
        name: 'Juanito',
        lastname: 'Gonzalez',
        email: 'juanito@test.com',
      });
    });

    it('should throw an error for missing arguments', () => {
      expect(() => getContactById()).toThrow('Wrong argument types');
    });

    it('should throw an error for incorrect user id', () => {
      expect(() => getContactById(mockData.users, 12, 1)).toThrow(
        'Unable to find user'
      );
    });

    it('should throw an error for incorrect contact id', () => {
      expect(() => getContactById(mockData.users, 2, 2)).toThrow(
        'Unable to find contact'
      );
    });
  });

  describe('getContactByName', () => {
    it('should return a contact by name', () => {
      const contact = getContactByName(mockData.users, 2, 'Juanito');
      expect(contact).toEqual([
        {
          id: 1,
          name: 'Juanito',
          lastname: 'Gonzalez',
          email: 'juanito@test.com',
        },
      ]);
    });

    it('should throw an error for missing arguments', () => {
      expect(() => getContactByName()).toThrow('Wrong argument types');
    });

    it('should throw an error for incorrect user uid', () => {
      expect(() => getContactByName(mockData.users, 12, 'Juanito')).toThrow(
        'Unable to find user'
      );
    });

    it('should throw an error for incorrect contact name', () => {
      expect(() => getContactByName(mockData.users, 2, 'Pepito')).toThrow(
        'Unable to find contact'
      );
    });
  });

  describe('addContact', () => {
    it('should add a contact for a user', async () => {
      fs.writeFile.mockResolvedValue();
      const newContact = await addContact(mockData.users, 1, {
        name: 'Maria',
        lastname: 'Gonzalez',
        email: 'maria@test.com',
      });
      expect(newContact).toEqual({
        id: 1,
        name: 'Maria',
        lastname: 'Gonzalez',
        email: 'maria@test.com',
      });
    });
    it('should spread error if fs.writeFile is rejected', async () => {
      fs.writeFile.mockRejectedValue('Error');
      await expect(
        addContact(mockData.users, 2, { name: 'Juanito' })
      ).rejects.toThrow(new Error('Error'));
    });
    it('should throw an error for missing arguments', async () => {
      await expect(addContact()).rejects.toThrow('Wrong argument types');
    });

    it('should throw an error for incorrect user id', async () => {
      await expect(
        addContact(mockData.users, 9, {
          name: 'Maria',
          lastname: 'Gonzalez',
          email: 'maria@test.com',
        })
      ).rejects.toThrow('Unable to find user');
    });
  });

  describe('updateContact', () => {
    it('should update a contact for a user', async () => {
      fs.writeFile.mockResolvedValue();
      const updatedContact = await updateContact(mockData.users, 1, 1, {
        lastname: 'Gonzalez',
        email: 'maria@test.com',
      });
      expect(updatedContact).toEqual({
        id: 1,
        name: 'Maria',
        lastname: 'Gonzalez',
        email: 'maria@test.com',
      });
    });
    it('should spread error if fs.writeFile is rejected', async () => {
      fs.writeFile.mockRejectedValue('Error');
      await expect(
        updateContact(mockData.users, 2, 1, { name: 'Juanito' })
      ).rejects.toThrow(new Error('Error'));
    });
    it('should throw an error for missing arguments', async () => {
      await expect(updateContact()).rejects.toThrow('Wrong argument types');
    });

    it('should throw an error for incorrect user id', async () => {
      await expect(
        updateContact(mockData.users, 10, 1, {
          name: 'Maria',
          lastname: 'Gonzalez',
          email: 'maria@test.com',
        })
      ).rejects.toThrow('Unable to find user');
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact for a user', async () => {
      fs.writeFile.mockResolvedValue();
      const updatedContacts = await deleteContact(mockData.users, 1, 1);
      expect(updatedContacts).toEqual([]);
    });
    it('should spread error if fs.writeFile is rejected', async () => {
      fs.writeFile.mockRejectedValue('Error');
      await expect(deleteContact(mockData.users, 2, 1)).rejects.toThrow(
        new Error('Error')
      );
    });
    it('should throw an error for missing arguments', async () => {
      await expect(deleteContact()).rejects.toThrow('Wrong argument types');
    });

    it('should throw an error for incorrect user id', async () => {
      await expect(deleteContact(mockData.users, 10, 1)).rejects.toThrow(
        'Unable to find user'
      );
    });
  });
});
