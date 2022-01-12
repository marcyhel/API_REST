const mongoose = require("mongoose");

class Conection{
    constructor(){
        this.dbConectionMongodb();
    }
    dbConectionMongodb(){
   
        this.mongoDBconection  = mongoose.connect('mongodb+srv://marcyhel:042224@cluster0.wkuub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{}).then(()=>{console.log("conexão con sucesso")}).catch((erro)=>{console.log(`erro: ${erro}`)})
    }

}
module.export = new Conection();