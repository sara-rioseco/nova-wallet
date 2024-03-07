export const header = onNavigate => {
  const header = document.createElement('header');
  const headerContainer = document.createElement('div');
  const title = document.createElement('h1');
  const titleSpan = document.createElement('span');

  const navbar = document.createElement('nav');
  const bttn = document.createElement('button');
  const menu = document.createElement('span');
  const hamburger = document.createElement('div');
  const list = document.createElement('ul');
  const homeLi = document.createElement('li');
  const depositLi = document.createElement('li');
  const transferLi = document.createElement('li');
  const transactionsLi = document.createElement('li');
  const signoutLi = document.createElement('li');

  headerContainer.classList.add('header-container');
  title.classList.add('logo');
  navbar.classList.add('site-nav');
  bttn.classList.add('menu-toggle');
  title.textContent = 'Nova';
  titleSpan.textContent = 'Wallet';
  bttn.setAttribute('aria-controls', 'primary-navigation');
  bttn.setAttribute('aria-expanded', 'false');
  menu.classList.add('visually-hidden');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('aria-hidden', 'true');

  title.appendChild(titleSpan);
  bttn.appendChild(menu);
  bttn.appendChild(hamburger);

  list.classList.add('primary-navigation');
  list.id = 'primary-navigation';
  list.setAttribute('data-state', 'closed');

  homeLi.textContent = 'Home';
  depositLi.textContent = 'Deposit';
  transferLi.textContent = 'Send Money';
  transactionsLi.textContent = 'Transactions';
  signoutLi.textContent = 'Logout';

  title.addEventListener('click', () => onNavigate('/nova-wallet/home'));
  homeLi.addEventListener('click', () => onNavigate('/nova-wallet/home'));
  depositLi.addEventListener('click', () => onNavigate('/nova-wallet/deposit'));
  transferLi.addEventListener('click', () =>
    onNavigate('/nova-wallet/transfer')
  );
  transactionsLi.addEventListener('click', () =>
    onNavigate('/nova-wallet/transactions')
  );
  signoutLi.addEventListener('click', () => {
    localStorage.removeItem('name');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
    localStorage.removeItem('uid');
    localStorage.removeItem('role');
    onNavigate('/nova-wallet/');
  });

  bttn.addEventListener('click', () => {
    const isOpened = bttn.getAttribute('aria-expanded') === 'true';
    isOpened ? closeMenu() : openMenu();
  });

  function openMenu() {
    bttn.setAttribute('aria-expanded', 'true');
    list.setAttribute('data-state', 'opened');
  }

  function closeMenu() {
    bttn.setAttribute('aria-expanded', 'false');
    list.setAttribute('data-state', 'closing');

    list.addEventListener(
      'animationend',
      () => list.setAttribute('data-state', 'closed'),
      { once: true }
    );
  }

  $(list).append(homeLi, depositLi, transferLi, transactionsLi, signoutLi);
  $(navbar).append(bttn, list);
  $(headerContainer).append(title, navbar);
  $(header).append(headerContainer);

  return header;
};
