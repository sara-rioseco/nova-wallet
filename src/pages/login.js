/* eslint-disable no-console */
import { button } from '../components/button.js';
import { input } from '../components/input.js';
import dataServices from '../utils/data.js';

const { dataUrl, getData, userLogin } = dataServices();

export default function Login(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('form');
  const title = document.createElement('h1');
  const titleSpan = document.createElement('span');
  const username = input('username', 'login-username', 'text');
  const email = input('Email', 'login-email');
  const password = input('Password', 'login-password', 'password');
  const loginButton = button('login');
  const signUpText = document.createElement('p');
  const signUpTextSpan = document.createElement('span');

  wrapper.className = 'login-wrapper';
  content.className = 'login-content-wrapper';
  title.textContent = 'Nova';
  titleSpan.textContent = 'Wallet';
  username.autocomplete = 'username';
  username.hidden = true;
  username.classList.add('visually-hidden');
  signUpText.classList.add('login-text');
  signUpText.textContent = "Don't have an account?\n";
  signUpTextSpan.textContent = 'Sign up here.';

  loginButton.addEventListener('click', async e => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      const data = await getData(dataUrl);
      const user = await userLogin(data, email, password);
      localStorage.setItem('uid', user.id);
      localStorage.setItem('name', user.name);
      localStorage.setItem('lastname', user.lastname);
      localStorage.setItem('email', user.email);
      localStorage.setItem('role', user.role);
      onNavigate('/nova-wallet/home');
    } catch (e) {
      alert('Invalid credentials');
      console.error(e);
    }
  });

  signUpTextSpan.addEventListener('click', () => {
    onNavigate('/nova-wallet/signup');
  });

  title.appendChild(titleSpan);
  signUpText.appendChild(signUpTextSpan);
  content.appendChild(title);
  content.appendChild(username);
  content.appendChild(email);
  content.appendChild(password);
  content.appendChild(loginButton);
  content.appendChild(signUpText);
  wrapper.appendChild(content);

  return wrapper;
}
