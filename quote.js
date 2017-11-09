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

function Project(basic, eCommerce, pages, products, rush) {
  this.basic = basic;
  this.eCommerce = eCommerce;
  this.pages = parseInt(pages);
  this.products = parseInt(products);
  this.rush = rush;
  this.totalCost = 0;
  this.calcCost = function() {
    if (this.basic === true) {
      this.totalCost += 5000;
    }
    if (this.eCommerce === true) {
      this.totalCost += 15000;
    }
    var pagesCost = (Math.floor(this.pages / 5)) * 750;
    var productsCost = (Math.floor(this.products / 5)) * 750;
    this.totalCost = this.totalCost + pagesCost + productsCost;
  };
  this.timeframe = function() {
    //calc timeFrame
    //rush order x2
  };
  projectQuote.push(this);
}
var newProject = new Project(false, true, 12, 10, false);
newProject.calcCost();
console.log('For an eCommerce site with 12 pages, 10 products, and no rush, the cost is: $' + newProject.totalCost);
