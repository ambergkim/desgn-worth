'use strict';
//event listener to grab formButton
var submitMsg = document.getElementById('submitMsg');
var formButton = document.getElementById('contactForm');
var showMsg = function(event) {
  event.preventDefault();
  var sectionEl = document.getElementById('confirmationMsg');
  sectionEl.classList.remove('shrunkenConfirm');
  sectionEl.classList.add('expandedConfirm');
};
contactForm.addEventListener('submit', showMsg);
