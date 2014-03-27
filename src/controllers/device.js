var rekuire = require('rekuire');
var config = require('config').ODL;
var _ = require('underscore');
var Device = rekuire('src/models/device');

module.exports.getAllDevices = function(req, res) {
    Device.find({}).sort({imei: 1}).exec(function(err, devices) {
        res.send(err ? 404 : devices);
    });
}

module.exports.newDevice = function(req, res) {
	Device.findOne({imei: req.body.imei}, function(err, device) {
		if (device) {
			_.extend(device, req.body);
			device.save(function (err, device) {
				res.send(err ? 404 : device);
			});
		} else {
			Device.create(req.body, function (err, device) {
		    	res.send(err ? 404 : device);
		  	});
		}
	});
}

module.exports.getDeviceByImei = function(req, res) {
	Device.findOne({imei: req.param('imei')}, function(err, device) {
		res.send(device ? device: 404);
	});
}