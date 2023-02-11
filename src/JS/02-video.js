import Vimeo from '@vimeo/player';
const refPlayer = document.querySelector('#vimeo-player');
console.log(refPlayer);
const STORAGE_KEY = 'videoplayer-current-time';
let player;
if (refPlayer) {
  startPlayer();
  setPlayerTime();
}
function startPlayer() {
  if (refPlayer) {
    player = new Vimeo(refPlayer);
    player.on('timeupdate', function (event) {
      localStorage.setItem(STORAGE_KEY, event.seconds);
    });
  }
}

function setPlayerTime() {
  let currentTime;
  if (localStorage.getItem(STORAGE_KEY)) {
    currentTime = localStorage.getItem(STORAGE_KEY);
  } else {
    currentTime = 0;
  }
  player
    .setCurrentTime(currentTime)
    .then(function (currentTime) {
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
}
