export const footer = () => {
  const footer = document.createElement('footer');
  const footerContainer = document.createElement('div');
  const text = document.createElement('p');

  footerContainer.classList.add('footer-container');
  text.textContent = 'Designed and developed by ©Sara Rioseco 2024';

  footerContainer.appendChild(text);
  footer.appendChild(footerContainer);

  return footer;
};
