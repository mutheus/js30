(function(window, document) {
  const dataKeys = document.querySelectorAll('.key');
  
  const soundPlay = function(e) {
    const keyCode = e.keyCode ? e.keyCode : e.target.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
   
    if(!audio)
      return;
    audio.currentTime = 0;
    
    audio.play();
    
    key.classList.add('playing');
  }
  
  const removeTransition = function(e) {
    if(e.propertyName !== 'transform')
      return;
    this.classList.remove('playing');
  }
  
  const keys = function(key) {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('click', soundPlay, true);
  }
  
  dataKeys.forEach(keys);
  
  window.addEventListener('keydown', soundPlay);
})(window, document);