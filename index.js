require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const db = require('./database.js');
const port=process.env.PORT || 3000;

app.get('/user',(req,res)=>{
    db.query("SELECT * FROM tbl_users",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.get('/user/:u_id',(req,res)=>{
   
    const u_id=req.params.u_id;
    db.query("SELECT * FROM tbl_users WHERE u_id=?",[u_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.post('/user',(req,res)=>{
    
    const u_name=req.body.u_name;   
    const email=req.body.email;
    const _password=req.body._password;
    const role=req.body.role;

    const sqlInsert="INSERT INTO tbl_users (u_name,email,_password,role) VALUES (?,?,?,?)";

    db.query(sqlInsert,[u_name,email,_password,role],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    });
});

app.delete('/user/:u_id',(req,res)=>{
    const u_id=req.params.u_id;
    db.query("DELETE FROM tbl_users WHERE u_id=?",[u_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Values Deleted");
        }
    });
});

app.post('/tasks',(req,res)=>{  
    const u_id=req.body.u_id;
    const t_id=req.body.t_id;
    const title=req.body.title;
    const description=req.body.description;
    const _status=req.body._status;

    const sqlInsert="INSERT INTO tbl_task (u_id,t_id,title,description,_status) VALUES (?,?,?,?,?)";

    db.query(sqlInsert,[u_id,t_id,title,description,_status],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    });
});

app.get('/tasks',(req,res)=>{  
    db.query("SELECT * FROM tbl_task",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.get('/tasks/:u_id',(req,res)=>{
    const u_id=req.params.u_id;
    db.query("SELECT * FROM tbl_task WHERE u_id=?",[u_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.delete('/tasks/:u_id/:t_id',(req,res)=>{
    const t_id=req.params.t_id;
    const u_id=req.params.u_id;
    db.query("DELETE FROM tbl_task WHERE t_id=? and u_id =?",[t_id, u_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Values Deleted");
        }
    });
}); 

app.put('/tasks/:t_id',(req,res)=>{
    const t_id=req.params.t_id;
    const title=req.body.title;
    const description=req.body.description;
    const _status=req.body._status;

    db.query("UPDATE tbl_task SET title=?,description=?,_status=? WHERE t_id=?",[title,description,_status,t_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Values Updated");
        }
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});