var rekuire = require('rekuire');
var config = require('config');
var mongoose = require('mongoose');

module.exports = {

    start: function(collections, cb) {
    	var db = mongoose.connection.db;
    	db.dropDatabase(function() {
    		for (var name in collections) {
    			db.createCollection(name, function(err, collection) {
	   				collection.insert(collections[name], function() {
					});
	   			});
			}
    	});

    	setTimeout(cb, 1000);
    },

    stop: function(cb) {
    	cb();
    }
};