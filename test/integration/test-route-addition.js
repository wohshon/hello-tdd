var supertest = require('supertest'),
app = require('../../application.js');

exports.it_should_return_200_for_addition = function(cb){
  supertest(app)
  .get('/add?a=2&b=6')
  .expect('{"msg":" result:8"}', 200)
  .end(cb);
};

exports.it_should_require_query_params = function(cb){
  supertest(app)
  .get('/add')
  .expect(400)
  .end(cb);
};

exports.it_should_return_200_for_subtraction=function(cb) {
	supertest(app)
	.get('/subtract?a=3&b=1')
	.expect('{"msg":" result:2"}', 200)
	//.expect(200)
	.end(cb);
};

exports.it_should_require_query_params_for_subtract = function(cb){
  supertest(app)
  .get('/subtract')
  .expect(400)
  .end(cb);
};
