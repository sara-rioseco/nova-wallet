import { header } from '../../components/header.js';

export default function Transfer(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('div');
  const nav = header(onNavigate);
  const title = document.createElement('h2');

  title.textContent = 'Esta es la opción para transferir';
  wrapper.className = 'transfer-wrapper';
  content.className = 'transfer-content-wrapper';

  content.appendChild(title);
  wrapper.appendChild(nav);
  wrapper.appendChild(content);

  return wrapper;
}
