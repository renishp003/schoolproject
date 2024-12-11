const mongoose = require('mongoose');

let classAndDivSchema = new mongoose.Schema(
    {
        standard : {
            type : String,
            require : true,
            trim : true
        },
        division : {
            type : String,
            require : true,
            trim : true
        },
        branchId : {
            type : String,
            require : true,
            trim : true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("classAndDivision", classAndDivSchema);