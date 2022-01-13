

const mongoose = require("mongoose");

const user = mongoose.Schema({
    data:{ type:String, require:true},
    capital:{ type:String, require:true},
    tmin: { type:String, require:true},
    tmax: { type:String, require:true},
    umin: { type:String, require:true},
    pmax: { type:String, require:true},

    
    
},
{
    timestamps:true,
},
)
module.exports = mongoose.model('inmet',user)