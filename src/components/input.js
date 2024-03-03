export const input = (name, id, type) => {
  const wrapper = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');

  wrapper.classList.add('input-wrapper');
  input.classList.add('input', 'input-text');
  label.classList.add('label', 'input-label');

  input.type = type || 'search';
  input.id = `${id}`;
  input.autocomplete = 'new-password';
  input.placeholder = ' ';
  input.name = `${name}`;
  input.required = true;

  if (type === 'number') {
    input.step = '0.01';
    input.min = '0.01';
    input.max = '10000.01';
  }

  label.setAttribute('for', `${id}`);
  label.textContent = `Enter your ${name}`;

  wrapper.appendChild(input);
  wrapper.appendChild(label);

  return wrapper;
};
