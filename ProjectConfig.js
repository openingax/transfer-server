const isHome = true;

module.exports = {
    baseURL: isHome? 'http://192.168.0.102:8000':'http://192.168.1.53:8000',
    musicDir: isHome? '../../../Music/网易云音乐' : '../../Music/网易云音乐',
    movieDir: isHome? '../../../Movies':'../../Movies',
};