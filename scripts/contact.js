'use strict';
//event listener to grab formButton
var submitMessage = document.getElementById('submitMessage');
var formButton = document.getElementById('contactForm');
var showMessage = function(event) {
  event.preventDefault();
  submitMessage.style.visibility = 'visible';
};
contactForm.addEventListener('submit', showMessage);
