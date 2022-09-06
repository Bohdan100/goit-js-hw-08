// npm install @vimeo/player - загрузка vimeo/player
import Player from '@vimeo/player';

// npm i lodash.throttle - загрузка одного метода throttle
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

// console.log(iframe);
// console.log(player);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

// Слушатель события по timeupdate
// throttle - обновление воспроизведения 1 раз в 1000 милисекунд
player.on(
  'timeupdate',
  throttle(function (data) {
    console.log(data.seconds);
    const modifiedData = JSON.stringify(data);
    console.log(data);
    console.log(modifiedData);
    localStorage.setItem(STORAGE_KEY, modifiedData);
  }, 1000)
);

// Функция для определения текущего времени плеера
// Заменяет - JSON.parse(localStorage.getItem(STORAGE_KEY)).seconds
function getPlayerTime(key) {
  const validTime = localStorage.getItem(key);
  if (validTime) {
    const savedCurrentTime = JSON.parse(validTime).seconds;
    return savedCurrentTime;
  }
}
// Функция запуска плеера с воспроизведением с текущей позиции
player
  .setCurrentTime(getPlayerTime(STORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
