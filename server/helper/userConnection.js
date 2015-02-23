/**
 * Created by jasonf7 on 15-02-08.
 */
var chance = require('chance').Chance();
var userCon = {};
var onlineUsers = [];
var idToNameMap = {};
var nameToIdMap = {};

userCon.getName = function(){
    var randName = chance.first();
    while(nameToIdMap.hasOwnProperty(randName)){
        randName = chance.first();
    }
    return randName;
};

userCon.addUser = function(name, id){
    idToNameMap[id] = name;
    nameToIdMap[name] = id;
    onlineUsers.push(name);
};

userCon.deleteUserByID = function(id) {
    var name = idToNameMap[id];
    delete idToNameMap[id];
    delete nameToIdMap[name];
    var ind = onlineUsers.indexOf(name);
    onlineUsers.splice(ind, 1);
};

userCon.deleteUserByName = function(name){
    var id = nameToIdMap[name];
    delete idToNameMap[id];
    delete nameToIdMap[name];
    var ind = onlineUsers.indexOf(name);
    onlineUsers.splice(ind, 1);
};

userCon.onlineUsers = onlineUsers;
userCon.idToNameMap = idToNameMap;
userCon.nameToIdMap = nameToIdMap;

module.exports = userCon;