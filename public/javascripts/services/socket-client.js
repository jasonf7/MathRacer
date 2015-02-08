/**
 * Created by jasonf7 on 15-02-04.
 */
angular.module('mathRacer')
    .factory('socket', function(socketFactory){
        return socketFactory();
    });

