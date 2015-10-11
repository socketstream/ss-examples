'use strict';

var ss,
    chai = require("chai"),
    expect = chai.expect;

describe('Demo', function() {
  beforeEach(function(done) {
    ss = require("socketstream").start('test-socketstream',done);
  });

  describe('sendMessage', function() {

    it('should publish messages received', function(done) {
      var text = 'Hello World!';
      ss.rpc('demo.sendMessage', text, function(res) {
        expect(res).to.equal([true]);
        //TODO published expectations
        // expect(..).to.equal({ status:'success', content:text});
      })
    });
  });
});
