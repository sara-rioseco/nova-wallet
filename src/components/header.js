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
  const homeI = document.createElement('i');
  const depositI = document.createElement('i');
  const transferI = document.createElement('i');
  const transactionsI = document.createElement('i');
  const signoutI = document.createElement('i');

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
  homeI.classList.add('fa', 'fa-home', 'site-nav--icon');
  depositI.classList.add('fa', 'fa-credit-card', 'site-nav--icon');
  transferI.classList.add('fa', 'fa-exchange', 'site-nav--icon');
  transactionsI.classList.add('fa', 'fa-history', 'site-nav--icon');
  signoutI.classList.add('fa', 'fa-signout', 'site-nav--icon');

  homeLi.appendChild(homeI);
  depositLi.appendChild(depositI);
  transferLi.appendChild(transferI);
  transactionsLi.appendChild(transactionsI);
  signoutLi.appendChild(signoutI);
  homeLi.textContent = 'Home';
  depositLi.textContent = 'Deposit';
  transferLi.textContent = 'Send Money';
  transactionsLi.textContent = 'Transactions';
  signoutLi.textContent = 'Logout';

  homeLi.addEventListener('click', () => onNavigate('/home'));
  depositLi.addEventListener('click', () => onNavigate('/deposit'));
  transferLi.addEventListener('click', () => onNavigate('/transfer'));
  transactionsLi.addEventListener('click', () => onNavigate('/transactions'));
  signoutLi.addEventListener('click', () => onNavigate('/'));

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
      () => {
        list.setAttribute('data-state', 'closed');
      },
      { once: true }
    );
  }

  list.appendChild(homeLi);
  list.appendChild(depositLi);
  list.appendChild(transferLi);
  list.appendChild(transactionsLi);
  list.appendChild(signoutLi);

  navbar.appendChild(bttn);
  navbar.appendChild(list);

  headerContainer.appendChild(title);
  headerContainer.appendChild(navbar);
  header.appendChild(headerContainer);

  return header;
};
