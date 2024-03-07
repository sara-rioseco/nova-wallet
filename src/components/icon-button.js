export const iconButton = label => {
  const bttn = document.createElement('button');
  const i = document.createElement('i');

  bttn.id = `button-${label.replace(' ', '')}`;
  bttn.classList.add(
    'button',
    'icon-button',
    `${label.replace(' ', '')}-button`
  );
  i.classList.add('fa', `fa-${label}`, 'home-icon');

  $(bttn).append(i);
  return bttn;
};
