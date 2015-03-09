/**
 * Created by jasonf7 on 15-01-29.
 */
angular.module('mathRacer')
.controller('MainCtrl', [
    '$scope',
    'socket',
    function ($scope, socket) {
        $scope.title = "MathRacer";

        socket.on('newUser', function(data){
            if($scope.userName === undefined) {
                $scope.userName = data;
            }
        });
    }
]);