var rekuire = require('rekuire');
var util = require('util');
var config = require('config');
var _ = require('underscore');
var rest = rekuire('src/util/rest');
var Device = rekuire('src/models/device');
var request = require('request');
var Canvas = new require('canvas');
var qrcode = require('qrcode');
var fs = require('fs');

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
            args = { parameters:{ k: config.GMAPI.key, z: config.GMAPI.secret } };
            rest.get(config.GMAPI.url + 'devices/imei/' + req.body.imei, args, function(gmDevice, response) {
                if (response.statusCode != 200) {
                    res.send(response.statusCode);
                    return;
                }
                rest.get(config.GMAPI.url + 'deviceAttributes/' + gmDevice.id, args, function(attributes, response) {
                    if (response.statusCode != 200) {
                        res.send(response.statusCode);
                        return;
                    }

                    req.body.attributes = attributes;
                    req.body.image = gmDevice.image;

                    Device.create(req.body, function (err, device) {
                        res.send(err ? 404 : device);
                    });
                });
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
        res.send(device ? device : 404);
    });
}

module.exports.getQRCode = function(req, res) {
    var margin = parseInt(req.param('margin') || '0');
    qrcode.draw(req.param('imei'), {scale: 10, margin: margin}, function(error, canvas) {
        ctx = canvas.getContext('2d');

        var rect = {
            center: {
                x: canvas.width / 2,
                y: canvas.height / 2
            },
            width: (canvas.width - margin * 10) / 3,
            height: (canvas.height - margin * 10) / 3
        };

        ctx.beginPath();
        ctx.rect(rect.center.x - rect.width / 2, rect.center.y - rect.height / 2, rect.width, rect.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        fs.readFile(__dirname + '/../data/wds.png', function(err, data) {
            var img = new Canvas.Image;
            img.src = data;
            ctx.drawImage(img, rect.center.x - rect.width / 2, rect.center.y - rect.height / 2, rect.width, rect.height);
            res.type('jpg');
            canvas.jpegStream({bufsize: 4096, quality: 100, progressive: false}).pipe(res);
        });        
    });
}
