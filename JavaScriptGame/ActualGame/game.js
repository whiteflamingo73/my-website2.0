const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;


class player {
    constructor(X,Y, size, velX, velY, rotation) {
        this.X = X;
        this.Y = Y;
        this.size = size;
        this.velX = velX;
        this.velY = velY;
        this.rotation = rotation
    }

}

let Player = new player(x, y, 50, 0, 0, 90/180 * Math.PI ); // convert to radians


//X movement variables
let east = 0; //2
let west = 0; //-2

//Y movement variables
let north = 0; //-2
let south = 0; //2

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;


//character variables
const radius = 10;


//----------------------------------------------------------------------------------//

function drawShip(center, size, angle) {
    ctx.beginPath();
    for (let j = 0; j < 3; j++) {
        a = angle * Math.PI / 180;
        x = center.x + size * Math.sin(a);
        y = center.y + size * Math.cos(a);
        ctx.lineTo(x, y);
        angle += 120;
    }
    ctx.closePath();
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    a = angle * Math.PI / 180;
    a = 90 / Math.PI * 180; 

    ctx.lineTo(
        Player.X - Player.size * (Math.cos(a) + Math.sin(a)),
        Player.Y + Player.size * (Math.sin(a) - Math.cos(a))
    );

    ctx.lineTo(
        Player.X - Player.size * (Math.cos(a) - Math.sin(a)),
        Player.Y + Player.size * (Math.sin(a) + Math.cos(a))
    );
    
    


    ctx.closePath();
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 3;
    ctx.stroke();
}

function drawCharacter() {
    drawShip({x: Player.X, y: Player.Y }, 50, Math.atan2(Player.velX, Player.velY) * 180);

    ctx.beginPath();
    ctx.arc(Player.X, Player.Y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#dd0000";
    ctx.fill();
    ctx.closePath();


    //ctx.moveTo(Player.X, Player.Y) //top corner
    //ctx.lineTo(Player.X - 20, Player.Y + 30);
    //ctx.lineTo(Player.X + 20, Player.Y + 30);

}

//movement handlers:
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
        rightPressed = true;
        
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = true;
    }

    if (e.key === "Up" || e.key === "ArrowUp" || e.key === "w") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown" || e.key === "s") {
        downPressed = true;
    }

    if (e.key === "Space" || e.key === " " || e.key === "Spacebar") {
        spacePressed = true;
    }

}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = false;
    }

    if (e.key === "Up" || e.key === "ArrowUp" || e.key === "w") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown" || e.key === "s") {
        downPressed = false;

    }

    if (e.key === "Space" || e.key === " " || e.key === "Spacebar") {
        spacePressed = false;
    }

}

function playerMove() {
    //Player moving logic

    let dx = east + west;
    let dy = north + south;

    if(rightPressed) {
        east += 0.5;
    } else {
        east += -0.5;
    }

    if(leftPressed) {
        west += -0.5;
    } else {
        west += 0.5;
    }

    if(upPressed) {
        north += -0.5;
    } else {
        north += 0.5;
    }
    
    if(downPressed) {
        south += 0.5;
    } else {
        south += -0.5;
    }

    if(east >= 5){
        east = 5;
    } else if(east <= 0){
        east = 0;
    }

    if(west <= -5){
        west = -5;
    } else if(west >= 0){
        west = 0;
    }

    if(north <= -5){
        north = -5;
    } else if(north >= 0){
        north = 0;
    }

    if(south >= 5){
        south = 5;
    } else if(south <= 0){
        south = 0;
    }


    //boost mechanic logic
    if(spacePressed){
        dx += dx/2;
        dy += dy/2;
    }

    Player.X += dx;
    Player.Y += dy;
    Player.velX = dx;
    Player.velY = dy;


    

}

function drawGame() {
    //clearing the frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //----------------//
    drawCharacter();
    playerMove();
    //----------------//

    //looping the game
    requestAnimationFrame(drawGame);
}

function startGame() {
    drawGame();
}

//----------------------------------------------------------------------------------//


//code to start the game
const runButton = document.getElementById('runButton');
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
});



