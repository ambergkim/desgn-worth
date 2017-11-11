'use strict';

var navButton = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

var showHideNav = function(event) {
  event.preventDefault();
  console.log('click event ' + event.target);
  if (navLinks.classList.contains('navHide')) {
    navLinks.classList.remove('navHide');
    navButton.className += ' is-active';
  } else {
    navLinks.className += ' navHide';
    navButton.classList.remove('is-active');
  }
};

navButton.addEventListener('click', showHideNav);
