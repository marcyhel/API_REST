
const axios = require('axios')
const express = require('express');
const mongoose = require("mongoose");

require('dotenv').config();
require('./config/conection');
const morgan = require('morgan');
const User = require("./config/model_user");
const Inmet = require("./config/model_inmet");
const app = express();

const PORT = process.env.PORT || 8877;

// http://localhost:8877/user?nome=marcyhel&email=sdsd&pass=131

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(currentDate)
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  app.get('/setinmet',async(req,res)=>{
    const [nome]=[req.query.nome];
    const dados={nome}
    Inmet.create(dados,(err)=>{
        if(err) return res.status(400).json({msg:'users não cadastrado'})
    })
    res.json({nome:nome});
  })
app.get('/inmet',async(req,res)=>{
    const response =  await axios.get('https://apitempo.inmet.gov.br/condicao/capitais/2019-10-22')//http.request('https://apitempo.inmet.gov.br/condicao/capitais/2019-10-22')//await fetch('https://apitempo.inmet.gov.br/condicao/capitais/2019-10-22');
    
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }
 
    
    const lastData=new Date();
    lastData.setFullYear(lastData.getFullYear()-1 );

    const data = new Date();
    
    var dateArray = getDates(lastData, data);
    var stringDate=new Array();
    for (i = 0; i < dateArray.length; i ++ ) {
        stringDate.push(`${dateArray[i].getFullYear()}-${dateArray[i].getMonth()+1}-${dateArray[i].getDate()}`)
        console.log(stringDate[i]);
    }
  
    
    console.log(Date.now());
    res.json(response.data);
})

app.get('/about',(req,res)=>{
    res.json([{
        id:'1',
        nome:'marcyhel'
    },{
        id:'2',
        nome:'nathalia'
    }])
})

app.get('/get',(req,res)=>{
    
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
