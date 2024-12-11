const mongoose = require('mongoose')

const ActivitySchemma = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('activities-photos',ActivitySchemma)