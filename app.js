const express=require('express');
const mysql=require('mysql');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});
con.connect((err)=>{
    if(err) throw err;
    console.log('Connected');
});


const app=express();
const port=5000;


//getting customers from database
app.get('/getCustomers',(req,res)=>{
    let sql='SELECT * FROM customers';
    let query=con.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.json(results);
    });
})

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})