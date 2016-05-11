var mathAdd = require('../../math/add.js');
var assert = require('assert');
exports.it_should_add_two_numbers = function(){
  var result = mathAdd(2, 3);
  assert.ok( result === 5 );
};
