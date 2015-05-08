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
            $scope.readyText = "Ready";

            $scope.playing = false;

            $scope.$watch(
                function() { return game.players; },
                function(data) { $scope.players = game.players; },
                true
            );

            $scope.playerLeave = function(player){
                socket.emit('playerLeave', player.name);
            };

            $scope.playerReady = function(player){
                if ($scope.readyText == "Ready") {
                    game.changePlayerStatus(player.name, "(" + $scope.readyText + ")");
                    $scope.readyText = "Unready";
                } else {
                    game.changePlayerStatus(player.name, "(" + $scope.readyText + ")");
                    $scope.readyText = "Ready";
                }
                socket.emit('playerChange');
            };

            socket.on('playerChange', function(){
                game.getAll();
                game.isFullApi();
            });

            socket.on('allReady', function(){
                $scope.playing = true;
            });
        }
    ]);