const osu = require('os-utils');
const fsys = require('fs');

console.log(osu.platform());
const platform = osu.platform();

console.log(osu.cpuUsage());
console.log(osu.cpuFree());

const TotMem = ((osu.totalmem() / 1000).toFixed(2));
const FreeMem = ((osu.freemem() / 1000).toFixed(2));
const UsedMem = ((osu.totalmem() / 1000) - (osu.freemem() / 1000)).toFixed(2);
const MemPer = ((osu.freememPercentage() * 100).toFixed(2));

let utSec = osu.sysUptime();
let utMin = utSec / 60;
let utHr = utMin / 60;

utSec = Math.floor(utSec) % 60;
utMin = Math.floor(utMin) % 60;
utHr = Math.floor(utHr) % 60;

console.log('Uptime: '
    + utHr + " Hour(s) "
    + utMin + " Minute(s) and "
    + utSec + " Second(s)"
);

const content =
    `<!DOCTYPE html>

<html>

<head>
    <title>system data</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <!--<link rel="stylesheet" href="basicIndex.css">-->
</head>

<body>
    <div class="PlatformContainer">
        <p>OS Platform: ${platform}</p>
    </div>

    <div class="MemoryContainer">
        <p class="Memtot">Total Memory: ${TotMem} GiB</p>
        <p class="MemUsed">Used Memory: ${UsedMem} GiB</p>
        <p class="MemFree">Free Memory: ${FreeMem} GiB</p>
        <p class="PerMemFree">Free Memory Percentage: ${MemPer}%</p>
    </div>

    <div class="UptimeContainer">
        <p class="uptime">Uptime: ${utHr} Hours ${utMin} Minutes ${utSec} Seconds</p>
    </div>
</body>

</html>`;

fsys.writeFile('sysdata.html', content, 'utf8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
});






