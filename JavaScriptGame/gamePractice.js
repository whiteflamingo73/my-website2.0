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
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
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
    setInterval(draw, 10);
}

//---------------------------------------------------------//

//code for starting the game
const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
});