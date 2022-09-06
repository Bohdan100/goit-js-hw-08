// Add imports above this line
import { galleryItems } from './gallery-items';

console.log(galleryItems);

// 1. ПОДКЛЮЧЕНИЕ БИБЛИОТЕКИ SimpleLightbox,
// которая пришла по npm install simplelightbox
import SimpleLightbox from 'simplelightbox';

// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

// 1. CОЗДАНИЕ ГАЛЕРЕИ ИЗОБРАЖЕНИЙ
const galleryItemsContainer = document.querySelector('.gallery');
console.log(galleryItemsContainer);

const itemsMarkup = createItemsMarkup(galleryItems);
console.log(itemsMarkup);

// Вставка готовых элементов галереи в html
galleryItemsContainer.insertAdjacentHTML('afterbegin', itemsMarkup);

// Функция создания галереи изображений
function createItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>`;
    })
    .join('');
}

// 2. РАБОТА БИБЛИОТЕКИ simpleLightbox НА ЕЛЕМЕНТ, КОТОРЫЙ КЛИКНУЛИ
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // подпись картинки - текст из alt тега img
  captionDelay: 250, // задержка показа подписи - по умолчанию 0
  fadeSpeed: 250, // 300 - по умолчанию
  overlayOpacity: 0.6,
  animationSpeed: 200, // 250 по умолчанию
  widthRatio: 1, // 0.8 - по умолчанию
  heightRatio: 1, // 0.9 - по умолчанию
  preloading: false, // убрать постоянную подзагрузку первой фотографии
  // overlay: false,
  // captionPosition: "top",
  // close: false,
  // closeText: "⊗",
  // showCounter: false, // счетчик номеров фотографий
});
// В simpleLightbox стоит по умолчанию enableKeyboard: true
//   ВЫХОД ИЗ ОКНА ПРОСМОТРА ПО КЛАВИШЕ ESCAPE
// + СТРЕЛКИ РАБОТАЮТ ДЛЯ ПРОКРУТКИ ИЗОБРАЖЕНИЙ
