export const button = label => {
  const bttn = document.createElement('button');
  const i = document.createElement('i');

  bttn.id = `button-${label.replace(' ', '')}`;
  bttn.classList.add = ('button', `${label.replace(' ', '')}-button`);
  i.classList.add = ('fa', `fa-${label}`, 'home-icon');
  // bttn.textContent = `${label.charAt(0).toUpperCase() + label.slice(1)}`;

  // homeI.classList.add('fa', 'fa-home', 'site-nav--icon');
  // depositI.classList.add('fa', 'fa-credit-card', 'site-nav--icon');
  // transferI.classList.add('fa', 'fa-exchange', 'site-nav--icon');
  // transactionsI.classList.add('fa', 'fa-history', 'site-nav--icon');
  // signoutI.classList.add('fa', 'fa-signout', 'site-nav--icon');

  bttn.appendChild(i);
  return bttn;
};
