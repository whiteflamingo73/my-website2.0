const osu = require('os-utils');
const fsys = require('fs');

console.log(osu.platform());
const platform = osu.platform();

console.log(osu.cpuUsage());
console.log(osu.cpuFree());

const TotMem = ((osu.totalmem()/1000).toFixed(2));
const FreeMem = ((osu.freemem()/1000).toFixed(2));

const MemPer = ((osu.freememPercentage()*100).toFixed(2));

let utSec = osu.sysUptime();
let utMin = utSec/60;
let utHr = utMin /60;

utSec = Math.floor(utSec) % 60;
utMin = Math.floor(utMin) % 60;
utHr = Math.floor(utHr) % 60;

console.log('Uptime: '
    + utHr + " Hour(s) "
    + utMin + " Minute(s) and "
    + utSec + " Second(s)"
);

const content = 
    "OS Platform: " + platform + " Total Memory: " + TotMem + " Free Memory: " + FreeMem + " or " +MemPer+ "%" + ' Uptime: '
    + utHr + " Hour(s) "
    + utMin + " Minute(s) and "
    + utSec + " Second(s)";

fsys.writeFile('sysdata.txt', content, 'utf8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
});


