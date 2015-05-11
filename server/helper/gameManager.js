/**
 * Created by jasonf7 on 15-03-08.
 */
var Player = function(name) {
    this.name = name;
    this.status = "(Unready)";
    this.score = 0;
    this.question = new Question();
};

var State = function() {
    this.started = false;
    this.playing = false;
};

var Question = function(){
    this.operand = [];
    this.operation = "";
    this.operationSymb = "";
    this.answer = "";
    this.playerAnswer = "";
};

var operationMap = {
    "add" : "+",
    "sub" : "-",
    "mult" : "x",
    "div" : "÷"
};

var manager = {};
var player1 = new Player("");
var player2 = new Player("");
var players = [player1,player2];

var state = new State();

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
            player1 = new Player("");
        }
        else if(player2.name == name){
            player2 = new Player("");
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

manager.getState = function(){
    return state;
};

manager.setState = function(started, playing){
    state.started = started;
    state.playing = playing;

    console.log(started + " " + playing);

    return state;
};

manager.setScore = function(name, score){
    if(player1.name == name) {
        player1.score = score;
    }
    else if(player2.name == name) {
        player2.score = score;
    }

    return manager.updatePlayers();
};

manager.setQuestion = function(name, operand, operation, answer){
    if(player1.name == name) {
        player1.question.operand = operand;
        player1.question.operation = operation;
        player1.question.operationSymb = operationMap[operation];
        player1.question.answer = answer;
    }
    else if(player2.name == name) {
        player2.question.operand = operand;
        player2.question.operation = operation;
        player2.question.operationSymb = operationMap[operation];
        player2.question.answer = answer;
    }

    return manager.updatePlayers();
};

manager.setPlayerAnswer = function(name, answer){
    if(player1.name == name) {
        player1.question.playerAnswer = answer;
    }
    else if(player2.name == name) {
        player2.question.playerAnswer = answer;
    }

    return manager.updatePlayers();
};

manager.players = players;

module.exports = manager;