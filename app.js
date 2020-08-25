var express = require('express')
var app = express()
var router = require("./router/mid")

app.listen(3000, function(){
    console.log("start! express server");
});

//router라는 미들웨어로 연결
app.use(router)
