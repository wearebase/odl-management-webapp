angular.module('odl').service('server', function ($rootScope, $http) {
    this.listen = function (topic, callback) {
        var ws = new WebSocket(this.url('listen?topic=' + topic));

        ws.onmessage = function(evt) {
            $rootScope.$apply(function () {
                callback.apply($rootScope, [evt.data]);
            });
        }

        return ws;
    }

    this.broadcast = function(topic, message) {
        $http.post('/broadcast?message=' + message + "&topic=" + topic);
    }

    this.url = function(s) {
        var l = window.location;
        return ((l.protocol === "https:") ? "wss://" : "ws://") + l.hostname + (((l.port != 80) && (l.port != 443)) ? ":" + l.port : "") + l.pathname + s;
    }
});