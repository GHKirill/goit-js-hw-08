import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let feedbackFormState = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};

checkLocalStorage();
form.addEventListener('input', throttle(inputForm, 500));
form.addEventListener('submit', submitForm);

function checkLocalStorage() {
  form.email.value = feedbackFormState.email ?? '';
  form.message.value = feedbackFormState.message ?? '';
}
function inputForm(event) {
  feedbackFormState[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
}
function submitForm(event) {
  event.preventDefault();
  console.log(feedbackFormState);
  feedbackFormState = {};
  localStorage.removeItem(STORAGE_KEY);
  form.email.value = '';
  form.message.value = '';
}
