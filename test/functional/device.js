var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/functional/setup');

describe("Device API", function () {   

    var app = setup();

    it("should return all the devices when hit the device endpoint", function (done) {
        app.http.get(app.url('/device'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.length(3);
            expect(data[0]).to.have.property('imei').and.equal('012345678912345');
            expect(data[1]).to.have.property('imei').and.equal('112345678912345');
            expect(data[2]).to.have.property('imei').and.equal('212345678912345');
            done();
        });           
    });

    it("should create a new device and return it", function (done) {
        var args = {
            data: { imei: "312345678912345" },
            headers:{"Content-Type": "application/json"} 
        };
        app.http.post(app.url('/device'), args, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('312345678912345');
            done();
        });           
    });

});    
