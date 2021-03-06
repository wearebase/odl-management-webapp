var rekuire = require('rekuire');
var config = require('config');
var Device = rekuire('src/models/device');

module.exports.checkIn = function(req, res) {
    Device.findOne({guid: req.param('guid')}, function(err, device) {
        if (err || !device) {
            res.send(404);
        } else {
            if (device.checkedIn) {
                res.send(409, device);
            } else {
                device.checkedIn = true;
                device.save(function(err, device) {
                    res.send(device);
                });
            }
        }
    });
}

module.exports.checkOut = function(req, res) {
    Device.findOne({guid: req.param('guid')}, function(err, device) {
        if (err || !device) {
            res.send(404);
        } else {
            if (device.checkedIn) {
                device.checkedIn = false;
                device.save(function(err, device) {
                    res.send(device);
                });
            } else {
                res.send(409, device);
            }
        }
    });
}