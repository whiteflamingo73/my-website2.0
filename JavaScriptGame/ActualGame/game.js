const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;

//X movement variables
let east = 2;
let west = -2;
let dx;

//Y movement variables
let north = -2;
let south = 2;
let dy;

//character variables
let radius = 10;


//-----------------------------------------------------------------//

function drawCharacter() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

