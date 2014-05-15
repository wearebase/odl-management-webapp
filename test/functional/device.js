var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/util/setup-functional');
var Canvas = require('canvas');
var decoder = require('jsqrcode')(Canvas);
var http = require('http');

describe("Device API", function () {

    var app = setup(rekuire('test/data/devices'), rekuire('test/data/mappings'));

    it("should retrieve all the devices ordered by imei", function (done) {
        app.http.get(app.url('/device'), function(data, response) {
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
            data: { imei: "312345678912345"},
            headers:{"Content-Type": "application/json"}
        };
        app.http.post(app.url('/device'), args, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('312345678912345');
            expect(data).to.have.property('_id');
            expect(data).to.have.property('modified');
            done();
        });
    });

    it("should update and existing device if we send one with the same imei", function (done) {
        var args = {
            data: { imei: "012345678912345", modified: '2014-03-25T15:19:55.052Z' },
            headers:{"Content-Type": "application/json"}
        };
        app.http.post(app.url('/device'), args, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('012345678912345');
            expect(data).to.have.property('modified').and.equal('2014-03-25T15:19:55.052Z');

            app.http.get(app.url('/device'), function(data, response) {
                expect(data).to.have.length(3);
                expect(data[0]).to.have.property('imei').and.equal('012345678912345');
                expect(data[1]).to.have.property('imei').and.equal('112345678912345');
                expect(data[2]).to.have.property('imei').and.equal('212345678912345');
                done();
            });
        });
    });

    it("should delete a device by imei", function (done) {
        app.http.delete(app.url('/device/012345678912345'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('012345678912345');

            app.http.get(app.url('/device'), function(data, response) {
                expect(data).to.have.length(2);
                expect(data[0]).to.have.property('imei').and.equal('112345678912345');
                expect(data[1]).to.have.property('imei').and.equal('212345678912345');
                done();
            });
        });
    });

    it("should complain when deleting a non existing device", function (done) {
        app.http.delete(app.url('/device/012345678912432'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it("should query by imei", function (done) {
        app.http.get(app.url('/device/012345678912345'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('imei').and.equal('012345678912345');
            done();
        });
    });

    it("should complain if we query by a nonexistent imei", function (done) {
        app.http.get(app.url('/device/whatever'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it("should provide a QR endpoint", function (done) {
        http.get(app.url('/device/012345678912345/qr'), function(res) {
            var data = [];
         
            res.on('data', function(chunk) {
                data.push(chunk);
            }).on('end', function() {
                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('image/jpeg');

                var buffer = new Buffer(data.reduce(function(prev, current) {
                    return prev.concat(Array.prototype.slice.call(current));
                }, []));

                img = new Canvas.Image();
                img.src = buffer;
                expect(decoder.decode(img)).to.equal('012345678912345');
                done();
            });
        });
    });

    it.skip("should provide a QR endpoint and allow branding", function (done) {
        http.get(app.url('/device/012345678912345/qr?brand=wds'), function(res) {
            var data = [];
         
            res.on('data', function(chunk) {
                data.push(chunk);
            }).on('end', function() {
                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('image/jpeg');

                var buffer = new Buffer(data.reduce(function(prev, current) {
                    return prev.concat(Array.prototype.slice.call(current));
                }, []));

                img = new Canvas.Image();
                img.src = buffer;
                expect(decoder.decode(img)).to.equal('012345678912345');
                done();
            });
        });
    });

});
