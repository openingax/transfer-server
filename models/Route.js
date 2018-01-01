const fs = require('fs');
const FileManager = require('./FileManager');
const url = require('url');
const querystring = require('querystring');     // post 方式必须导入的

module.exports = {
    login: function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});

        // -------------- post 方式接收参数 -----------------
        let post = '';
        req.on('data', (chunk) => {
            post += chunk;
        });

        req.on('end', () => {
            post = querystring.parse(post);
            if (post['email'] !== undefined && post['pwd'] !== undefined) {
                let emailStr = post['email'];
                let pwdStr = post['pwdStr'];
                console.log('email: ' + emailStr);
                console.log('pwd: ' + pwdStr);
            }
        });



        // -------------- get 方式接收参数 ------------------
        // let userData = url.parse(req.url, true).query;
        // if (userData['email'] !== undefined) {
        //     console.log("email: " + userData['email']);
        //     console.log("pwd: " + userData['pwd']);
        //     FileManager.readFile('./html/MainPage.html', (isSuccess, data) => {
        //         if (isSuccess) {
        //             res.write(data);
        //         } else {
        //             res.write("登陆失败");
        //         }
        //         res.end('');
        //     });
        //
        // } else {
        //     FileManager.readFile('./html/Login.html', (isSuccess,data) => {
        //         if (isSuccess) {
        //             res.write(data);
        //             res.end('');
        //         } else {
        //             FileManager.readFile('./html/ErrorPage.html', (isSuccess, data) => {
        //                 if (isSuccess) {
        //                     res.write(data);
        //                 }
        //                 res.end('');
        //             })
        //         }
        //         // res.write() 报错是因为 res.end() （在 Main.js 页面）执行之后才执行 res.write();
        //         console.log('主程序执行完毕');
        //     })
        // }

        FileManager.readFile('./html/Login.html', (isSuccess,data) => {
            if (isSuccess) {
                let dataStr = data.toString();
                let userInfo = ['email', 'pwd'];
                for (let i = 0; i < userInfo.length; i++) {
                     let re = new RegExp('{' + userInfo[i] + '}', 'g');
                     dataStr = dataStr.replace(re, post[userInfo[i]]);
                }

                res.write(dataStr);
                res.end('');
            } else {
                FileManager.readFile('./html/ErrorPage.html', (isSuccess, data) => {
                    if (isSuccess) {
                        res.write(data);
                    }
                    res.end('');
                })
            }
            // res.write() 报错是因为 res.end() （在 Main.js 页面）执行之后才执行 res.write();
            console.log('主程序执行完毕');
        })
    },
    register: function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
        res.write("I am register method.");
        FileManager.readFile('./html/Register.html', (error,data) => {
            if (!error) {
                res.write(data);
                res.end('');
            } else {
                res.write('404');
                res.end('');
            }
        })
    },
    music: function (req,res) {
        res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});

    },
    homepage: function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
        res.write("I am home page");
    },
    writefile: function (req,res) {
        res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
        FileManager.writeFile('./html/one.txt', '我的文件',(isSuccess, error) => {
            if (!isSuccess) {
                console.log('写入文件失败：' + error);
            }
            res.end('');
        })
    },
    image: function (req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        FileManager.readImg('./file/zcl.jpg', (isSuccess, file) => {
            if (isSuccess) {
                console.log('图片加载成功');
                res.write(file, 'binary');
                res.end('');
            } else {
                console.log('图片加载失败');
            }
        });
    },
    showimg: function (req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});

        FileManager.readImg('./file/zcl.jpg', (isSuccess, img) => {
            if (isSuccess) {
                res.write(img, 'binary');
                res.end('');
            } else {
                console.log('加载图片失败');
            }
        })
    },
    song: function (req, res) {
        res.writeHead(200, {'Content-Type': 'audio/mp3'});

        FileManager.readMusic('./file/song1.mp3', (isSuccess, music) => {
            if (isSuccess) {
                res.write(music, 'binary');
                res.end('');
            } else {
                console.log('加载音乐失败');
            }
        });
    }
};