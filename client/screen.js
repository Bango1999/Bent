(function() {
  var container = document.getElementById('container');
  var scene = new THREE.Scene();

  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild(renderer.domElement);

  function createCube(x, y, z, w, h, d, color)
  {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial( { color: color } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
  }

  //head
  createCube(0, 1.8, 0, 0.4, 0.4, 0.4, 0x1abc9c);
  //arms
  createCube(-0.3, 1.2, 0, 0.2, 0.8, 0.2, 0x3498db);
  createCube(0.3, 1.2, 0, 0.2, 0.8, 0.2, 0x9b59b6);
  //torso
  createCube(0, 1.2, 0, 0.4, 0.8, 0.2, 0x34495e);
  //legs
  createCube(-0.1, 0.4, 0, 0.2, 0.8, 0.2, 0xe74c3c);
  createCube(0.1, 0.4, 0, 0.2, 0.8, 0.2, 0xe67e22);

  //comparision cubes
  createCube(0, 0, 0, 1, 0, 1, 0xf1c40f);
  createCube(1, 0, 0, 1, 0, 1, 0xef0123);
  createCube(1, 1, 0, 1, 0, 1, 0xef0123);
  createCube(1, 2, 0, 1, 0, 1, 0xef0123);

  camera.position.z = 2.25;
  camera.position.y = 2.5;
  camera.rotation.x = -0.25;

  var kd = require('keydrown');

  console.log(camera);

  kd.Q.down(function()
  {
    camera.rotation.y = camera.rotation.y + 0.05;
  });
  kd.E.down(function()
  {
    camera.rotation.y = camera.rotation.y - 0.05;
  });
  kd.W.down(function()
  {
    camera.position.z = camera.position.z - 0.1;
  });
  kd.A.down(function()
  {
    camera.position.x = camera.position.x - 0.1;
  });
  kd.S.down(function()
  {
    camera.position.z = camera.position.z + 0.1;
  });
  kd.D.down(function()
  {
    camera.position.x = camera.position.x + 0.1;
  });
  kd.SPACE.down(function()
  {
    camera.position.y = camera.position.y + 0.1;
  });
  kd.SHIFT.down(function()
  {
    camera.position.y = camera.position.y - 0.1;
  });
  kd.run(function()
  {
    kd.tick();
  });

  console.log(scene);

  function render()
  {
    if(width != window.innerWidth || height != window.innerHeight)
    {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

  	requestAnimationFrame(render);

  	renderer.render(scene, camera);
  }

  setInterval(function physics()
  {

  }, 1000 / 60);

  render();
})();
