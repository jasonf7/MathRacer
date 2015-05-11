/**
 * Created by jasonf7 on 15-03-08.
 */
var express = require('express');
var router = express.Router();

var manager = require('../server/helper/gameManager');

router.get('/', function(req, res){
    res.json(manager.updatePlayers());
});

router.get('/full', function(req, res){
    res.json(manager.isFull());
});

router.post('/:name', function(req, res){
    var name = req.params.name;
    res.json(manager.playerJoin(name));
});

router.put('/:name/:status', function(req, res){
    var name = req.params.name;
    var status = req.params.status;
    res.json(manager.changePlayerStatus(name, status));
});

router.delete('/:name', function(req, res){
    var name = req.params.name;
    res.json(manager.playerLeave(name));
});

router.get('/state', function(req, res){
    res.json(manager.getState());
});

router.post('/state/:started/:playing', function(req, res){
    var started = req.params.started;
    var playing = req.params.playing;
    res.json(manager.setState(started, playing));
});

router.post('/score/:name/:score', function(req, res){
    var name = req.params.name;
    var score = req.params.score;
    res.json(manager.setScore(name, score));
});

router.post('/question/:name/:op1/:op2/:op/:answer', function(req, res){
    var name = req.params.name;
    var op1 = req.params.op1;
    var op2 = req.params.op2;
    var op = req.params.op;
    var answer = req.params.answer;
    res.json(manager.setQuestion(name, [op1, op2], op, answer));
});

router.post('/answer/:name/:answer', function(req, res){
    var name = req.params.name;
    var answer = req.params.answer;
    res.json(manager.setPlayerAnswer(name, answer));
});

module.exports = router;