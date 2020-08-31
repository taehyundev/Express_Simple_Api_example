var express = require('express')
var async = require("async")
var pool = require('../model/db_pool')

var router = express.Router()

//GET
router.get('/',(req,res)=>{
    var result = {}
    pool.getConnection((err,conn)=>{
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
            
            conn.release();
        })
    })
})

//GET ID
router.get('/:id',(req,res)=>{
    // :id 면 req.parms.id 로 사용할 수 있다.
    var id = req.params.id
    var result = {}
    pool.getConnection((err,conn)=>{
        conn.query(`select * from testtable where no = ${id}`,(err,rows)=>{
            if(err){
                throw new Error("mysql error")
            }else{
                console.log(rows)
                if(rows){
                    res.status(200)
                    result.message = rows
                }
                result.status = res.statusCode
                res.json(result)
            }
            
            conn.release();
        })
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
                pool.getConnection((err,conn)=>{
                    conn.query(`insert into testtable (title,contents) values ('${title}', '${contents}')`, (err, rows) => {
                        if (err){
                            callback(new Error("mysql error msg"))
                        }else{
                            console.log(rows.insertId+"번째에 입력");
                            callback()
                        }
                    });
                    
                    conn.release();
                })
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
                pool.getConnection((err,conn)=>{
                    conn.query(`update testtable set title='${title}', contents = '${contents}' WHERE no = ${id}`,(err,rows)=>{
                    // console.log(rows)
                        if(err){
                            callback(new Error("query error"))
                        }else{
                            callback()
                        }
                    })
                    conn.release();
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

//delete 
router.delete("/:id", (req,res)=>{
    var id = null;
    var result = {}
    async.waterfall([
        function(callback){
            id = parseInt(req.params.id)
            callback()
        },
        function(callback){
            if(id == undefined){
                callback(new Error("id가 비었습니다."))
            }
            pool.getConnection((err,conn)=>{
                conn.query(`DELETE FROM testtable WHERE no = ${id}`, (err,rows)=>{
                    if(err){
                        callback(new Error("query err"))
                    }else{
                        console.log(rows)
                        callback()
                    }
                })
                
                conn.release();
            })
        }],
        function(err){
            if(err){
                res.status(400)
                result.message = err.stack
                
            }else{
                res.status(200)
                result.message = "success"
            }
            query_increment_reset()
            result.status = res.statusCode 
            res.json(result)
        })
})

//incremnet reset
function query_increment_reset(){
    var count = 1;
    pool.getConnection((err,conn)=>{
        conn.query("select * from testtable", (err,rows)=>{
            console.log(rows.length)
            if(err){
                throw new Error("query Error");
            }else{
                for(var i=0; i < rows.length; i++){
                    conn.query(`update testtable set no = ${count++} where no = ${rows[i].no} `, (err,rows)=>{
                        if(err){
                            throw new Error("query Error");
                        }
                    })
                }
            }
        })
        conn.release();
    })
    console.log("update 성공!")
}
module.exports = router