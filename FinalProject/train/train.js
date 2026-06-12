

const currentVol = document.getElementById('volume_slider');
const onButton = document.getElementById('StartStop');
document.getElementById('volumeDisplay').style.height = `${currentVol.value}%`;


const currentSong = document.createElement('audio');
const songDisplay = document.getElementById('songDisplay');

const songOption = document.getElementById('choosePlaylist');

let songTitle = null;
let artist = null;



const classicalMusic = [
    {
        name: "Egmont Overture Op 84",
        artist: "Beethoven",
        path: "mp3/classical/Beethoven-EgmontOvertureOp84.mp3"
    },
    {
        name: "String Quartet No. 6",
        artist: "Beethoven",
        path: "mp3/classical/Beethoven-StringQuartetNo6inBFlatMajorOp18No6-IAllegroconbrio.mp3"
    },
    {
        name: "Magic Flute Overture",
        artist: "Mozart",
        path: "mp3/classical/Mozart-MagicFluteOverture.mp3"
    },
    {
        name: "Introit",
        artist: "Mozart",
        path: "mp3/classical/Mozart-RequieminDminorK.626-IIntroitusRequiemaeternam(ChoeurdesMarais).mp3"
    },
    {
        name: "Cosi Fan Tutte, Come Scoglio",
        artist: "Mozart",
        path: "mp3/classical/Mozart-WolfgangAmadeus(MITSymphonyOrchestra).mp3"
    }

];

const lofiMusic = [
    {
        name: "Shinjuki Gyoen",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Shinjuki-Gyoen.mp3"
    },
    {
        name: "Amano",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Amano.mp3"
    },
    {
        name: "〒160-0014 Tokyo '82",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/〒160-0014Tokyo82"
    },
    {
        name: "Late Breakfast",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Late-Breakfast.mp3"
    },
    {
        name: "Rainy Sunday",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Rainy-Sunday.mp3"
    },
    {
        name: "Anubias",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Anubias.mp3"
    },
    {
        name: "Campus Coffee",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Campus-Coffee.mp3"
    },
    {
        name: "Full Moon",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Full-Moon.mp3"
    },
    {
        name: "Waiting",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Waiting.mp3"
    },
    {
        name: "Tears pt. 3",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Tearspt3.mp3"
    },
    {
        name: "Shinjuku Gyoen WIP",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Shinjuku-Gyoen-WIP.mp3"
    },
    {
        name: "Tears pt. 2",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Tearspt2.mp3"
    },
    {
        name: "Frappe Girl",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Frappe-Girl.mp3"
    },
    {
        name: "a-y-o",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/a-y-o.mp3"
    },
    {
        name: "Saturday",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Saturday.mp3"
    },
    {
        name: "Highway",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/Highway.mp3"
    },
    {
        name: "tinytokyo",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/tinytokyo.mp3"
    },
    {
        name: "End of Tape",
        artist: "猫 シ Corp.",
        path: "mp3/lofi/End-of-Tape.mp3"
    }

];

let currentPlaylist = lofiMusic;
let trackIndex = 0;
let isPlaying = false;

currentVol.addEventListener('change', function () {
    console.log(`Current Volume: ${currentVol.value}`)
    document.getElementById('volumeDisplay').style.height = `${currentVol.value}%`;
    currentSong.volume = currentVol.value / 100;
    console.log(currentSong.volume);
});

onButton.addEventListener('click', function () {
    if (isPlaying === false) {
        isPlaying = true;
        playSong();

        console.log(isPlaying);
    } else {
        isPlaying = false;
        console.log(isPlaying);
        pauseSong();
    }
});

songOption.addEventListener('click', function (event) {
    let selectedPlaylist = event.target.closest('.playlist');
    console.log(selectedPlaylist);
    let playlistID = selectedPlaylist.id;

    if (playlistID === 'play1') {
        currentPlaylist = classicalMusic;
        console.log(`in function ${currentPlaylist}`);
        console.log(playlistID);
    }
    if (playlistID === 'play2') {
        currentPlaylist = lofiMusic;
        console.log(playlistID);
        console.log(`in function ${currentPlaylist}`);

    }
    loadSong();


});

function loadSong() {
    console.log('hello');
    currentSong.src = currentPlaylist[trackIndex].path;
    currentSong.load();
    songDisplay.innerText = `${currentPlaylist[trackIndex].name} -- ${currentPlaylist[trackIndex].artist}`;

    if (isPlaying === true) {
        playSong();
    } else {
        pauseSong();
    }

}

currentSong.addEventListener('ended', nextSong);


function playSong() {
    currentSong.play();
    isPlaying = true;
}

function pauseSong() {
    currentSong.pause();
    isPlaying = false;
}

function nextSong() {
    if (trackIndex < currentPlaylist.length - 1) {
        trackIndex += 1;
    } else {
        trackIndex = 0;
    }
    loadSong();
}


