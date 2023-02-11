import throttle from 'lodash.throttle';
//document.addEventListener('DOMContentLoaded', onDomContentLoaded);
const form = document.querySelector('.feedback-form');
const feedbackFormState = {};
const STORAGE_KEY = 'feedback-form-state';
// function onDomContentLoaded() {
//   checkLocalStorage();
//   form.addEventListener('input', throttle(inputForm, 500));
//   form.addEventListener('submit', submitForm);
// }

if (form) {
  checkLocalStorage();
  form.addEventListener('input', throttle(inputForm, 500));
  form.addEventListener('submit', submitForm);
}

function checkLocalStorage() {
  if (localStorage.getItem(STORAGE_KEY)) {
    let { email, message } = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    form.email.value = email;
    form.message.value = message;
  }
}
function inputForm(event) {
  feedbackFormState[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
}
function submitForm(event) {
  event.preventDefault();
  if (localStorage.getItem(STORAGE_KEY)) {
    localStorage.removeItem(STORAGE_KEY);
    form.email.value = '';
    form.message.value = '';
  }
}
