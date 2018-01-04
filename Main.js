var http = require('http');
var os = require('os');
var Util = require('./models/Util.js');
var User = require(('./models/User'));
var url = require('url');
var Route = require('./models/Route');
var FileManager = require('./models/FileManager');
const fs = require('fs');

var express = require('express');
var app = express();

// http.createServer(function (request, response) {
//     if (request.url !== "/favicon.ico") {
//         // handleUrl(response, request);
//         // Util.fun2(response);
//
//         let pathName = url.parse(request.url).pathname;
//         pathName = pathName.replace(/\//, '');
//
//         console.log('pathName: ' + pathName);
//         if (pathName === '' || !pathName) {
//             Route['homepage'](request,response);
//         } else {
//             try {
//                 Route[pathName](request, response);
//             } catch (error) {
//                 Route['login'](request, response);
//             }
//         }
//     }
// }).listen(8000);

let netObj = os.networkInterfaces();
console.log('Server running at http://' + netObj.en0[1].address + ":" + 8000);

// 公共资源文件夹
app.use(express.static('../../../Music/网易云音乐'));

//  主页输出 "Hello World"
app.get('/image', function (req, res) {
    Route['image'](req, res);
});


//  POST 请求
app.post('/', function (req, res) {
    console.log("主页 POST 请求");
});

//  /del_user 页面响应
app.get('/music', function (req, res) {
    console.log("/music 响应 get 请求");
    Route['music'](req,res);
});

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
    console.log("/ab*cd GET 请求");
});

var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    // console.log("应用实例，访问地址为 http://%s:%s", host, port)
});