import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input'),
  messageInput: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = { email: '', message: '' };

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFormValues();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля');
  }

  event.currentTarget.reset();
  formData = { email: '', message: '' };

  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateFormValues() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedData) {
    refs.emailInput.value = savedData.email;
    refs.messageInput.value = savedData.message;
    formData = savedData;
  } else {
    formData = { email: '', message: '' };
  }
}
