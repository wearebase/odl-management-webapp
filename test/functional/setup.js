var rekuire = require('rekuire');
var config = require('config');
var db = rekuire('test/db');
var odl  = rekuire('src/odl');

module.exports = function(data){
    
    var port = 9000;
    
    beforeEach(function(done) {
        odl.start(port, function() {
            db.start(data, done);
        });
    });

    afterEach(function(done) {                
        odl.stop(function() {
            db.stop(done);
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