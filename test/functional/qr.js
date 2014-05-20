var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/util/setup-functional');
var Canvas = require('canvas');
var decoder = require('jsqrcode')(Canvas);
var http = require('http');

describe("QR API", function () {

    var app = setup(rekuire('test/data/db'));

    it("should retrieve all the qrs created so far as JSON", function (done) {
        app.http.get(app.url('/qr'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.length(3);
            expect(data[0]).to.have.property('_id');
            expect(data[1]).to.have.property('_id');
            expect(data[2]).to.have.property('_id');
            done();
        });
    });

    it("should retrieve a QR by humanId as JSON", function (done) {
        app.http.get(app.url('/qr/UK00000'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('_id');
            expect(data).to.have.property('date');
            expect(data).to.have.property('humanId').and.equal('UK00000');
            done();
        });
    });

    it("should create a new qr and retrieve it", function (done) {
        app.http.post(app.url('/qr'), {}, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('_id');
            expect(data).to.have.property('date');
            expect(data).to.have.property('humanId').and.equal('UK00003');
            done();
        });
    });

    it("should return the QR image by humanId with the QR id encoded", function (done) {
        http.get(app.url('/qr/UK00000/image'), function(res) {
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

                 app.http.get(app.url('/qr/UK00000'), function(data, response) {
                    expect(decoder.decode(img)).to.equal(data._id);
                    done();
                });
            });
        });
    });

    it("should provide a QR endpoint and allow branding", function (done) {
        http.get(app.url('/qr/UK00000/image?brand=wds'), function(res) {
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

                 app.http.get(app.url('/qr/UK00000'), function(data, response) {
                    expect(decoder.decode(img)).to.equal(data._id);
                    done();
                });
            });
        });
    });

    it("should complain if we query by a nonexistent qr", function (done) {
        app.http.get(app.url('/qr/whatever'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it("should complain if we query by a nonexistent qr image", function (done) {
        app.http.get(app.url('/qr/whatever/image'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});