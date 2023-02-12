import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
const refPlayer = document.querySelector('#vimeo-player');
console.log(refPlayer);
const STORAGE_KEY = 'videoplayer-current-time';
let player;

startPlayer();
setPlayerTime();

function startPlayer() {
  if (refPlayer) {
    player = new Vimeo(refPlayer);
    player.on(
      'timeupdate',
      throttle(function (event) {
        localStorage.setItem(STORAGE_KEY, event.seconds);
      }, 1000)
    );
  }
}
function setPlayerTime() {
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY) ?? 0);
}
