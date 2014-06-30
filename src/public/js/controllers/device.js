angular.module('odl').controller('device', function($scope, $rootScope, server) {
    $scope.delete = function() {
        server.deleteDevice($scope.device.imei).success(function() {
            $('#device-modal').foundation('reveal', 'close');
            $rootScope.$emit('refresh');
        });
    }

    $scope.check = function() {
        server.checkDevice(!$scope.device.checkedIn, $scope.device.imei).success(function() {
            $scope.device.checkedIn = !$scope.device.checkedIn
            $rootScope.$emit('refresh');
        });
    }

    $rootScope.$on('device', function(event, device) {
        $scope.device = device;
        $('#device-modal').foundation('reveal', 'open');
        $(document).foundation();
    });
});