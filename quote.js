'use strict';
var userInfo = [];
var projectQuote = [];

function User(fName, lName, company, email, phone) {
  this.fName = fName;
  this.lName = lName;
  this.company = company;
  this.email = email;
  this.phone = phone;
  userInfo.push(this);
}

function Project() {
  this.basic = basic;
  this.eCommerce = eCommerce;
  this.pages = pages;
  this.products = products;
  this.rush = boolean;
  this.cost = function() {
    //add base cost
    //calc pages cost
    //calc products if eCommerce
  };
  this.timeframe = function() {
    //calc timeFrame
    //rush order x2
  };
  projectQuote.push(this);
}

var basicFormEl = document.getElementById('basicForm');

function submitBasicForm (event) {
  event.preventDefault();

  var firstName = event.target.fName.value;
}
