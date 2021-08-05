const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadnessfollows = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  sadnessfollows.looping = false;
  eat.looping = false;
  blink.playing = true;
  eat.playing = true;
  sadnessfollows.playing = true;
 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);


  bunny = createSprite(230,620,100,100);
  blink.frameDelay = 20
  sadnessfollows.frameDelay = 20
  eat.frameDelay = 20
  bunny.addAnimation(`confusion`,blink);
  bunny.addAnimation(`sadness follows you everywhere`,sadnessfollows)
  bunny.addAnimation(`eat`,eat);


  bunny.changeAnimation(`confusion`)

  bunny.scale = 0.2;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit != null){
  image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  if(collided(fruit,bunny) == true){
    bunny.changeAnimation(`eat`);
    fruit = null
  }

  if(collided(fruit,ground.body) == true){
    bunny.changeAnimation(`sadness follows you everywhere`);
  }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function collided(body,sprite){

  if (body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)

    console.log(d)

    if(d <= 80){
      World.remove(world,fruit);
      return true
      


    }
    else{

    return false

    }

  }


}