// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
// var message = document.getElementById('message');
//     handle = document.getElementById('handle');
// var btn = document.getElementById('send');
//     output = document.getElementById('output');
//     draggable = document.getElementsByClassName('draggable');

// Emit Events

btn.addEventListener('click', function(){ // when button is clicked
  socket.emit('chat',{
    message: message.value, // get the value of the input field
    handle: handle.value
  });
});

// btn.addEventListener('click', function(){ // when button is clicked
//   socket.emit('chat',{
//   });
//     console.log('ClickEvent')
// });


// Listen for Events
socket.on('chat',function(data){ // fire client-side callback function
  output.innerHTML += '<p><strong>' + data.handle + '</strong>' + data.message +'</p>'
});
