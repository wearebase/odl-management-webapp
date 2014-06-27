angular.module('odl').service('server', function ($rootScope, $http) {
    this.getDevices = function() {
        return $http.get('/api/device');
    } 

    this.newDevice = function(imei) {
        return $http.post('/api/device', {imei: imei});
    } 

    this.deleteDevice = function(imei) {
        return $http.delete('/api/device/' + imei);
    }

    this.checkDevice = function(state, imei) {
        return $http.post('/api/check/' + (state ? 'in' : 'out') + '/' + imei);
    }

    this.getQRs = function() {
        return $http.get('/api/qr');
    } 

    this.newQR = function() {
        return $http.post('/api/qr', {});
    } 
});