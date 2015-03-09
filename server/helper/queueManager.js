/**
 * Created by jasonf7 on 15-02-27.
 */
var manager = {};
var queue = [];

manager.isEmpty = function(){
    return queue.length == 0;
}

manager.inQueue = function(name){
    var result = {};
    var ind = queue.indexOf(name);
    if(ind == -1){
        result.inQueue = false;
    }
    else{
        result.inQueue = true;
    }
    result.index = ind;
    return result;
};

manager.joinQueue = function(name){
    var res;
    if(!manager.inQueue(name).inQueue){
        queue.push(name);
        res = {
            'success' : true
        };
    }
    else{
        res = {
            'success' : false,
            'reason' : 'joinQueue Fail - Name ' + name + ' already in queue!'
        };
    }
    return res;
};

manager.popQueue = function(){
    return queue.splice(0,1);
};

manager.leaveQueue = function(name){
    var res;
    var queueRes = manager.inQueue(name);
    if(queueRes.inQueue) {
        queue.splice(queueRes.index, 1);
        res = {
            'success' : true
        };
    }
    else{
        res = {
            'success' : false,
            'reason' : 'leaveQueue Fail - Name ' + name + ' not in queue!'
        };
    }
    return res;
};

manager.queue = queue;

module.exports = manager;
