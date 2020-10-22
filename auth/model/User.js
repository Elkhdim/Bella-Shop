const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name : {
        type : String,
        required: true,
        min : 2
    },
    email : {
        type : String,
        max : 255 ,
        required : true,
        min : 6
    },
    password : {
        type: String,
        max : 1024,
        min : 6,
        required: true
    },
    date : {
        type: Date,
        default : Date.now
    },
    isAdmin : {
        type:Boolean,
        default:false
    }
   
   
});

module.exports = mongoose.model('User',userSchema);