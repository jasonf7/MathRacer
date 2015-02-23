/**
 * Created by jasonf7 on 15-02-21.
 */
var express = require('express');
var router = express.Router();

var usercon = require('../server/helper/userConnection');

/* GET home page. */
router.get('/', function(req, res) {
    res.json(usercon.onlineUsers);
});

router.post('/:id', function(req, res){
    var sockID = req.params.id;
    var name = usercon.getName();
    usercon.addUser(name, sockID);
    res.send(name);
});

router.put('/:old/:new', function(req, res){
    var curName = req.params.old;
    var newName = req.params.new;
    var result;
    if(usercon.nameToIdMap.hasOwnProperty(newName)){
        result = false;
    }
    else{
        var userID = usercon.nameToIdMap[curName];
        usercon.deleteUserByName(curName);
        usercon.addUser(curName, userID);
        result = true;
    }
    res.send(result);
});

router.delete('/:id', function(req, res){
    var sockID = req.params.id;
    usercon.deleteUserByID(sockID);
});

module.exports = router;
