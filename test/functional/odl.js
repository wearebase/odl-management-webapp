var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/functional/setup');

describe("odl", function () {   

    var app = setup();

    it("should salutate when hitting the root", function (done) {
        app.http.get(app.url('/'), function(data, response) {
            expect(data).to.equal('Hello ODL!!');
            done();
        });           
    });

    it("should complain when hitting everything else", function (done) {
        app.http.get(app.url('/whatever'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });           
    });     
    
});    
