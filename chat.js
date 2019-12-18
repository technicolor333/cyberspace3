// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
var sc = document.getElementById('sc');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

// listens for typing
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})



// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    // output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';

    // Check for Soundcloud link
    if (data.message[0] === 's' && data.message[1] === 'c') {
      // document.append(data.message.substr(2));

    } else

    // Check for 'img' command
    if(data.message[0] === 'i' && data.message[1] === 'm' && data.message[2] === 'g')
    {
      newImage = data.message.substr(3);
      $("body").css("background-image", "url('" + data.message.substr(3) +"')");
      socket.emit('bg-update', handle.value);
      // $( "body" ).append("<img class=\"draggable\" url=\"${newImage}\" >");
      // $( "body" ).append("<img class=\"draggable sized\" url=\"http://localhost:4000/Legend.png\" >");
      // $("body").append("<iframe width=/"560/" height=/"315/" src=/"www.youtube.com/embed/zwE0OKM8G-c/" frameborder=/"0/" allow=/"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture/" allowfullscreen></iframe>");

      // YouTube Embedded Video Append 'yt' command
    }else if(data.message[0] === 'y' && data.message[1] === 't'){
      ytLink = data.message.substr(2);
      $("body").append('/"'+ytLink+'/"');
    }

    // if there is no terminal code, send message
    else {
      output.innerHTML += '<div class="handle"><p><strong>' + data.handle + ': </strong><div>' + data.message + '</p>';
      // newstuff.innerHTML += '<div class="newBox"></div>';
    }
});


// Says you're typing in the feedback box
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('bg-update', function(data){
  feedback.innerHTML = '<p>' + data.handle + 'has updated the backdrop </p>';
})
