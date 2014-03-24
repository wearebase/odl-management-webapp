var config = require('config');
var express = require('express');
var app = express();
var db = require('./db');

var odl = {
	
	start: function(port, callback) {		
		
		require('./routes')(app);
		
		this.server = app.listen(port);

		this.server.on('listening', function() {			
			db.start(callback);			
		});

		this.server.on('close', function() {
			db.stop();
		});		
	},

	stop: function(callback) {
		console.log('odl stop');
		this.server.close(function() {
			console.log('server stop');
			callback();
		});
	}
}

if (!module.parent) {
	odl.start(process.env.PORT || config.ODL.port || 3000, function() {
		console.log('ODL is on port %d!!', odl.server.address().port);
	});
} else {
	module.exports = odl;
}