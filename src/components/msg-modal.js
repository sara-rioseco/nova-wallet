export const msgModal = options => {
  const dialog = document.createElement('dialog');
  const wrapper = document.createElement('div');
  const title = document.createElement('h3');
  const content = document.createElement('p');
  const button = document.createElement('button');

  while (dialog.hasChildNodes()) {
    dialog.removeChild(dialog.firstChild);
  }

  dialog.classList.add('modal', 'msg-modal');
  wrapper.classList.add('wrapper', 'dialog-wrapper');
  title.classList.add('title');
  button.classList.add('button', 'close-button');
  button.textContent = 'Ok';

  $(button).click(() => {
    if (options.callback) {
      options.callback('/nova-wallet/');
    }
    dialog.close();
  });

  $(title).text(options.title);
  $(content).text(options.content);
  $(wrapper).append(title, content, button);
  $(dialog).append(wrapper);

  return dialog;
};
