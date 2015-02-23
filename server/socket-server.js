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

        socket.on('disconnect', function(){
            var name = usercon.idToNameMap[socket.id];
            usercon.deleteUserByID(socket.id);
            io.emit('deleteUser', name);
        });
    });

    return io;
};