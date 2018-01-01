var http = require('http');
var os = require('os');
var Util = require('./models/Util.js');
var User = require(('./models/User'));
var url = require('url');
var Route = require('./models/Route');
var FileManager = require('./models/FileManager');
const fs = require('fs');

http.createServer(function (request, response) {
    if (request.url !== "/favicon.ico") {
        // handleUrl(response, request);
        // Util.fun2(response);

        let pathName = url.parse(request.url).pathname;
        pathName = pathName.replace(/\//, '');

        console.log('pathName: ' + pathName);
        if (pathName === '' || !pathName) {
            Route['homepage'](request,response);
        } else {
            try {
                Route[pathName](request, response);
            } catch (error) {
                Route['login'](request, response);
            }
        }
    }
}).listen(8000);

let netObj = os.networkInterfaces();
console.log('Server running at http://' + netObj.en0[1].address + ":" + 8000);