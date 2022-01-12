
const mongoose = require("mongoose");

require('dotenv').config();
class Conection{
    constructor(){
        this.dbConectionMongodb();
    }
    dbConectionMongodb(){
        console.log(process.env.MONGODB)
        this.mongoDBconection  = mongoose.connect(process.env.MONGODB,{}).then(()=>{console.log("conexão con sucesso")}).catch((erro)=>{console.log(`erro: ${erro}`)})
        mongoose.connection.on('connected', () => {
            console.log('Mongoose is connected!!!!');
        });
        
    }

}
module.export = new Conection();