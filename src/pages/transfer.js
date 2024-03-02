import { header } from '../components/header.js';
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

  content.append(title);
  wrapper.append(nav, content, foot);

  return wrapper;
}
