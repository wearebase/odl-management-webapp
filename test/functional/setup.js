var rekuire = require('rekuire');

module.exports = function(){

    var port = 9000;
    var app = rekuire('src/odl');

    beforeEach(function(done) {
       this.server = app.listen(port, done);
    });

    afterEach(function(done) {
        this.server.close(done);
    });

    return {
        url: function(path) {
            return 'http://localhost:' + port + path;
        },
        http: new (require('node-rest-client').Client)()
    };

};