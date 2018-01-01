const fs = require('fs');
const path = require('path');

let FileManager = {};

/**
 * 异步读取文件
 * @param path
 * @param callback
 */
FileManager.readFile = function (path, callback) {
    fs.readFile(path, (error, data) => {
        if (error) {
            console.log('read file failed: ' + JSON.stringify(error) + '\n');
            callback(false,null);
        } else {
            console.log('read file success\n');
            callback(true,data);
        }
    });
    console.log('异步方法执行完毕');
};

/**
 * 同步读取文件
 * @param path
 */
FileManager.readFileSync = function (path) {
    let data = fs.readFileSync(path, 'utf-8');
    console.log('同步读取文件的方法执行完毕');
    return data;
};

/**
 * 异步写文件
 */
FileManager.writeFile = function (path,data,callback) {
    fs.writeFile(path, data, null, (error) => {
        if (error) {
            throw error;
            callback(false,error);
        } else {
            console.log('文件通过异步方式保存起来了');
            callback(true, null);
        }
    })
};

/**
 * 同步写文件
 */
FileManager.writeFileSync = function (path,data) {
    fs.writeFileSync(path, data);
    console.log('文件通过同步方式保存起来了');
};

/**
 * 异步读取图片
 * @param path
 * @param callback
 */
FileManager.readImg = function (path,callback) {
    fs.readFile(path, 'binary', (error, image) => {
        if (error) {
            callback(false, null);
        } else {
            callback(true, image);
        }
    })
};

FileManager.readMusic = function (path, callback) {
    fs.readFile(path, 'binary', (error, music) => {
        if (error) {
            callback(false, null);
        } else {
            callback(true, music);
        }
    })
};

module.exports = FileManager;