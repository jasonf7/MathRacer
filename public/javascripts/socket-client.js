/**
 * Created by jasonf7 on 15-02-04.
 */
var socket = io.connect('http://localhost:3000');
socket.on(
    'hello',
    function (data) {
        console.log("Hello event: " + data.hello);
    }
);
