const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const controls = player.querySelector('.player__controls');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreenBtn = player.querySelector('.full-screen');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += Number(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(coordinate) {
  const scrubTime = (coordinate / progress.offsetWidth) * video.duration;
  
  video.currentTime = scrubTime;
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    screen.orientation.lock('landscape-primary');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      screen.orientation.unlock();
    }
  }
}

function showControls() {
  controls.classList.toggle('initial');
}

let timesClicked = 0;
let time;

function handleTouchOrMouse(e) {
  clearTimeout(time);
  
  if (e.type === 'click') {
    timesClicked += 1;
    video.muted = false;
    
    if (timesClicked === 2) {
      if (e.type === 'touchstart') {
        e.preventDefault();
        video.addEventListener('touchstart', showControls);
        timesClicked = 1;
      } else {
        if (e.type === 'click') {
          showControls();
          timesClicked = 1;
        }
      }
      
      time = setTimeout(() => {
        controls.classList.remove('initial');
      }, 2000);
    }
  }
  
  if (e.type === 'touchstart') {
    video.removeEventListener('mouseover', handleTouchOrMouse);
    video.removeEventListener('mouseout', handleTouchOrMouse);
  }
  
  if (e.type === 'mouseover' || e.type === 'mouseout') {
    showControls();
  }
}

video.addEventListener('click', handleTouchOrMouse);
video.addEventListener('touchstart', handleTouchOrMouse);
video.addEventListener('mouseover', handleTouchOrMouse);
video.addEventListener('mouseout', handleTouchOrMouse);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', (e) => scrub([e.offsetX]));
progress.addEventListener('mousemove', (e) => mousedown && scrub([e.offsetX]));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('touchmove', (e) => mousedown && scrub([e.changedTouches[0].pageX]));
progress.addEventListener('touchstart', () => mousedown = true);
progress.addEventListener('touchend', () => mousedown = false);

fullScreenBtn.addEventListener('click', toggleFullScreen);