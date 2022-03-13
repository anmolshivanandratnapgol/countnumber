
const express=require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database:"usercount"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});




app.get("/",(req,res)=>{
    res.send("hell0")
})

app.get("/getAllUserClickedCount",(req,res)=>{


    connection.query('SELECT count from usercount', function (error, results, fields) {
        if (error) {
            console.log(error);
        res.send("error")
        }
  
        else{
            console.log("result "+results[0].count);
        let result=results[0]?results[0].count:0;
            res.send({result})
        }

      })
  
})

app.put("/updateUserClickCount",(req,res)=>{
    connection.query('SELECT count from usercount', function (error, results, fields) {
        if (error) {
            console.log(error);
        res.send("error")
        }
  
        else{
            
        let result=results[0].count;
        result++;
          
        connection.query(`UPDATE usercount SET count=${result}`, function (error, results, fields) {
            if (error) {
                console.log(error);
            res.send("error")
            }
      
            else{
                
                res.send({result})
            
               
            }
    
          })
           
        }

      })
})

app.put("/setToZero",(req,res)=>{
    connection.query(`UPDATE usercount SET count=0`, function (error, results, fields) {
        if (error) {
            console.log(error);
        res.send("error")
        }
  
        else{
            
            res.send({success:"success"})
        
           
        }

      })
    
})




app.listen(8000,()=>{
    console.log("hello");
})