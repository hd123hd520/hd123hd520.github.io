var express = require('express');

var app = express(); // 得到express 所有的方法集合    包含 Router()  {Router:fn}

var hostname = "0.0.0.0";

var port = 3300;

var session = require("express-session")

var {
    conn
} = require('./db')


app.use(express.json()); // 处理 ajax post  $.post 提交的 body 数据  提交post 参数  req.post 
app.use(express.urlencoded({
    extended: false
})); // form 表单 method=post 接收 post 参数 

// 处理跨域方法 jsonp  CROS 处理方式 
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

app.use(session({
    secret: "recommend 128 bytes random string",
    cookie: {
        maxAge: 1000 * 60 * 20
    },
    resave: true,
    saveUninitialized: true
}))

var vue = require('./vue');
var react = require('./react')
var wechat =  require('./wechat')

app.use("/vue", vue);
app.use('/react', react)
app.use('/wechat',wechat)

app.get("/", (req, res) => {
    res.send("这是我的项目的服务器 根 地址")
});




app.listen(port, hostname, () => {
    console.log(`my app server is running at http://${hostname}:${port}`);
})