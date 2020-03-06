function initws(server,WebSocketServer) {
    //创建WebSocketServer:
    let wss = new WebSocketServer({
        server: server
    });
    wss.on('connection', function (ws) {
        // let data=JSON.stringify({msg:'欢迎加入'})
        // ws.send(data)
        ws.on('open',function(msg){
            console.log(msg)
        });
        ws.on('message', function (message) {
            //有几个用户就有几个Clients
            //console.log(wss.clients)
            console.log(`[SERVER] Received: ${message}`);
            broadcast(message);
            // ws.send(`ECHO: ${message}`, (err) => {
            //     if (err) {
            //         console.log(`[SERVER] error: ${err}`);
            //     }
            // });
        });
        ws.on('close',function(code){
            if(code==1000||code==1001){
                console.log('退出一个')
            }
        })
    });
    function broadcast (data) {
        wss.clients.forEach(function (client) {
            client.send(data);
        });
    };
}


module.exports=initws;