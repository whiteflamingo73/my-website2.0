import { RadioBrowserApi } from "radio-browser-api";
const api = new RadioBrowserApi('CarRadio');

const stations = await api.searchStations({
    countryCode: 'US',
    limit: 100,
    hasGeoInfo: true    
});

console.log(stations);


//Functions for Drive Page


/* Car Horn */

const hornButton = document.getElementById('carHorn');
let hornSound = document.getElementById('vintageHorn');

hornButton.addEventListener('click', function(){
    hornSound.play();
});


/* Car Radio */

//variables for radio size and stuff
const radioInterface = document.getElementById('radioStation');
const radioContainer = document.getElementById('radioContainer');
const radioSpacer = document.getElementById('radioSpacer');
const radioRow = document.getElementById('radioRow');
const midSpacer = document.getElementById('middleCarSpacer');

//interactive radio buttons
const tune = document.getElementById('radioTune');
const volume = document.getElementById('radioVolume')


//pulling up large radio interface
radioInterface.addEventListener('click', function(){
    radioInterface.classList.add('radioBig');
    radioContainer.classList.add('RadioContainerBig');
    radioSpacer.classList.add('radioTopSpacerBig');
    radioRow.classList.add('radioRowBig');
    midSpacer.classList.add('middleCarSpacerBig');

    radioRow.innerHTML =
            `<div id="radioRow" class="radioRowBig">
                <div id="radioSpacer" class="radioTopSpacerBig"></div>
                <div id="radioStation" class="radioBig">
                    <div class="radioTop">
                        <button id="radioTune"></button>
                        <div id="radioDisplay"></div>
                        <button id="radioVolume"></button>
                    </div>
                    <div class="radioBottom">
                        <button id="radioOnOff"></button>
                    </div>
                </div>
            </div>`;
});






//End of Drive Page