const mongoose = require('mongoose');

let teacherSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            require: true,
            lowercase: true,
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            unique: true,
            trim: true
        },
        surname: {
            type : String,
            require: true,
            trim: true
        },
        name: {
            type : String,
            require: true,
            trim: true
        },
        work : [
            {   
                std : { type : String, trim: true  },
                sub : { type : String, trim: true  },
                div : { type : String, trim: true  },
            }
        ],
        gender : {
            type : String,
            require: true,
            trim: true
        },
        birthDate : {
            type : Date,
            require: true,
            trim: true
        },
        mobile : {
            type : Number,
            require: true,
            trim: true
        },
        branchId:{
            type : String,
            require: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("teacher", teacherSchema);