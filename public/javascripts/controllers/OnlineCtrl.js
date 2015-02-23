/**
 * Created by jasonf7 on 15-02-09.
 */
angular.module('mathRacer')
.controller('OnlineCtrl', [
    '$scope',
    'socket',
    'online',
    function($scope, socket, online){
        $scope.$watch(
            function() { return online.onlineUsers; },
            function(data) { $scope.onlineUsers = online.onlineUsers; },
            true
        );

        socket.on('newUser', function(data){
            if($scope.userName === undefined) {
                $scope.userName = data;
            }
            online.getAll();
        });

        socket.on('deleteUser', function(data){
            online.getAll();
        });
    }
]);