
const { json } = require("express");
const mongoose = require("mongoose");

const user = mongoose.Schema([{
    data:{ type:String, require:true},
    
    
},
{
    timestamps:true,
},]
)
module.exports = mongoose.model('inmet',user)