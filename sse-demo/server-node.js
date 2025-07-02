const http = require("http");
const fs = require("fs");
const port = 3010;

// 模拟每个客户端的消息 ID（可持久化）
let currentId = 0;

// 存储已连接的客户端
const clients = [];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // 返回前端 HTML 页面
    fs.createReadStream("./index.html").pipe(res);
  } else if (req.url === "/events") {
    // 设置 SSE 头部
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      // CORS 跨域支持（可选）
      "Access-Control-Allow-Origin": "*",
    });

    // 支持断线重连：客户端会自动发送 Last-Event-ID
    const lastEventId = parseInt(req.headers["last-event-id"] || "0", 10);
    console.log(`💡 Client connected. LastEventID: ${lastEventId}`);

    // 初始推送一条欢迎消息
    res.write(`id: ${currentId}\n`);
    res.write(`event: hello\n`);
    res.write(`data: Welcome back! Last seen: ${lastEventId}\n\n`);

    // 将客户端加入连接列表
    const client = { id: Date.now(), res };
    clients.push(client);

    // 定时发送事件
    const interval = setInterval(() => {
      currentId++;
      res.write(`retry: 1000\n`);
      res.write(`id: ${currentId}\n`);
      res.write(`event: tick\n`);
      res.write(`data: Tick ${currentId} at ${new Date().toLocaleTimeString()}\n\n`);
    }, 3000);

    // 清理连接
    req.on("close", () => {
      clearInterval(interval);
      const index = clients.findIndex((c) => c.id === client.id);
      if (index !== -1) clients.splice(index, 1);
      console.log(`❌ Client ${client.id} disconnected.`);
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
