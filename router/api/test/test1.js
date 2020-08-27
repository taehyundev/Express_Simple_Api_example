var express = require('express')
var async = require("async")
var conn = require('../../../model/db_conn')

var router = express.Router()

router.post('/',(req,res,next)=>{
    var title
    var contents
    async.waterfall([
        function(callback){
            title = req.body.title;
            contents = req.body.contents;
            callback()
        },
        function(callback){
            console.log("hello")
            if(title == undefined || contents == undefined){
                callback(new Error("error msg"))
            }else{
                conn.query(`insert into testtable (title,contents) values ('${title}', '${contents}')`, (err, rows) => {
                    if (err){
                        callback(new Error("mysql error msg"))
                    }else{
                        console.log(rows.insertId+"번째에 입력");
                        callback()
                    }
                });
            }
        }],
        function(err){
            if(err){
                res.status(400).json("err")
                
            }else{
                res.status(200).json("success")
            }

        }
    )
    
})
module.exports = router