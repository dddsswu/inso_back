var express = require('express');
var router = express.Router();
//数据库引入
let query = require('../db/mysql')
//随机字符串验证码
let randomCode=require('../api/yanzhengma')
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('login')
    let randomcode= randomCode(4);
    return res.send({code:1,msg:'success',randomCode:randomcode})
});

router.post('/',function(req,res,next){
  let {username,password}=req.body;
  //console.log(username,password);
  let response=res;
  //用promise对象，让过程变得同步
  let promise=new Promise((resolve,reject)=>{
    query('select password from sql_test_01 where username = ?',[username],function(res){
      //console.log('zhanghao',res[0].password)
      if(res[0].password===password)return resolve({code:1,msg:'login,success',username});
      else return resolve({code:0,msg:'账号或者密码不正确'})
    })
  })
  promise.then((res)=>{
    if(res){
      console.log(1111)
      return response.send(res)
    }
  })
})

module.exports = router;