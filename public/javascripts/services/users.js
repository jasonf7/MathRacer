/**
 * Created by jasonf7 on 15-02-08.
 */
angular.module('mathRacer')
    .factory('users', function(){
        var o = {};
        o.userName = "";
        o.setUserName = function(name){
            o.userName = name;
        };
        return o;
    });
