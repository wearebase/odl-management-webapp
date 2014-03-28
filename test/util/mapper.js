var rekuire = require('rekuire');
var config = require('config').MAPPER;
var express = require('express');

module.exports = {

    start: function(mappings, cb) {
        var mapper = express();

        for (var key in mappings) {
            (function(path) {
                mapper.get(path, function(req, res) {
                    res.send(mappings[path]);
                });
            })(key);
        }

        mapper.all('*', function(req, res) {
            res.send('unknown mapping');
        });

        this.server = mapper.listen(config.port);

        this.server.on('listening', cb);
    },

    stop: function(cb) {
        this.server.close(cb);
    }
};