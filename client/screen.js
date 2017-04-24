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
  createCube(0, 18, 0, 4, 4, 4, 0x1abc9c);

  //arms
  createCube(-3, 12, 0, 2, 8, 2, 0x3498db);
  createCube(3, 12, 0, 2, 8, 2, 0x9b59b6);

  //torso
  createCube(0, 12, 0, 4, 8, 2, 0x34495e);

  //legs
  createCube(-1, 4, 0, 2, 8, 2, 0xe74c3c);
  createCube(1, 4, 0, 2, 8, 2, 0xe67e22);

  //comparision cubes
  createCube(0, 0, 0, 10, 0, 10, 0xf1c40f);
  createCube(10, 0, 0, 10, 0, 10, 0xef0123);
  createCube(10, 10, 0, 10, 0, 10, 0xef0123);
  createCube(10, 20, 0, 10, 0, 10, 0xef0123);

  camera.position.z = 22.5;
  camera.position.y = 25;
  camera.rotation.x = -0.25;

  var kd = require('keydrown');

  kd.Q.down(function()
  {
    camera.rotation.y = camera.rotation.y + 0.025;
  });
  kd.E.down(function()
  {
    camera.rotation.y = camera.rotation.y - 0.025;
  });
  kd.W.down(function()
  {
    camera.position.z -= 1;

    for(z=0;z<6;z++)
    {
      scene.children[z].position.z -= 1;
    }
  });
  kd.A.down(function()
  {
    camera.position.x -= 1;

    for(z=0;z<6;z++)
    {
      scene.children[z].position.x -= 1;
    }
  });
  kd.S.down(function()
  {
    camera.position.z += 1;

    for(z=0;z<6;z++)
    {
      scene.children[z].position.z += 1;
    }
  });
  kd.D.down(function()
  {
    camera.position.x += 1;

    for(z=0;z<6;z++)
    {
      scene.children[z].position.x += 1;
    }
  });
  kd.SPACE.down(function()
  {
    camera.position.y += 1;

    for(z=0;z<6;z++)
    {
      scene.children[z].position.y += 1;
    }
  });
  kd.SHIFT.down(function()
  {
    camera.position.y -= 1;

    for(z=0;z<6;z++)
    {
      scene.children[z].position.y -= 1;
    }
  });
  kd.run(function()
  {
    kd.tick();
  });

  console.log(scene);

  function updateScreen()
  {
    if(width != window.innerWidth || height != window.innerHeight)
    {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }
  }

  function render()
  {
    updateScreen();

  	requestAnimationFrame(render);

  	renderer.render(scene, camera);
  }

  setInterval(function physics()
  {

  }, 1000 / 60);

  render();
})();
