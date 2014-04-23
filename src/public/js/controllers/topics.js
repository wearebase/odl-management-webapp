angular.module('odl').controller('topics', function($scope, $rootScope, $filter, server) {
    $scope.orderBy = "numberOfMessages";

    $scope.setStatus = function(status) {
        $scope.lastModified = new Date();
        $scope.status = status;
        $scope.sort($scope.orderBy);
        $rootScope.$emit('status', $scope.status);
    }

    $scope.sort = function(expression) {
        $scope.status.topics = $filter('orderBy')($scope.status.topics, $scope.orderBy = expression, true);
    }

    $scope.select = function(topic) {
        $rootScope.$emit('topic', topic);
    }

    server.listen('status', function(data) {
        $scope.setStatus(JSON.parse(data));
    });
});