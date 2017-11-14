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

function Project(projectType, pages, products, courses, rushOrder, marketing, reviewManagement, websiteMaintenance) {
  this.projectType = projectType;
  this.pages = parseInt(pages);
  this.pagesCost = 0;
  this.products = parseInt(products);
  this.productsCost = 0;
  this.courses = parseInt(courses);
  this.courseCost = 0;
  this.rush = rushOrder;
  this.totalCost = 0;
  this.timeline = 0;
  this.marketing = marketing;
  this.reviewManagement = reviewManagement;
  this.websiteMaintenance = websiteMaintenance;
  this.calcCost = function() {
    if (this.pages > 0) {
      this.pagesCost = (Math.ceil(this.pages / 5)) * 750;
    }
    if (this.products > 0) {
      this.productsCost = (Math.ceil(this.products / 5)) * 750;
    }
    if (this.projectType === 'basic') {
      this.totalCost += 5000;
      this.totalCost = this.totalCost + this.pagesCost;
    }
    if (this.projectType === 'eCommerce' || this.projectType === 'membership' || this.projectType === 'onlineCourse') {
      this.totalCost += 15000;
      this.totalCost = this.totalCost + this.pagesCost + this.productsCost;
    }
    if(this.courses > 0) {
      this.courseCost = 10000 * this.courses;
      this.totalCost = this.totalCost + this.courseCost;
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
      if (this.products > 0) {
        this.timeline = 24;
        this.timeline += (Math.ceil(this.products / 5)) * 2;
      } else {
        this.timeline = 24;
      }
    }
    if (this.projectType === 'membership'){
      this.timeline = 24;
      this.timeline += (Math.ceil(this.pages / 5)) * 2;
    }
    if (this.projectType === 'onlineCourse') {
      if (this.courses > 0) {
        this.timeline = 24;
        this.timeline = this.timeline * this.courses;
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
  var courses = event.target.courses.value;
  var rushOrder = event.target.rush.checked;
  var marketing = event.target.marketing.checked;
  var reviewManagement = event.target.reviewManagement.checked;
  var websiteMaintenance = event.target.websiteMaintenance.checked;

  var newProject = new Project(projectType, pages, products, courses, rushOrder, marketing, reviewManagement, websiteMaintenance);
  newProject.calcCost();
  newProject.calcTime();

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
  } else if(newProject.projectType === 'membership') {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Basic Membership (10 Pages and 3 Membership Levels): $15,000');
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }else if(newProject.projectType === 'onlineCourse') {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Basic Online Course (10 Pages and 1 Course): $15,000');
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
  if (newProject.courses > 0) {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Extra Courses: ' + newProject.courses + '. Cost: $' + newProject.courseCost.toLocaleString());
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  if (newProject.rush === true) {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Rush Order adds an additional: $' + newProject.totalCost.toLocaleString());
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  if (newProject.marketing === true) {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('Thank you for your interest in Markting, we will have our marketing specialist sitting in our your follow-up call.');
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  if (newProject.reviewManagement === true) {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('It is good that you are being proactive with your online reputation, we are excited about the possibility of helping you get more "5-Star" reviews online.');
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  if (newProject.websiteMaintenance === true) {
    var baseLi = document.createElement('li');
    var baseNode = document.createTextNode('We have many different levels of Website Maintenance, in our follow-up call we will go over the different levels and help you pick out the right level.');
    baseLi.appendChild(baseNode);
    costBreakDownUl.appendChild(baseLi);
  }
  projectTitle.textContent = firstLetterCapital(projectType);
  clientName.textContent = userInfo[0].fName + ' ' + userInfo[0].lName;
  dateExp();
  validProp.textContent = month + '/' + day + '/' + year;
  timelineSpan.innerText = newProject.timeline + ' weeks';
  totalCostSpan.innerText = '$' + newProject.totalCost.toLocaleString() + '.00';
}

projectInfo.addEventListener('submit', submitProjectInfo);

function firstLetterCapital (word) {
  var wordArray = word.split(' ');
  var newWordArray = [];
  for (var i = 0; i < wordArray.length; i++) {
    newWordArray.push(wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1));
  }
  return newWordArray.join(' ');
}
