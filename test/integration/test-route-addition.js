var supertest = require('supertest'),
app = require('../../application.js');

exports.it_should_return_200_for_addition = function(cb){
  supertest(app)
  .get('/add?a=2&b=6')
  .expect(200)
  .end(cb);
};

exports.it_should_require_query_params = function(cb){
  supertest(app)
  .get('/add')
  .expect(400)
  .end(cb);
};
