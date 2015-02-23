/**
 * Created by jasonf7 on 15-02-02.
 */
angular.module('mathRacer')
.controller('ChatCtrl', [
    '$scope',
    'socket',
    'users',
    function($scope, socket){
        $scope.messages = [];

        $scope.sendMessage = function(){
            var msg = {
                'author': $scope.userName,
                'content': $scope.chatMsg
            };
            $scope.messages.push(msg);
            $scope.chatMsg = '';
            socket.emit('newMessage', msg);
        };

        socket.on('newMessage', function(msg){
            console.log("Received: " + msg.content);
            $scope.messages.push(msg);
            console.log($scope.messages);
        });

        socket.on('newUser', function(data){
            if($scope.userName === undefined) {
                $scope.userName = data;
                var msg = {
                    'author': "Server",
                    'content': "Welcome, " + data + "!"
                };

            }
            else{
                var msg = {
                    'author': "Server",
                    'content': data + " joined."
                };
            }
            $scope.messages.push(msg);
        });

        socket.on('deleteUser', function(data){
            var name = data;
            $scope.messages.push({
                'author': "Server",
                'content': data + " left."
            });
        });
    }
]);