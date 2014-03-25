var config = require('config').ODL;

module.exports.get = function(req, res) {
    res.send(config.greeting);
}
