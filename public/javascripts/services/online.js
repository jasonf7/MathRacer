/**
 * Created by jasonf7 on 15-02-22.
 */
angular.module('mathRacer')
    .factory('online', [
        '$http',
        function($http){
            var o = {
                onlineUsers : []
            };

            o.getAll = function(){
                return $http.get('/online').success(function(data){
                    angular.copy(data, o.onlineUsers);
                });
            };

            o.changeName = function(oldName, newName){
                return $http.put('/'+oldName+'/'+newName).success(function(data){
                    console.log('ChangeName: ' + data);
                });
            };

            return o;
        }
    ]);