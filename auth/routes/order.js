const router = require('express').Router();
const Order = require('../model/Order');
const Product = require('../model/Product');


router.get('/',async (req,res)=>{
    const getAllOrders = await Order.find()
    try {
      
       res.send(getAllOrders);

    }
    catch(err) {
        res.status(400).send(err);
    }
})

router.get('/:id',async (req,res)=>{
    const getOrdersByUser = await Order.findOne({user:req.params.id,status:"CARD"}).populate({path: 'products.product', select: 'name'}).
    exec();
   
   
    try {
      
       res.send(getOrdersByUser);

    }
    catch(err) {
        res.status(400).send(err);
    }
})

router.post('/minus',async (req,res)=>{
    const deleteOneProdct = await Order.findOne({status : 'CARD',user : req.body.user})

    let remove = false
         
    let prdts = deleteOneProdct.products.map((product) => {
      
        //console.log(req.body.products[0].product)
         if(product.product == req.body.products[0].product) {
             console.log("test condition")
             product.quantity = product.quantity - 1
             remove = true
           // console.log("One product has been minus with succefly")
         }
     
         return product
    })

    if (remove) {
        await deleteOneProdct.update({products : prdts})
    }
   
   
    try {
      
        const saveNewOrder = await deleteOneProdct.save();
        // res.send(saveNewOrder);
         console.log(saveNewOrder)

    }
    catch(err) {
        res.status(400).send(err);
    }
})


router.delete('/delete',async (req,res)=>{
    
    const getUser = await Order.findOne({status : 'CARD',user : req.body.user})



    if(getUser){
        /*const rm = await Order.products.map((prd)=>{
            if(prd.product)
        })*/
        await getUser.update(

            {user : req.body.user},
            {
                $pull:{
                    products : {
                        product:req.body.product.product
                    }
                }
            }
        ).exec()
        .then(result => console.log(result))
        .catch(err => console.log(err))
     
      
    }
    else {
        console.log("not get user")
    }

})

router.post('/add',async (req,res)=>{
  
    let newOrder =  await Order.findOne({status : 'CARD',user : req.body.user})

  if (newOrder == undefined){

    newOrder = new Order({
        user : req.body.user,
        products:[ {
            price : req.body.product.price,
            product: req.body.product.product
        } ]
    })

  } else {
   
            let updated = false
            
            let prdts = newOrder.products.map((product) => {
                console.log("aaaaa")
                
                 if(product.product == req.body.product.product) {
                     product.quantity = product.quantity + 1
                     updated = true
                    
                 }

                 return product
            })

            if (updated) {
                await newOrder.update({products : prdts})
            } else {
                await newOrder.update(
                { 
                    //user : req.body.user,
                    
                    $push: { 
                        products :{
                            quantity: req.body.product.quantity ,
                            price: req.body.product.price ,
                            product: req.body.product.product
                        }
                    }
                } );
            }
  }
    
    try {
        
       const saveNewOrder = await newOrder.save();
      // res.send(saveNewOrder);
       console.log(saveNewOrder)

    }
    catch(err) {
        res.status(400).send(err);
    }
})
router.get('/detail',async (req,res)=>{
    const order = await Order.findOne({user: '5f6a6224c30ab6dc85ab984d', status: 'CARD'})
    .populate({path: 'products', select: 'name'}).
    exec();
    
    res.send(order.products);
})


module.exports = router
