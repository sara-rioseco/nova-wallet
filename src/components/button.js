import { utils } from '../utils/utils';
export const button = label => {
  const bttn = document.createElement('button');

  bttn.id = `button-${label.replace(' ', '')}`;
  bttn.classList.add = ('button', `${label.replace(' ', '')}-button`);
  bttn.textContent = `${utils().cap(label)}`;

  return bttn;
};
