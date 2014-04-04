var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var setup = rekuire('test/functional/setup');

describe("User API", function () {   

    var app = setup(rekuire('test/data/users'));

    it("should retrieve all the users by email", function (done) {
        app.http.get(app.url('/user'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.length(3);
            expect(data[0]).to.have.property('email').and.equal('pau@pau.com');
            expect(data[1]).to.have.property('email').and.equal('seal@seal.com');
            expect(data[2]).to.have.property('email').and.equal('goeff@goeff.com');
            done();
        });           
    });

    it("should create a new user and retrieve it", function (done) {
        var args = {
              data: {
              userName: 'Michael', 
              email: 'mick@wds.com',
              password: 'password',
              isAdmin: 'true'
              },
            headers:{"Content-Type": "application/json"} 
        };
        app.http.post(app.url('/user'), args, function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('userName').and.equal('Michael');
            expect(data).to.have.property('email').and.equal('mick@wds.com');
            expect(data).to.have.property('password').and.equal('password');
            expect(data).to.have.property('isAdmin');
            done();
        });           
    });

    it("should find a user by username and delete it", function (done) {      
        app.http.delete(app.url('/user/Pau'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('userName').and.equal('Pau');

            app.http.get(app.url('/user'), function(data, response) {
                expect(data).to.have.length(2);
                expect(data[0]).to.have.property('userName').and.equal('Seal');
                expect(data[1]).to.have.property('userName').and.equal('Goeff');
                done();
            });
        });           
    });

    it("should query by username", function (done) {
        app.http.get(app.url('/user/Seal'), function(data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.property('userName').and.equal('Seal');
            done();
        });           
    });

    it("should fail if we query by a nonexistent imei", function (done) {
        app.http.get(app.url('/user/whatever'), function(data, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });           
    });
});