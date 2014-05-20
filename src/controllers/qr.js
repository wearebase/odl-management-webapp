var rekuire = require('rekuire');
var util = require('util');
var config = require('config');
var _ = require('underscore');
var rest = rekuire('src/util/rest');
var QR = rekuire('src/models/qr');
var request = require('request');
var Canvas = new require('canvas');
var qrcode = require('qrcode');
var fs = require('fs');

module.exports.getAllQRs = function(req, res) {
    QR.find({}).sort({_id: 1}).exec(function(err, qrs) {
        res.send(err ? 404 : qrs);
    });
}

module.exports.newQR = function(req, res) {

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    QR.count({}, function (err, count){
        QR.create({humanId: 'UK' + pad(count, 10)}, function (err, qr) {
            res.send(err ? 404 : qr);
        });
    });
}

module.exports.getQR = function(req, res) {
    QR.findOne({humanId: req.param('id')}, function(err, qr) {
        res.send(err ? 404 : qr);
    });
}

module.exports.getQRImage = function(req, res) {
    var margin = req.param('print') ? 10 : 0;

    QR.findOne({humanId: req.param('id')}, function(err, qr) {
        qrcode.draw(qr.id, {scale: 10, margin: margin}, function(error, canvas) {
            ctx = canvas.getContext('2d');

            if (req.param('print')) {
                ctx.font = 'italic 20pt Calibri';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                //ctx.rotate(90*Math.PI/180);
                ctx.fillText(qr.humanId, canvas.width / 2, canvas.height - 10);
                //ctx.rotate(-90*Math.PI/180);
            }

            function sendImage() {
                res.type('jpg');
                canvas.jpegStream({bufsize: 4096, quality: 100, progressive: false}).pipe(res);
            }

            var brand = req.param('brand');

            var brands = {
                wds: __dirname + '/../data/wds.gif',
                wds2: __dirname + '/../data/wds.png',
                apple: __dirname + '/../data/apple.png'
            }

            if (brands[brand]) {
                fs.readFile(brands[brand], function(err, data) {
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
                    var img = new Canvas.Image;
                    img.src = data;
                    ctx.drawImage(img, rect.center.x - rect.width / 2 + 5, rect.center.y - rect.height / 2 + 5, rect.width - 10, rect.height - 10);

                    sendImage();
                });        
            } else {
                sendImage();
            }
        });
    });
}
