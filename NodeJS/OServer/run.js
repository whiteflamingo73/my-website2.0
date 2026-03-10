const osMudule = require('./OS.js')

const start = document.querySelector('.start');

start.addEventListener('click', function(){
    setInterval(osModule.run, 1000);
    console.log('ran');
});

setInterval(osMudule.run, 1000);