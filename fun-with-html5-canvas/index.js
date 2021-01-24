const app = (function() {
  return {
    init: function init() {
      [canvas] = [document.querySelector('#draw')];
      [context] = [canvas.getContext('2d')];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.strokeStyle = '#000';
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.lineWidth = 5;
      
      this.draw();
    },
    
    drawLine: function drawLine(actualCoordinates) {
      if(!isDrawing)
        return;
      
      context.beginPath();
      context.moveTo(...lastCoordinates);
      context.lineTo(...actualCoordinates);
      context.stroke();
      
      [lastCoordinates] = [actualCoordinates];
    },
    
    mouseOrTouchEvent: function mouseOrTouchEvent(e) {
      [isDrawing] = [true];
      
      [lastCoordinates] = [[e.offsetX, e.offsetY]];
    },
    
    drawingEndOrOut: function drawingEndOrOut() {
      [isDrawing] = [false];
    },
    
    draw: function draw() {
      canvas.addEventListener('mousedown', app.mouseOrTouchEvent);
      canvas.addEventListener('touchstart', app.mouseOrTouchEvent);
      canvas.addEventListener('click', app.mouseOrTouchEvent);
      
      canvas.addEventListener('mousemove', (e) => app.drawLine([e.offsetX, e.offsetY]));
      canvas.addEventListener('click', (e) => app.drawLine([e.offsetX, e.offsetY]));
      canvas.addEventListener('touchmove', (e) => app.drawLine([e.changedTouches[0].pageX, e.changedTouches[0].pageY]));

      canvas.addEventListener('mouseup', app.drawingEndOrOut);
      canvas.addEventListener('touchend', app.drawingEndOrOut);
      canvas.addEventListener('mouseout', app.drawingEndOrOut);
      canvas.addEventListener('touchcancel', app.drawingEndOrOut);
    },
  };
})();

app.init();