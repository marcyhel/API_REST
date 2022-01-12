
const mongoose = require("mongoose");

require('dotenv').config();
class Conection{
    constructor(){
        this.dbConectionMongodb();
    }
    dbConectionMongodb(){
        console.log(process.env.MONGODB)
        this.mongoDBconection  = mongoose.connect(process.env.MONGODBD,{}).then(()=>{console.log("conexão con sucesso")}).catch((erro)=>{console.log(`erro: ${erro}`)})
    }

}
module.export = new Conection();