//引入包
var express = require('express');
var path = require('path');     //核心模块  node 亲儿子    http url fs
//文件路径的解析和拼串
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//引用路由的模块
var routerUser = require('./routes/router_user.js');

//生成实例
var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//使用下载的包
app.use(logger('dev'));         //使用 一个函数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置静态资源服务
app.use(express.static(path.join(__dirname, 'public')));

//把所有的访问都导入到routerUser中
app.use('/', routerUser);


// 404 兜底
//所有方法都匹配   *所有路径都匹配
app.all('*', function (req, res) {
    res.end('404, not found');
});


//向外暴露
module.exports = app;
