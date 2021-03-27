const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const record = document.querySelector('.record');
let lastHole;
let timeUp = false;
let score = 0;
let lastScore = localStorage.getItem('score', score);
record.textContent = lastScore !== null ? lastScore : 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  
  if (hole === lastHole) {
    return randomHole(holes);
  }
  
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  
  setTimeout(() => {
    hole.classList.remove('up');
    
    if (!timeUp)
      peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  peep();
  score = 0;
  
  setTimeout(() => {
    timeUp = true;
    if (lastScore < score) {
      localStorage.setItem('score', score);
      record.textContent = score;
    }
  }, 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));