var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql')
var mid = require("./router/mid")
var app = express()

// bodyParser는 미들웨어이기 때문에 라우터 보다 항상 위에 있도록 해야함
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended: false}));



app.listen(3000, function(){
    console.log("start! express server");
});
app.use(function(req, res, next) {
    
    //cors 보안정책
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(mid)