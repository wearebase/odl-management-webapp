var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/util/setup-functional');
var Canvas = require('canvas');
var decoder = require('jsqrcode')(Canvas);
var http = require('http');

describe("Device API", function () {

    var app = setup(rekuire('test/data/db'), rekuire('test/data/mappings'));

    it("should retrieve all the devices ordered by imei", function (done) {
        app.http.get(app.url('/api/device'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.length(3);
            expect(data[0]).to.have.property('imei').and.equal('012345678912345');
            expect(data[1]).to.have.property('imei').and.equal('112345678912345');
            expect(data[2]).to.have.property('imei').and.equal('212345678912345');
            done();
        });
    });

    it("should create a new device and retrieve it", function (done) {
        var args = {
            data: { imei: "312345678912345", guid: '00000000-0000-0000-0000-000000000005'},
            headers:{"Content-Type": "application/json"}
        };
        app.http.post(app.url('/api/device'), args, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('312345678912345');
            expect(data).to.have.property('guid').and.equal('00000000-0000-0000-0000-000000000005');
            expect(data).to.have.property('_id');
            expect(data).to.have.property('modified');
            done();
        });
    });

    it("should create a new device and retrieve it with an autogenerted GUID", function (done) {
        var args = {
            data: { imei: "312345678912345"},
            headers:{"Content-Type": "application/json"}
        };
        app.http.post(app.url('/api/device'), args, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('312345678912345');
            expect(data).to.have.property('guid').and.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
            expect(data).to.have.property('_id');
            expect(data).to.have.property('modified');
            done();
        });
    });

    it("should update and existing device if we send one with the same guid", function (done) {
        var args = {
            data: { guid: "00000000-0000-0000-0000-000000000002", modified: '2014-03-25T15:19:55.052Z' },
            headers:{"Content-Type": "application/json"}
        };
        app.http.post(app.url('/api/device'), args, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('guid').and.equal('00000000-0000-0000-0000-000000000002');
            expect(data).to.have.property('imei').and.equal('012345678912345');
            expect(data).to.have.property('modified').and.equal('2014-03-25T15:19:55.052Z');

            app.http.get(app.url('/api/device'), function(data, response) {
                expect(data).to.have.length(3);
                expect(data[0]).to.have.property('imei').and.equal('012345678912345');
                expect(data[1]).to.have.property('imei').and.equal('112345678912345');
                expect(data[2]).to.have.property('imei').and.equal('212345678912345');
                done();
            });
        });
    });

    it("should delete a device by guid", function (done) {
        app.http.delete(app.url('/api/device/00000000-0000-0000-0000-000000000002'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('012345678912345');

            app.http.get(app.url('/api/device'), function(data, response) {
                expect(data).to.have.length(2);
                expect(data[0]).to.have.property('imei').and.equal('112345678912345');
                expect(data[1]).to.have.property('imei').and.equal('212345678912345');
                done();
            });
        });
    });

    it("should complain when deleting a non existing device", function (done) {
        app.http.delete(app.url('/api/device/00000000-0000-0000-0000-000000000006'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it("should query by guid", function (done) {
        app.http.get(app.url('/api/device/00000000-0000-0000-0000-000000000002'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('012345678912345');
            done();
        });
    });

    it("should complain if we query by a nonexistent guid", function (done) {
        app.http.get(app.url('/api/device/whatever'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});
