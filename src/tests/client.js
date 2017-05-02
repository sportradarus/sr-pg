const client = require('../client')
describe('Client Tests', function () {
  it('should handle errored query', function (done) {
    client.query('select foo from bar where id = $1 and date = $2;', [1, 2]).should.be.rejected()
    done()
  })
  it('should successfully execute query', function (done) {
    client.query('select count(*) from pg_stat_activity;')
    .then(function (res) {
      res.should.have.property('rows')
      res.rows.should.be.an.instanceOf(Array)
      res.rows.length.should.equal(1)
      done()
    })
  })
})
