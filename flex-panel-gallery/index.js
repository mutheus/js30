const app = (function() {
  return {
    init: function init() {
      this.expand();
    },
    
    expand: function expand() {
      const panels = document.querySelectorAll('.panel');
      
      panels.forEach(panel => panel.addEventListener('click', app.toggleOpen));
      panels.forEach(panel => panel.addEventListener('transitionend', app.toggleOpenActive));
    },
    
    toggleOpen: function toggleOpen() {
      this.classList.toggle('open');
    },
    
    toggleOpenActive: function toggleOpenActive(e) {
      if(e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
      }
    }
  };
})();

app.init();