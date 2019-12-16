// Set up Renderer
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//CAMERA
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 2500);
var tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
var windowHeight = window.innerHeight;
window.addEventListener('resize', function(){
  for(var i=0; i<camera.length; i++){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.background = "black";
  }
});
camera.position.z = 500;

//KEYBOARD CONTROLS
var keyState = {};
var keyboardEvents = function(){
  document.addEventListener('keydown', function(e){
    var keyCode = event.which || event.keyCode;
    keyState[keyCode] = true;
  });
  document.addEventListener('keyup', function(e){
    var keyCode = event.which || event.keyCode;
    keyState[keyCode] = false;
  });
}
keyboardEvents();


// PLAYER CONTROLS

// ARROW KEYS
function playerMovement(){
  if(keyState[68] || keyState[39]){
  	cube.position.x += 1;
  } else if (keyState[65] || keyState[37]){
  	cube.position.x -= 1;
  }
  if(keyState[87] || keyState[38]){
  	cube.position.y += 1;
  } else if(keyState[83] || keyState[40]){
  	cube.position.y -= 1;
  }
};




// Scene
var scene = new THREE.Scene();

//Define the object
var geometry = new THREE.BoxGeometry(10,10,10);
// var material = new THREE.MeshBasicMaterial({color:0xdd0000});
var texture = new THREE.TextureLoader().load( "scripts/sprites/nite.png" ); //filepath relative from public, not gameDev.js
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
  var material = new THREE.MeshBasicMaterial({map:texture});
var cube = new THREE.Mesh(geometry,material);
//add object to scene
scene.add(cube);


//RENDER LOOP
// runs every single frame, renders the scene with the camera.
function gameloop(){
  playerMovement();
  renderer.render(scene, camera); // camera renders the scene and all its contents
  requestAnimationFrame(gameloop);
 // cube.rotation.x += .1;
 // cube.rotation.y += .1;
}

gameloop();
