const net = require("net");
// net实现最小http服务 相当于啥都没有 监听data事件 拿到数据后自己处理（split和拼接字符串之类） 然后自己返回response
const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    const request = chunk.toString();
    console.log("📥 收到原始请求：\n", request);

    // 解析请求行（例子：GET /hello HTTP/1.1）
    const [requestLine] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");

    // 构造响应内容
    let body = "";
    if (method === "GET" && path === "/hello") {
      body = "Hello from raw TCP!";
    } else {
      body = "Not Found";
    }

    const response = `HTTP/1.1 ${body === "Not Found" ? "404 Not Found" : "200 OK"}
Content-Type: text/plain
Content-Length: ${Buffer.byteLength(body)}

${body}`;

    socket.write(response);
    socket.end(); // 关闭连接（模拟 HTTP/1.0 或无 Keep-Alive）
  });

  socket.on("end", () => {
    console.log("🔌 客户端断开连接");
  });
});

server.listen(3010, () => {
  console.log("🌐 自实现 HTTP Server 监听在 http://localhost:3010");
});
