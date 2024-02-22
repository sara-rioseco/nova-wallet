export const button = label => {
  const bttn = document.createElement('button');

  bttn.id = `button-${label.replace(' ', '')}`;
  bttn.classList.add = ('button', `${label.replace(' ', '')}-button`);
  bttn.textContent = `${label.charAt(0).toUpperCase() + label.slice(1)}`;

  return bttn;
};
