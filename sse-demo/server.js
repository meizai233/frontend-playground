// server.js
const express = require("express");
const app = express();
const PORT = 3010;

// 允许跨域请求（本地测试用）
app.use(require("cors")());

// SSE 路由
app.get("/sse", (req, res) => {
  // 设置 headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 拿到一个header id
  let count = Number(req.headers["last-event-id"] || 0);

  const interval = setInterval(() => {
    res.write(`id: ${count}\n`);
    res.write(`data: Hello ${count}\n\n`);
    // 发送事件结构: 以 "data:" 开头，两个换行结束
  }, 1000);

  // 如果客户端关闭连接
  req.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

app.listen(PORT, () => {
  console.log(`SSE server listening on http://localhost:${PORT}`);
});
