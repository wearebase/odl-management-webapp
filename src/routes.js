var controllers = require('require-directory')(module, 'src/controllers');

module.exports = function(app) {
	app.get ('/'      , controllers.odl.get);
	app.get ('/device', controllers.device.getAllDevices);
	app.post('/device', controllers.device.newDevice);
}