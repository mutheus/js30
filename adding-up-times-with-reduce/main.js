const videoList = [...document.querySelectorAll('[data-time]')];

const timeInSecs = videoList
  .map(video => video.dataset.time)
  .map(time => {
    const [mins, secs] = time.split(':').map(parseFloat);
    
    return (mins * 60) + secs;
  })
  .reduce((accu, secs) => accu + secs);

let actualSecs = timeInSecs;

const hours = Math.floor(actualSecs / 3600);
actualSecs = actualSecs % 3600;

const mins = Math.floor(actualSecs / 60);
actualSecs = actualSecs % 60;

console.log(hours, mins, actualSecs);