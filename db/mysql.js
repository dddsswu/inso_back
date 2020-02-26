var mysql = require('mysql')
let pool = mysql.createPool({
    connectionLimit:10,
    user:'root',
    password:'wds130123',
    host:'localhost',
    database:'sql_test_01'
})

function Query(...rest){
    let sql=rest[0];
    let params,cb;
    if(rest.length===2){
        params=[];
        cb=rest[1];
    }else if(rest.length===3){
        params=rest[1];
        cb=rest[2]
    }
    pool.getConnection((err,conn)=>{
        if(err) return console.log(err)
        conn.query(sql,params,(err,rows)=>{
        if(err) return console.log(err)
            cb(rows);
            conn.release();
        })

    })
}

module.exports = Query