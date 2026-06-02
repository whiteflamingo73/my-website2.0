
const currentVol = document.getElementById('volume_slider');

function setVolume(){
    document.getElementById('volumeDisplay').style.height = currentVol.value + 10;
}