let long = -73.9352;
let lat = 40.7306;

const birdKey = 'n20i3kbv42c9';
const birdImageKey = '3b753755-56a1-4d6f-a879-0cc38352343c';
const mapKey = 'FrW7hyjBYSQDRYTeY2Gv';



//eBird API

async function getRecentBirdObservations(latitude, longitude, myAPIKEY, myIMAGEAPIKEY) {

    const birdURL = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${latitude}&lng=${longitude}&dist50&back=30&includeProvisional=false`;
    const headers = {
        'X-eBirdApiToken': myAPIKEY
    };

    //console.log(myAPIKEY);
    //console.log(headers);
    //console.log(birdURL);

    try {
        const response = await fetch(birdURL, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`http error. Status: ${response}`)
        }

        const data = await response.json();
        //console.log(`${data}`);

        //get random bird from array:
        const randomBird = Math.floor(Math.random() * data.length);
        const ScienceName = data[randomBird].sciName;
        const CommonName = data[randomBird].comName;

        //putting data in html:
        const birdTitle = document.getElementById('birdTitle');
        birdTitle.innerHTML = `Random Bird From the Area: ${CommonName} (${ScienceName})`;

        getBirdImage(ScienceName, myIMAGEAPIKEY);


        return data;
    } catch (error) {
        console.error("Could not fetch eBird data:", error);
    }
}

//getting the bird picture: nuthatch API
async function getBirdImage(birdName, myAPIKEY) {


    const splitName = birdName.split(' ');
    const Name1 = splitName[0];
    const Name2 = splitName[1];

    //console.log(birdName);
    //console.log(splitName);
    //console.log(Name1);
    //console.log(Name2);

    const imageURL = `https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=25&sciName=${Name1}%20${Name2}&hasImg=true`;


    const headers = {
        'api-key': myAPIKEY
    };

    try {
        const response = await fetch(imageURL, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`http error. Status: ${response}`)
        }

        const data = await response.json();
        console.log(data);

        let bird = data["entities"][0]["images"];
        let image = document.getElementById('birdImage');
        image.setAttribute('src', bird[0]);
        image.setAttribute('width', 500);
    
        
            


        return data;
    } catch (error) {
        console.error("Could not fetch nuthatch data:", error);
        const noImage = document.getElementById('birdError');
        noImage.innerHTML = 'Image for this bird is not available';
    }

}


//Map Tiler

async function displayMap(latitude, longitude, myAPIKEY) {
    const mapURL = `https://api.maptiler.com/maps/streets-v2/?key=${myAPIKEY}#2.5/${latitude}/${longitude}`;
    let mapFrame = document.getElementById("mapContainer");

    mapFrame.innerHTML =
        `<iframe
        width="500"
        height="500"
        allow="geolocation"
        src="${mapURL}">
        </iframe>`;

}

function run(latitude, longitude){
    getRecentBirdObservations(latitude, longitude, birdKey, birdImageKey).then(observations => {
        console.log("recent observations:", observations);
    });
    displayMap(latitude, longitude, mapKey);
}

function formSubmition(form){
    let latitude = form.lat.value;
    let longitude = form.long.value;
    
    run(latitude, longitude);
}


run(lat, long);






