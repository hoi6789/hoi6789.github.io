 var myGamePiece;
    var mouseGamePiece;
    var myObstacles = [];
    var bullets = [];
    var clearZones = [];
    var orient = 0;
    var myScore;
    var cooldown = 0;
    
    
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    //myObstacles = new component(10, 200, "green", 300, 120); 
    mouseGamePiece = new component(30, 30, "blue", 10, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;  
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false; 
    })
        window.addEventListener('mousemove', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
    },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
    stop : function() {
    clearInterval(this.interval);
  }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
    ctx = myGameArea.context;
        if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
    this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY; 
  } 
    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
    
    function bullet(width, height, color, x, y, hp, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;
    this.hp = 1;
    this.update = function(){
    ctx = myGameArea.context;
        if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }

  }
    this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY; 
  } 
    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crashx = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crashx = false;
    }
    return crashx;
  }
}

    function updateGameArea() {
        var x, y, tall;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      //return;
    } 
  }
        
        for (i = 0; i < myObstacles.length; i += 1) {
            for(j = 0; j < bullets.length; j++) {
    if (bullets[j].crashWith(myObstacles[i])) {
     clearZones.push(new component(5, 5, "orange", bullets[j].x, bullets[j].y));
     for(k = 0; k < clearZones.length + 1; k++) {
      if(!bullets[j].crashWith(clearZones[k])) {
      bullets[j].hp--;
     }
    }
      //return;
    } 
            }
  }
        
        for(j = 0; j < bullets.length; j++) {
    if (bullets[j].hp <= 0) {
      bullets.splice(j, 1);
     console.log(bullets);
      //return;
    } 
        }
        
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    y = (Math.random() * myGameArea.canvas.height / 2) + 100;
    tall = (Math.random() * y);
      if(y - tall < 50) {
          tall -= 50;
      }
    myObstacles.push(new component(10, tall, "green", x, 0));
    myObstacles.push(new component(10, 300, "green", x, y));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
     for (i = 0; i < clearZones.length; i += 1) {
    clearZones[i].x += -1;
    clearZones[i].update();
      myGameArea.context.clearRect(clearZones[i].x, clearZones[i].y, 5, 5);
  }
        myGamePiece.speedX = 0;
  myGamePiece.speedY = 0; 
        myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
  if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
  if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
  if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
        if(myGameArea.keys && myGameArea.keys[16] && cooldown == 0) {
            bullets.push(new bullet(5, 5, "orange", myGamePiece.x, myGamePiece.y));
        }
        for (i = 0; i < bullets.length; i += 1) {
    bullets[i].x += 1;
    bullets[i].update();
  }
        if (myGameArea.x && myGameArea.y) {
    mouseGamePiece.x = myGameArea.x;
    mouseGamePiece.y = myGameArea.y; 
  }

  myGamePiece.newPos();
  //myGameArea.clear();
  mouseGamePiece.update();
  myGamePiece.update();
}
    function moveup() {
  myGamePiece.speedY -= 1; 
}

function movedown() {
  myGamePiece.speedY += 1; 
}

function moveleft() {
  myGamePiece.speedX -= 1;
}

function moveright() {
  myGamePiece.speedX += 1;
}
    function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0; 
}
