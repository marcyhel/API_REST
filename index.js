const express = require('express');
const app = express();

const PORT = 8877; 

app.get('/about',(req,res)=>{
    res.json([{
        id:'1',
        nome:'marcyhel'
    },{
        id:'2',
        nome:'nathalia'
    }])
})
app.get('/',(req,res)=>{
    res.json({msg:'oks'})
})

app.listen(PORT)