const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;

let playerX = x;
let playerY = y;

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


//character variables
const radius = 10;


//----------------------------------------------------------------------------------//

function drawCharacter() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

//movement handlers:


function drawGame() {
    //clearing the frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //----------------//
    drawCharacter();
    //----------------//

    //updating player position
    if(rightPressed) {
        east += 0.5;
    } else {
        east = 0;
    }

    if(leftPressed) {
        west += -0.5;
    } else {
        west = 0;
    }

    if(upPressed) {
        north += -0.5;
    } else {
        north = 0;
    }
    
    if(downPressed) {
        south += 0.5;
    } else {
        south = 0;
    }

    if(east >= 5){
        east = 5;
    }

    if(west <= -5){
        west = -5;
    }

    if(north <= -5){
        north = -5;
    }

    if(south >= 5){
        south = 5;
    }

    const dx = east + west;
    const dy = north + south;

    playerX += dx;
    playerY += dy;

    //looping the game
    requestAnimationFrame(drawGame);
}

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



