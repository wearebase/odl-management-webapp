var rekuire = require('rekuire');
var expect = rekuire('chai').expect;

describe("odl", function () {   

	var client = new (rekuire('node-rest-client').Client)();
	var app = rekuire('src/odl');
	var port = 9000;

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
