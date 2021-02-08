var script = document.createElement('script'); 
script.src = "https://www.cornify.com/js/cornify.js"; 
document.head.appendChild(script)

const pressed = [];
const secretCode = 'wesbos';
window.addEventListener('keyup', (e) => {
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  
  if (pressed.join('').includes(secretCode)) {
    cornify_add();
  }
});