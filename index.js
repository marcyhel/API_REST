
const axios = require('axios')
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
require('./config/conection');
const morgan = require('morgan');
const User = require("./config/model_user");
const Inmet = require("./config/model_inmet");
const app = express();

const PORT = process.env.PORT || 8877;

// http://localhost:8877/user?nome=marcyhel&email=sdsd&pass=131

app.use(cors());
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(currentDate)
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
function listDatas(){
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }
 
    
    const lastData=new Date();
    lastData.setFullYear(lastData.getFullYear()-2 );

    const data = new Date();
    
    var dateArray = getDates(lastData, data);
    var stringDate=new Array();
    for (i = 0; i < dateArray.length; i ++ ) {
        var a=(dateArray[i].getMonth()+1);
        a=a.toString();

        var d=(dateArray[i].getDate());
        d=d.toString();
        if(a=='1' ||a=='2' ||a=='3' ||a=='4' ||a=='5' ||a=='6' ||a=='7' ||a=='8' ||a=='9' ){
            a='0'+a;
        }
        if(d=='1' ||d=='2' ||d=='3' ||d=='4' ||d=='5' ||d=='6' ||d=='7' ||d=='8' ||d=='9' ){
            d='0'+d;
        }
        stringDate.push(`${dateArray[i].getFullYear()}-${a}-${d}`)
        //console.log(stringDate[i]);
    }
    return stringDate;
  
}
app.get('/get_inmet',async(req,res)=>{
    const [capital]=[req.query.capital];
    if(capital){
        Inmet.find({capital:capital}).then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
            res.json(error);
        });
    }
    
   
})


app.get('/inmet',async(req,res)=>{
    const [pass]=[req.query.pass];
    if(pass!='042224'){
        res.json({erro:"senha errada"})
        return false;
    }
    const listaDatas=listDatas();

    var lista=[]
    for (const e of listaDatas) {
        while (true){
            try{
                const response =  await axios.get('https://apitempo.inmet.gov.br/condicao/capitais/'+e)
                console.log(response.data)
                response.data.forEach(l=>{
                    lista.push(l.CAPITAL);
                    const dados={
                        data:e,
                        capital:l.CAPITAL,
                        tmin: l.TMIN18=='*'?"20":l.TMIN18,
                        tmax: l.TMAX18=='*'?"30":l.TMAX18,
                        umin: l.UMIN18=='*'?"60":l.UMIN18,
                        pmax: l.PMAX12=='*'?"0":l.PMAX12,
                    }

                    Inmet.create(dados,(err)=>{
                        if(err) return res.status(400).json({msg:'users não cadastrado'})
                    })
                })
                console.log(e)
                break;
            }catch(e){}

        }
        
    }
    console.log(listaDatas.length);
    console.log(lista.length);
    
    res.json(lista);
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
app.get('/gets',(req,res)=>{
    
    User.find({email:"mar"}).then((data) => {
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
