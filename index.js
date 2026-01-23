function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    let meridian = "AM"

    //h = 15; (testing the normal time)
    let pmHour = h - 12;

    let clock_button = document.getElementById('clockType').innerText;

    //displays military time
    if (clock_button == 'Military') {
        document.getElementById('digital').innerHTML = h + ":" +
            m + ":" + s;
    } else {
        document.getElementById('digital').innerHTML = " ";
    }

    //displays normal time in 12 hour format
    if (clock_button == 'Digital') {
        if (h >= 12) {
            meridian = "PM"
            if (h > 12) {
                document.getElementById('digital2').innerHTML = pmHour + ":" +
                    m + ":" + s + " " + meridian;
            } else {
                document.getElementById('digital2').innerHTML = h + ":" +
                    m + ":" + s + " " + meridian;
            }

        } else {
            document.getElementById('digital2').innerHTML = h + ":" +
                m + ":" + s + " " + meridian;
        }
    } else {
        document.getElementById('digital2').innerHTML = " ";
    }

    if (clock_button == 'Analog') {
        drawClock();
    } else {
        clearClock();
    }

    const light = document.getElementById('lightOff');

    if (h <= 17) {
        light.src = 'Website_Images/Assets/lightBulb-off.png'; 
    } else {
        light.src = 'Website_Images/Assets/lightBulb-on.png';
    }




    setTimeout(startTime, 1000);

}

function checkTime(i) {
    if (i < 10) { i = "0" + i };

    return i;
}


function clockIteration(i) {
    let clockButton;

    if (i <= 3) {
        i++;

    }
    if (i == 3) {
        i = 0;
    }

    if (i == 0) {
        clockButton = "Military";
        document.getElementById('clockField').innerHTML =
            "<button type='button' id='clockType' class='clockChanger' onclick='clockIteration(0)'>" + clockButton + "</button>";
    }

    if (i == 1) {
        clockButton = "Digital";
        document.getElementById('clockField').innerHTML =
            "<button type='button' id='clockType' class='clockChanger' onclick='clockIteration(1)'>" + clockButton + "</button>";
    }

    if (i == 2) {
        clockButton = "Analog";
        document.getElementById('clockField').innerHTML =
            "<button type='button' id='clockType' class='clockChanger' onclick='clockIteration(2)'>" + clockButton + "</button>";
    }

}


//Analog Clock
// hex: #52291a


var canvasClock = document.getElementById('clockAnalog');
var clockObject = canvasClock.getContext("2d");
var radius = canvasClock.height / 2;
clockObject.translate(radius, radius);
radius = radius * 0.90;



function drawClock() {

    drawFace(clockObject, radius);
    drawNumbers(clockObject, radius);
    drawTime(clockObject, radius);
    drawKnob(clockObject, radius);
    //clockObject.clearRect(-400, -400, canvasClock.width, canvasClock.height);



}

function drawFace(ctx, radius) {
    const gradient = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    gradient.addColorStop(0, '#333');
    gradient.addColorStop(0.5, '#52291a');
    gradient.addColorStop(1, '#3d1e13');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.strokeStyle = gradient;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#3d1e13';
    ctx.fill();

}

function drawKnob(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#5a2e01';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px Garamond";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num < 13; num++) {
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.82);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.82);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);


    h = h % 12;
    h = (h * Math.PI / 6) + (m * Math.PI / (6 * 60)) + (s * Math.PI / (360 * 60));
    drawHand(ctx, h, radius * 0.5, radius * 0.06);

    m = (m * Math.PI / 30) + (s * Math.PI / (30 * 60));
    drawHand(ctx, m, radius * 0.75, radius * 0.05);

    s = (s * Math.PI / 30);
    drawHand(ctx, s, radius * 0.9, radius * 0.02);


}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "butt";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function clearClock() {
    const canvasClock = document.getElementById('clockAnalog');
    let clockObject = canvasClock.getContext("2d");

    clockObject.clearRect(-150, -150, canvasClock.width, canvasClock.height);
}

//creating a window showing time of day 

var window = document.getElementById('windowView');
var windowObject = window.getContext("2d");
var skyRadius = window.height / 2;
windowObject.translate(radius, radius);
radius = radius * 0.90;

drawWindowView(windowObject, skyRadius);

function drawWindowView() {
    drawSkybox(windowObject, skyRadius);
}

function drawSkybox(ctx, radius) {

    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();


}

