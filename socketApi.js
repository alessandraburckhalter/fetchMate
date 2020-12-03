let socket_io = require('socket.io');
let io = socket_io();
let socketApi = {};
const sockets = {};
const db = require('./models');

socketApi.io = io;

io.on('connection', (socket) => {
    //? We are saving user id as the key and then socket as the value
    sockets[socket.handshake.session.user.id] = socket

    //* Whenever the user opens the chat component it will emit this action and along with the project id
    //* Here we check if the userId belongs as a teamMember of the project id
    //? If they do belong, then we Socket.join(projectId) group, else then they join no group
    socket.on('join project room', (projectId) => {
        // console.log('\n\n\n\n\n\n' + projectId)
        db.Project.findOne({
            where: {id: projectId}, 
            include: [{
                model: db.User,
                through: db.TeamMember,
                    as: 'Members'
            }]
        })
            .then(project => {
                // console.log(project.Members[0].dataValues)
                let found = project.Members.find(members => members.dataValues.id === socket.handshake.session.user.id)
                // console.log('\n\n\n\n\n' + found);
                if(found){
                    socket.join(projectId)
                }
            })
            .catch(e => {
                console.log("Error occurred")
            })
    })
    
    
    //? We need to get 2 things from the message payload
    //* 1. Content
    //* 3. Project Id
    socket.on('send project message', (projectMessagePayload) => {
        //todo eventually will need to hookup the chat db table here and save the userId, project id and the projectMessagePayload.content to the db
        io.to(projectMessagePayload.projectId).emit('project message', projectMessagePayload)
    })
});

module.exports = socketApi;