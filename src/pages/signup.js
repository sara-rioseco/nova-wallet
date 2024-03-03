/* eslint-disable no-console */
import { button } from '../components/button.js';
import { input } from '../components/input.js';
import dataServices from '../utils/data.js';

const { getData, createUser } = dataServices();

export default function SignUp(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('form');
  const title = document.createElement('h1');
  const titleSpan = document.createElement('span');
  const username = input('username', 'signup-username', 'text');
  const name = input('Name', 'signup-name', 'text');
  const lastname = input('Lastname', 'signup-lastname', 'text');
  const email = input('Email', 'signup-email');
  const password = input('Password', 'signup-password', 'password');
  const signUpButton = button('sign up');
  const loginText = document.createElement('p');
  const loginTextSpan = document.createElement('span');

  wrapper.className = 'signup-wrapper';
  content.className = 'signup-content-wrapper';
  title.textContent = 'Nova';
  titleSpan.textContent = 'Wallet';
  username.autocomplete = 'username';
  username.hidden = true;
  username.classList.add('visually-hidden');
  loginText.classList.add('signup-text');
  loginText.textContent = 'Already have an account?\n';
  loginTextSpan.textContent = 'Login here.';

  $(signUpButton).click(async e => {
    e.preventDefault();
    const name = $('#signup-name').val();
    const lastname = $('#signup-lastname').val();
    const mail = $('#signup-email').val();
    const pass = $('#signup-password').val();
    console.log('trying to sign up user: ', name, lastname, mail);
    try {
      const data = await getData();
      const user = await createUser(data, name, lastname, mail, pass);
      localStorage.setItem('uid', user.id);
      localStorage.setItem('name', user.name);
      localStorage.setItem('lastname', user.lastname);
      localStorage.setItem('email', user.email);
      localStorage.setItem('role', user.role);
      alert('User created successfully');
      onNavigate('/nova-wallet/home');
    } catch (e) {
      alert('Unable to create user');
      console.error(e.message);
    }
    onNavigate('/nova-wallet/home');
  });

  $(loginTextSpan).click(() => {
    onNavigate('/nova-wallet/');
  });

  $(title).append(titleSpan);
  $(loginText).append(loginTextSpan);
  $(content).append(
    title,
    username,
    name,
    lastname,
    email,
    password,
    signUpButton,
    loginText
  );
  $(wrapper).append(content);

  return wrapper;
}
