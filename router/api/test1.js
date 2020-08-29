var express = require('express')
var async = require("async")
var conn = require('../../model/db_conn')
const e = require('express')

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

//PUT update
router.put("/:id",(req,res)=>{
    var id;
    var title;
    var contents;
    var result = {}
    async.waterfall([
        function(callback){
            id = parseInt(req.params.id);
            title = req.body.title;
            contents = req.body.contents;
            callback();
        },
        function(callback){     
            if(title == undefined || contents == undefined){
                callback(new Error("error"))
            }else{
                conn.query(`update testtable set title='${title}', contents = '${contents}' WHERE no = ${id}`,(err,rows)=>{
                   // console.log(rows)
                    if(err){
                        callback(new Error("qq error"))
                    }else{
                        callback()
                    }
                })
            }
        }],
        function(err){
            if(err){
                res.status(400)
                result.message = err.stack
                
            }else{
                res.status(200)
                result.title = title
                result.contents = contents 
            }
            
            result.status = res.statusCode 
            res.json(result)
        })
})
module.exports = router