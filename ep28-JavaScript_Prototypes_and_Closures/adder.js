
// The following example fails if the user decides
// to create var adder = new Adder(1);
// adder.add(); will return NaN because
// this.b is undefined
//
// var Adder = function(a, b) {
//  this.a = a;
//  this.b = b;
// };
//
// Adder.prototype.add = function() {
//  return this.a + this.b;
// };
// module.exports = Adder;
//
///////////////////////////////////////////////////////////
//
// The following example fixes the new Adder(1) issue BUT
// does not prevent a user to do replace the coalesce function
// adder.__proto__.coalesce = function() {};
//
// var Adder = function(a, b) {
//  this.a = a;
//  this.b = b;
// };
//
// Adder.prototype.coalesce = function() {
//  if(!this.a) { this.a = 0; }
//  if(!this.b) { this.b = 0; }
// };
//
// Adder.prototype.add = function() {
//  this.coalesce();
//  return this.a + this.b;
// };
// module.exports = Adder;
//
///////////////////////////////////////////////////////////
//
// To fix that we could wrap everything inside the constructor
// encapsulate the data and just expose the methods
// for that a and b should not be public
// we can do that by using closures as follows
//
// var Adder = function(a, b) {
//
//  function coalesce() {
//    if(! a) { a = 0; }
//    if(! b) { b = 0; }
//  };
//
//  this.add = function() {
//    coalesce();
//    return a + b;
//  };
// };
// module.exports = Adder;
//
///////////////////////////////////////////////////////////
// Another problem is that the user must use the 'new' keyword
// we should just return the object that exposes the add function
//
// var Adder = function(a, b) {
//
//  function coalesce() {
//    if(! a) { a = 0; }
//    if(! b) { b = 0; }
//  };
//
//  function add() {
//    coalesce();
//    return a + b;
//  };
//
//  return {
//    add: add
//  };
// };
// module.exports = Adder;
//
// let's say you want to inherit it
// using prototypical chaining..

var EventEmitter = require('events').EventEmitter;

var Adder = function (a, b) {

  function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  console.log('isNumber(a) = ', isNumber(a));
  console.log('isNumber(b) = ', isNumber(b));

  if(!isNumber(a) || !isNumber(b)) {
    throw new Error('Adder needs numbers');
  };

  // this is that
  var that;

  function coalesce() {
    if(! a) { a = 0; }
    if(! b) { b = 0; }
  };

  function add() {
    coalesce();
    that.emit('add', a, b);
    return parseFloat(a) + parseFloat(b);
  };

	that =  {
    add: add
  };

  that.__proto__ = EventEmitter.prototype;

  return that;
};
module.exports = Adder;
