var rekuire = require('rekuire');
var config = require('config');
var mongoose = require('mongoose');
var odl  = rekuire('src/odl');
var mapper = require('mean-mock').mapper;
var db = require('mean-mock').db;

module.exports = function(data, mappings){
    
    beforeEach(function(done) {
        mapper.start(config.MAPPER.port, mappings, function() {
            odl.start(function() {
                db.apply(mongoose.connection.db, data, done);
            });
        });
    });

    afterEach(function(done) {                
        odl.stop(function() {
            mapper.stop(done);
        });
    });

    return {
        url: function(path) {
            return 'http://localhost:' + config.ODL.port + path;
        },
        http: rekuire('src/util/rest')
    };

};