var player1,player2;
var wall,coin1Group,coin2Group,coin3Group,coin4Group,coin5Group;
var player1Score = 0;
var player2Score = 0;

function preload(){
  maze = loadImage("maze.jpg");
  maze1 = loadImage("maze1.jpg");
  maze2 = loadImage("maze2.jpg");
}

function setup() {
  //createCanvas(displayWidth-15,displayHeight-130);
  createCanvas(windowWidth,windowHeight);
  console.log(innerWidth);
  console.log(innerHeight);

  wall = createGroup();
  coin1Group = createGroup();
  coin2Group = createGroup();
  coin3Group = createGroup();
  coin4Group = createGroup();
  coin5Group = createGroup();

  //Horizontal walls
  wall.add(createSprite(width/2,10,width,20));
  
  //Vertical walls
  wall.add(createSprite(10,height/2,20,height));
  wall.add(createSprite(10,height/2,20,height));

  player1 = new Player(width/6,height/2-200,10,10);
  player2 = new Player(width-80,height/2-200,10,10);
}

function draw() {
  background(maze); 

  push();
  fill("black");
  textSize(20);
  text(mouseX+" , "+mouseY,500,110);
  pop();

  push();
  fill("white");
  rect(130,580,150,25);
  fill("black");
  textSize(20);
  text("Score:"+player1Score,132,599);
  pop();

  push();
  fill("white");
  rect(1070,580,150,25);
  fill("black");
  textSize(20);
  text("Score:"+player2Score,1070,599);
  pop();

  player1Movement();
  player2Movement();
  coins();
  coinCollection();
  
  player1.display();
  player2.display();

  drawSprites();
}

function player1Movement(){
  if(keyDown("w")){
    player1.body.y = player1.body.y-3;
  }
  if(keyDown("s")){
    player1.body.y = player1.body.y+3;
  }
  if(keyDown("a")){
    player1.body.x = player1.body.x-3;
  }
  if(keyDown("d")){
    player1.body.x = player1.body.x+3;
  }
}

function player2Movement(){
  if(keyDown(UP_ARROW)){
    player2.body.y = player2.body.y-3;
  }
  if(keyDown(DOWN_ARROW)){
    player2.body.y = player2.body.y+3;
  }
  if(keyDown(LEFT_ARROW)){
    player2.body.x = player2.body.x-3;
  }
  if(keyDown(RIGHT_ARROW)){
    player2.body.x = player2.body.x+3;
  }
}

function coins(){
  if(frameCount%60===0){
    var coin1 = createSprite(random(0,width),random(0,height),15,15);
    //coin1.lifetime = 120;
    coin1.shapeColor = "yellow";
    coin1Group.add(coin1);
  }
  if(frameCount%80===0){
    var coin2 = createSprite(random(0,width),random(0,height),15,15);
    coin2.lifetime = 110;
    coin2Group.add(coin2);
  }
  if(frameCount%100===0){
    var coin3 = createSprite(random(0,width),random(0,height),15,15);
    coin3.lifetime = 100;
    coin3Group.add(coin3);
  }
  if(frameCount%50===0){
    var coin4 = createSprite(random(0,width),random(0,height),15,15);
    coin4.lifetime = 100;
    coin4Group.add(coin4);
  }
  if(frameCount%120===0){
    var coin5 = createSprite(random(0,width),random(0,height),15,15);
    coin5.lifetime = 70;
    coin5Group.add(coin5);
  }
}

function coinCollection(){
  //Player1
  for(var i=0;i<coin1Group.length;i++){
    if(player1.body.isTouching(coin1Group.get(i))){
      player1Score+=1;
      coin1Group.get(i).destroy();
    }
}
  if(player1.body.isTouching(coin3Group) || player1.body.isTouching(coin4Group)){
    player1Score+=3;
  }
  if(player1.body.isTouching(coin5Group)){
    player1Score+=5;
  }

  //Player2
  if(player2.body.isTouching(coin1Group) || player1.body.isTouching(coin2Group)){
    player2Score+=1;
  }
  if(player2.body.isTouching(coin3Group) || player1.body.isTouching(coin4Group)){
    player2Score+=3;
  }
  if(player2.body.isTouching(coin5Group)){
    player2Score+=5;
  }
}