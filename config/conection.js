const mongoose = require("mongoose");
const key_db = process.env.KEY_MONGO;
class Conection{
    constructor(){
        this.dbConectionMongodb();
    }
    dbConectionMongodb(){
        
        console.log(key_db);
        this.mongoDBconection  = mongoose.connect(key_db,{}).then(()=>{console.log("conexão con sucesso")}).catch((erro)=>{console.log(`erro: ${erro}`)})
    }

}
module.export = new Conection();