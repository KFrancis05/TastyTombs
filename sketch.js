//background image
let bgImage;
//maya animations
let mayaUp;
let mayaDown;
let mayaSide;
let mayaIdle;
//doors
let door1;
let door2;
let door3;
let door4;
let doorR;
let doorG;
//rooms
let room1 = true;
let room2;
let room3;
let room4;
let room5;
let room6;
let bossroom = false;
//keys
let gKey = false;
let rKey = false;
let gKeySprite;
let rkeySprite;
//enemies
let burger1;
let burger2;
let pizza1;
let nugget1;
let nugget2;
//health
let hearts;
let health = 3;
//enemy tracker
let tracker;
//nugget move check
let up = true;
let up2 = true;
//boss hit check
let hit1 = false;
let hit2 = false;
let hit3 = false;
let hide;
//start screen over check
started = false;

//loads all the sprites and animations
function preload() {
  damage = loadSound("Hit_Damage.wav");
  hurt = loadSound("Hit_Hurt.wav");
  pickup = loadSound("Pickup_Key.wav");
  enter = loadSound("Enter.wav");
  theme = loadSound("Dungeon_Theme_Trimmed.wav");
  bgImage = loadImage("full floor.png");
  dImage = loadImage("door.png");
  doorRed = loadImage("redDOOR.png");
  doorGreen = loadImage("greenDOOR.png");
  Msword = loadImage("sword.png");
  greenK = loadImage("greenKEY.png");
  redK = loadImage("redKEY.png");
  blocked = loadImage("blockeddoor.png");
  hrts3 = loadImage("fullhearts.png");
  hrts2 = loadImage("2hearts.png");
  hrts1 = loadImage("1heart.png");
  hd = loadImage("hotdog.png");
  hdh1 = loadImage("hotdoghurt1.png");
  hdh2 = loadImage("hotdoghurt2.png");
  hdh3 = loadImage("hotdoghurt3.png");
  win = loadImage("winScreen.png");
  ctrl = loadImage("controls.png");
  lose = loadImage("loseScreen.png");
  start = loadImage("startScreen.png");
  //brl = loadImage('barrel.png');
  nuggs = loadAnimation("nugget.png", {
    size: [36, 53],
    frames: 2,
  });
  enemy1 = loadAnimation("burger.png", {
    size: [68, 58],
    frames: 4,
  });
  enemy2 = loadImage("pizza.png");
  mayaIdle = loadAnimation("spriteIDLE.png", {
    size: [18, 24],
    frames: 1,
  });
  mayaUp = loadAnimation("spritewalkUPTEST.png", {
    size: [18, 24],
    frames: 3,
  });
  mayaSide = loadAnimation("spritewalkSIDETEST.png", {
    size: [13, 23],
    frames: 3,
  });
  mayaDown = loadAnimation("spritewalkDOWNTEST.png", {
    size: [18, 24],
    frames: 3,
  });
}

function setup() {
  //creates a canvas
  new Canvas(726, 442);
  //makes the walls group
  walls = new Group();
  walls.color = "rgb(105,70,105)";
  walls.collider = "static";
  //makes the doors group
  doors = new Group();
  doors.image = dImage;
  doors.w = 40;
  doors.h = 40;
  doors.collider = "static";
  //makes the sprites and initalizes their roatation
  let bWall = new walls.Sprite(width / 2, height - 20, 726, 40);
  let tWall = new walls.Sprite(width / 2, 20, 726, 40);
  let lWall = new walls.Sprite(20, height / 2, 40, 442);
  let rWall = new walls.Sprite(706, height / 2, 40, 442);
  door1 = new doors.Sprite(width / 2, height - 20);
  door1.rotation = 180;
  door2 = new doors.Sprite(706, height / 2);
  door2.rotation = 90;
  door3 = new doors.Sprite(width / 2, 20);
  door4 = new doors.Sprite(-20, height / 2);
  door4.rotation = -90;
  doorG = new Sprite(width / 2, -40, 40, 40, "static");
  doorG.image = doorGreen;
  doorR = new Sprite(-40, height / 2, 40, 40, "static");
  doorR.rotation = -90;
  doorR.image = doorRed;
  maya = new Sprite(100, 100, 15, 25);
  maya.rotationLock = true;
  //adds animations for maya and scales
  maya.addAni("idle", mayaIdle);
  maya.addAni("up", mayaUp);
  maya.addAni("side", mayaSide);
  maya.addAni("down", mayaDown);
  maya.scale = 1.5;
  //sword properties
  sword = new Sprite(-60, -60, 15, 25);
  sword.scale = 1.5;
  sword.image = Msword;
  sword.rotation = -90;
  sword.vel.y = 0;
  //key properties
  gKeySprite = new Sprite(-80, -80, 15, 25);
  gKeySprite.image = greenK;
  gKeySprite.scale = 2;
  gKeySprite.rotationLock = true;
  rKeySprite = new Sprite(-90, -90, 15, 25);
  rKeySprite.image = redK;
  rKeySprite.scale = 2;
  rKeySprite.rotationLock = true;
  //enemy 1 and enemy 2
  burgers = new Group();
  burgers.addAni("burger", enemy1);
  burgers.scale = 1.7;
  burgers.rotationLock = true;
  burger1 = new burgers.Sprite(-120, -120, 50, 55);
  burger2 = new burgers.Sprite(-240, -240, 50, 55);
  //enemy 3
  pizzas = new Group();
  pizzas.image = enemy2;
  pizzas.scale = 1.5;
  pizza1 = new pizzas.Sprite(-260, -260, 45, 45);
  //enemy 4 and enemy 5
  nuggets = new Group();
  nuggets.addAni("chomp", nuggs);
  nuggets.scale = 1.8;
  nuggets.rotationLock = true;
  nuggs.frameDelay = 20;
  nugget1 = new nuggets.Sprite(-300, -340, 35, 55);
  nugget1.mirror.x = true;
  nugget2 = new nuggets.Sprite(-530, -340, 35, 35);
  //boss
  hotdog = new Sprite(-640, -621, 220, 70);
  hotdog.image = hd;
  hotdog.scale = 1.3;
  hotdog.mirror.x = true;
  hotdog.rotationLock = true;
  //health
  hearts = new Sprite(90, 22, 1, 1, "static");
  hearts.image = hrts3;
  hearts.scale = 2;
  hearts.overlaps(walls);
  //objects around castle
  //barrel = new Sprite(650, 55, 15, 25, "static");
  //barrel.image = brl;
  //barrel.scale = 1.5;
  //enemy tracker
  tracker = new Sprite(85, 320, 1, 1, "static");
  tracker.overlaps(maya);
  tracker.overlaps(walls);
  tracker.overlaps(doors);
  tracker.overlaps(hearts);
  tracker.overlaps(sword);
  tracker.overlaps(burgers);
  tracker.overlaps(nuggets);
  tracker.overlaps(hotdog);
  tracker.opacity = 0;
  //controls screen
  controls = new Sprite(width / 2, height / 2, 0, 0, "static");
  controls.image = ctrl;
  //win screen
  winScreen = new Sprite(-1000, -1000, 0, 0, "static");
  winScreen.image = win;
  //lose screen
  loseScreen = new Sprite(-1000, -1000, 0, 0, "static");
  loseScreen.image = lose;
  winScreen.overlaps(loseScreen);
  //Start Screen
  startScreen = new Sprite(width / 2, height / 2, 0, 0, "static");
  startScreen.image = start;
  theme.loop();
  theme.setVolume(1);
  hurt.setVolume(1);
}

function draw() {
  //makes background image
  image(bgImage, 0, 0, width, height);
  hotdog.debug = mouse.holding();
  //sword overlaps everything and follows around maya
  sword.overlaps(maya);
  sword.overlaps(walls);
  sword.overlaps(doors);
  sword.overlaps(doorG);
  sword.overlaps(doorR);
  sword.overlaps(hearts);
  sword.x = maya.x;
  sword.y = maya.y;
  //remove start and control screen
  if (kb.pressed("e") && !started) {
    startScreen.remove();
    started = true;
    enter.play();
  } else if (kb.pressed("e") && started) {
    controls.remove();
    enter.play();
  }
  //maya movement and animations
  if (kb.pressing("up") && !(kb.pressing("left") || kb.pressing("down") || kb.pressing("right"))) {
    maya.ani = "up";
    maya.vel.y = -2;
  } else if (kb.pressing("left") && !(kb.pressing("up") || kb.pressing("down") || kb.pressing("right"))) {
    maya.ani = "side";
    maya.mirror.x = true;
    maya.vel.x = -2;
  } else if (kb.pressing("right") && !(kb.pressing("up") || kb.pressing("down") || kb.pressing("left"))) {
    maya.ani = "side";
    maya.mirror.x = false;
    maya.vel.x = 2;
  } else if (kb.pressing("down") && !(kb.pressing("up") || kb.pressing("left") || kb.pressing("right"))) {
    maya.ani = "down";
    maya.vel.y = 2;
  } else if (kb.pressing("up") && kb.pressing("left")){
    maya.ani = "up";
    maya.vel.x = -2/(sqrt(2));
    maya.vel.y = -2/(sqrt(2));
 } else if (kb.pressing("up") && kb.pressing("right")){
    maya.ani = "up";
    maya.vel.x = 2/(sqrt(2));
    maya.vel.y = -2/(sqrt(2));
 } else if (kb.pressing("down") && kb.pressing("right")){
    maya.ani = "down";
    maya.vel.x = 2/(sqrt(2));
    maya.vel.y = 2/(sqrt(2));
 } else if (kb.pressing("down") && kb.pressing("left")){
    maya.ani = "down";
    maya.vel.x = -2/(sqrt(2));
    maya.vel.y = 2/(sqrt(2));
 }
  else {
    maya.ani = "idle";
    maya.vel.x = 0;
    maya.vel.y = 0;
  }
  //shows sword and uses it while holding space
  if (kb.presses("space")) {
    sword.rotation = -90;
    sword.rotateTo(269, 15);
    sword.offset.y = 20;
  }
  if (kb.released("space")) {
    sword.rotation = 0;
  }
  if (kb.pressing("space")) {
    sword.opacity = 255;
  } else {
    sword.opacity = 0;
  }
  //from room 1 to room 2
  if (maya.collides(door1) && room1) {
    maya.x = width / 2;
    maya.y = 60;
    door1.y = 462;
    door2.x = 706;
    door3.y = 20;
    door4.x = -20;
    doorG.y = -60;
    room1 = false;
    room2 = true;
    burger1.x = 550;
    burger1.y = height / 2;
  }
  //from room 1 to room 4
  if (maya.collides(door2) && room1) {
    maya.x = 60;
    maya.y = height / 2;
    door1.y = 462;
    door2.x = 800;
    door3.y = -60;
    door4.x = 20;
    doorG.y = 20;
    room1 = false;
    room4 = true;
    pizza1.x = 260;
    pizza1.y = 260;
  }
  //from room 1 to room 6
  if (maya.collides(door3) && room1) {
    maya.x = width / 2;
    maya.y = height - 60;
    door1.y = height - 20;
    door2.x = 800;
    door3.y = -60;
    door4.x = -40;
    doorR.x = 20;
    room1 = false;
    room6 = true;
    nugget1.x = 80;
    nugget1.y = 340;
  }
  //from room 2 to room 1
  if (maya.collides(door3) && room2) {
    maya.x = width / 2;
    maya.y = height - 60;
    door1.y = height - 20;
    door2.x = 706;
    door3.y = 20;
    door4.x = -20;
    doorG.y = -60;
    room1 = true;
    room2 = false;
    burger1.x = -120;
    burger1.y = -120;
  }
  //from room 2 to room 3
  if (maya.collides(door2) && room2) {
    maya.x = 60;
    maya.y = height / 2;
    door1.y = 462;
    door2.x = 756;
    door3.y = -60;
    door4.x = 20;
    room2 = false;
    room3 = true;
    burger1.x = -120;
    burger1.y = -120;
    nugget2.x = 530;
    nugget2.y = 340;
  }
  //from room 3 to room 2
  if (maya.collides(door4) && room3) {
    maya.x = 660;
    maya.y = height / 2;
    door1.y = 462;
    door2.x = 706;
    door3.y = 20;
    door4.x = -20;
    doorG.y = -60;
    room2 = true;
    room3 = false;
    burger1.x = 550;
    burger1.y = height / 2;
    nugget2.x = -530;
    nugget2.y = -340;
  }
  //from room 4 to room 1
  if (maya.collides(door4) && room4) {
    maya.x = 660;
    maya.y = height / 2;
    door1.y = height - 20;
    door2.x = 706;
    door3.y = 20;
    door4.x = -20;
    doorG.y = -60;
    room1 = true;
    room4 = false;
    pizza1.x = -260;
    pizza1.y = -260;
  }
  //from room 4 to room 5
  if (maya.collides(doorG) && room4 && gKey) {
    maya.x = width / 2;
    maya.y = height - 60;
    door1.y = height - 20;
    door2.x = 800;
    door3.y = -60;
    door4.x = -40;
    doorG.y = -60;
    room4 = false;
    room5 = true;
    doorG.image = dImage;
    burger2.x = width / 2;
    burger2.y = 100;
    pizza1.x = -260;
    pizza1.y = -260;
  }
  //from room 5 to room 4
  if (maya.collides(door1) && room5) {
    maya.x = width / 2;
    maya.y = 60;
    door1.y = 462;
    door2.x = 800;
    door3.y = -60;
    door4.x = 20;
    doorG.y = 20;
    room4 = true;
    room5 = false;
    burger2.x = -240;
    burger2.y = -240;
    pizza1.x = 260;
    pizza1.y = 260;
  }
  //from room 6 to room 1
  if (maya.collides(door1) && room6) {
    maya.x = width / 2;
    maya.y = 60;
    door1.y = height - 20;
    door2.x = 706;
    door3.y = 20;
    door4.x = -20;
    doorG.y = -60;
    doorR.x = -60;
    room1 = true;
    room6 = false;
    nugget1.x = -380;
    nugget1.y = -340;
  }
  //from room 6 to boss room
  if (maya.collides(doorR) && room6 && rKey) {
    maya.x = 660;
    maya.y = height / 2;
    door1.y = height - 20;
    door1.y = height + 20;
    doorR.x = -20;
    bDoor = new Sprite(706, height / 2, 40, 40, "static");
    bDoor.rotation = 90;
    bDoor.image = blocked;
    hotdog.overlaps(bDoor);
    nugget1.x = -380;
    nugget1.y = -340;
    bossroom = true;
  }
  //pizza stays in room
  if (room1 || room5) {
    pizza1.x = -1000;
    pizza1.y = -1000;
  }
  //nugget 1 movement
  if (room6) {
    if (up) {
      nugget1.moveTowards(80, 60, 2);
      nugget1.speed = 3;
    } else {
      nugget1.moveTowards(80, 340, 2);
      nugget1.speed = 3;
    }
  }
  //nugget 2 movement
  if (room3) {
    if (up2) {
      nugget2.moveTowards(630, 240, 2);
      nugget2.speed = 3;
    } else {
      nugget2.moveTowards(530, 340, 2);
      nugget2.speed = 3;
    }
  }
  if (frameCount % 80 == 0) {
    up = !up;
    up2 = !up2;
  }
  //show green key in room 3
  if (room3) {
    gKeySprite.x = 660;
    gKeySprite.y = 360;
  } else {
    gKeySprite.x = -90;
    gKeySprite.y = -90;
  }
  //show red key in room 5
  if (room5) {
    rKeySprite.x = 65;
    rKeySprite.y = 65;
  } else {
    rKeySprite.x = -90;
    rKeySprite.y = -90;
  }
  //collects key to open green door
  if (maya.collides(gKeySprite)) {
    gKey = true;
    gKeySprite.remove();
    pickup.play();
  }
  //collects key to open red door
  if (maya.collides(rKeySprite)) {
    rKey = true;
    rKeySprite.remove();
    pickup.play();
  }
  //enemy 1 behavior
  if (burger1.x > 0 && burger1.x < 760) {
    //burger1.moveTowards(maya, 0.00299);
    burger1.direction = burger1.angleTo(maya);
    burger1.speed = 1.2;
  }
  //enemy 2 behavior
  if (burger2.x > 0 && burger2.x < 760) {
    //burger2.moveTowards(maya, 0.00299);
    burger2.direction = burger2.angleTo(maya);
    burger2.speed = 1.2;
  }
  //enemy 3 behavior
  if (pizza1.x > 0 && pizza1.x < 760) {
    //pizzaMove();
    track();
    pizza1.rotateTo(tracker.x, tracker.y, 5);
    pizza1.moveTo(tracker.x, tracker.y, 3);
  }
  //attack enemies
  if (sword.opacity == 0) {
    sword.overlaps(burgers);
    sword.overlaps(pizzas);
    sword.overlaps(nuggets);
    sword.overlaps(hotdog);
  } else {
    sword.collides(burgers);
    sword.collides(pizzas);
    sword.collides(nuggets);
    sword.collides(hotdog);
  }
  //if enemy 1 hit, kill it
  if (sword.collides(burger1) && !sword.overlaps(burgers)) {
    burger1.remove();
    damage.play();
  }
  //if enemy 2 hit, kill it
  if (sword.collides(burger2) && !sword.overlaps(burgers)) {
    burger2.remove();
    damage.play();
  }
  //if enemy 3 hit, kill it
  if (sword.collides(pizzas) && !sword.overlaps(pizzas)) {
    pizza1.remove();
    damage.play();
  }
  //if enemy 4 hit, kill it
  //if(sword.collides(nugget1) && !(sword.overlaps(pizzas))){
  //  nugget1.remove();
  //}
  //if boss hit, take damage
  if (sword.collides(hotdog) && !sword.overlaps(hotdog)) {
    if (hotdog.opacity == 1 && hotdog.image == hd) {
      hotdog.image = hdh1;
      hit1 = true;
      damage.play();
    } else if (hotdog.opacity == 1 && hotdog.image == hdh1) {
      hotdog.image = hdh2;
      hit2 = true;
      damage.play();
    } else if (hotdog.opacity == 1 && hotdog.image == hdh2) {
      hotdog.image = hdh3;
      hit3 = true;
      damage.play();
    } else if (hotdog.opacity == 1 && hotdog.image == hdh3) {
      hotdog.remove();
      damage.play();
      winScreen.x = width / 2;
      winScreen.y = height / 2;
      bDoor.remove();
      hurt.setVolume(0);
      theme.setVolume(0);
    }
  }
  if (frameCount % 4 == 0) {
    hit1 = false;
    hit2 = false;
    hit3 = false;
  }
  //boss movement
  if (bossroom) {
    if (frameCount % 190 == 0 || hit1 || hit2 || hit3) {
      hotdog.opacity = 0.5;
      hotdog.x = random(100, 600);
      hotdog.y = random(100, 350);
      hide = true;
    }
    if (hide) {
      if (frameCount % 120 == 0) {
        hotdog.opacity = 1;
        hide = false;
      }
    }
  }
  //make invisible hotdog no hitbox
  if (hotdog.opacity == 0 || hotdog.opacity == 0.5) {
    hotdog.overlaps(maya);
    hotdog.overlaps(sword);
  }
  //burgers attack
  if (burgers.collides(maya) && frameCount % 20 == 0) {
    health--;
    hurt.play();
  }
  //pizzas attack
  if (pizza1.collides(maya) && frameCount % 3 == 0) {
    health--;
    hurt.play();
  }
  //nuggets attack
  if (nuggets.collides(maya) && frameCount % 3 == 0) {
    health--;
    hurt.play();
  }
  //hotdog attack
  if (hotdog.collides(maya) && frameCount % 2 == 0) {
    health--;
    hurt.play();
  }
  //death
  if (health == 0) {
    maya.remove();
    hurt.play();
    loseScreen.x = width / 2;
    loseScreen.y = height / 2;
    hurt.setVolume(0);
    theme.setVolume(0);
  }
  //damage shows hearts
  if (health == 3) {
    hearts.image = hrts3;
  } else if (health == 2) {
    hearts.image = hrts2;
  } else {
    hearts.image = hrts1;
  }
}

function track() {
  //    let pX = random(0, width-40);
  //    let pY = random(0, height-40);
  //    await pizza1.rotateTo(pX, pX, 5);
  //    await pizza1.moveTo(pX, pX, 3);
  //    pizzaMove();
  if (pizzas.collides(tracker)) {
    tracker.x = random(45, width - 45);
    tracker.y = random(45, height - 45);
  }
}
