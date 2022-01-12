const express = require('express');
require('./config/conection');

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
    User.find({},(err,resposta)=>{
        res.send(resposta)
        
    })
})
app.get('/user',(req,res)=>{
    const [nome,email,pass]=[req.query.nome,req.query.email,req.query.pass];
    res.json({nome:nome});
    //const {nome,email,pass}=req.query.nome;
    
    const dados={nome,email,pass}
    User.create(dados,(err)=>{
        if(err) return res.status(400).json({msg:'users não encontrado'})
    })
})
app.get('/',(req,res)=>{
    res.json({msg:'oks2'})
})

app.listen(PORT,()=>{console.log("executando")})