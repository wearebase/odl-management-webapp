var rekuire = require('rekuire');
var config = require('config');
var controllers = require('require-directory')(module, 'src/controllers');

module.exports = function(app) {
    app.use('/', require('express').static('src/public'));
    
    app.get ('/api/device'         , controllers.device.getAllDevices);
    app.post('/api/device'         , controllers.device.newDevice);
    app.del ('/api/device/:guid'   , controllers.device.deleteDeviceByGuid);
    app.get ('/api/device/:guid'   , controllers.device.getDeviceByGuid);
    
    app.post('/api/check/in/:imei' , controllers.check.checkIn);
    app.post('/api/check/out/:imei', controllers.check.checkOut);
    
    app.get ('/api/qr'             , controllers.qr.getAllQRs);
    app.post('/api/qr'             , controllers.qr.newQR);
    app.get ('/api/qr/:id'         , controllers.qr.getQR);
    app.get ('/api/qr/:id/image'   , controllers.qr.getQRImage);
    
    app.get ('/api/user'           , controllers.user.getAllUsers);
    app.post('/api/user'           , controllers.user.newUser);
    app.del ('/api/user/:userName' , controllers.user.deleteUserByUsername);
    app.get ('/api/user/:userName' , controllers.user.getUserByUserName);

    if (config.DEV) {
        require('mean-mock').mapper.apply(app, rekuire('src/data/mappings'));
    }
}