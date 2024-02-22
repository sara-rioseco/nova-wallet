import { header } from '../components/header.js';
import { footer } from '../components/footer.js';

export default function Home(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('main');
  const nav = header(onNavigate);
  const foot = footer();
  const title = document.createElement('h2');

  title.textContent = 'Este es el Home';
  wrapper.className = 'home-wrapper';
  content.className = 'home-content-wrapper';

  content.appendChild(title);
  wrapper.appendChild(nav);
  wrapper.appendChild(content);
  wrapper.appendChild(foot);

  return wrapper;
}
