import { header } from '../components/header.js';
import { footer } from '../components/footer.js';

export default function Deposit(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('main');
  const nav = header(onNavigate);
  const foot = footer();
  const title = document.createElement('h2');

  title.textContent = 'Esta es la opción para depositar';
  wrapper.className = 'deposit-wrapper';
  content.className = 'deposit-content-wrapper';

  content.append(title);
  wrapper.append(nav, content, foot);

  return wrapper;
}
