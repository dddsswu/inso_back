var express = require('express');
var router = express.Router();
var fs=require('fs')
var query=require('../db/mysql')



router.post('/',function (req,res,next) {
  let writed=false;
  let result=false;
  let response=res;
  let {username,msg,title,date,imgData}=req.body;
  if(username===""||msg===""||title==="")return response.send({msg:"请填写完全数据"})
    let imgname=`./public/static/images/blog/${title}.jpg`
    //接收前台POST过来的base64
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    //var dataBuffer = new Buffer(base64Data, 'base64'); // 解码图片
     var dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
     
    query('insert into blog values(?,?,?,?,?,?)',[null,username,msg,title,date,imgname],function(rows){
      result=rows;
      render(result,writed,response)
    })
     
    fs.writeFile(imgname, dataBuffer, function(err) {
        if(err){
          response.send({code:0,msg:"保存失败！"});
        }else{
          writed=true;
          render(result,writed,response)
        }   
})
})

function render (result,writed,response){
  if(result&&writed){
    response.send({code:1,msg:"保存成功！"})
  }
}


module.exports = router;