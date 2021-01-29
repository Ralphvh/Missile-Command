let player = null;
let playerSpeed = 5;
let explosions = [];
let explosionLife = 100;
let shootTimer = 0;
let shotsPerSecond = 2;
let friendlyMissiles = [];
let gun = null

function setup() {
    createCanvas(800, 500);
    angleMode(DEGREES);

    player = createSprite(width / 2, height / 2, 20, 20);
    player.draw = DrawPlayer;

    gun = createSprite(width / 2, height - 50, 25, 25)
}

function draw() {
    background(0, 0, 0);

    MovePlayer();
    shoot();
    RemoveDeadExplosions()

    drawSprites();
}

function CreateFriendlyMissile() {
    let startPosition = gun.position.copy();
    let endPosition = player.position.copy();

    let direction = p5.Vector.sub(endPosition, startPosition);

    let directionAngle = direction.heading();

    let missile = createSprite(startPosition.x, startPosition.y, 10, 10);
    missile.setSpeed(5, directionAngle);
    missile["goal"] = endPosition;
    missile.draw = DrawFriendlyMissile;
}

function DrawFriendlyMissile() {
    circle(0, 0, this.width);

    let currentPosition = this.position;
    let goalPosition = this.goal;
    let distance = currentPosition.dist(goalPosition);

    if (distance < 5) {
        CreateExplosion(currentPosition.x, currentPosition.y);
        this.remove();
    }

}

function RemoveDeadExplosions() {
    //kijk na of er nog explosies in de lijst zitten (lengte is groter dan 0)
    //EN kijk na of de eerste explosie in de list klaar is
    if (explosions.length > 0 && explosions[0].life == 0); {
        explosions.shift(); //shift() verwijdert het EERSTE item uit een lijst
    }
}

function shoot() {
    shootTimer += deltaTime;
    if (keyIsDown(32) && shootTimer > 1000 / shotsPerSecond) {
        CreateFriendlyMissile();
        shootTimer = 0;
    }
}

function CreateExplosion(x, y) {
    let explosion = createSprite(x, y, 1, 1);
    explosion.life = explosionLife;
    explosion.draw = DrawExplosion;
    explosions.push(explosion);
}

function DrawExplosion() {
    circle(0, 0, this.width);
    this.width++;
    this.height++;
}


function DrawPlayer() {
    fill(0);
    stroke(255);
    strokeWeight(2);
    circle(0, 0, this.width);

    line(0, 5, 0, 20);
    line(0, -5, 0, -20);
    line(5, 0, 20, 0);
    line(-5, 0, -20, 0);
    /*
        line(0, 0, 0, 50)
        line(0, 50, -10, 70)
        line(0, 50, 10, 70)
    
        line(0, 25, -20, 10)
        line(0, 25, 20, 40)
    
        rect(20, 50, 30, 20, 5)
        circle(0, 0, this.width);*/
}

function MovePlayer() {
    if (keyIsDown(DOWN_ARROW)) {
        player.position.y += playerSpeed;
    }

    if (keyIsDown(UP_ARROW)) {
        player.position.y -= playerSpeed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += playerSpeed;
    }


    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= playerSpeed;
    }
}