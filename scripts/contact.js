'use strict';
//event listener to grab formButton
var submitMsg = document.getElementById('submitMsg');
console.log(submitMsg);
var formButton = document.getElementById('contactForm');
var showMsg = function(event) {
  event.preventDefault();
  var confirmMsg = document.getElementById('confirmMsg');
  confirmMsg.classList.remove('shrunkenConfirm');
  confirmMsg.classList.add('expandedConfirm');
};
contactForm.addEventListener('submit', showMsg);
