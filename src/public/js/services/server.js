angular.module('odl').service('server', function ($rootScope, $http) {
    this.getDevices = function() {
        return $http.get('/api/device');
    } 

    this.newDevice = function(imei) {
        return $http.post('/api/device', {imei: imei});
    } 

    this.deleteDevice = function(guid) {
        return $http.delete('/api/device/' + guid);
    }

    this.checkDevice = function(state, guid) {
        return $http.post('/api/check/' + (state ? 'in' : 'out') + '/' + guid);
    }

    this.getQRs = function() {
        return $http.get('/api/qr');
    } 

    this.newQR = function() {
        return $http.post('/api/qr', {});
    } 
});