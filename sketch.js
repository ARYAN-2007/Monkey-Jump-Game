var monkey,monkey_running;

var banana,bananaImage;
var obstacleImage;

var foodGroup;
var obstacleGroup;

var survivalTime = 0;
var score = 0;

var Ground;

var gameState = 1;
var PLAY = 1;
var END = 0;

function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}

function setup() {

createCanvas(620,550);  
  
monkey = createSprite(60,383,10,10); 
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.158;
  
Ground = createSprite(400,435,900,15);
Ground.velocityX = -4;
Ground.shapeColor = 'green';

foodGroup = createGroup();
obstacleGroup = createGroup();  
  
monkey.setCollider("rectangle",10,10,monkey.width,monkey.height);
monkey.debug = true;

}


function draw() {

background("lightblue");  

  
  
if (gameState === PLAY) {

if (Ground.x < 400 ) {
Ground.x = Ground.width/2;  
}

if (keyDown("space") && monkey.y > 370) {
monkey.velocityY = -25;  
}  

if (foodGroup.isTouching(monkey)) {
score = score + 5;
foodGroup.destroyEach();
}  
  
monkey.velocityY = monkey.velocityY + 0.8;  
  
obstacles();
bananas();
  
textSize(20);
fill("black")  
text("Score : "+score,200,50)  
  
textSize(20);
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time : "+survivalTime,400,50)  

if (obstacleGroup.isTouching(monkey)) {
gameState = END;  
}

}
else if (gameState === END) {
reset();
if (keyDown("r")) {
gameState = PLAY;  
survivalTime = 0;
}  
}
  
  
monkey.collide(Ground);  
  
drawSprites();
            
}

function reset () {

score = 0;
Ground.velocityX = 0;
foodGroup.destroyEach();
obstacleGroup.destroyEach();  
textSize(20);
fill("black");
text ("YOU LOSE",270,275);
text("PRESS 'R' TO RESTART",200,300);
monkey.y = 383;  
}


function obstacles () {
  
if (frameCount % 100 === 0) {
obstacle = createSprite(805,363,10,10);  
obstacle.addImage(obstacleImage);
obstacle.velocityX = - (10 + survivalTime / 15);
obstacle.scale = 0.35;
obstacle.lifetime = 250;  
  
obstacleGroup.add(obstacle);
} 
}

function bananas () {
  
if (frameCount % 120 === 0) {
banana = createSprite(805,215,10,10); 
banana.addImage(bananaImage)
banana.velocityX = -(9 + survivalTime / 15);  
banana.scale = 0.1; 
banana.lifetime = 250;
  
foodGroup.add(banana);  
}  
}
















