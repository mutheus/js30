const app = (function() {
  return {
    init: function init() {
      app.getControls();
    },
    
   getControls: function getControls() {
     const controls = document.querySelectorAll('.controls input');
     console.log(controls);
     
     controls.forEach(input => input.addEventListener('change', app.handleChange));
     controls.forEach(input => input.addEventListener('mousemove', app.handleChange));
   },
   
   handleChange: function handleChange() {
     const value = /^#/.test(this.value) ? this.value : this.value + 'px';
     
     document.documentElement.style.setProperty(`--${this.name}`, value);
   }
  }
})();

app.init();