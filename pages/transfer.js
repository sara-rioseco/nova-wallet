import { header } from '../../components/header.js';
import { footer } from '../components/footer.js';

export default function Transfer(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('main');
  const nav = header(onNavigate);
  const foot = footer();
  const title = document.createElement('h2');

  title.textContent = 'Esta es la opción para transferir';
  wrapper.className = 'transfer-wrapper';
  content.className = 'transfer-content-wrapper';

  content.appendChild(title);
  wrapper.appendChild(nav);
  wrapper.appendChild(content);
  wrapper.appendChild(foot);

  return wrapper;
}
