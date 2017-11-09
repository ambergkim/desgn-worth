'use strict';
var userInfo = [];
var projectQuote = [];

<<<<<<< HEAD
function User(fName, lName, company, email, phone) {
  this.fName = fName;
  this.lName = lName;
  this.company = company;
=======
  function User(fName, lName, company, email, phone) {
  this.fName = fName;
  this.lName = lName;
  this.company = company;

>>>>>>> 1e50762836e02dcdf660753e07d0975d382a24dd
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
