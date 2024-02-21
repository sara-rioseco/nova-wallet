import { button } from '../../components/button.js';
import { input } from '../../components/input.js';

export default function Login(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('form');
  const title = document.createElement('h1');
  const titleSpan = document.createElement('span');
  const username = input('username', 'login-username', 'text');
  const email = input('Email', 'login-email');
  const password = input('Password', 'login-password', 'password');
  const loginButton = button('login');

  wrapper.className = 'login-wrapper';
  content.className = 'login-content-wrapper';
  title.textContent = 'Nova';
  titleSpan.textContent = 'Wallet';
  email.name = 'login-email';
  password.name = 'login-password';
  username.autocomplete = 'username';
  username.hidden = true;
  username.classList.add('visually-hidden');

  loginButton.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log(`logueando a ${email} con ${password}`);
    onNavigate('/home');
  });

  title.appendChild(titleSpan);
  content.appendChild(title);
  content.appendChild(username);
  content.appendChild(email);
  content.appendChild(password);
  content.appendChild(loginButton);
  wrapper.appendChild(content);

  return wrapper;
}
