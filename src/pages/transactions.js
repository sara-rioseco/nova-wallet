import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { historyItem } from '../components/history-item.js';
import dataServices from '../utils/data.js';

const { getData, getUserById, getTransactions, getBalance } = dataServices();

const data = await getData();

export default function Transactions(onNavigate) {
  const uid = localStorage.getItem('uid');
  const user = getUserById(data, Number(uid));
  const transactions = getTransactions(user);
  const total = getBalance(user);
  const wrapper = document.createElement('div');
  const content = document.createElement('main');
  const title = document.createElement('h2');
  const history = document.createElement('section');
  const balance = document.createElement('h3');
  const balanceSpan = document.createElement('span');
  const nav = header(onNavigate);
  const foot = footer();

  title.textContent = 'Transaction History';
  title.classList.add('transactions-title');
  wrapper.className = 'transactions-wrapper';
  content.className = 'transactions-content-wrapper';
  history.classList.add('transactions-history-wrapper');
  balance.classList.add('transactions-balance');
  balance.textContent = 'Your total balance is: ';
  balanceSpan.textContent = `USD${total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
  $(balance).append(balanceSpan);

  transactions.reverse().forEach(item => {
    $(history).append(historyItem(item));
  });

  $(content).append(title, history, balance);
  $(wrapper).append(nav, content, foot);

  return wrapper;
}
