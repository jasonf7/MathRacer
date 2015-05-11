/**
 * Created by jasonf7 on 15-03-08.
 */
angular.module('mathRacer')
    .factory('game', [
        '$http',
        'socket',
        function($http, socket){
            var o = {
                state : {},
                players : [],
                isFull : false,
                operationMap : ["add", "sub", "mult", "div"]
            };

            o.getAll = function(){
                return $http.get('/game').success(function(data){
                    angular.copy(data, o.players);
                });
            };

            o.playerJoin = function(name){
                return $http.post('/game/' + name).success(function(data){
                    angular.copy(data.players, o.players);
                    o.getAll();
                    o.isFullApi();
                });
            };

            o.playerLeave = function(name, cb){
                return $http.delete('/game/' + name).success(function(data){
                    angular.copy(data.players, o.players);
                    o.getAll();
                    o.isFullApi();
                    if(cb !== undefined){
                        cb(data);
                    }
                });
            };

            o.changePlayerStatus = function(name, status) {
                return $http.put('/game/' + name + '/' + status).success(function(data){
                    angular.copy(data, o.players);

                    if (o.checkIsReady()) {
                        o.changePlayerStatus(o.players[0].name, "(Playing)");
                        o.changePlayerStatus(o.players[1].name, "(Playing)");
                        socket.emit('allReady');
                    }
                });
            };

            o.getState = function() {
                return $http.get('/game/state').success(function(data){
                    angular.copy(data, o.state);
                })
            };

            o.setState = function(started, playing){
                return $http.post('/game/state/' + started + '/' + playing).success(function(data){
                    //angular.copy(data, o.state);
                });
            };

            o.setScore = function(name, score) {
                return $http.post('/game/score/' + name + '/' + score).success(function(data){
                    angular.copy(data, o.players);
                });
            };

            o.setQuestion = function(name){
                var opType = chance.natural({min: 0, max: 3});
                var operand = [];
                var operation = "";
                var answer = 0;

                operation = o.operationMap[opType];

                var op1 = chance.natural({min:2, max:100});
                var op2 = chance.natural({min:0, max:op1});
                operand = [op1, op2];

                if (opType == 0) {
                    answer = op1 + op2;
                } else if (opType == 1) {
                    answer = op1 - op2;
                } else if (opType == 2) {
                    answer = op1 * op2;
                } else {
                    var tempOp = op1 * op2;
                    answer = op1;
                    operand = [tempOp, op2];
                }

                return $http.post('/game/question/' + name + '/' + operand[0] + '/' + operand[1] + '/'
                                                    + operation + '/' + answer).success(function(data){
                    angular.copy(data, o.players);
                });
            };

            o.setPlayerAnswer = function(name, answer){
                return $http.post('/game/answer/' + name + '/' + answer).success(function(data){
                    //angular.copy(data, o.players);
                });
            };

            o.isFullApi = function(){
                $http.get('/game/full').success(function(data){
                    angular.copy(data, o.isFull);
                });
            };

            o.checkIsFull = function(){
                return o.players.length > 0 && o.players[0].name != "" && o.players[1].name != "";
            };

            o.checkIsReady = function() {
                return o.players.length > 0 && o.players[0].status == "(Ready)" && o.players[1].status == "(Ready)";
            };

            return o;
        }
    ]);