// connection making
var socket = io('http://localhost:4000')

// Query DOM
var message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');
    title = document.getElementById('title');

//Saving user details
var userName = prompt("whats your name");
let room = prompt("room name");

title.innerHTML += `Room ${room} `;


// EMIT EVENTS

//Chat displayed on clicking send
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: userName
  });
  message.value = "";
});

//Typing event
message.addEventListener('keypress', function(){
  socket.emit('typing',userName);
});

//Joining rooms
socket.emit("join room", {username:userName, roomName:room});

// LISTENING FOR EVENTS

//Prints data on output div
socket.on('chat', function(data){
    feedback.innerHTML="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});


socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});