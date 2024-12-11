const mongoose = require('mongoose');

let classTeacherSchema = new mongoose.Schema(
    {
        teacherId : {
            type : String,
            require : true,
            trim : true
        },
        standard : {
            type : String,
            trim : true
        },
        division : {
            type : String,
            trim : true
        },
        studentId : [
            {type : String, trim:true}
        ],
        branchId: {
            type : String,
            require : true,
            trim : true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("classTeacher", classTeacherSchema);