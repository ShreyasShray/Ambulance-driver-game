//creating all the variables
var ambulance, ambulance_animation;
var car1, car2, red_car, orange_car, blue_truck;
var black_car, police, taxi,car1Group, car2Group; 
var truck, van;
var road, road_image;
var START = 0;
var PLAY = 1;
var END = 2;
var gamestate = START;
var left_boundary, right_boundary;
var score = 0;
var select_lane1, select_lane2, select_car1, select_car2;


function preload(){
  
  //loading the image of the road
  road_image = loadImage("road.png");
  
  //loading all the images of cars and trucks
  red_car = loadImage("red_car.png");
  orange_car = loadImage("orange_car.png");
  black_car = loadImage("black_car.png");
  blue_truck = loadImage("blue_truck.png");
  truck = loadImage("truck.png");
  taxi = loadImage("taxi.png");
  van = loadImage("van.png");
  
  //loading the animation of ambulance and police car
  police = loadAnimation("police_1.png", "police_3.png", "police_3.png");
  ambulance_animation = loadAnimation("ambulance_1.png", "ambulance_2.png", "ambulance_3.png");
  
  //creating the car Group
  car1Group = new Group();
  car2Group = new Group();

}

function setup() {
  //creating the canvas
  createCanvas(400, 500);
  
  //creating the road
  road = createSprite(200, 150, 400, 700);
  road.addImage(road_image);
  
  //creating the ambulance
  ambulance = createSprite( 200, 440, 40, 40);
  ambulance.addAnimation("runing", ambulance_animation)
  ambulance.scale = 0.5;
  
  //creating the boundary
  left_boundary = createSprite(-10, 250, 5, 500);
  right_boundary = createSprite(410, 250, 5, 500);
 
}

function draw() {
  
  //the three gamestates
  if (gamestate === START) {  //gamestate START
    //background color
    background("grey");
    
    //press space to start the game
    textSize(25);
    stroke('black');
    fill("yellow");
    text("Press 'space' to start the game", 40, 250);
    
    //if we press space the game should play
    if (keyDown('space') && gamestate === START) {
      gamestate = PLAY;
    }
    
  }else if (gamestate === PLAY) {  //gamestate PLAY
    
    //moving the road backwords
    road.velocityY = 2;
    road.velocityY = road.velocityY + score/300;
    console.log(road.velocityY);
    
    //setting the collider of ambulance
    ambulance.setCollider("rectangle", 0, 0, 80, 200);
    //ambulance.debug = true;
    
    //making the road infinite
    if (road.y > 240) {
      road.y = 140;
    }
    
    //moving the ambulance using left right arrow
    if (keyDown(LEFT_ARROW)) {
      ambulance.x = ambulance.x - 6;
    }
    
    if (keyDown(RIGHT_ARROW)) {
      ambulance.x = ambulance.x + 6;
    }
    
    //ambulance should collide with the boundaries
    ambulance.collide(left_boundary);
    ambulance.collide(right_boundary);
    
    
    drawSprites();
    
    textSize(30);
    stroke('black');
    fill('black');
    text("Score : " + score, 130, 30);
    
    score = score + Math.round(getFrameRate()/60);
    
    spawn_cars1();
    
    spawn_cars2();
    
    if (car1Group.isTouching(ambulance) || car2Group.isTouching(ambulance)) {
      gamestate = END;
      car1Group.destroyEach();
      car2Group.destroyEach();
    }
    
    
  }else if (gamestate === END) {  //gamestate END
    
    background('grey');
    
    textSize(20);
    stroke("black");
    fill("black");
    text("Your Score : " + score, 100, 30);
    textSize(50);
    text("Game Over", 80, 200);
    textSize(20);
    text("press 'r' to restart", 130, 300);
    
    if (keyDown('r') && gamestate === END) {
      gamestate = START;
      score = 0;
    }
  }
  
  
  
}

//making the functios to spawn cars
function spawn_cars1() {
  if (frameCount % (120 - Math.round(score/30)) === 0) {
    car1 = createSprite(50, -100, 40, 40);
    select_lane1 = Math.round(random(1, 2));
    if (select_lane1 === 1) {
      car1.x = 50;
    }else if (select_lane1 === 2) {
      car1.x = 150;
    }
    select_car1 = Math.round(random(1, 8));
    if (select_car1 === 1) {
      car1.addImage(black_car);
    }else if (select_car1 === 2) {
      car1.addImage(blue_truck);
    }else if (select_car1 === 3) {
      car1.addImage(orange_car);
    }else if (select_car1 === 4) {
      car1.addAnimation("running", police);
    }else if (select_car1 === 5) {
      car1.addImage(red_car);
    }else if (select_car1 === 6) {
      car1.addImage(taxi);
    }else if (select_car1 === 7) {
      car1.addImage(truck);
    }else if (select_car1 === 8) {
      car1.addImage(van);
    }else{
      car1.addImage(red_car);
    }
    car1.velocityY = 2;
    car1.velocityY = car1.velocityY + score/300;
    car1.scale = 0.6;
    car1.lifetime = 300;
    car1.setCollider("rectangle", 0, 0, 80, 200);
    //car1.debug = true;
    car1Group.add(car1);
      
  }
}

function spawn_cars2() {
  if (frameCount % (150 - Math.round(score/30)) === 0) {
    car2 = createSprite(250, -100, 40, 40);
    select_lane2 = Math.round(random(1, 2));
    if (select_lane2 === 1) {
      car2.x = 250;
    }else if (select_lane2 === 2) {
      car2.x = 350;
    }
    select_car2 = Math.round(random(1, 8));
    if (select_car2 === 1) {
      car2.addImage(black_car);
    }else if (select_car2 === 2) {
      car2.addImage(blue_truck);
    }else if (select_car2 === 3) {
      car2.addImage(orange_car);
    }else if (select_car2 === 4) {
      car2.addAnimation("running", police);
    }else if (select_car2 === 5) {
      car2.addImage(red_car);
    }else if (select_car2 === 6) {
      car2.addImage(taxi);
    }else if (select_car2 === 7) {
      car2.addImage(truck);
    }else if (select_car2 === 8) {
      car2.addImage(van);
    }else{
      car1.addImage(red_car);
    }
    car2.velocityY = 2;
    car2.velocityY = car2.velocityY + score/300;
    car2.scale = 0.6;
    car2.lifetime = 300;
    car2.setCollider("rectangle", 0, 0, 80, 200);
    //car2.debug = true;
    car2Group.add(car2);
      
  }
}