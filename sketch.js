var canvas, backgroundImage;
var PLAY=1;
var END=0;
var gameState = 1;
var tomato,knife 
var sweeetcorn,carrot,brocoli,onion,potato
var gameoversound,knifesound

function preload(){
 tomatoimg=loadImage("1.png")
 knifeimg=loadImage("7.png")
 sweetcornimg=loadImage("2.png")
 carrotimg=loadImage("3.png")
 brocoliimg=loadImage("4.png")
 onionimg=loadImage("5.png")
 potatoimg=loadImage("6.png")
 gameOverimg=loadImage("gameover.png")
 gameoversound=loadSound("gameover.mp3")
 knifesound=loadSound("knifeSwoosh.mp3")
}

function setup(){
  canvas = createCanvas(600,600);
  
  knife=createSprite(40,200,20,10)
  knife.addImage(knifeimg)
  knife.scale=0.2
  knife.setCollider("rectangle",0,0,40,40)
  alienimg=loadAnimation("alien1.png","alien2.png")
  score=0
  vegetablegroup=new Group()
  enemygroup=new Group()
}


function draw(){
  background("lightblue")
  if(gameState===PLAY){
    enemy()
    vegetables()
    knife.x=World.mouseX
    knife.y=World.mouseY
    if(vegetablegroup.isTouching(knife)){
      vegetablegroup.destroyEach()
      score=score+2
    }
    else{
      if(enemygroup.isTouching(knife)){
        gameState=END
        vegetablegroup.destroyEach()
        enemygroup.destroyEach()
        vegetablegroup.setVelocityXEach(0)
        enemygroup.setVelocityXEach(0)
        knife.addImage(gameOverimg)
        knife.x=300
        knife.y=300
        knife.scale=1.2
      }
    }
  }
  
  
  drawSprites()
  text("score: "+score,300,30)
}
 
function enemy(){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20)
    alien.addAnimation("moving",alienimg)
    alien.y=Math.round(random(100,300))
    alien.velocityX=-(8+(score/10))
    alien.setLifetime=50
    enemygroup.add (alien)
  }
}

function vegetables(){
  if(World.frameCount%80===0){
    position=Math.round(random(1,2))
    vegetable=createSprite(400,200,20,20)
    if(position==1){
      vegetable.x=400
      vegetable.velocityX=-(7+(score/4))
    }
  
    else{
        if(position==2){
          vegetable.x=0
          vegetable.velocityX=(7+(score/4))
        }
      }
        vegetable.scale=0.2
        r=Math.round(random(1,6))
        if(r==1){
          vegetable.addImage(tomatoimg)
        }
        else if(r==2){
          vegetable.addImage(sweetcornimg)
        }
        else if(r==3){
          vegetable.addImage(carrotimg)
        }
        else if(r==4){
          vegetable.addImage(brocoliimg)
        }
        else if(r==5){
          vegetable.addImage(onionimg)
        }
        else {
          vegetable.addImage(potatoimg )
        }
        
        vegetable.y=Math.round(random(50,540))
        vegetable.setLifetime=150
        vegetablegroup.add(vegetable)

    
  }
}