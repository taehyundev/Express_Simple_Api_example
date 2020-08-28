var express = require('express')
var router = express.Router()
var api_post = require('./api/test1')

//route
router.use('/api/test1',api_post)

module.exports = router