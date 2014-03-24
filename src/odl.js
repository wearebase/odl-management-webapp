var express = require('express');
var app = express();
var db = require('./db');
var server;

var odl = module.exports = {
	start: function(port, callback) {
		db(function(err) {
			console.log('DB ' + err);
			require('./routes')(app);
			server = app.listen(port, function() {
	    		console.log('ODL is on port %d!!', this.address().port);
			});
			callback(server);
		});
	},
	stop: function(callback) {
		server.close(done);
	}
}

if (!module.parent) {
	odl.start(process.env.PORT || 3000);
}