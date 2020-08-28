var express = require('express')
var async = require("async")
var conn = require('../../../model/db_conn')

var router = express.Router()

//GET
router.get('/',(req,res)=>{
    var result = {}
    conn.query("select * from testtable",(err,rows)=>{
        if(err){
            throw new Error("mysql error")
        }else{
            if(rows){
                res.status(200)
                result.message = rows
            }
            result.status = res.statusCode
            res.json(result)
        }
    })
})

//GET ID
router.get('/:id',(req,res)=>{
    // :id 면 req.parms.id 로 사용할 수 있다.
    var id = req.params.id
    var result = {}
    conn.query(`select * from testtable where no = ${id}`,(err,rows)=>{
        if(err){
            throw new Error("mysql error")
        }else{
            if(rows){
                res.status(200)
                result.message = rows
            }
            result.status = res.statusCode
            res.json(result)
        }
    })
})

//POST
router.post('/',(req,res)=>{
    var title
    var contents
    var result = {}
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
                res.status(400)
                result.message = err.stack
                
            }else{
                res.status(200)
                result.message = "success"
            }
            
            result.status = res.statusCode 
            res.json(result)
        }
    )
    
})
module.exports = router