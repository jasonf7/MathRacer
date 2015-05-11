/**
 * Created by jasonf7 on 15-03-07.
 */
/**
 * Created by jasonf7 on 15-03-01.
 */
angular.module('mathRacer')
    .controller('GameCtrl', [
        '$scope',
        '$interval',
        'socket',
        'queue',
        'game',
        function($scope, $interval, socket, queue, game){
            $scope.readyText = "Ready";
            $scope.alerts = [];

            game.getState();

            $scope.readyTime = 5.0;
            $scope.gameTime = 30.0;

            $scope.$watch(
                function() { return game.players; },
                function(data) { $scope.players = game.players; },
                true
            );

            $scope.$watch(
                function() { return game.state; },
                function(data) { $scope.playing = game.state.playing;
                                 $scope.started = game.state.started; },
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

            $scope.answerSubmit = function(player, answer){
                if(!isNaN(answer)){
                    var playerAnswer = parseInt(answer);
                    var correctAnswer = parseInt(player.question.answer);

                    if (playerAnswer == correctAnswer) {
                        game.setQuestion(player.name);
                        game.setScore(player.name, Number(player.score)+1);

                        if($scope.players[0].name == player.name){
                            $scope.players[0].question.playerAnswer = "";
                        } else {
                            $scope.players[1].question.playerAnswer = "";
                        }

                        $scope.alerts.push({ type:'success', msg: 'Correct!'});
                        setTimeout(function(){
                            $scope.closeAlert($scope.alerts.size-1);
                        }, 2000);

                        socket.emit('playerChange');
                    } else {
                        $scope.alerts.push({ type:'danger', msg: 'Wrong!'});
                        setTimeout(function(){
                            $scope.closeAlert($scope.alerts.size-1);
                        }, 2000);
                    }
                } else {
                    $scope.alerts.push({ type:'danger', msg: 'Invalid number: ' + answer});
                    setTimeout(function(){
                        $scope.closeAlert($scope.alerts.size-1);
                    }, 2000);
                }
            };

            $scope.answerChange = function(player, answer){
                //console.log($scope.mathAnswer + " - " + answer + ":" + player);
                if(answer == ""){
                    answer = "%20";
                }
                game.setPlayerAnswer(player.name, answer);
                socket.emit('playerChange');
            };

            $scope.closeAlert = function(index){
                $scope.alerts.splice(index, 1);
            };

            socket.on('playerChange', function(){
                game.getAll();
                game.isFullApi();
            });

            socket.on('allReady', function(){
                $scope.playing = true;

                game.setState($scope.started, $scope.playing);

                var readyTimeInterval = $interval(function(){
                    if ($scope.readyTime - 0.1 < 0) {
                        $interval.cancel(readyTimeInterval);
                        $scope.started = true;

                        game.setState($scope.started, $scope.playing);
                        game.setQuestion($scope.players[0].name);
                        game.setQuestion($scope.players[1].name);

                        socket.emit('playerChange');

                        var gameTimeInterval = $interval(function(){
                            if ($scope.gameTime - 0.1 < 0) {
                                $interval.cancel(gameTimeInterval);

                                var victoryMessage = "";
                                var p1Score = $scope.players[0].score;
                                var p2Score = $scope.players[1].score;

                                $scope.readyTime = 5.0;
                                $scope.gameTime = 30.0;

                                $scope.started = false;
                                $scope.playing = false;
                                game.setState($scope.started, $scope.playing);

                                if (p1Score >= p2Score) {
                                    victoryMessage = $scope.players[0].name + " wins with a score of " + p1Score + " - " + p2Score;
                                    $scope.playerLeave($scope.players[1]);
                                    $scope.playerReady($scope.players[0]);
                                } else {
                                    victoryMessage = $scope.players[1].name + " wins with a score of " + p2Score + " - " + p1Score;
                                    $scope.playerLeave($scope.players[0]);
                                    $scope.playerReady($scope.players[1]);
                                }

                                $scope.alerts.push({ type:'success', msg: victoryMessage});
                                setTimeout(function(){
                                    $scope.closeAlert($scope.alerts.size-1);
                                }, 5000);

                            } else {
                                $scope.gameTime -= 0.1;
                                $scope.gameTime = $scope.gameTime.toFixed(2);
                            }
                        }, 100);
                    } else {
                        $scope.readyTime -= 0.1;
                        $scope.readyTime = $scope.readyTime.toFixed(2);
                    }
                }, 100);
            });
        }
    ]);