var config = require('config');
var express = require('express');
var app = express();
var db = require('./util/db');

app.use(express.bodyParser());

var odl = {
    
    start: function(callback) {     
        
        require('./routes')(app);
        
        this.server = app.listen(config.ODL.port);

        this.server.on('listening', function() {            
            db.start(callback);         
        });

        this.server.on('close', function() {
            db.stop();
        });     
    },

    stop: function(callback) {      
        this.server.close(callback);
    }
}

if (!module.parent) {
    odl.start(function() {
        console.log('ODL is on port %d!!', odl.server.address().port);
    });
} else {
    module.exports = odl;
}