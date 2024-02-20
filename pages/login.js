import { button } from '../../components/button.js';
import { input } from '../../components/input.js';

export default function Login(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('div');
  const title = document.createElement('h2');
  const email = input('Email', 'login-email');
  const password = input('Password', 'login-password', 'password');
  const loginButton = button('login');

  wrapper.className = 'login-wrapper';
  content.className = 'login-content-wrapper';
  title.textContent = 'NovaWallet';

  loginButton.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log(`logueando a ${email} con ${password}`);
    onNavigate('/home');
  });

  content.appendChild(title);
  content.appendChild(email);
  content.appendChild(password);
  content.appendChild(loginButton);
  wrapper.appendChild(content);

  return wrapper;
}
