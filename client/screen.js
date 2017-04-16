(function() {
  var screen = document.getElementById("screen");

  var map = new Array();
  for(x = 0;x < 200;x++)
  {
    map[x] = new Array();

    for(y = 0;y < 200;y++)
    {
      map[x][y] = "0";
    }
  }

  ctx = screen.getContext('2d');
  ctx.fillStyle = "#000";

  width = window.innerWidth
  height = window.innerHeight;

  screen.width = width;
  screen.height = height;

  size = {};
  size.w = 100 / width;
  size.h = 100 / height;

  for(x = 0;x < 100;x++)
  {
    for(y = 0;y < 100;y++)
    {

    }
  }

  console.log('done');

  // get the canvas DOM element and the 2D drawing context
  var canvas = document.getElementById('screen');

})();
