/**
 * Created by jasonf7 on 15-03-08.
 */
var Player = function(name) {
    this.name = name;
    this.status = "(Unready)";
}

var manager = {};
var player1 = new Player("");
var player2 = new Player("");
var players = [player1,player2];

manager.isPlaying = function(name){
    return player1.name == name || player2.name == name;
};

manager.isFull = function(){
    return player1.name != "" && player2.name != "";
};

manager.updatePlayers = function(p1, p2){
    if (p1) {
        player1 = p1;
    }

    if (p2) {
        player2 = p2;
    }

    players = [player1, player2];
    return players;
};

manager.playerJoin = function(name){
    var res;
    if(!manager.isPlaying(name) && !manager.isFull()){
        if(player1.name == ""){
            player1 = new Player(name);
        }
        else if(player2.name == ""){
            player2 = new Player(name);
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
        if(player1.name == name){
            player1.name = "";
        }
        else if(player2.name == name){
            player2.name = "";
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

manager.changePlayerStatus = function (name, status) {
    if(player1.name == name) {
        player1.status = status;
    }
    else if(player2.name == name) {
        player2.status = status;
    }

    return manager.updatePlayers();
};

manager.players = players;

module.exports = manager;