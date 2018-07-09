// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  //set up parameters used to define the position and speed of the Enemy
    this.x = x;
    this.y = y;
    this.width=80;
    this.height=60;
    this.speed = speed;
    //This defines the image of the enemy
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x=-50;
      this.speed= 100 + Math.floor(Math.random() * 200)*player.level;
    };
    //check for collisions bettween the enemy and the Player
    if (gameOn===true && player.visibility===true){
    if (player.x < this.x + 80 &&
        player.x + 50 > this.x &&
        player.y + 60 > this.y &&
        player.y < this.y + 60) {
          player.lives-=1;
          if (player.lives===0){
            gameOn=false;
          }
          else {
            player.start();
            collectable.start();
          }
        }
      }
   };


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//declare game start or not
var gameOn=true;

//set collectable items including gems heart and star for the game
var Collectable=function(){
  this.grid=[[],[],[],[],[],[]];
  this.start();
};

//start collectable by randomly put on each position
Collectable.prototype.start=function(){
  for (var i=1; i<4; i++){
    for(var j=0; j<5; j++){
      var random=Math.floor(Math.random()*100);
      if (random<65){
        this.grid[i][j]=0;
      }
      else if(random<75){
        this.grid[i][j]=1;
      }
      else if(random<85){
        this.grid[i][j]=2;
      }
      else if(random<95){
        this.grid[i][j]=3;
      }
      else if(random<98){
        this.grid[i][j]=4;
      }
      else {
        this.grid[i][j]=5;
      }
    }
  }
};

// player class
// This class includes an update(), render() and
// a handleInput() method.
var Player = function() {

  this.width=50;
  this.height=60;
  this.start();
  //player will also hold score lives and level for the game
  this.score=0;
  this.lives=3;
  this.level=1;
  //declare the image of the Player
  this.player = 'images/char-princess-girl.png';
};

Player.prototype.start=function(){
  //set player position
  this.col = 2;
  this.row = 5;
  this.x=this.col*101;
  this.y=this.row*83-5;
  //player is visible by default
  this.visibility=true;
};

Player.prototype.update= function (dt) {
  // Once the user reaches the top of the page; the water, the user is
  // Instantly reset to the starting position
  if (this.row === 0) {
    this.level+=1;
    this.start();
    collectable.start();
  };
  //collect gems heart and stars
  var pickup=collectable.grid[this.row][this.col];
  switch(pickup){
    case 1:
    this.score+=10;
    break;
    case 2:
    this.score+=10;
    break;
    case 3:
    this.score+=10;
    break;
    case 4:
    this.lives+=1;
    break;
    case 5:
    this.visibility=false;
    break;
  }
  collectable.grid[this.row][this.col]=0;
  this.x=this.col*101;
  this.y=this.row*83-5;
};
// Renders the image of the user into the game
Player.prototype.render = function () {
  if (this.visibility===false){
    ctx.globalAlpha=0.5;
  }
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
    ctx.globalAlpha=1;
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

    // let user use left arrow key to move left on the x axis by 101
    // Also make sure user not to go off the game tiles on the left side
    if (gameOn===true){
    if (keyPress == 'left' && this.x > 0) {
        this.col -= 1;
    };

    // let user use right arrow key to move right on the x axis by 101
    // Also make sure user not to go off the game tiles on the right side
    if (keyPress == 'right' && this.x < 404) {
        this.col += 1;
    };

    // let user use up arrow key to move upwards on the y axis by 83
    if (keyPress == 'up' && this.y > 0) {
        this.row -= 1;
    };

    // let user use down arrow key to move downwards on the y axis by 83
    // Also make sure user not to go off the game tiles on the bottom side
    if (keyPress == 'down' && this.y < 410) {
        this.row += 1;
    };
  };
};
//gameover Popup
var Gameover=function(){
  this.content="GAME OVER";
};
Gameover.prototype.render=function(){
  if(!gameOn){
    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    ctx.lineWidth=3;
    ctx.strokeRect(0, 0, 505, 606);
    ctx.fillRect(0, 0, 505, 606);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "24px serif";
    ctx.fillText(this.content, 252, 302);
  }
};
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [63, 147, 230];

// For each enemy located on the y axis from 0 on the x axis move at a speed of 200
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
var player = new Player();
var gameover=new Gameover();
var collectable=new Collectable();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
