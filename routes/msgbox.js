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

router.post('/',function(req,res,next){
    let response=res;
    let{msg,username,date}=req.body
    //date 还需要处理
    query('insert into msgbox values(?,?,?,?)',[null,msg,username,date],function(rows){
        let code,msg;
        if(rows.affectedRows>0){
            //成功了
            code=1,
            msg='提交成功'
        }else{
            //失败了
            code=1,
            msg='提交失败，稍后再试'
        }
        response.send({code,msg})
    })
})


module.exports = router;