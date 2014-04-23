angular.module('odl').controller('device', function($scope, $rootScope, $filter, $http, $element, server) {
    $scope.post = function() {
        server.broadcast($scope.topic.name, $scope.message);
    }

    $rootScope.$on('device', function(event, device) {
        $scope.device = device;
    });
});