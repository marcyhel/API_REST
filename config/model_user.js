const { use } = require("express/lib/application");
const mongoose = require("mongoose");

const user = mongoose.Schema({
    nome:{ type:String, require:true},
    cpf:{ type:String, require:true},
    email:{ type:String, require:true},
    pass:{ type:String, require:true},
},
{
    timestamps:true,
},
)
module.exports = mongoose.model('bh_clima',user)