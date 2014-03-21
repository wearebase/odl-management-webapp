var client = new (require('node-rest-client').Client)();
var config = require('config').ODL;

module.exports.get = function(req, res) {
	res.send(config.greeting);
}
