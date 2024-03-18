import * as fs from 'node:fs/promises';
import bcrypt from 'bcryptjs';

export default function dataServices() {
  const dataUrl = 'https://json-server-gamma-brown.vercel.app/users';
  // const dataUrl = 'http://localhost:3000/users'; For use with JSON SERVER

  // DATA
  const getData = async function () {
    // ------------------ con fetch --------------------

    try {
      const response = await fetch(dataUrl, {
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error(e);
    }

    // ----------------- with NODE FS --------------------

    // const data = await fs.readFile(dataUrl, { encoding: 'utf8' });
    // return JSON.parse(data);

    // ------------- with JSON SERVER & fetch ------------
    // try {
    //   const response = await fetch(url, {
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   });
    //   return response.json();
    // } catch (e) {
    //   throw new Error(e);
    // }
  };

  // USERS
  const getUsers = data => data.users;

  const getUserById = (data, uid) => {
    if (!data || !uid || typeof uid !== 'number') {
      throw new Error('Wrong argument types');
    }
    const user = data.find(user => user.id === uid);
    if (!user) {
      throw new Error('Unable to find user');
    }
    return user;
  };

  const getUserByEmail = (data, email) => {
    if (!data || !email || typeof email !== 'string') {
      throw new Error('Wrong argument types');
    }

    const user = data.find(user => user.email === email);
    if (!user) {
      throw new Error('Unable to find user');
    }
    return user;
  };

  const createUser = async function (data, name, lastname, email, pass) {
    if (!data || !name || !lastname || !email || !pass) {
      throw new Error('Missing arguments');
    }
    if (
      typeof name !== 'string' ||
      typeof lastname !== 'string' ||
      typeof email !== 'string' ||
      typeof pass !== 'string'
    ) {
      throw new Error('Wrong argument types');
    }
    const users = data.users.length;

    bcrypt.hash(pass, 11, async (err, hash) => {
      const newUser = {
        id: users + 1,
        name,
        lastname,
        email,
        password: hash,
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
        throw new Error(err);
      }
    });
  };

  const updateUser = async function (data, uid, options) {
    if (!data || !uid || typeof uid !== 'number')
      throw new Error('Id of type number is required');

    const user = getUserById(data, uid);
    let updatedUser;
    if (options.password) {
      bcrypt.hash(options.password, 11, async (err, hash) => {
        updatedUser = {
          id: uid,
          name: options.name || user.name,
          lastname: options.lastname || user.lastname,
          email: user.email,
          password: hash,
          role: user.role,
          balance: user.balance,
          transactions: user.transactions,
          contacts: user.contacts,
        };
      });
    } else {
      updatedUser = {
        id: uid,
        name: options.name || user.name,
        lastname: options.lastname || user.lastname,
        email: user.email,
        password: user.password,
        role: user.role,
        balance: user.balance,
        transactions: user.transactions,
        contacts: user.contacts,
      };
    }

    const userI = data.indexOf(user);

    data.splice(userI, 1, updatedUser);

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser;
    } catch (err) {
      throw new Error(err);
    }
  };

  // LOGIN
  const userLogin = async (data, email, pass) => {
    if (
      !data ||
      !email ||
      !pass ||
      typeof email !== 'string' ||
      typeof pass !== 'string'
    ) {
      throw new Error('Wrong argument types');
    }
    const user = await getUserByEmail(data, email);
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (user && isPasswordValid) {
      return user;
    } else {
      throw new Error('Wrong credentials');
    }
  };

  // BALANCE
  const getBalance = user => user.balance;

  const updateBalance = async (data, uid, transaction) => {
    if (
      !data ||
      !uid ||
      !transaction ||
      typeof uid !== 'number' ||
      typeof transaction.amount !== 'number'
    ) {
      throw new Error('Wrong argument types');
    }

    const user = getUserById(data, uid);

    const newBalance = user.balance + transaction.amount;

    const updatedUser = {
      id: uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: newBalance,
      transactions: user.transactions,
      contacts: user.contacts,
    };

    const userI = data.indexOf(user);

    data.splice(userI, 1, updatedUser);

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.balance;
    } catch (err) {
      throw new Error(err);
    }
  };

  // TRANSACTIONS
  const getTransactions = user => {
    if (!user || !user.transactions) {
      return [];
    }
    return user.transactions;
  };

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

    const transactions = getTransactions(user);
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      amount: amount,
      type: amount > 0 ? 'deposit' : 'transfer',
    };

    transactions.push(newTransaction);

    const updatedUser = {
      id: uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: transactions,
      contacts: user.contacts,
    };

    const userI = data.indexOf(user);

    data.splice(userI, 1, updatedUser);

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.transactions[transactions.length - 1];
    } catch (err) {
      throw new Error(err);
    }
  };

  // CONTACTS
  const getContacts = user => {
    if (!user || !user.contacts) {
      return [];
    }
    return user.contacts;
  };

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

    const userI = data.indexOf(user);

    const contact = data[userI].contacts.find(contact => contact.id === id);

    if (contact) {
      return contact;
    } else {
      throw new Error('Unable to find contact');
    }
  };

  const getContactByName = (data, uid, name) => {
    if (
      !data ||
      !uid ||
      !name ||
      typeof uid !== 'number' ||
      typeof name !== 'string'
    ) {
      throw new Error('Wrong argument types');
    }
    const user = getUserById(data, uid);

    const userI = data.indexOf(user);

    const contact = data[userI].contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(name.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(name.toLowerCase())
    );

    if (contact.length > 0) {
      return contact;
    } else {
      throw new Error('Unable to find contact');
    }
  };

  const addContact = async (data, uid, options) => {
    if (!data || !uid || !options || typeof uid !== 'number') {
      throw new Error('Wrong argument types');
    }
    const user = getUserById(data, uid);

    const contacts = getContacts(user);

    const newContact = {
      id: contacts.length + 1,
      name: options.name,
      lastname: options.lastname,
      email: options.email,
    };

    contacts.push(newContact);

    const updatedUser = {
      id: uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: user.transactions,
      contacts: contacts,
    };

    const userI = data.indexOf(user);

    data.splice(userI, 1, updatedUser);

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.contacts[contacts.length - 1];
    } catch (err) {
      throw new Error(err);
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

    const contacts = getContacts(user);
    const contact = getContactById(data, uid, contactId);
    const contactI = contacts.indexOf(contact);

    const updatedContact = {
      id: contactId,
      name: options.name || contact.name,
      lastname: options.lastname || contact.lastname,
      email: options.email || contact.email,
    };

    contacts.splice(contactI, 1, updatedContact);

    const updatedUser = {
      id: uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: user.transactions,
      contacts: contacts,
    };

    const userI = data.indexOf(user);

    data.splice(userI, 1, updatedUser);

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.contacts[contactI];
    } catch (err) {
      throw new Error(err);
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
    const contacts = getContacts(user);
    const contact = getContactById(data, uid, contactId);
    const contactI = contacts.indexOf(contact);

    contacts.splice(contactI, 1);

    const updatedUser = {
      id: uid,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      balance: user.balance,
      transactions: user.transactions,
      contacts: contacts,
    };

    const userI = data.indexOf(user);

    data.splice(userI, 1, updatedUser);

    try {
      await fs.writeFile(dataUrl, JSON.stringify(data), {
        encoding: 'utf-8',
      });
      return updatedUser.contacts;
    } catch (err) {
      throw new Error(err);
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
    getContactByName,
    addContact,
    updateContact,
    deleteContact,
  };
}
