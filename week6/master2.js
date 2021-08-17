// parent.js
const childProcess = require("child_process");
const net = require("net");

// 获取cpu的数量
const cpuNum = require("os").cpus().length;

let workers = [];
let cur = 0;

for (let i = 0; i < cpuNum; ++i) {
  workers.push(childProcess.fork("./worker.js"));
  console.log("worker process-" + workers[i].pid);
}

// 创建TCP服务器
const tcpServer = net.createServer();

/*
 服务器收到请求后分发给工作进程去处理
*/

tcpServer.listen(8989, () => {
  console.log("Tcp Server: 127.0.0.1:8989");
  // 监听端口后将服务器句柄发送给worker进程
  for (let i = 0; i < cpuNum; ++i) {
    workers[i].send("tcpServer", tcpServer);
    // 监听工作进程退出事件
    workers[i].on(
      "exit",
      ((i) => {
        return () => {
          console.log("worker-" + workers[i].pid + " exited");
          workers[i] = childProcess.fork("./worker.js");
          console.log("Create worker-" + workers[i].pid);
          workers[i].send("tcpServer", tcpServer);
        };
      })(i)
    );
  }
  // 不能关闭master线程的，否则的话，句柄将为空，无法正常传递。
  // tcpServer.close();
});
