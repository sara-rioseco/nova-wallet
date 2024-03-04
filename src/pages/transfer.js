import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { contact } from '../components/contact.js';
import { button } from '../components/button.js';
import { input } from '../components/input.js';
import dataServices from '../utils/data.js';

const { getData, getUserById, getContacts, getContactByName } = dataServices();

const data = await getData();

export default function Transfer(onNavigate) {
  const uid = localStorage.getItem('uid');
  const user = getUserById(data, Number(uid));
  let contacts = getContacts(user);
  const wrapper = document.createElement('div');
  const content = document.createElement('main');
  const title = document.createElement('h2');
  const searchInput = input('contact', 'contact-search', 'text');
  const contactsWrapper = document.createElement('section');
  // const contactsTitle = document.createElement('h3');
  const contactsList = document.createElement('form');
  const amountInput = input('amount', 'transfer-amount', 'number');
  const contactsButton = button('Send Money');

  const nav = header(onNavigate);
  const foot = footer();

  $(searchInput).on('keyup', () => {
    contacts = getContactByName(data, Number(uid), $('#contact-search').val());
    console.log('contactos encontrados: ', contacts);
  });

  contacts.forEach(item => {
    $(contactsList).append(contact(item));
  });

  $(contacts).on('change', () => {
    $(contactsList).empty();
    contacts.forEach(item => {
      $(contactsList).append(contact(item));
    });
  });

  title.textContent = 'Send Money';
  wrapper.className = 'transfer-wrapper';
  content.className = 'transfer-content-wrapper';
  // contactsTitle.textContent = 'Contacts';
  contactsList.classList.add('contacts-list');
  contactsWrapper.classList.add('contacts-wrapper');

  $(contactsButton).click(() => {
    if ($('#transfer-amount').val() === '') {
      alert('Please enter a transfer amount');
    } else {
      alert(
        `You transferred USD${Number(
          $('#transfer-amount').val()
        ).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })} to ${$("input[type='radio'][name='contact']:checked").val()}`
      );
      $('#transfer-amount').val('');
    }
  });

  $(contactsWrapper).append(contactsList, amountInput, contactsButton);
  $(content).append(title, searchInput, contactsWrapper);
  $(wrapper).append(content, nav, foot);

  return wrapper;
}

``;
