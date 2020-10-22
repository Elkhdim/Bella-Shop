const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
   
    name : {
        type : String,
        required:true
    },
    
    price : {
        type : Number,
        required:true
    },
    quantity : {
        type:Number,
        required:true
    },
    category : {
        type:String,
        required:true
    },
  /*  order: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order"
        }
      ]
   
    image: {
        type : String,
        required:true
    
    }*/
   

});

module.exports = mongoose.model("Product",productSchema);