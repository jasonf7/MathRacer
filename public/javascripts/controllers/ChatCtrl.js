/**
 * Created by jasonf7 on 15-02-02.
 */
angular.module('mathRacer')
.controller('ChatCtrl', [
        '$scope',
        function($scope){
            $scope.sendMessage = function(){
                console.log($scope.chatMsg);
            };
        }
    ]);