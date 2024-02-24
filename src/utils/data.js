import * as fs from 'node:fs/promises';
import { User, Transaction, Contact } from '../models/models.js';

export default function dataServices() {
  const dataUrl = new URL('../db/db.json', import.meta.url);

  // OK
  const getData = async function () {
    try {
      const data = await fs.readFile(dataUrl, { encoding: 'utf8' });
      return JSON.parse(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // OK
  const getUsers = data => data.users;

  // OK
  const getUserById = (data, uid) => {
    try {
      if (!data || !uid || typeof uid !== 'number') {
        throw new Error('Wrong argument types');
      }
      return data.users.filter(user => user.uid === uid)[0];
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const createUser = async function (name, lastname, email, password) {
    console.log('Creating user', name, lastname, email, password);
  };

  const updateUser = async function (id, name, lastname, password) {
    const prevData = await getData();
    const user = getUserById(prevData, id);
    const updatedUser = new User(
      id,
      name,
      lastname,
      user.email,
      password,
      user.role,
      user.balance,
      user.transactions,
      user.contacts
    );
    console.log(updatedUser);
  };

  // OK
  const getUserByEmail = async function (users, email) {
    try {
      if (!users || !email || typeof email !== 'string') {
        throw new Error('Wrong argument types');
      }
      return users.filter(user => user.email === email)[0] || null;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  //OK
  const getBalance = user => user.balance;

  const updateBalance = (user, transaction) => {};

  //OK
  const getTransactions = user => user.transactions;

  const addTransaction = (user, transaction) => {};

  //OK
  const getContacts = user => user.contacts;

  const updateContact = async (uid, contactId, options) => {
    // const contact = getContacts(uid).filter(
    //   contact => contact.id === contactId
    // );
    console.log(contactId, options);
    try {
      const data = await fs.readFile(filePath, { encoding: 'utf8' });
      console.log('data heeeeere', JSON.parse(data).users[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (uid, contactId) => {};

  return {
    dataUrl,
    getData,
    getUsers,
    createUser,
    updateUser,
    getUserById,
    getUserByEmail,
    getBalance,
    getTransactions,
    getContacts,
    updateContact,
  };
}

const {
  getData,
  updateUser,
  dataUrl,
  getUsers,
  getUserById,
  getBalance,
  getTransactions,
} = dataServices();

// getBalance(getUserById(getUsers(await getData(dataUrl)), 1));

updateUser(1, 'Sara', 'Romero', '123456');
