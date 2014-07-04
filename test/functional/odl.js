var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/util/setup-functional');

describe("ODL Website", function () {   

    var app = setup();

    it("should load the demo page", function (done) {
        app.http.get(app.url('/'), function(data, response) {
            expect(data).to.contain('Open Device Lab');
            done();
        });           
    });

    it("should load the qrs page", function (done) {
        app.http.get(app.url('/qrs.html'), function(data, response) {
            expect(data).to.contain('Open Device Lab');
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
