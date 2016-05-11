var mathSub = require('../../math/subtract.js');
var assert = require('assert');
exports.it_should_subtract_two_numbers = function(){
  var result = mathSub(3, 1);
  assert.ok( result === 2 );
};
