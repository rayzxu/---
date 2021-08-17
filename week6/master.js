var fork = require('child_process').fork;
var cpus = require('os').cpus();
var server = require('net').createServer();
server.listen(8989)

var limit = 10; // 限量重启次数
var during = 60000;
var restart = []; 
var isTooFrequently = function () {
    var time = Date.now();
    var length = restart.push(time); 
    if (length > limit) {
        restart = restart.slice(limit * -1); 
    }
    return restart.length >= limit && restart[restart.length - 1] - restart[0] < during; 
}; 

var workers = {};
var createWorker = function () {
    if (isTooFrequently()) {
         process.emit('giveup', length, during); 
         return;
    } 
    var worker = fork("./worker.js");
    worker.on('message', function (message) { 
        if (message.act === 'suicide') { 
            createWorker(); 
        } 
    });        
    worker.on('exit', function () {
        console.log('Worker ' + worker.pid + ' exited.');
        delete workers[worker.pid];
        createWorker();
    });
    // 句柄转发
    worker.send('tcpServer', server);
    workers[worker.pid] = worker;
    console.log('Create worker. pid: ' + worker.pid);
};

for (var i = 0; i < cpus.length; i++) {
    createWorker();
}

/* server.on("connection", (socket) => {
    workers[cur].send("socket", socket);
    cur = Number.parseInt((cur + 1) % cpuNum);
}); */

process.on('exit', function () {
    for (var pid in workers) {
        workers[pid].kill();
    }
});

process.on('uncaughtException', function (err) { 
    process.send({act: 'suicide'});
    worker.close(function () {
        process.exit(1); 
    });
    setTimeout(function () { 
        process.exit(1); 
    }, 5000); 
}); 
   