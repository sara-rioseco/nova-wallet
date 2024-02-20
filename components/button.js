export const button = label => {
  const bttn = document.createElement('button');

  bttn.id = `button-${label}`;
  bttn.classList.add = ('button', `${label}-button`);
  bttn.textContent = `${label.charAt(0).toUpperCase() + label.slice(1)}`;

  return bttn;
};
