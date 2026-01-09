//This is the javascript for the practice game

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//setting the center position for the ball
let x = canvas.width / 2;
let y = canvas.height - 30;

//values to change x and y
let dx = 2;
let dy = -2;

const ballRadius = 10;

//defining a paddle to hit the ball
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

//keyboard presses(for moving the paddle)
let rightPressed = false;
let leftPressed = false;

//constants for the bricks
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y:0};
    }
}

//variables for losing the game:
let interval = 0;

//---------------------------------------------------------//

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00dd81ff";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
    //clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //--------------//
    drawBall();
    drawPaddle();
    //--------------//

    //paddle moving logic
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    //ball collisions with the walls
    //top & bottom:
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX - ballRadius && x < paddleX + paddleWidth + ballRadius) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval) //needed for Chrome to end game
        }
    }

    //left & right
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    //changing x and y
    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}





function startGame() {
    interval = setInterval(draw, 10);
}

//---------------------------------------------------------//

//code for starting the game
const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
});