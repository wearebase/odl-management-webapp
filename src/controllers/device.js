var rekuire = require('rekuire');
var util = require('util');
var config = require('config').ODL;
var _ = require('underscore');
var rest = new (require('node-rest-client').Client)();
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

module.exports.deleteDeviceByImei = function(req, res) {
	Device.findOne({imei: req.param('imei')}, function(err, device) {
		if (device) {
			device.remove(function (err, device) {
				res.send(err ? 404 : device);
			});
		} else {
	    	res.send(404);
		}
	});
}

module.exports.getDeviceByImei = function(req, res) {
	Device.findOne({imei: req.param('imei')}, function(err, device) {
		res.send(device ? device: 404);
	});
}

module.exports.getQRCode = function(req, res) {	
	var request = require('request');	
  	var newurl = util.format('http://api.qrserver.com/v1/create-qr-code/?data=%s&size=%s', req.param('imei'), '100x100'); 
  	request(newurl).pipe(res);
}