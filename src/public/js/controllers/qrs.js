angular.module('odl').filter('partition', function() {
  var cache = {};
  var filter = function(arr, size) {
    if (!arr) { return; }
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    var arrString = JSON.stringify(arr);
    var fromCache = cache[arrString+size];
    if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
      return fromCache;
    }
    cache[arrString+size] = newArr;
    return newArr;
  };
  return filter;
});

angular.module('odl').controller('qrs', function($scope, $rootScope, server) {
    
    $scope.refresh = function() {
    	server.getQRs().success(function(qrs) {
        	$scope.qrs = qrs;
    	});
    }

    $scope.newQR = function() {
      if ($scope.number) {
        server.newQR().success(function() {$scope.newQR()});
        $scope.number--;
      } else {
        $scope.number = 1;
        $scope.refresh();
      }
    }

    $scope.refresh();
});