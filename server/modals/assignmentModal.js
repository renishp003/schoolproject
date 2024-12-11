const mongoose = require('mongoose');

let assignmentSchema = new mongoose.Schema(
    {
        branchId:{
            type : String,
            require: true,
            trim: true
        },
        teacherId:{
            type : String,
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
                assignments : [ {type : String, trim:true} ]
            }
        ]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("assignment", assignmentSchema);