const mongoose = require('mongoose')

let studentSchema = new mongoose.Schema(
    {
        surname:{
            type: String,
            require: true,
            trim: true
        },
        name:{
            type: String,
            require: true,
            trim: true
        },
        fatherName:{
            type: String,
            require: true,
            trim: true
        },
        mobile:{
            type: Number,
            require: true,
            trim: true,
        },
        standard:{
            type: String,
            require: true,
            trim: true,
            default : ''
        },
        division:{
            type: String,
            require: true,
            trim: true,
            default : ''
        },
        fees:{
            type:String,
            trim: true,
            default : ''
        },
        batch:{
            type : String,
            trim: true,
            require: true,
        },
        address:{
            type : String,
            trim: true,
            require: true,
        },
        birthDate:{
            type : Date,
            trim: true,
            require: true,
        },
        admissionDate :{
            type : Date,
            trim: true,
            require: true,
        },
        studentCurrentYear:{
            type : String,
            trim: true,
            require: true,
        },
        email : {
            type : String,
            require: true,
            lowercase: true,
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            trim: true
        },
        branchId:{
            type:String,
            trim:true,
            require:true
        },
        grno:{
            type:String,
            trim:true,
            require:true,
            unique : true
        },
        profile : {
            type:String,
            trim:true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("student", studentSchema);