"use strict";
const http = require("http");
const url = require("url");
const https = require('https');

// link to get data from NYC:
const devLink = "http://127.0.0.1:8096/?location=New%20York%20City,NY";

const API_KEY = "BR9JZN6TVPJJJBN9X73UAD3DY";
const UNIT_GROUP = "us";

const retrieveWeatherData = function (location, start, end) {
    var requestUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}`;
    if (start) requestUrl += `/${start}`;
    if (start && end) requestUrl += `/${end}`;
    requestUrl += `?unitGroup=${UNIT_GROUP}&key=${API_KEY}`;

    return new Promise(function(resolve, reject){
        https.get(requestUrl, function (res) {
            var statusCode = res.statusCode;
            const contentType = res.headers['content-type'];

            var error;
            if (statusCode !== 200) {
                error = `Request Failed. Status Code: ${statusCode}`;
            } else if (!/^application\/json/.test(contentType)) {
                error = `Invalid content-type. Expected application/json but recieved ${contentType}`;
                statusCode = 500;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    if (error) {
                        console.error(`Error: ${error}. Details: ${rawData}`);
                        reject(`Error: ${error}. Deatals: ${rawData}`);
                    } else {
                        resolve(JSON.parse(rawData));
                    }
                } catch (e) {
                    console.error(`Unexpected error ${e.message}`);
                    reject(`Unexpected error ${e.message}`);
                }
            });
        }).on('error', (e) => {
            console.error(`Error 3 ${e}`);;
            reject(`Communication error ${e}`);
        });
    });
}

http.createServer(function(request, response){

    const queryObject = url.parse(request.url,true).query;
    response.writeHead(200, {'Content-Type': 'text/html'});
    if (!queryObject.location) {
        response.end('Please include a location query parameter');
        return;
    }

    retrieveWeatherData(queryObject.location, queryObject.start, queryObject.end).then(function(data) {
        
        response.end(`<html><body>${buildWeatherTable(data)}</body></html>`);

    }).catch(function(data) {
        response.end(`<html><body>${data}</body></html>`);
    });

    response.end(`Weather data will appear here!`);
}).listen(8096);

console.log('Server running at http://127.0.0.1:8096');