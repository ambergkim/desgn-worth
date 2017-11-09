'use strict';
var userInfo = [];
var projectQuote = [];

function User() {
  this.fname = fname;
  this.lname = lname;
  this.company = comapny;
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
