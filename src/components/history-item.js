import { utils } from '../utils/utils';

export const historyItem = transaction => {
  const wrapper = document.createElement('div');
  const title = document.createElement('div');
  const type = document.createElement('h3');
  const amount = document.createElement('h3');
  const subtitle = document.createElement('p');

  wrapper.classList.add('history-item-wrapper');
  title.classList.add('history-item-title');
  subtitle.classList.add('history-item-subtitle');

  type.textContent = `${utils().cap(transaction.type)}`;
  amount.textContent = `${transaction.amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })} `;
  subtitle.textContent = `${new Date(transaction.date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )}`;

  title.appendChild(type);
  title.appendChild(amount);
  wrapper.appendChild(title);
  wrapper.appendChild(subtitle);

  return wrapper;
};
