// npm i lodash.throttle - загрузка одного метода throttle
import throttle from 'lodash.throttle';
// npm i lodash.debounce - загрузка одного метода debounce
import debounce from 'lodash.debounce';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

// Поставить функцию запоминания последнего значения полей формы
// ПРИ ЗАГРУЗКЕ СТРАНИЦЫ работает - до других функций
savedRecords();

// Функция контроля заполнения полей формы
function onFormInput(e) {
  // console.log('e.target.name', e.target.name);
  // console.log('e.target.value', e.target.value);

  // Если такого ключа в объекте не будет - он создается со значением
  // Если ключ будет - он перезапишется с новым значением
  // Для Lodash на событии обязательно target
  // при currentTarget ошибка в консоли - долго всплывает событие, может лежать window или document
  formData[e.target.name] = e.target.value;
  // console.log('formData', formData);

  // Перевод в JSON формат для записи в хранилище
  const modifiedFormData = JSON.stringify(formData);
  // console.log('JSON.stringify(formData)', modifiedFormData);

  // Запись в хранилище localStorage
  localStorage.setItem(STORAGE_KEY, modifiedFormData);
}

// Функция удаления полей формы
function onFormSubmit(e) {
  e.preventDefault();

  console.log('formData при отправке Submit', formData);

  // Метод reset() у формы - сбрсывает значения ВСЕХ ПОЛЕЙ
  // ВСЕ ПОЛЯ становятся пустыми после отправки формы
  e.currentTarget.reset();

  // очистка хранилища localStorage
  localStorage.removeItem(STORAGE_KEY);
}

// Функция сохранения текущего значения полей формы при перезагрузке страницы
function savedRecords() {
  // Вывести данные из формата JSON и привести в строку,
  // если форма сохранилась с пустым name или email

  const haveStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  // console.log('haveStorage', haveStorage);
  // console.log('typeof haveStorage', typeof haveStorage);

  // Если сохраненная запись в localStorage ЕСТЬ - TRUE через строку
  // Если в localStorage пусто - null, он приводится к FALSE
  if (haveStorage) {
    // console.log(haveStorage.email);
    // console.log(typeof haveStorage.email);

    // Записать в поля предыдущие значения если произошла случайно
    //  перезагрузка страницы до отправки формы через Submit

    // undefined и пустая строка приводится к false
    // if (haveStorage.email !== undefined)
    //  if (haveStorage.message !== undefined)
    // undefined - ввел символ, удалил и перезапустил страницу
    if (haveStorage.email) {
      refs.input.value = haveStorage.email;
    }

    if (haveStorage.message) {
      refs.textarea.value = haveStorage.message;
    }
  }
}
