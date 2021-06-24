var PLAY = 1;
var END=0;
var gameState = PLAY
var spaceShip;
var space;
var alienship1;
var alienship2,alienship3;
var missile;
var spaceshipImage,spaceImage;
var alienship1Image,alienship2Image,alienship3Image;
 var missileImage;
 var alienShipGroup;
 var missileGroup;
var gameOver;
var distance = 0;
var dieSound;
var checkpointSound;


function preload() {
spaceImage = loadImage("space.png");
spaceshipImage = loadImage("spaceShip.png");
alienship1Image = loadImage("alienship1.png");
missileImage = loadImage("Missile2.png");
alienship2Image = loadImage("iss.png");
gameOverImage = loadImage("gameOver.png");
dieSound = loadSound("die.mp3");
checkpointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  space = createSprite(0,0);
  space.addImage(spaceImage);
  space.scale = 6.5;
  space.velocityY = 2;
 
  

 spaceShip = createSprite(650,650,20,20);
spaceShip.addImage(spaceshipImage);
spaceShip.scale = 1.3;

gameOver = createSprite(600,300);
gameOver.addImage(gameOverImage);
//creating groups
alienShipGroup = new Group();
missileGroup = new Group();
}

function draw() {
  background(0);  
  if(gameState===PLAY){
    gameOver.visible = false;
   
    distance = distance+Math.round(getFrameRate()/50);
  //Moving background
  if(space.y>680){
    space.y = 600;
  }
  if(keyDown("space")){
    createMissile();
  }
  
  if(alienShipGroup.isTouching(missileGroup)){
     alienShipGroup.destroyEach(); 
     missileGroup.destroyEach();
     //score=score+5 
  }
  
  alienShip();

if(distance===600){
  alienShip2();
  checkpointSound.play();
}

  if(alienShipGroup.isTouching(spaceShip)){
   gameState=END;
dieSound.play();
  }
  
  }

  else if(gameState===END){
    space.velocityY = 0;
    alienShipGroup.destroyEach();
    spaceShip.destroy();
 gameOver.visible = true;
   
  }


  
  drawSprites();
  fill("lightblue")
  textSize(15)
  text("distance:"+distance,800,100);
}
function alienShip(){
  if(frameCount%150===0){
alienship1 = createSprite(Math.round(random(100,600)),200,20,20);
alienship1.addImage(alienship1Image);
alienship1.velocityY = 2;
alienShipGroup.add(alienship1);
}
}

function alienShip2(){

   alienship2 = createSprite(600,340,20,20);
   alienship2.addImage(alienship2Image);
 
  }
 
 

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    spaceShip.x = spaceShip.x-30;
  }
  if(keyCode=== RIGHT_ARROW){
    spaceShip.x = spaceShip.x+30;
  }
}
function  createMissile(){
missile = createSprite(650,650,3,3);
missile.addImage(missileImage);
missile.velocityY = -5;
missile.x = spaceShip.x;
missile.scale = 0.2;
missile.lifetime = 90;
missileGroup.add(missile)
}
