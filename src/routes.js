var rekuire = require('rekuire');
var config = require('config');
var controllers = require('require-directory')(module, 'src/controllers');

module.exports = function(app) {
    app.get ('/'               , controllers.odl.get);
    app.get ('/device'         , controllers.device.getAllDevices);
    app.post('/device'         , controllers.device.newDevice);
    app.del ('/device/:imei'   , controllers.device.deleteDeviceByImei);
    app.get ('/device/:imei'   , controllers.device.getDeviceByImei);
    app.get ('/device/:imei/qr', controllers.device.getQRCode);
    app.post('/check/in/:imei' , controllers.check.checkIn);
    app.post('/check/out/:imei', controllers.check.checkOut);

    app.get ('/user'            , controllers.user.getAllUsers);
    app.post('/user'            , controllers.user.newUser);
    app.del ('/user/:userName'  , controllers.user.deleteUserByUsername);
    app.get ('/user/:userName'  , controllers.user.getUserByUserName);

    app.use('/public', require('express').static('src/public'));

    if (config.DEV) {
        require('mean-mock').mapper.apply(app, rekuire('src/data/mappings'));
    }
}