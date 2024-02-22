export default function dataServices() {
  const url = '../data/data.json';

  const getData = async function (url) {
    try {
      const res = await fetch(url, {
        cretentials: 'include',
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const createUser = async function (name, lastname, email, password) {
    console.log('Creating user');
  };

  const updateUser = async function (name, lastname, email, password) {
    console.log('Updating user');
  };

  const getUserById = async function (data, uid) {
    try {
      if (!data || !uid || typeof uid !== 'number') {
        throw new Error('Wrong argument types');
      }
      return data.users.filter(user => user.uid === uid);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserByEmail = async function (data, email) {
    try {
      if (!data || !email || typeof email !== 'string') {
        throw new Error('Wrong argument types');
      }
      return data.users.filter(user => user.email === email);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getBalance = user => user.balance;

  const getTransactions = user => user.transactions;

  const getContacts = user => user.contacts;

  const updateContact = (uid, contactId, options) => {
    const contact = this.getContacts(uid).filter(
      contact => contact.id === contactId
    );
  };

  return {
    url,
    getData,
    createUser,
    getUserById,
    getUserByEmail,
    getBalance,
    getTransactions,
    getContacts,
  };
}
