var express = require('express');
var router = express.Router();
//数据库引入
let query = require('../db/mysql')

/* GET home page. */
router.get('/', function(req, res, next) {
    let response=res;
    query('select * from msgbox',[],function(rows){
        return response.send({data:rows})
    })
    
});


module.exports = router;