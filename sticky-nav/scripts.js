const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;


function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);