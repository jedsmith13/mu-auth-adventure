
var assert = require('assert');
var sinon = require('sinon');
var MockReq = require('mock-req');
var MockRes = require('mock-res');
var http = require('http');

var server = require('./test-server.js');

describe('server', function() {
    beforeEach(function() {
        this.request = sinon.stub(http, 'request');
    });

    afterEach(function() {
        http.request.restore();
    });

    it('should convert get result to string', function(done) {
        var expected = 'Successfully connected';
        var response = new MockRes();
        response.write(JSON.stringify(expected));
        response.end();

        var params = {
            method: 'GET',
            url: '/company?q=test+stuff'
        };

        var request = new MockReq(params);

        this.request.callsArgWith(1, response)
            .returns(request);

        server.get(function(err, result) {
            if (err) return console.error(err);
            assert.deepEqual(result, expected);
            done();
        });
    });

    it('should send post params in request body', function() {
        var params = {
            foo: 'bar'
        };
        var expected = JSON.stringify(params);

        var request = new MockReq({
            method: 'POST',
            url: '/company'
        });
        
        request.write({foo: 'bar'});
        
        var write = sinon.spy(request, 'write');

        this.request.returns(request);

        server.post(params, function() {});

        assert(write.withArgs(expected).calledOnce);
    });

    it('should pass request error to callback', function(done) {
        var expected = 'some error';
        var request = new MockReq();

        this.request.returns(request);

        server.get(function(err) {
            assert.equal(err, expected);
            done();
        });

        request.emit('error', expected);
    });

});
