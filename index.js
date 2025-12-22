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

    if (h <= 17) {
        document.getElementById('lightOn').style.opacity = 0;
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

