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

    let clock_button = document.getElementById('clockField');

    document.getElementById('digital').innerHTML = h + ":" +
        m + ":" + s;

    document.getElementById('digital2').innerHTML = h + ":" +
        m + ":" + s;

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

    //military time
    /*
    if (clock_button.innerHTML == "<button type='button' id='clockType' class='clockChanger' onclick='clockIteration(0)'>Military</button>") {
       document.getElementById('digital').innerHTML = h + ":" +
          m + ":" + s;
    }

    if (clock_button.innerHTML == "<button type='button' id='clockType' class='clockChanger' onclick='clockIteration(1)'>Digital</button>") {
       if (h >= 12) {
          meridian = "PM"
          if (h > 12) {
             document.getElementById('digital').innerHTML = pmHour + ":" +
                m + ":" + s + "" + meridian;
          } else {
             document.getElementById('digital').innerHTML = h + ":" +
                m + ":" + s + "" + meridian;
          }

       } else {
          document.getElementById('digital').innerHTML = h + ":" +
             m + ":" + s + "" + meridian;
       }
    }
    */

    setTimeout(startTime, 1000);

}

function checkTime(i) {
    if (i < 10) { i = "0" + i };

    return i;
}

//normal time
function normalTime(h, m, s) {
    let meridian = "AM"
    let pmHour = h - 12

    if (h >= 12) {
        meridian = "PM"
        if (h > 12) {
            document.getElementById('digital').innerHTML = pmHour + ":" +
                m + ":" + s + "" + meridian;
        } else {
            document.getElementById('digital').innerHTML = h + ":" +
                m + ":" + s + "" + meridian;
        }

    } else {
        document.getElementById('digital').innerHTML = h + ":" +
            m + ":" + s + "" + meridian;
    }
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
