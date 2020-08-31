var express = require('express');
var bodyParser = require('body-parser');
var api = require("./api/index")
var app = express()
require("dotenv").config()

// bodyParser는 미들웨어이기 때문에 라우터 보다 항상 위에 있도록 해야함
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) =>{
    
    //cors 보안정책
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //next는 다음 app.use()를 순차적으로 쓸 수 있게 해줌.
    next();
});
app.use("/api/test1",api)

app.listen(process.env.PORT, ()=>{
    console.log("start! express server ", process.env.PORT);
});