const mongoose = require('mongoose')

let teacherClassWorkSchema = new mongoose.Schema(
    {
        teacherId:{
            type: String,
            require: true,
            trim: true
        },
        branchId:{
            type: String,
            require: true,
            trim: true
        },
        work :  [
                {
                    classes : {   
                        std : { type : String, trim: true  },
                        sub : { type : String, trim: true  },
                        div : { type : String, trim: true  },
                    },
                    students : [ {type : String, trim:true} ],
                }
            ]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("teacherClassWork", teacherClassWorkSchema);