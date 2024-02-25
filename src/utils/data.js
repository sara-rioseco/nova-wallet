/* eslint-disable no-console */
import * as fs from 'node:fs/promises';
// import { User, Transaction, Contact } from '../models/models.js';

export default function dataServices() {
  const dataUrl = new URL('../db/db.json', import.meta.url);

  // DATA
  const getData = async function () {
    try {
      const data = await fs.readFile(dataUrl, { encoding: 'utf8' });
      return JSON.parse(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // USERS
  const getUsers = data => data.users;

  const getUserById = (data, uid) => {
    if (!data || !uid || typeof uid !== 'number') {
      throw new Error('Wrong argument types');
    }
    try {
      return data.users.filter(user => user.uid === uid)[0];
    } catch (e) {
      throw new Error('Unable to find user', e.message);
    }
  };

  const getUserByEmail = async function (data, email) {
    if (!data || !email || typeof email !== 'string') {
      throw new Error('Wrong argument types');
    }
    try {
      return data.users.filter(user => user.email === email)[0] || null;
    } catch (e) {
      throw new Error('Unable to find user', e.message);
    }
  };

  const createUser = async function (data, name, lastname, email, password) {
    if (!data || !name || !lastname || !email || !password)
      throw new Error('Missing arguments');
    if (
      typeof name !== 'string' ||
      typeof lastname !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    )
      throw new Error('Wrong argument types');

    const users = data.users.length;
    const newUser = {
      uid: users + 1,
      name,
      lastname,
      email,
      password,
      role: 'user',
      balance: 0,
      transactions: [],
      contacts: [],
    };
    data.users.push(newUser);

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return newUser;
    } catch (err) {
      console.log('Unable to create user', err.message);
    }
  };

  const updateUser = async function (data, uid, name, lastname, password) {
    if (!data || !uid || typeof uid !== 'number')
      throw new Error('Id of type number is required');

    const user = getUserById(data, uid);

    if (!user) throw new Error('No user was found');

    const updatedUser = {
      uid,
      name: name || user.name,
      lastname: lastname || user.lastname,
      email: user.email,
      password: password || user.password,
      role: user.role,
      balance: user.balance,
      transactions: user.transactions,
      contacts: user.contacts,
    };

    const userI = data.users.indexOf(user);

    if (userI !== -1) {
      data.users.splice(userI, 1, updatedUser);
    }

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      console.log(data);
      return updatedUser;
    } catch (err) {
      console.log('Unable to update user', err.message);
    }
  };

  // LOGIN
  const userLogin = async (email, password) => {
    if (
      !email ||
      !password ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new Error('Wrong argument types');
    }
    const data = await getData();
    const user = await getUserByEmail(data, email);
    user.password === password ? user : null;
  };

  // BALANCE
  const getBalance = user => user.balance;
  // falta probar
  const updateBalance = async (data, uid, transaction) => {
    if (!data || !uid || !transaction || typeof uid !== 'number') {
      throw new Error('Wrong argument types');
    }

    const user = getUserById(data, uid);

    if (!user) throw new Error('No user was found');

    const newBalance = user.balance + transaction.amount;

    const updatedUser = {
      uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: newBalance,
      transactions: user.transactions,
      contacts: user.contacts,
    };

    const userI = data.users.indexOf(user);

    if (userI !== -1) {
      data.users.splice(userI, 1, updatedUser);
    }

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      console.log(data);
      return updatedUser.balance;
    } catch (err) {
      console.log(err.message);
    }
  };

  // TRANSACTIONS
  const getTransactions = user => user.transactions;

  // falta probar
  const addTransaction = async (data, uid, amount) => {
    if (
      !data ||
      !uid ||
      !amount ||
      typeof uid !== 'number' ||
      typeof amount !== 'number'
    ) {
      throw new Error('Wrong argument types');
    }

    const user = getUserById(data, uid);

    if (!user) throw new Error('No user was found');

    const transactions = getTransactions(user);
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      amount: amount,
      type: amount > 0 ? 'deposit' : 'transfer',
    };

    transactions.push(newTransaction);

    const updatedUser = {
      uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: transactions,
      contacts: user.contacts,
    };

    const userI = data.users.indexOf(user);

    if (userI !== -1) {
      data.users.splice(userI, 1, updatedUser);
    }

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      console.log(data);
      return updatedUser.transactions[transactions.length - 1];
    } catch (err) {
      console.log(err.message);
    }
  };

  // CONTACTS
  const getContacts = user => user.contacts;

  const addContact = async (data, uid, name, lastname, email) => {
    if (
      !data ||
      !uid ||
      !name ||
      !lastname ||
      !email ||
      typeof uid !== 'number' ||
      typeof name !== 'string' ||
      typeof lastname !== 'string' ||
      typeof email !== 'string'
    ) {
      throw new Error('Wrong argument types');
    }
    try {
      // TO DO
      console.log(data, uid, name, lastname, email);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateContact = async (data, uid, contactId, options) => {
    if (
      !data ||
      !uid ||
      !contactId ||
      !options ||
      typeof uid !== 'number' ||
      typeof contactId !== 'number'
    ) {
      throw new Error('Wrong argument types');
    }
    try {
      // TO DO
      console.log(data, uid, contactId, options);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteContact = async (data, uid, contactId) => {
    if (
      !data ||
      !uid ||
      !contactId ||
      typeof uid !== 'number' ||
      typeof contactId !== 'number'
    ) {
      throw new Error('Wrong argument types');
    }
    try {
      // TO DO
      console.log(data, uid, contactId);
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
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
    addContact,
    updateContact,
    deleteContact,
  };
}

const { getData } = dataServices();

const d = await getData();
console.log(d);
// console.log(await updateBalance(d, 2, await addTransaction(d, 2, -100)));
