/**
 * Created by jasonf7 on 15-02-05.
 */
var usercon = require('./helper/userConnection');
module.exports = function(io){
    io.sockets.on('connection', function(socket){
        io.emit('newUser', usercon.userConnect(socket.id));
        socket.on('newMessage', function(msg){
            socket.broadcast.emit('newMessage', msg);
        });
    });

    return io;
};