var rekuire = require('rekuire');
var config = require('config');
var db = rekuire('test/util/db');
var odl  = rekuire('src/odl');
var mapper = require('mean-mock');

module.exports = function(data, mappings){
    
    beforeEach(function(done) {
        mapper.start(config.MAPPER.port, mappings, function() {
            odl.start(function() {
                db.start(data, done);
            });
        });
    });

    afterEach(function(done) {                
        odl.stop(function() {
            db.stop(function() {
                mapper.stop(done);
            });
        });
    });

    return {
        url: function(path) {
            return 'http://localhost:' + config.ODL.port + path;
        },
        http: rekuire('src/util/rest')
    };

};