import dataServices from '../utils/data.js';
import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { balance } from '../components/balance.js';
import { iconButton } from '../components/icon-button.js';
import { historyItem } from '../components/history-item.js';

const { dataUrl, getData, getUserById, getTransactions, getBalance } =
  dataServices();

const data = await getData(dataUrl);

export default function Home(onNavigate) {
  const uid = localStorage.getItem('uid');
  const user = getUserById(data, +uid);
  const transactions = getTransactions(user);
  const wrapper = document.createElement('div');
  const content = document.createElement('main');
  const nav = header(onNavigate);
  const foot = footer();
  const left = document.createElement('section');
  const leftTitle = document.createElement('h2');
  const accountBalance = balance(getBalance(user));
  const depositButton = iconButton('credit-card');
  const transferButton = iconButton('exchange');
  const transactionsButton = iconButton('history');
  const accountButton = iconButton('user');

  const right = document.createElement('section');
  const rightTitle = document.createElement('h3');
  const history = document.createElement('section');

  leftTitle.classList.add('home-left-title', 'home-title');
  leftTitle.textContent = `Hello, ${user.name}`;
  wrapper.className = 'home-wrapper';
  content.className = 'home-content-wrapper';
  left.classList.add('home-left');

  depositButton.addEventListener('click', e => {
    e.preventDefault();
    onNavigate('/nova-wallet/deposit');
  });

  transferButton.addEventListener('click', e => {
    e.preventDefault();
    onNavigate('/nova-wallet/transfer');
  });

  transactionsButton.addEventListener('click', e => {
    e.preventDefault();
    onNavigate('/nova-wallet/transactions');
  });

  accountButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('aquí se abre un modal para ver datos de usuario');
  });

  left.appendChild(leftTitle);
  left.appendChild(accountBalance);
  left.appendChild(depositButton);
  left.appendChild(transferButton);
  left.appendChild(transactionsButton);
  left.appendChild(accountButton);

  rightTitle.classList.add('home-right-title', 'home-title');
  rightTitle.textContent = 'Recent Activity';
  history.classList.add('home-history-wrapper');
  right.classList.add('home-right');

  transactions.forEach(item => {
    history.appendChild(historyItem(item));
  });

  right.appendChild(rightTitle);
  right.appendChild(history);
  content.appendChild(left);
  content.appendChild(right);
  wrapper.appendChild(nav);
  wrapper.appendChild(content);
  wrapper.appendChild(foot);

  return wrapper;
}
