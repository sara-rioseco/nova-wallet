export class Contact {
  constructor(id, name, lastname, email) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
  }
}

export class Transaction {
  constructor(type, amount, date = new Date()) {
    this.type = type;
    this.amount = amount;
    this.date = date;
  }
}

export class User {
  constructor(
    uid,
    name,
    lastname,
    email,
    password,
    role,
    balance,
    transactions,
    contacts
  ) {
    this.uid = uid;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.balance = balance;
    this.transactions = transactions;
    this.contacts = contacts;
  }
}
