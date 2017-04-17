(function() {
  var container = document.getElementById('container');
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  function createCube(x, y, z, w, h, d)
  {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial( { color: 0xe67e22 } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
  }

  for(x = 0;x < 10;x++)
  {
    for(z = 0;z < 10;z++)
    {
      createCube(x, 0, z, 1, 1, 1);
    }
  }

  var kd = require('keydrown');

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

  });
  kd.run(function()
  {
    kd.tick();
  });

  camera.position.z = 20;
  camera.position.y = 2;

  function render()
  {
  	requestAnimationFrame( render );

  	renderer.render( scene, camera );
  }

  render();
})();
