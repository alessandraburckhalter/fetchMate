let socket_io = require('socket.io');
let io = socket_io();
let socketApi = {};
const sockets = [];

socketApi.io = io;

io.on('connection', (socket) => {
    //todo 
    console.log('\n\n\n\nA user connected', socket);
    socket.emit("your id", socket.id)
    sockets.push(socket.id)

    socket.on('send project message', (projectMessagePayload) => {
        //? We need to get 3 things from the message payload
        //* 1. Content
        //* 2. User Id of the sender
        //* 3. Project Id
        //todo change from io to the sockets that meet the following criteria:
        //* Socket is currently connected
        //* User belongs to the project that the message was intended for
        io.emit('project message', projectMessagePayload)
    })
});

module.exports = socketApi;