angular.module('odl').service('server', function ($rootScope, $http) {
    this.getDevices = function() {
        return $http.get('/device');
    } 

    this.newDevice = function(imei) {
        return $http.post('/device', {imei: imei});
    } 

    this.deleteDevice = function(imei) {
        return $http.delete('/device/' + imei);
    }

    this.getQRs = function() {
        return $http.get('/qr');
    } 

    this.newQR = function() {
        return $http.post('/qr', {});
    } 
});