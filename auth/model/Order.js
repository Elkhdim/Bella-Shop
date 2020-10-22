const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new mongoose.Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    products: [
        {
          quantity : {
            type : Number,
            default : 1
          },
          price : {
            type : Number
          },
          product : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            require:true
           // type:String,
          }
        }
      ],
    status:{
        type : String,
        default:"CARD"
    }
   
});

module.exports = mongoose.model('Order',orderSchema);