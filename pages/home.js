import { header } from '../../components/header.js';

export default function Home(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('div');
  const nav = header(onNavigate);
  const title = document.createElement('h2');

  title.textContent = 'Este es el Home';
  wrapper.className = 'home-wrapper';
  content.className = 'home-content-wrapper';

  content.appendChild(title);
  wrapper.appendChild(nav);
  wrapper.appendChild(content);

  return wrapper;
}
