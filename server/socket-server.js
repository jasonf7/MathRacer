/**
 * Created by jasonf7 on 15-02-05.
 */
var usercon = require('./helper/userConnection');
module.exports = function(io){
    io.sockets.on('connection', function(socket){
        var name = usercon.getName();
        usercon.addUser(name, socket.id);
        //console.log(socket);
        io.emit('newUser', name);

        socket.on('newMessage', function(msg){
            socket.broadcast.emit('newMessage', msg);
        });

        socket.on('queueChange', function(){
            socket.broadcast.emit('queueChange');
        });

        socket.on('playerChange', function(){
            socket.broadcast.emit('playerChange');
        });

        socket.on('playerLeave', function(name){
            io.emit('deleteUser', {
                from: 'playerLeave',
                name: name
            });
        });

        socket.on('gameJoin', function(name){
            io.to(usercon.nameToIdMap[name]).emit('gameJoin');
        });

        socket.on('disconnect', function(){
            var name = usercon.idToNameMap[socket.id];
            usercon.deleteUserByID(socket.id);
            io.emit('deleteUser', {
                from: 'disconnect',
                name: name
            });
        });
    });

    return io;
};