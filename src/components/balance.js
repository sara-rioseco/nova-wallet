export const balance = amount => {
  const wrapper = document.createElement('div');
  const title = document.createElement('h3');
  const subtitle = document.createElement('h2');

  wrapper.classList.add('balance-wrapper');
  title.classList.add('balance-title');
  subtitle.classList.add('balance-subtitle');

  title.textContent = 'your balance is:';
  subtitle.textContent = `USD ${amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
  wrapper.appendChild(title);
  wrapper.appendChild(subtitle);

  return wrapper;
};
