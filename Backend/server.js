const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json({ limit: '1mb' }));
app.listen('3001', () => {
    console.log('Server Started on port 3001');
});

app.use((req, res, next) => {
    var allowedOrigins = ['http://localhost:3000', 'http://192.168.2.83:3000', 'http://127.0.0.1:3000'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
})

//create connection 
const db = mysql.createConnection({
    host: '203.146.249.240',
    port: '33188',
    user: 'smart_checkin',
    password: 'GxQ9uha6PsNm*qm$$',
    database: 'smart_checkin_box_db',

});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql Connected...');
});

app.get('/api/test', (req, res) => {
    console.log("ok")
})


app.get('/api/getadmin', (req, res) => {
    let sql = 'SELECT * FROM `factory_administrators`'
    console.log("ok")
    //res.send("OKAY")
    let query = db.query(sql, (err, result) =>{
        console.log(query)
        if(err) throw err;
        console.log(result)
        res.json(result)
        
    })
})

app.get('/api/Ans42', function(req, res) {
    res.json({ answer: 42 });
  });


 //SELECT * FROM `factory_administrators`