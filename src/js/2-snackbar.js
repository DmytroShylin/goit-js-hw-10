// Імпортуємо бібліотеку iziToast та її стилі
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо форму
const form = document.querySelector('.form');

// Функція для створення та обробки промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// Обробник подання форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Отримуємо значення з форми
  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  // Створюємо та обробляємо проміс
  createPromise(delay, state)
    .then(delay => {
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
    })
    .catch(delay => {
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
    });

  // Очищаємо форму
  event.target.reset();
});
