var rekuire = require('rekuire');
var mongodbFs = require('mongodb-fs');
var config = require('config');

module.exports = function(){
    
    var server;
    var mock = {};
    var port = 9000;
    var odl  = rekuire('src/odl');

    mock[config.DB.name] = {
        system: {indexes: []},
        devices: [{
                imei: '012345678912345'
            },{
                imei: '112345678912345' 
            },{
                imei: '212345678912345'
        }]
    };

    mongodbFs.init({
        port: config.DB.port,
        mocks: mock,
        fork: true        
    });

    beforeEach(function(done) {
        mongodbFs.start(function(err) {
            odl.start(port, done);
        });
    });

    afterEach(function(done) {                
        odl.stop(function() {                
            mongodbFs.stop(done);
        });        
    });

    return {
        url: function(path) {
            return 'http://localhost:' + port + path;
        },
        http: new (require('node-rest-client').Client)({
            mimetypes:{
                json:["application/json","application/json; charset=utf-8"],
                xml:["application/xml","application/xml; charset=utf-8"]
            }
        })
    };

};