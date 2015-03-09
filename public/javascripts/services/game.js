/**
 * Created by jasonf7 on 15-03-08.
 */
angular.module('mathRacer')
    .factory('game', [
        '$http',
        function($http){
            var o = {
                players : [],
                isFull : false
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

            o.isFullApi = function(){
                $http.get('/game/full').success(function(data){
                    angular.copy(data, o.isFull);
                });
            };

            o.checkIsFull = function(){
                return o.players.length > 0 && o.players[0] != "" && o.players[1] != "";
            };

            return o;
        }
    ]);