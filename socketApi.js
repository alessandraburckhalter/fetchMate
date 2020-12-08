let socket_io = require('socket.io');
let io = socket_io();
let socketApi = {};
const sockets = {};
const db = require('./models');

socketApi.io = io;

io.on('connection', (socket) => {
    //? We are saving user id as the key and then socket as the value
    if(socket.handshake.session.user){
        sockets[socket.handshake.session.user.id] = socket
    }

    //* Whenever the user opens the chat component it will emit this action and along with the project id
    //* Here we check if the userId belongs as a teamMember of the project id
    //? If they do belong, then we Socket.join(projectId) group, else then they join no group
    socket.on('join project room', (projectId) => {
        console.log('\n\n\n\n\n\n' + projectId)
        db.Project.findOne({
            where: {id: projectId}, 
            include: [db.User, {
                model: db.User,
                through: db.TeamMember,
                    as: 'Members'
            }]
        })
        //* To send a response it would need to be an emit of a new type of action
        //* would need to have front end listen for that event as well.
            .then(project => {
                let foundMember = project.Members.find(members => members.dataValues.id === socket.handshake.session.user.id);
                //* now we also double check if the user is the owner of the project as well
                let foundOwner = project.User.id === socket.handshake.session.user.id ? true : false
                // console.log('\n\n\n\n\n' + foundMember + foundOwner);
                if(foundMember || foundOwner){
                    io.emit('join room response', `Accepted to room`)
                    socket.join(projectId)
                }else{
                    io.emit('join room response', `Not a member for project id ${projectId}`)
                }
            })
            .catch(e => {
                console.log("Error occurred", e)
            })
    })
    
    
    //? We need to get 2 things from the message payload
    //* 1. Content
    //* 2. Project Id
    socket.on('send project message', (projectMessagePayload) => {
        db.Project.findOne({where:{id: projectMessagePayload.projectId}})
            .then(project => {
                if(!project){
                    console.log('Cannot find that project');
                }else{
                    
                    return project.createChat({
                        content: projectMessagePayload.content,
                        UserId: socket.handshake.session.user.id
                    })
                }
            })
            .then(chat => {
                io.to(projectMessagePayload.projectId).emit('project message', chat)
            })
            .catch(e => {
                console.error(e);
            })
    })
});

module.exports = socketApi;