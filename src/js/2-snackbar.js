// Імпортуємо бібліотеку iziToast та її стилі
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо форму
const form = document.querySelector('.form');

// Функція для створення та обробки промісу
function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    const timerId = window.setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);

    // Очищення таймера при потребі
    return () => {
      window.clearTimeout(timerId);
    };
  });

  return promise;
}

// Функція для показу успішного повідомлення
function showSuccessMessage(delay) {
  iziToast.success({
    title: 'Success',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    messageColor: '#fff',
    backgroundColor: '#59A10D',
    close: false,
    closeOnClick: true,
    timeout: 5000,
  });
}

// Функція для показу повідомлення про помилку
function showErrorMessage(delay) {
  iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
    messageColor: '#fff',
    backgroundColor: '#EF4040',
    close: false,
    closeOnClick: true,
    timeout: 5000,
  });
}

// Обробник подання форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Отримуємо значення з форми
  const delayInput = event.target.elements.delay;
  const stateInputs = event.target.elements.state;

  const delay = Number(delayInput.value);
  const state = Array.from(stateInputs).find(input => input.checked)?.value;

  // Перевіряємо валідність введених даних
  if (!delay || !state) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please fill in all fields',
      position: 'topRight',
    });
    return;
  }

  // Створюємо та обробляємо проміс
  createPromise(delay, state).then(showSuccessMessage).catch(showErrorMessage);

  // Очищаємо форму
  event.target.reset();
});
