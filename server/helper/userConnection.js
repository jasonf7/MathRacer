/**
 * Created by jasonf7 on 15-02-08.
 */
var chance = require('chance').Chance();
var onlineUsers = [];
var idToNameMap = {};
var nameToIdMap = {};

var getName = function(id){
    var randName = chance.name();
    while(nameToIdMap.hasOwnProperty(randName)){
        randName = chance.name();
    }
    return randName;
};

var userConnect = function(id){
    var name = getName(id);
    idToNameMap[id] = name;
    nameToIdMap[name] = id;
    onlineUsers.push(name);
    return name;
};

var userDisconnect = function(id) {
    var name = idToNameMap[id];
    delete idToNameMap[id];
    delete nameToIdMap[name];
    var ind = onlineUsers.indexOf(name);
    onlineUsers.splice(ind, 1);
};

module.exports.onlineUsers = onlineUsers;
module.exports.idToNameMap = idToNameMap;
module.exports.nameToIdMap = nameToIdMap;
module.exports.getName = getName;
module.exports.userConnect = userConnect;
module.exports.userDisconnect = userDisconnect;