import { header } from '../../components/header.js';

export default function Transactions(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('div');
  const nav = header(onNavigate);
  const title = document.createElement('h2');

  title.textContent =
    'Esta es la opción para ver el historial de transacciones';
  wrapper.className = 'transactions-wrapper';
  content.className = 'transactions-content-wrapper';

  content.appendChild(title);
  wrapper.appendChild(nav);
  wrapper.appendChild(content);

  return wrapper;
}
