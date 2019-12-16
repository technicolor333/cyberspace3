// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
var sc = document.getElementById('sc');

// Emit eventst
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    // output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    if (data.message[0] === 's' && data.message[1] === 'c') {
      // output.innerHTML += '<p class="draggable"><strong>' + data.handle + ': </strong>' + data.message.substr(2); + '</p>';
      document.append(data.message.substr(2));
    //  sc = data.message.substr(2);
    //  sc.class = 'draggable'

    // newstuff.innerHTML += '<div class="newBox"></div>';

    // Create new styled draggable box for the soundcloud link...

      // DOM.append(iframe add style draggable)

    } else if(data.message[0] === 'i' && data.message[1] === 'm' && data.message[2] === 'g')
    {
      console.log(data.message.substr(3))
      // data.message.substr(3)
      $("body").css("background-image", "url('" + data.message.substr(3) +"')");
    }
    else {
      output.innerHTML += '<div class="handle"><p><strong>' + data.handle + ': </strong><div>' + data.message + '</p>';
      newstuff.innerHTML += '<div class="newBox"></div>';
    }
    // sc.src = data.message;
});

// if message.parse == 'sc'{
//   set src attrb
// }else{
//   post message
// }


socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
