const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const studentSchema = new mongoose.Schema({
    studentname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    Id : {
        type : Number,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    subjects : {
        english : {type : Number, default : 0},
        mathematics : {type : Number, default : 0},
        science : {type : Number, default : 0},
    },
    totals : {type : Number, default : 0},
    
    userId: { 
        type: ObjectId, 
        ref: "User",
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },

}, {timestamps:true}
)
module.exports = mongoose.model("Student",studentSchema)