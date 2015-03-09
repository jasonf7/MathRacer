/**
 * Created by jasonf7 on 15-03-07.
 */
/**
 * Created by jasonf7 on 15-03-01.
 */
angular.module('mathRacer')
    .controller('GameCtrl', [
        '$scope',
        'socket',
        'queue',
        'game',
        function($scope, socket, queue, game){
            $scope.ready = false;

            $scope.$watch(
                function() { return game.players; },
                function(data) { $scope.players = game.players; },
                true
            );

            $scope.playerLeave = function(player){
                socket.emit('playerLeave', player);
            };

            $scope.playerReady = function(player){

            };

            socket.on('playerChange', function(){
                game.getAll();
                game.isFullApi();
            });
        }
    ]);