/* eslint-disable no-console */
import * as fs from 'node:fs/promises';

export default function dataServices() {
  const dataUrl = './src/db/db.json';
  // DATA
  const getData = async function () {
    const data = await fs.readFile(dataUrl, { encoding: 'utf8' });
    return JSON.parse(data);
  };

  // USERS
  const getUsers = data => data.users;

  const getUserById = (data, uid) => {
    if (!data || !uid || typeof uid !== 'number') {
      throw new Error('Wrong argument types');
    }
    const user = data.users.find(user => user.uid === uid);
    if (!user) {
      throw new Error('Unable to find user');
    }
    return user;
  };

  const getUserByEmail = (data, email) => {
    if (!data || !email || typeof email !== 'string') {
      throw new Error('Wrong argument types');
    }

    const user = data.users.find(user => user.email === email);
    if (!user) {
      throw new Error('Unable to find user');
    }
    return user;
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
      return updatedUser.balance;
    } catch (err) {
      console.log(err.message);
    }
  };

  // TRANSACTIONS
  const getTransactions = user => user.transactions;

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
      return updatedUser.transactions[transactions.length - 1];
    } catch (err) {
      console.log(err.message);
    }
  };

  // CONTACTS
  const getContacts = user => user.contacts;

  const getContactById = (data, uid, id) => {
    if (
      !data ||
      !uid ||
      !id ||
      typeof uid !== 'number' ||
      typeof id !== 'number'
    ) {
      throw new Error('Wrong argument types');
    }
    const user = getUserById(data, uid);

    if (!user) throw new Error('No user was found');

    const userI = data.users.indexOf(user);

    try {
      return data.users[userI].contacts.filter(contact => contact.id === id)[0];
    } catch (e) {
      throw new Error('Unable to find contact', e.message);
    }
  };

  const addContact = async (data, uid, options) => {
    if (!data || !uid || !options || typeof uid !== 'number') {
      throw new Error('Wrong argument types');
    }
    const user = getUserById(data, uid);

    if (!user) throw new Error('No user was found');

    const contacts = getContacts(user);

    const newContact = {
      id: contacts.length + 1,
      name: options.name,
      lastname: options.lastname,
      email: options.email,
    };

    contacts.push(newContact);

    const updatedUser = {
      uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: user.transactions,
      contacts: contacts,
    };

    const userI = data.users.indexOf(user);

    if (userI !== -1) {
      data.users.splice(userI, 1, updatedUser);
    }

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.contacts[contacts.length - 1];
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
    const user = getUserById(data, uid);

    if (!user) throw new Error('No user was found');

    const contacts = getContacts(user);
    const contact = getContactById(data, uid, contactId);
    const contactI = contacts.indexOf(contact);

    const updatedContact = {
      id: contactId,
      name: options.name || contact.name,
      lastname: options.lastname || contact.lastname,
      email: options.email || contact.email,
    };

    if (contactI !== -1) {
      contacts.splice(contactI, 1, updatedContact);
    }

    const updatedUser = {
      uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: user.transactions,
      contacts: contacts,
    };

    const userI = data.users.indexOf(user);

    if (userI !== -1) {
      data.users.splice(userI, 1, updatedUser);
    }

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.contacts[contactI];
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
    const user = getUserById(data, uid);

    if (!user) throw new Error('No user was found');

    const contacts = getContacts(user);
    const contact = getContactById(data, uid, contactId);
    const contactI = contacts.indexOf(contact);

    if (contactI !== -1) {
      contacts.splice(contactI, 1);
    }

    const updatedUser = {
      uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: user.transactions,
      contacts: contacts,
    };

    const userI = data.users.indexOf(user);

    if (userI !== -1) {
      data.users.splice(userI, 1, updatedUser);
    }

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.contacts;
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
    getContactById,
    addContact,
    updateContact,
    deleteContact,
  };
}

// const { getData } = dataServices();

// const d = await getData();
// console.log(d);

// console.log(await updateBalance(d, 2, await addTransaction(d, 2, -100)));

// console.log(await deleteContact(d, 1, 2));

// console.log(await deleteContact(d, 1, 2));
