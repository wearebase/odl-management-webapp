angular.module('odl').controller('topic', function($scope, $rootScope, $filter, $http, $element, server) {
    $scope.post = function() {
        server.broadcast($scope.topic.name, $scope.message);
    }

    $rootScope.$on('topic', function(event, topic) {
        $scope.messages = [];
        $scope.topic = topic;
        $scope.ws = server.listen(topic.name, function(message) {            
            $scope.messages.push(message);
        });
    });

    $rootScope.$on('status', function(event, status) {
        $scope.topic = $scope.topic && $filter('filter')(status.topics, {name: $scope.topic.name}, true)[0];
    });

    $($element).on('hidden.bs.modal', function() {
        $scope.ws.close();
    });
});