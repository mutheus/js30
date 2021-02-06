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
    }
  }