var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/util/setup-functional');

describe("Booking API", function () {

    var app = setup(rekuire('test/data/db'));

    it("should check a phone in", function (done) {
        app.http.post(app.url('/check/in/012345678912345'), function(device, response) {
            expect(response.statusCode).to.equal(200);
            expect(device).to.have.property('imei').and.equal('012345678912345');
            expect(device).to.have.property('checkedIn').and.equal(true);
            done();
        });
    });

    it("shouldn't check a phone in that is already checked in", function (done) {
        app.http.post(app.url('/check/in/012345678912345'), function(device, response) {
            expect(response.statusCode).to.equal(200);
            expect(device).to.have.property('imei').and.equal('012345678912345');
            expect(device).to.have.property('checkedIn').and.equal(true);

            app.http.post(app.url('/check/in/012345678912345'), function(device, response) {
                expect(response.statusCode).to.equal(409);
                expect(device).to.have.property('imei').and.equal('012345678912345');
                expect(device.checkedIn).to.equal(true);
                done();
            });
        });
    });

    it("should check a phone out that was already checked in", function (done) {
        app.http.post(app.url('/check/in/012345678912345'), function(device, response) {
            expect(response.statusCode).to.equal(200);
            expect(device).to.have.property('imei').and.equal('012345678912345');
            expect(device).to.have.property('checkedIn').and.equal(true);

            app.http.post(app.url('/check/out/012345678912345'), function(device, response) {
                expect(response.statusCode).to.equal(200);
                expect(device).to.have.property('imei').and.equal('012345678912345');
                expect(device).to.have.property('checkedIn').and.equal(false);

                app.http.post(app.url('/check/in/012345678912345'), function(device, response) {
                    expect(response.statusCode).to.equal(200);
                    expect(device).to.have.property('imei').and.equal('012345678912345');
                    expect(device).to.have.property('checkedIn').and.equal(true);
                    done();
                });
            });
        });
    });

    it("shouldn't check a phone out that wasn't checked in", function (done) {
        app.http.post(app.url('/check/out/012345678912345'), function(device, response) {
            expect(response.statusCode).to.equal(409);
            expect(device).to.have.property('imei').and.equal('012345678912345');
            expect(device).to.have.property('checkedIn').and.equal(false);
            done();
        });
    });

    it("shouldn't check in a phone that doesn't exist", function (done) {
        app.http.post(app.url('/check/in/012345678912432'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it("shouldn't check out a phone that doesn't exist", function (done) {
        app.http.post(app.url('/check/out/012345678912432'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

});
