const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
require('./config/conection');
const morgan = require('morgan');
const User = require("./config/model_user");
const app = express();

const PORT = process.env.PORT || 8877;
// mongodb+srv://marcyhel:042224@cluster0.wkuub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// http://localhost:8877/user?nome=marcyhel&email=sdsd&pass=131



app.get('/about',(req,res)=>{
    res.json([{
        id:'1',
        nome:'marcyhel'
    },{
        id:'2',
        nome:'nathalia'
    }])
})

app.get('/get_user',(req,res)=>{
    
        User.find({}).then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
            res.json(error);
        });
    
    
})

app.get('/user',(req,res)=>{
    const [nome,email,pass]=[req.query.nome,req.query.email,req.query.pass];
    
    //const {nome,email,pass}=req.query.nome;
    
    const dados={nome,email,pass}
    User.create(dados,(err)=>{
        if(err) return res.status(400).json({msg:'users não cadastrado'})
    })
    res.json({nome:nome});
})
app.get('/',(req,res)=>{
    res.json({
        msg:'oks3',
        variavel:process.env.MONGODB,
        porta:process.env.PORT
       // conectado:mongoose.connection.on('connected', () => {})
    })
})
app.use(morgan('tiny'));
app.listen(PORT,()=>{console.log("executando")})