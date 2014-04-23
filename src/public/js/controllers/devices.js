angular.module('odl').controller('devices', function($scope, $rootScope, $filter, server) {
    $scope.orderBy = "name";

    $scope.setDevices = function(devices) {
        $scope.lastModified = new Date();
        $scope.devices = devices;
        $scope.sort($scope.orderBy);
        $rootScope.$emit('devices', $scope.devices);
    }

    $scope.sort = function(expression) {
        $scope.devices = $filter('orderBy')($scope.devices, $scope.orderBy = expression, true);
    }

    $scope.select = function(device) {
        $rootScope.$emit('device', device);
    }

    $scope.refresh = function() {
        server.getDevices().success(function(devices) {
            $scope.setDevices(devices);
        });
    }

    $scope.newDevice = function() {
        server.newDevice($scope.imei).success($scope.refresh);
    }

    $scope.refresh();
});