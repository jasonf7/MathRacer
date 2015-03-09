/**
 * Created by jasonf7 on 15-03-01.
 */
angular.module('mathRacer')
    .controller('QueueCtrl', [
        '$scope',
        'socket',
        'queue',
        'game',
        function($scope, socket, queue, game){
            $scope.messages = [];
            $scope.playing = false;
            $scope.queueButton = {
                'text' : 'Join Queue',
                'inQueue' : false
            };

            $scope.$watch(
                function() { return queue.queue; },
                function(data) { $scope.queue = queue.queue; },
                true
            );

            $scope.changeQueue = function(){
                if($scope.playing) return;
                if(queue.checkIsEmpty() && !game.checkIsFull()){
                    game.playerJoin($scope.userName);
                    $scope.playing = true;
                    socket.emit('playerChange');
                }
                else{
                    if($scope.queueButton.inQueue){
                        queue.leaveQueue($scope.userName);
                        $scope.queueButton = {
                            'text' : 'Join Queue',
                            'inQueue' : false
                        };
                    }
                    else{
                        queue.joinQueue($scope.userName);
                        $scope.queueButton = {
                            'text' : 'Leave Queue',
                            'inQueue' : true
                        };
                    }
                    queue.getAll();
                    socket.emit('queueChange');
                }
            };

            socket.on('gameJoin', function(){
                $scope.playing = true;
                $scope.queueButton = {
                    'text' : 'Join Queue',
                    'inQueue' : false
                };
            });

            socket.on('queueChange', function(){
                queue.getAll();
            });

            socket.on('deleteUser', function(data){
                queue.leaveQueue(data.name);
                game.playerLeave(data.name, function(res){
                    if(res.success) {
                        $scope.playing = false;
                        if(!queue.checkIsEmpty()){
                            queue.advanceQueue(function(name){
                                game.playerJoin(name);
                                queue.getAll();

                                socket.emit('gameJoin', name);
                            });
                        }
                    }
                });
                queue.getAll();
            });
        }
    ]);