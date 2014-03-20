var expect = require('chai').expect;
var client = new (require('node-rest-client').Client)();
var app = require('../../odl.js');
var port = 9000;

describe("odl", function () {   
    
    beforeEach(function(done) {
    	this.server = app.listen(port, done);
  	});

    afterEach(function(done) {
    	this.server.close(done);
  	});

    it("should salutate when hitting the root", function (done) {
        client.get("http://localhost:" + port, function(data, response) {
        	expect(data).to.equal('Hello ODL!!');
        	done();
        });           
    });     

    it("should complain when hitting everything else", function (done) {
        client.get("http://localhost:" + port + '/whatever', function(data, response) {
        	expect(response.statusCode).to.equal(404);
        	done();
        });           
    });     
    
});    
