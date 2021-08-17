//worker

// 接收主进程发来的消息
process.on("message", (msg, tcpServer) => {
    if (msg === "tcpServer" && tcpServer) {
      tcpServer.on("connection", (socket) => {
        setTimeout(() => {
          socket.end("11 Request handled by worker-" + process.pid);
        }, 100);
      });
    }
});
  