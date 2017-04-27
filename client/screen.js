(function() {
  var container = document.getElementById('container');
  var ctx = container.getContext('2d');

  var width = window.innerWidth;
  var height = window.innerHeight;

  container.width = width;
  container.height = height;

  //ratio = 4 : 3;

  var scale = {};
  scale.x = 200;
  scale.y = 150;

  var unit = {};
  unit.x = width / scale.x;
  unit.y = height / scale.y;

  window.addEventListener('resize', function()
  {
    //update
    width = window.innerWidth;
    height = window.innerHeight;

    //update
    container.width = width;
    container.height = height;

    //update
    unit.x = width / scale.x;
    unit.y = height / scale.y;
  });

  //character

  var character = {};
  character.position = {};
  character.position.x = 10;
  character.position.y = 10;
  character.position.w = 5;
  character.position.h = 5;
  character.stat = {};
  character.stat.health = 200;
  character.stat.maxHealth = 200;

  //map

  map = [
    {
      nid:'wall#1',
      x:0,
      y:0,
      w:100,
      h:5
    },
    {
      nid:'wall#1',
      x:0,
      y:70,
      w:100,
      h:5
    },
    {
      nid:'wall#1',
      x:0,
      y:5,
      w:5,
      h:65
    },
    {
      nid:'npc#1',
      x:50,
      y:50,
      w:5,
      h:5
    }
  ];

  style = [
    {
      nid:'wall#1',
      innerColor:'#000',
      outerColor:'#000',
      type:'fillRect'
    },
    {
      nid:'npc#1',
      innerColor:'#fff',
      outerColor:'#000',
      type:'strokeRect'
    }
  ];

  //movement

  var kd = require('keydrown');

  kd.W.down(function()
  {
    testMove(character.position.x, character.position.y - 1);
  });
  kd.A.down(function()
  {
    testMove(character.position.x - 1, character.position.y);
  });
  kd.S.down(function()
  {
    testMove(character.position.x, character.position.y + 1);
  });
  kd.D.down(function()
  {
    testMove(character.position.x + 1, character.position.y);
  });

  kd.run(function()
  {
    kd.tick();
  });

  container.addEventListener('click', function(event)
  {
    mcx = event.clientX;
    mcy = event.clientY;
    console.log(mcx, mcy);
  });

  function findStyle(mapObject)
  {
    for(i in style)
    {
      if(mapObject.nid == style[i].nid)
      {
        return style[i];
      }
    }
  }

  function testMove(inputX, inputY)
  {
    collision = false;

    for(i in map)
    {
      if(
        inputX < map[i].x + map[i].w &&
        inputX + character.position.w > map[i].x &&
        inputY < map[i].y + map[i].h &&
        inputY + character.position.h > map[i].y
      )
      {
        collision = true;
        break;
      }
    }

    if(!collision)
    {
      character.position.x = inputX;
      character.position.y = inputY;
    }
  }

  //map rendering

  function render()
  {
    ctx.clearRect(0, 0, width, height);

    //render map

    for(i in map)
    {
      //canvas
      cx = 0;
      cy = 0;
      cw = width;
      ch = height;

      //map item
      dx = (width / 2) - (character.position.w / 2) - (unit.x * character.position.x) + (unit.x * map[i].x) + 0.5;
      dy = (height / 2) - (character.position.h / 2) - (unit.y * character.position.y) + (unit.y * map[i].y) + 0.5;
      dw = (unit.x * map[i].w);
      dh = (unit.y * map[i].h);

      //if map item is inside canvas, render it
      if(cx < dx + dw && cx + cw > dx && cy < dy + dh && cy + ch > dy)
      {
        setStyle = findStyle(map[i]);

        if(setStyle == undefined)
        {
          console.log('could not find a set style for ' + map[i].name)
        }
        else
        {
          if(setStyle.hasOwnProperty('innerColor'))
          {
            ctx.fillStyle = setStyle.innerColor;
          }

          if(setStyle.hasOwnProperty('outerColor'))
          {
            ctx.strokeStyle = setStyle.outerColor;
          }

          if(setStyle.hasOwnProperty('type'))
          {
            if(setStyle.type == 'fillRect')
            {
              ctx.fillRect(dx, dy, dw, dh);
            }
            else if(setStyle.type == 'strokeRect')
            {
              ctx.strokeRect(dx, dy, dw, dh);
            }
          }
        }
      }
    }

    //render character

    ctx.strokeRect(
      (width / 2) - (character.position.w / 2) + 0.5,
      (height / 2) - (character.position.h / 2) + 0.5,
      (unit.x * character.position.w),
      (unit.y * character.position.h)
    );
  }

  window.setInterval(render, 1000 / 60);
})();
