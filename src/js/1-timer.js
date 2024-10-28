// Імпортуємо необхідні бібліотеки
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо посилання на елементи DOM
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

// Початково кнопка старт неактивна
startButton.disabled = true;

// Налаштування для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

// Ініціалізуємо flatpickr
flatpickr(datetimePicker, options);

// Функція для додавання ведучого нуля
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція конвертації мілісекунд
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція оновлення інтерфейсу таймера
function updateTimerInterface(time) {
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

// Функція запуску таймера
function startTimer() {
  if (!userSelectedDate) return;

  // Деактивуємо кнопку та інпут
  startButton.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const difference = userSelectedDate - currentTime;

    if (difference <= 0) {
      clearInterval(countdownInterval);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datetimePicker.disabled = false;
      return;
    }

    const time = convertMs(difference);
    updateTimerInterface(time);
  }, 1000);
}

// Додаємо обробник події для кнопки Start
startButton.addEventListener('click', startTimer);
