
const express = require('express')

//App Setup
const app = express()
const server= require('http').createServer(app)
server.listen(4000,function(){
    console.log("port 4000");
});

//Importing users.js
const {joinUser} =require('./public/users')

const io = require('socket.io')(server)

//Static files(Middleware)
app.use(express.static('public'));

let thisRoom= "";

// Connection making
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.in(thisRoom).emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.to(thisRoom).emit('typing', data);
    });

    //Room functionality
    socket.on("join room",function(data){
        console.log(`in room ${data.roomName}`);
        let Newuser = joinUser(socket.id,data.username,data.roomName);
        thisRoom=Newuser.roomname;
        console.log(Newuser);
        socket.join(Newuser.roomname);
    });

});