/**
 * Created by jasonf7 on 15-02-27.
 */
var express = require('express');
var router = express.Router();

var manager = require('../server/helper/queueManager');

router.get('/', function(req, res){
    res.json(manager.queue);
});

router.get('/empty', function(req, res){
    res.json(manager.isEmpty());
});

router.post('/:name', function(req, res){
    var name = req.params.name;
    res.json(manager.joinQueue(name));
});

router.put('/popQueue', function(req, res){
    res.json(manager.popQueue());
});

router.delete('/:name', function(req, res){
    var name = req.params.name;
    res.json(manager.leaveQueue(name));
});

module.exports = router;