/**
 * Created by jasonf7 on 15-03-08.
 */
var manager = {};
var player1 = "";
var player2 = "";
var players = [player1,player2];

manager.isPlaying = function(name){
    return player1 == name || player2 == name;
};

manager.isFull = function(){
    return player1 != "" && player2 != "";
};

manager.updatePlayers = function(p1, p2){
    players = [p1 || player1, p2 || player2];
    return players;
};

manager.playerJoin = function(name){
    var res;
    if(!manager.isPlaying(name) && !manager.isFull()){
        if(player1 == ""){
            player1 = name;
        }
        else if(player2 == ""){
            player2 = name;
        }
        manager.updatePlayers(player1, player2);
        res = {
            'success' : true,
            'players' : players
        };

    }
    else{
        res = {
            'success' : false,
            'reason' : 'playerJoin Fail - Name ' + name + ' is playing or game is full!'
        };
    }
    return res;
};

manager.playerLeave = function(name){
    var res;
    if(manager.isPlaying(name)) {
        if(player1 == name){
            player1 = "";
        }
        else if(player2 == name){
            player2 = "";
        }
        manager.updatePlayers(player1, player2);
        res = {
            'success' : true,
            'players' : players
        };
    }
    else{
        res = {
            'success' : false,
            'reason' : 'playerLeave Fail - Name ' + name + ' not playing!'
        };
    }
    return res;
};

manager.players = players;

module.exports = manager;