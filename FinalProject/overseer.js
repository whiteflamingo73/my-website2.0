/* 
   JS file for all of the website!
   Even if ts is inneficient, it'll be funny
   and I wanna see how many lines of code is written
   and also, there may be some shared functions
   so it may be useful, idk 
   
   I've learned that having it as one file doesn't work
   so now the files will be split up :( 
*/


//Functions for Homepage

/* Buttons */

const driveStart = document.getElementById('car');
const trainStart = document.getElementById('train');
const bikeStart = document.getElementById('bike');

driveStart.addEventListener('click', function(){
    window.location.href = "drive/driveHome.html";
});

trainStart.addEventListener('click', function(){
    window.location.href = "train/trainHome.html";
});

bikeStart.addEventListener('click', function(){
    window.location.href = "bike/bikeHome.html";
});


//End of Homepage

