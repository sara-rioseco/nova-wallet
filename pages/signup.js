import { button } from '../../components/button.js';
import { input } from '../../components/input.js';

export default function SignUp(onNavigate) {
  const wrapper = document.createElement('div');
  const content = document.createElement('div');
  const title = document.createElement('h1');

  content.appendChild(title);
  content.appendChild(loginButton);
  wrapper.appendChild(content);

  return wrapper;
}
