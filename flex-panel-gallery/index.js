const app = (function() {
  return {
    init: function init() {
      this.expand();
    },
    
    expand: function expand() {
      app.panels().forEach(panel => panel.addEventListener('click', app.toggleOpen));
      app.panels().forEach(panel => panel.addEventListener('transitionend', app.toggleOpenActive));
    },
    
    toggleOpen: function toggleOpen() {
      this.classList.toggle('open');
      
      app.panels().filter(panel => panel !== this).forEach(app.closeRemaining);
    },
    
    toggleOpenActive: function toggleOpenActive(e) {
      if(e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
      }
    },
    
    panels: function panels() {
      return Array.from(document.querySelectorAll('.panel'));
    },
    
    closeRemaining: function closeRemaining(panel) {
      panel.classList.remove('open');
    }
  };
})();

app.init();