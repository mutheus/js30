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
    
    drawLine: function drawLine(e) {
      if(!isDrawing)
        return;
      
      let pageX;
      let pageY;
    
      switch(e.type) {
        case 'click':
        case 'mousemove':
          pageX = e.offsetX;
          pageY = e.offsetY;
          break;
        default:
          pageX = e.changedTouches[0].pageX;
          pageY = e.changedTouches[0].pageY;
          break;
      }
      
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(pageX, pageY);
      context.stroke();
      
      [lastX, lastY] = [pageX, pageY];
    },
    
    mouseOrTouchEvent: function mouseOrTouchEvent(e) {
      [isDrawing] = [true];
      
      [lastX, lastY] = [e.offsetX, e.offsetY];
    },
    
    drawingEndOrOut: function drawingEndOrOut() {
      [isDrawing] = [false];
    },
    
    draw: function draw() {
      canvas.addEventListener('mousedown', app.mouseOrTouchEvent);
      canvas.addEventListener('touchstart', app.mouseOrTouchEvent);
      canvas.addEventListener('click', app.mouseOrTouchEvent);
      
      canvas.addEventListener('mousemove', app.drawLine);
      canvas.addEventListener('touchmove', app.drawLine);
      canvas.addEventListener('click', app.drawLine);

      canvas.addEventListener('mouseup', app.drawingEndOrOut);
      canvas.addEventListener('touchend', app.drawingEndOrOut);
      canvas.addEventListener('mouseout', app.drawingEndOrOut);
      canvas.addEventListener('touchcancel', app.drawingEndOrOut);
    },
  };
})();

app.init();