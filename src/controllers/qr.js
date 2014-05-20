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
        QR.create({humanId: 'UK' + pad(count, 5)}, function (err, qr) {
            res.send(err ? 404 : qr);
        });
    });
}

module.exports.getQR = function(req, res) {
    QR.findOne({humanId: req.param('id')}, function(err, qr) {
        res.send(qr ? qr : 404);
    });
}

module.exports.getQRImage = function(req, res) {
    QR.findOne({humanId: req.param('id')}, function(err, qr) {
        if (!qr) {
            res.send(404);
            return;
        }
        qrcode.draw(qr.id, {scale: 10, margin: 0}, function(error, canvas) {
            ctx = canvas.getContext('2d');

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
                var data = fs.readFileSync(brands[brand]);
                var rect = {
                    center: {
                        x: canvas.width / 2,
                        y: canvas.height / 2
                    },
                    width: canvas.width / 3,
                    height: canvas.height / 3
                };

                ctx.beginPath();
                ctx.rect(rect.center.x - rect.width / 2, rect.center.y - rect.height / 2, rect.width, rect.height);
                ctx.fillStyle = 'white';
                ctx.fill();
                var img = new Canvas.Image;
                img.src = data;
                var ratio = img.height / img.width;
                var iwidth = rect.width - 10;
                var iheight = iwidth * ratio;
                var ix = rect.center.x - iwidth / 2;
                var iy = rect.center.y - iheight / 2;
                ctx.drawImage(img, ix, iy, iwidth, iheight);
            }

            sendImage();
        });
    });
}
