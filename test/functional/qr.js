var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/util/setup-functional');
var Canvas = require('canvas');
var decoder = require('jsqrcode')(Canvas);
var http = require('http');
var csv = require('csv');

describe("QR API", function () {

    var app = setup(rekuire('test/data/db'));

    it("should retrieve all the qrs created so far as JSON", function (done) {
        app.http.get(app.url('/api/qr'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.length(3);
            expect(data[0]).to.have.property('code').and.equal('00000000-0000-0000-0000-000000000000');
            expect(data[0]).to.have.property('humanId').and.equal('UK00000');
            expect(data[1]).to.have.property('code').and.equal('00000000-0000-0000-0000-000000000001');
            expect(data[1]).to.have.property('humanId').and.equal('UK00001');
            expect(data[2]).to.have.property('code').and.equal('00000000-0000-0000-0000-000000000002');
            expect(data[2]).to.have.property('humanId').and.equal('UK00002');
            done();
        });
    });

    it("should retrieve all the qrs created so far as CSV", function (done) {
        app.http.get(app.url('/api/qr?format=csv'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            csv().from.string(data, {}).to.array(function(qrs){
                expect(qrs).to.have.length(4);
                expect(qrs[0][0]).to.equal('code');
                expect(qrs[0][1]).to.equal('text');
                expect(qrs[0][2]).to.equal('copyright');
                expect(qrs[1][0]).to.equal('00000000-0000-0000-0000-000000000000');
                expect(qrs[1][1]).to.equal('UK00000');
                expect(qrs[1][2]).to.equal('Property of ©WDS');
                expect(qrs[2][0]).to.equal('00000000-0000-0000-0000-000000000001');
                expect(qrs[2][1]).to.equal('UK00001');
                expect(qrs[2][2]).to.equal('Property of ©WDS');
                expect(qrs[3][0]).to.equal('00000000-0000-0000-0000-000000000002');
                expect(qrs[3][1]).to.equal('UK00002');
                expect(qrs[3][2]).to.equal('Property of ©WDS');
                done();
            });
        });
    });

    it("should retrieve a QR by humanId as JSON", function (done) {
        app.http.get(app.url('/api/qr/UK00000'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('_id');
            expect(data).to.have.property('date');
            expect(data).to.have.property('code').and.equal('00000000-0000-0000-0000-000000000000');
            expect(data).to.have.property('humanId').and.equal('UK00000');
            done();
        });
    });

    it("should create a new qr and retrieve it", function (done) {
        app.http.post(app.url('/api/qr'), {}, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('_id');
            expect(data).to.have.property('date');
            expect(data).to.have.property('code').and.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
            expect(data).to.have.property('humanId').and.equal('UK00003');
            done();
        });
    });

    it("should return the QR image by humanId with the QR code encoded", function (done) {
        http.get(app.url('/api/qr/UK00000/image'), function(res) {
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

                 app.http.get(app.url('/api/qr/UK00000'), function(data, response) {
                    expect(decoder.decode(img)).to.equal(data.code);
                    done();
                });
            });
        });
    });

    it("should provide a QR endpoint and allow branding", function (done) {
        http.get(app.url('/api/qr/UK00000/image?brand=wds'), function(res) {
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

                 app.http.get(app.url('/api/qr/UK00000'), function(data, response) {
                    expect(decoder.decode(img)).to.equal(data.code);
                    done();
                });
            });
        });
    });

    it("should complain if we query by a nonexistent qr", function (done) {
        app.http.get(app.url('/api/qr/whatever'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it("should complain if we query by a nonexistent qr image", function (done) {
        app.http.get(app.url('/api/qr/whatever/image'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});
