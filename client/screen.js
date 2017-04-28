(function() {
  var canvas = document.getElementById('container');
  var THREE = require('THREE');
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
  var renderer = new THREE.WebGLRenderer({canvas: canvas});

  renderer.setClearColor(0x2c3e50);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMapEnabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  var cube = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({color: 0xffffff});
  var character = new THREE.Mesh(cube, material);
  character.position = {x:0,y:0,z:0};
  character.castShadow = true;

  scene.add(character);
  camera.position.z = 7;
  character.add(camera);

  var grid = new THREE.GridHelper(10, 10);
  grid.rotation.x = Math.PI / 2;
  grid.position.z = -0.49;
  scene.add(grid);

  var map = [
    {x:0,y:5,z:0,w:11,h:1,d:1},
    {x:5,y:0,z:0,w:1,h:11,d:1},
    {x:0,y:-5,z:0,w:11,h:1,d:1},
    {x:-5,y:0,z:0,w:1,h:11,d:1},
  ];

  for(z in map)
  {
    temp = new THREE.Mesh(
      new THREE.BoxGeometry(map[z].w, map[z].h, map[z].d),
      new THREE.MeshLambertMaterial({color: 0xffffff})
    );

    temp.position.set(map[z].x, map[z].y, map[z].z);
    temp.receiveShadow = true;
    scene.add(temp);
  }

  // //demo map
  // for(x=-5;x<=5;x++)
  // {
  //   for(y=-5;y<=5;y++)
  //   {
  //     if(x==-5 || x==5 || y==-5 || y==5)
  //     {
  //       wall = new THREE.Mesh(cube, new THREE.MeshLambertMaterial({color: 0xffffff}));
  //
  //       wall.position.x = x;
  //       wall.position.y = y;
  //       wall.receiveShadow = true;
  //
  //       scene.add(wall);
  //     }
  //   }
  // }

  floor = new THREE.BoxGeometry(9, 9, 1);
  floorMaterial = new THREE.MeshLambertMaterial({color: 0xe67e22});
  floorMesh = new THREE.Mesh(floor, floorMaterial);
  floorMesh.receiveShadow = true;
  floorMesh.position.z = -1;
  scene.add(floorMesh);

  light = new THREE.PointLight(0xffee88, 1.5, 10);
  light.position.set(0, 0, 1);
  light.castShadow = true;
  scene.add(light);

  light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  function render()
  {
  	requestAnimationFrame(render);
  	renderer.render(scene, camera);
  }

  render();

  window.addEventListener('resize', function()
  {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    console.log(character);
  });

  var kd = require('keydrown');

  var moveSpeed = 0.075;

  kd.Q.down(function()
  {
    character.rotateZ(moveSpeed / 2);
  });
  kd.W.down(function()
  {
    character.translateY(moveSpeed);
  });
  kd.E.down(function()
  {
    character.rotateZ(-moveSpeed / 2);
  });
  kd.A.down(function()
  {
    character.translateX(-moveSpeed);
  });
  kd.S.down(function()
  {
    character.translateY(-moveSpeed);
  });
  kd.D.down(function()
  {
    character.translateX(moveSpeed);
  });
  kd.SHIFT.down(function()
  {
    moveSpeed = 0.125;
  });
  kd.SHIFT.up(function()
  {
    moveSpeed = 0.1;
  });
  kd.run(function()
  {
    kd.tick();
  });
})();
