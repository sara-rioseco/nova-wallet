import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { input } from '../components/input.js';
import { button } from '../components/button.js';
import { balance } from '../components/balance.js';
import dataServices from '../utils/data.js';

const { getData, getUserById, getBalance } = dataServices();
const data = await getData();

export default function Deposit(onNavigate) {
  const uid = localStorage.getItem('uid');
  const user = getUserById(data, Number(uid));
  let initialBalance = getBalance(user);
  const balanceDiv = document.createElement('div');
  const accountBalance = balance(initialBalance);
  const wrapper = document.createElement('div');
  const content = document.createElement('main');
  const nav = header(onNavigate);
  const foot = footer();
  const title = document.createElement('h2');
  const amount = input('amount', 'deposit-amount', 'number');
  const depositButton = button('deposit');

  $(depositButton)
    .off('click')
    .on('click', e => {
      e.preventDefault();
      const newBalance = balance(
        (initialBalance += Number($('#deposit-amount').val()))
      );
      $(balanceDiv).html(newBalance);
      return false;
    });

  title.textContent = 'Add funds to your account';
  wrapper.className = 'deposit-wrapper';
  content.className = 'deposit-content-wrapper';
  balanceDiv.classList.add('deposit-balance-div');

  $(balanceDiv).append(accountBalance);
  $(content).append(title, balanceDiv, amount, depositButton);
  $(wrapper).append(nav, content, foot);

  return wrapper;
}
