var express = require('express');
var router = express.Router();
var fs=require('fs')

router.post('/',function (req,res,next) {

    //接收前台POST过来的base64
    var imgData = req.body.imgData;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    //var dataBuffer = new Buffer(base64Data, 'base64'); // 解码图片
     var dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
     
    fs.writeFile('./public/images/image.jpg', dataBuffer, function(err) {
        if(err){
            res.send("保存失败！");
          
        }else{
          res.send("保存成功！");
        }   
})
})


module.exports = router;