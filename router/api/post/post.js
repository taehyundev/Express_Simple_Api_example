var express = require('express')
var router = express.Router()

router.post('/',(req,res,next)=>{
    res.json({"status":"success"})
})

module.exports = router