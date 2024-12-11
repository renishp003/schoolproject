const mongoose = require('mongoose');

let noticeSchema = new mongoose.Schema(
    {
        branchId:{
            type : String,
            require: true,
            trim: true
        },
        userType : {
            type : String,
            require: true,
            trim: true
        },
        noticeImage : {
            type : String,
            require: true,
            trim: true
        },
        noticeDiscription : {
            type : String,
            require: true,
            trim: true
        },
    },
    {
        timestamps: true,
    }
)
3 
module.exports = mongoose.model("notice", noticeSchema);