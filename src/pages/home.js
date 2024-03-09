import dataServices from '../utils/data.js';
import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { balance } from '../components/balance.js';
import { iconButton } from '../components/icon-button.js';
import { historyItem } from '../components/history-item.js';
import { msgModal } from '../components/msg-modal.js';

const { getData, getUserById, getTransactions, getBalance } = dataServices();

const data = await getData();

export default function Home(onNavigate) {
  const uid = localStorage.getItem('uid');
  const user = getUserById(data, Number(uid));
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

  $(depositButton).click(e => {
    e.preventDefault();
    onNavigate('/nova-wallet/deposit');
  });

  $(transferButton).click(e => {
    e.preventDefault();
    onNavigate('/nova-wallet/transfer');
  });

  $(transactionsButton).click(e => {
    e.preventDefault();
    onNavigate('/nova-wallet/transactions');
  });

  const modal = msgModal({
    title: 'User information',
    content: `Name: ${localStorage.getItem('name')}\n
    Lastname: ${localStorage.getItem('lastname')}\n
    Email: ${localStorage.getItem('email')}`,
  });

  $(accountButton).click(e => {
    e.preventDefault();
    modal.showModal();
  });

  $(left).append(
    leftTitle,
    accountBalance,
    depositButton,
    transferButton,
    transactionsButton,
    accountButton
  );

  rightTitle.classList.add('home-right-title', 'home-title');
  rightTitle.textContent = 'Recent Activity';
  history.classList.add('home-history-wrapper');
  right.classList.add('home-right');

  transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(item => {
      $(history).append(historyItem(item));
    });

  $(right).append(rightTitle, history);
  $(content).append(left, right);
  $(wrapper).append(nav, content, modal, foot);

  return wrapper;
}
