

const http = require("http");

const port = 5000;

const hostname = "0.0.0.0";     // 内网  172.31.196.214   localhost 127.0.0.1 

const server = http.createServer((req,res)=>{
    if(req.url!=="/favicon.ico"){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write("<h3>wh1805 daydayup</h3>")
        res.write("<h3>这是我的第一个阿里云服务器 </h3>");
        res.write("<h3>hello vue && node  </h3>");
        res.end();
    }
}).listen(port,hostname,()=>{
    console.log(`ECS server is running  at http://${hostname}:${port}`)
})
