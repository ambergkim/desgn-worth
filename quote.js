'use strict';
var userInfo = [];
var projectQuote = [];

function User(fName, lName, company, email, phone, sDate, eDate) {
  this.fName = fName;
  this.lName = lName;
  this.company = company;
  this.email = email;
  this.phone = phone;
  this.sDate = sDate;
  this.eDate = eDate;
  userInfo.push(this);
}

var basicFormEl = document.getElementById('basicForm');
// var today = new Date(), day = today.getDate(), month = today.getMonth(), year = today.getFullYear();
// var todaysDate = document.getElementById('sDate');
// todaysDate.min = month + '-' + '0' + day + '-' + year;

function submitBasicForm(event) {
  event.preventDefault();
  var firstName = event.target.fName.value;
  var lastName = event.target.lName.value;
  var company = event.target.company.value;
  var email = event.target.email.value;
  var phone = event.target.phone.value;
  var startDate = event.target.sDate.value;
  var endDate = event.target.eDate.value;

  new User (firstName, lastName, company, email, phone, startDate, endDate);
  console.log(userInfo);

  event.target.fName.value = null;
  event.target.lName.value = null;
  event.target.company.value = null;
  event.target.email.value = null;
  event.target.phone.value = null;
  event.target.sDate.value = null;
  event.target.eDate.value = null;

  localStorage.setItem('UserOne', JSON.stringify(userInfo));
  var retrievedObject = localStorage.getItem('UserOne');
}

basicFormEl.addEventListener('submit', submitBasicForm);

function Project(projectType, pages, products, rushOrder) {
  this.projectType = projectType;
  this.pages = parseInt(pages);
  this.products = parseInt(products);
  this.rush = rushOrder;
  this.totalCost = 0;
  this.timeline = 0;
  this.calcCost = function() {
    var pagesCost = 0;
    var productsCost = 0;
    if (this.projectType === 'basic') {
      this.totalCost += 5000;
      pagesCost = (Math.ceil(this.pages / 5)) * 750;
      this.totalCost = this.totalCost + pagesCost;
    }
    if (this.projectType === 'eCommerce') {
      this.totalCost += 15000;
      pagesCost = (Math.ceil(this.pages / 5)) * 750;
      productsCost = (Math.ceil(this.products / 5)) * 750;
      this.totalCost = this.totalCost + pagesCost + productsCost;
    }
    if (this.rush === true) {
      this.totalCost = this.totalCost * 2;
    }
  };
  this.calcTime = function() {
    if (this.projectType === 'basic') {
      this.timeline = 8;
      this.timeline += (Math.ceil(this.pages / 5)) * 2;
    }
    if (this.projectType === 'eCommerce') {
      if (this.products) {
        this.timeline = 24;
        this.timeline += (Math.ceil(this.products / 5)) * 2;
      } else {
        this.timeline = 24;
      }
    }
    if (this.rush === true) {
      this.timeline = Math.ceil(this.timeline / 2);
    }
  };
  projectQuote.push(this);
}

var projectInfo = document.getElementById('projectInfo');

function submitProjectInfo(event) {
  event.preventDefault();

  var projectType = event.target.projectType.value;
  var pages = event.target.pages.value;
  var products = event.target.products.value;
  var rushOrder = event.target.rush.checked;
  console.log('rush value: ' + rushOrder);

  var newProject = new Project(projectType, pages, products, rushOrder);
  newProject.calcCost();
  newProject.calcTime();

  console.log(newProject.timeline + ' weeks');
}

function displayBreakdown() {
  var currentProject = projectQuote[0];

}

projectInfo.addEventListener('submit', submitProjectInfo);

function popProp () {
  var proposalEl = document.getElementById('proposal');
  var aboutEl = document.getElementById('about');
  var breakdownEl = document.getElementById('breakdown');
  var nextStepsEl = document.getElementById('nextSteps');

  // update text content of <p> to insert final cost value
  // cost = projectQuote[0].totalCost;
}
