const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

function mouseDrag(pageX) {
  isDown = true;
  slider.classList.add('active');
  startX = actualX(pageX);
  scrollLeft = slider.scrollLeft;
}

function mouseDrop() {
  isDown = false;
  slider.classList.remove('active');
}

function mouseMove(pageX) {
  if (!isDown) return;
  e.preventDefault();
  const x = actualX(pageX);
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
}

function actualX(x) {
  return x - slider.offsetLeft;
}

slider.addEventListener('mousedown', (e) => mouseDrag(e.pageX));
slider.addEventListener('mouseleave', mouseDrop)
slider.addEventListener('mouseup', mouseDrop);
slider.addEventListener('mousemove', (e) => mouseMove(e.pageX));