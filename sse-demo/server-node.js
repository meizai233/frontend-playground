const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/sse") {
    // 设置 SSE 响应头
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      // 跨域测试可加：
      "Access-Control-Allow-Origin": "*",
    });

    let id = 0;

    const interval = setInterval(() => {
      id++;
      const message = `id: ${id}\ndata: Hello ${id}\n\n`;
      res.write(message); // 必须两个换行结束
    }, 1000);

    // 客户端断开连接时
    req.on("close", () => {
      clearInterval(interval);
      console.log("Connection closed");
    });
  } else {
    // 其他路径返回普通响应
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("SSE server running. Hit /sse\n");
  }
});

server.listen(3010, () => {
  console.log("SSE server listening at http://localhost:3010");
});
