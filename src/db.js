var util = require('util');
var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var config = require('config').DB;

var db = {
	start: function(cb) {
		mongoose.connect(util.format('mongodb://%s:%d/%s', config.host, config.port, config.name), cb);		
	},
	stop: function(cb) {
		mongoose.connection.close(cb);
	}
}

module.exports = db;