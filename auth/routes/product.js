const router = require('express').Router();
const Product = require('../model/Product');



//Get Product 

router.post('/add', async (req,res) => {
   const product = new Product({
       name : req.body.name,
       price: req.body.price,
       quantity : req.body.quantity,
       category : req.body.category
      
   })
   try {
 
    const saveProduct = await product.save()
    res.send(saveProduct)
   }
   catch(err) {
    res.status(400).send(err);
    }
    
});



router.get("/",async (req,res) => {
    const allproduct = await Product.find();

    res.send(allproduct);
})

router.get("/:category",async (req,res) => {
    const categoryProduct = await Product.find({ category :req.params.category});
    if(!categoryProduct){
        res.send("Not found");
    }

    res.send(categoryProduct);
})

module.exports = router

