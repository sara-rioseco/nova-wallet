export const contact = item => {
  const wrapper = document.createElement('div');
  const contact = document.createElement('input');
  const label = document.createElement('label');
  const labelSpan1 = document.createElement('span');
  const labelSpan2 = document.createElement('span');

  wrapper.classList.add('contact-wrapper');
  contact.type = 'radio';
  contact.id = `contact-${item.id}`;
  contact.name = `contact`;
  contact.value = `${item.name} ${item.lastname}`;
  contact.classList.add('contact-item', `contact-${item.id}`);
  contact.style.display = 'none';
  label.classList.add('contact-label');
  label.textContent = `${item.name} ${item.lastname}\n`;
  label.setAttribute('for', `contact-${item.id}`);
  labelSpan1.textContent = `${item.bank} `;
  labelSpan2.textContent = `#${item.account}`;

  label.append(labelSpan1, labelSpan2);
  contact.appendChild(label);
  $(wrapper).append(contact, label);

  return wrapper;
};
