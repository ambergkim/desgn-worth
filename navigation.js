var navButton = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

var showHideNav = function(event) {
  event.preventDefault();
  console.log('click event ' + event.target);
  if (navLinks.classList.contains('navHide')) {
    navLinks.classList.remove('navHide');
  } else {
    navLinks.className += ' navHide';
  }
};

navButton.addEventListener('click', showHideNav);
