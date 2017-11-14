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
var today = new Date(), day = today.getDate(), month = today.getMonth() + 1, year = today.getFullYear();
if (day < 10) {
  var dayString = '0' + day.toString();
  day = parseInt(dayString);
}
var todaysDate = document.getElementById('sDate');
todaysDate.min = year + '-' + month + '-' + day;
var endDate = document.getElementById('eDate');
endDate.min = year + '-' + month + '-' + dateShift();
function dateShift() {
  today.setDate(today.getDate() + 1);
  return today.getDate();
}
function dateExp() {
  today.setDate(today.getDate() + 6);
  day = today.getDate();
  return day;
}

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
  this.pagesCost = 0;
  this.products = parseInt(products);
  this.productsCost = 0;
  this.rush = rushOrder;
  this.totalCost = 0;
  this.rushCost = 0;
  this.timeline = 0;
  this.calcTime = function() {
    if (this.projectType === 'basic') {
      this.timeline = 8;
      this.timeline += (Math.ceil(this.pages / 5)) * 2;
    }
    if (this.projectType === 'eCommerce' || this.projectType === 'membership' || this.projectType === 'onlineCourse') {
      if (this.products) {
        this.timeline = 24;
        this.timeline += (Math.ceil(this.products / 5)) * 2;
      } else {
        this.timeline = 24;
      }
    }
  };
  this.calcCost = function() {
    if (this.pages > 0) {
      this.pagesCost = (Math.ceil(this.pages / 5)) * 750;
    }
    if (this.products > 0) {
      this.productsCost = (Math.ceil(this.products / 5)) * 750;
      console.log('number of products: ' + this.products);
      console.log('products extra cost: ' + this.productsCost);
    }
    if (this.projectType === 'basic') {
      this.totalCost += 5000;
      this.totalCost = this.totalCost + this.pagesCost;
    }
    if (this.projectType === 'eCommerce') {
      this.totalCost += 15000;
      this.totalCost = this.totalCost + this.pagesCost + this.productsCost;
    }
    if (this.rush < this.timeline) {
      this.rushCost = (this.timeline / this.Rush) * this.totalCost;
    }
  };
  projectQuote.push(this);
}

var projectInfo = document.getElementById('projectInfo');
var projectTitle = document.getElementById('project-title');
var clientName = document.getElementById('client-name');
var validProp = document.getElementById('valid');
var timelineSpan = document.getElementById('timeline');
var costBreakDownUl = document.getElementById('costBreakdown');
var totalCostSpan = document.getElementById('totalCost');

function submitProjectInfo(event) {
  event.preventDefault();

  var projectType = event.target.projectType.value;
  var pages = event.target.pages.value;
  var products = event.target.products.value;
  var rushOrder = event.target.rush.value;
  console.log('is rush job? ' + rushOrder);

  var newProject = new Project(projectType, pages, products, rushOrder);
  newProject.calcTime();
  newProject.calcCost();

  if (newProject.projectType === 'basic') {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Basic 5 Page Website Base: $5,000');
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  } else if (newProject.projectType === 'eCommerce') {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Basic eCommerce (10 Pages + first 5 products): $15,000');
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  if (newProject.pages > 0) {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Extra Pages: ' + newProject.pages + '. Cost: $' + newProject.pagesCost.toLocaleString());
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  if (newProject.products > 0) {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Extra Products: ' + newProject.products + '. Cost: $' + newProject.productsCost.toLocaleString());
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  if (newProject.rush === true) {
    console.log('populate rush order: ' + newProject.rush);
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Rush Order adds an additional: $' + newProject.totalCost.toLocaleString());
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  projectTitle.textContent = firstLetterCapital(projectType);
  clientName.textContent = userInfo[0].fName + ' ' + userInfo[0].lName;
  dateExp();
  validProp.textContent = month + '/' + day + '/' + year;
  timelineSpan.innerText = newProject.timeline + ' weeks';
  totalCostSpan.innerText = '$' + newProject.totalCost.toLocaleString() + '.';
}

// function displayBreakdown() {
//   var currentProject = projectQuote[0];
//   var currentProjectTimeline = projectQuote.timeline;
// }

projectInfo.addEventListener('submit', submitProjectInfo);

function firstLetterCapital (word) {
  var wordArray = word.split(' ');
  var newWordArray = [];
  for (var i = 0; i < wordArray.length; i++) {
    newWordArray.push(wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1));
  }
  return newWordArray.join(' ');
}
