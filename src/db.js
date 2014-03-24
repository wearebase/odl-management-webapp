var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var config = require('config').DB;

module.exports = function(cb) {
    console.log('mongodb://' + config.host + ':' + config.port + '/' + config.name);
    
    mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.name, cb);
}