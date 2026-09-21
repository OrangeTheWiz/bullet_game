// player x and y defined so bullet can access them

var FaceX = 0

var MAXIMUM = 30

var alive = true

var score = 0

var score_count_helper = 0

var FaceY = 0

var SPEED = 2

var CANVAS_WIDTH = 500
var CANVAS_HEIGHT = 500

var BulletImage = new Image()

// more random declarations up here for scope purposes

const mainC = document.getElementById("main_canv")
const context = mainC.getContext("2d")

var directions = [0, 1, -1]



BulletImage.src = "bullet.png"

// rng function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


class Bullet
{

// def 2 for sped
  constructor(x, y, direction, speed)
  {
    this.x = x
    this.y = y
    this.speed = speed
    // direction is a string and can either be as follows: top left, top right, bottom left, bottom right
    this.direction = direction
    this.directions = [1, 1]

  }
  // collision detection
  CheckCollisionRecs(x1, y1, w1, h1, x2, y2, w2, h2)
  {

    var collision = false

    if ((x1 < (x2 + w2) && (x1 + w1) > x2) &&
        (y1 < (y2 + h2) && (y1 + h1) > y2)) collision = true;


    return collision
  }

  InitBullet()
  {
     if (this.CheckCollisionRecs(this.x, this.y, 16, 16, FaceX, FaceY, 16, 16) == true)
     {
        while (this.CheckCollisionRecs(this.x, this.y, 16, 16, FaceX, FaceY, 16, 16))
        {
          this.x = getRandomInt(CANVAS_WIDTH)
          this.y = getRandomInt(CANVAS_HEIGHT)
        }

     }
    console.log("inited")

  }

  // update method
  UpdateBullet()
  {

     if (this.CheckCollisionRecs(this.x, this.y, 16, 16, FaceX, FaceY, 16, 16) == true)
     {
        alive = false

     }

     this.x += this.speed * this.directions[0]
     this.y += this.speed * this.directions[1]

     if (this.x <= 1)
     {
       this.directions[0] = 1
     }

     else if (this.x + 16 + 1 >= CANVAS_WIDTH)
     {
       this.directions[0] = -1
     }

     if (this.y <= 1)
     {
       this.directions[1] = 1
     }

     else if (this.y + 16 + 1 >= CANVAS_HEIGHT)
     {
       this.directions[1] = -1
     }


  }

  RenderBullet()
  {


     context.drawImage(BulletImage, this.x, this.y)

  }





}




var bullets = []


for (var i = 0; i < MAXIMUM; i++)
{

  var BulletInstance = new Bullet(getRandomInt(CANVAS_WIDTH), getRandomInt(CANVAS_HEIGHT), directions[getRandomInt(directions.length - 1)], SPEED)
  BulletInstance.InitBullet()
  bullets.push(BulletInstance)
}





context.canvas.width = CANVAS_WIDTH
context.canvas.height = CANVAS_HEIGHT



var face = new Image()

face.src = "face2.png"


document.addEventListener("keydown", (press) => {

    if (press.key === "s") { FaceY += 20 }
    if (press.key === "a") { FaceX -= 20 }
    if (press.key === "d") { FaceX += 20 }
    if (press.key === "w") { FaceY -= 20 }

})

document.addEventListener("keypress", (key_pressed) => {

  if (key_pressed.key === "r" || key_pressed.key === "R")
  {
    CANVAS_WIDTH = prompt("Enter in width for the game.")
    CANVAS_HEIGHT = prompt("Enter in height for the game.")

    context.canvas.width = CANVAS_WIDTH
    context.canvas.height = CANVAS_HEIGHT
  }


  if (key_pressed.key === "m" || key_pressed.key === "M")
  {
    MAXIMUM = prompt("Insert maximum bullet count.")
    bullets = []
    for (var c = 0; c < MAXIMUM; c++)
    {
        var BulletInstance = new Bullet(getRandomInt(window.innerWidth), getRandomInt(window.innerHeight), directions[getRandomInt(directions.length - 1)], SPEED)
        BulletInstance.InitBullet()
        bullets.push(BulletInstance)
    }

  }

  if (key_pressed.key === "p" || key_pressed.key === "P")
  {
    SPEED = prompt("Input new speed")


    for (var d = 0; d < bullets.length; d++)
    {
       bullets[d].speed = SPEED
    }
  }
})


document.addEventListener("mousemove", (m) => {
    FaceX = m.clientX
    FaceY = m.clientY
    FaceY -= 32
    FaceX -= 32
})

// main game loop

var LoopHelper = setTimeout(Loop, 16.6)

function Loop()
{

    clearTimeout(LoopHelper)

    // put loop code here
    if (alive === true)
    {
     score_count_helper += 1
     if (score_count_helper >= 60)
     {
       score += 1
       score_count_helper = 0
     }
    }
    context.reset()
    context.font = "20px cursive"

    context.fillStyle = "orange"
    context.drawImage(face, FaceX, FaceY)
    // if you want to make physics and like the bullets going all over the screen changing directions when they hit the screen
    // basically all you have to do if replace these if statements in the bullets for loop and simply
    // make it so that whenever a bullet goes out of bounds say the bullet was going in the top left direction
    // you would change it to bottom right
    // so instead of removing and adding bullets
    // you could simply just change the directions of the ones that are already there
    for (var b = 0; b < bullets.length; b++)
    {
      bullets[b].UpdateBullet()
      bullets[b].RenderBullet()
    }

    if (alive === true)
    {
      context.fillText("Score: " + score.toString(), FaceX, FaceY - 10)
    }
    else
    {
      context.fillText("Game over. Ended with score: " + score.toString(), FaceX - 50, FaceY - 20)
    }


    LoopHelper = setTimeout(Loop, 16)

}
