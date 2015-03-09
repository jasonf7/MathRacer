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

router.delete('/:name', function(req, res){
    var name = req.params.name;
    res.json(manager.playerLeave(name));
});

module.exports = router;