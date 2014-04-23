angular.module('odl').service('server', function ($rootScope, $http) {
    this.getDevices = function() {
        return $http.get('/device');
    } 

    this.newDevice = function(imei) {
        return $http.post('/device', {imei: imei});
    } 
});