angular.module('odl').controller('device', function($scope, $rootScope, server) {
    $scope.delete = function() {
        server.deleteDevice($scope.device.imei).success(function() {
            $rootScope.$emit('refresh');
        });
    }

    $rootScope.$on('device', function(event, device) {
        $scope.device = device;
    });
});