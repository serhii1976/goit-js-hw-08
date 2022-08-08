import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};
player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem('videoplayer-current-time');
const parsedCurrentTime = JSON.parse(currentTime);
let parsedSeconds = 0;
if (parsedCurrentTime) {
  parsedSeconds = Math.floor(parsedCurrentTime.seconds);
}
player
  .setCurrentTime(parsedSeconds)
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
