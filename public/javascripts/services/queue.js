/**
 * Created by jasonf7 on 15-02-27.
 */
angular.module('mathRacer')
    .factory('queue', [
        '$http',
        function($http){
            var o = {
                queue : [],
                isEmpty : true
            };

            o.getAll = function(){
                return $http.get('/queue').success(function(data){
                    angular.copy(data, o.queue);
                });
            };

            o.joinQueue = function(name){
                return $http.post('/queue/' + name).success(function(data){
                    console.log(data);
                });
            };

            o.advanceQueue = function(cb){
                return $http.put('/queue/popQueue').success(function(data){
                    cb(data);
                });
            };

            o.leaveQueue = function(name){
                return $http.delete('/queue/' + name).success(function(data){
                    console.log(data);
                });
            };

            o.isEmptyApi = function(){
                $http.get('/queue/empty').success(function(data){
                    angular.copy(data, o.isEmpty);
                });
            };

            o.checkIsEmpty = function(){
                return o.queue.length == 0;
            };

            return o;
        }
    ]);