const Async = require('async');

function oneFun() {
    let ii = 0;
    setInterval(() => {
        console.log('aaa=' + new Date());
        ii++;
        if (ii === 3) {
            clearInterval(this);
        }
    }, 1000);
    console.log('oneFun');
}

function twoFun() {
    let jj = 0;
    setInterval(() => {
        console.log('bbb=' + new Date());
        jj++;
        if (jj === 3) {
            clearInterval(this);
        }
    }, 1000);
    console.log('oneFun 执行完毕');
}

function exec() {
    Async.series({
        one: function(done) {
            console.log('出错', 'one 执行完毕');
        },
        two: function (done) {
            console.log('出错', 'two 执行完毕');
        }
    })
}
exec();
console.log('主进程执行完毕');