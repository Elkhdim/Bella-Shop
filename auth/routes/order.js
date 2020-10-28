const router = require('express').Router();
const Order = require('../model/Order');


router.get('/', async (req, res) => {
    const getAllOrders = await Order.find()
    try {

        res.send(getAllOrders);

    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.get('/:id', async (req, res) => {
    const getOrdersByUser = await Order.findOne({ user: req.params.id, status: "CARD" })
        .populate({ path: 'products.product', select: 'name' })
        .exec();


    try {

        res.send(getOrdersByUser);

    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.post('/minus', async (req, res) => {

    const deleteOneProdct = await Order.findOne({ status: 'CARD', user: req.body.user })

    let prdts = deleteOneProdct.products.filter((product) => {

        if (product.product == req.body.product.product._id) {

            if (product.quantity == 1)
                return false
            else {
                product.quantity = product.quantity - 1
                return true
            }

        }

        return true
    })

    try {
        await deleteOneProdct.updateOne({ products: prdts })
        const saveNewOrder = await deleteOneProdct.save();
    } catch (err) {
        res.status(400).send(err);
    }
})


router.post('/delete', async (req, res) => {

    let order = await Order.findOne({ status: 'CARD', user: req.body.user })

    if (order) {
        let prdts = order.products.filter(product => {
            return product.product != req.body.product.product._id
        })

        try {
            await order.updateOne({ products: prdts })
            const saveNewOrder = await order.save();
            // console.log(saveNewOrder)
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        console.log("not get order")
    }

})

router.post('/add', async (req, res) => {

    let newOrder = await Order.findOne({ status: 'CARD', user: req.body.user })

    if (newOrder == undefined) {

        newOrder = new Order({
            user: req.body.user,
            products: [{
                price: req.body.product.price,
                product: req.body.product.product
            }]
        })

    } else {

        let updated = false

        prdts = newOrder.products.map((product) => {

            if (product.product == req.body.product.product) {
                product.quantity = product.quantity + 1
                updated = true
            }

            return product
        })

        if (updated) {
            await newOrder.update({ products: prdts })
        } else {
            await newOrder.update(
                {
                    //user : req.body.user,
                    $push: {
                        products: {
                            quantity: req.body.product.quantity,
                            price: req.body.product.price,
                            product: req.body.product.product
                        }
                    }
                });
        }
    }

    try {

        const saveNewOrder = await newOrder.save();
        // res.send(saveNewOrder);
        console.log(saveNewOrder)

    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.get('/detail', async (req, res) => {
    const order = await Order.findOne({ user: req.body.user, status: 'CARD' })

    if (order !== undefined)
        order.populate({ path: 'products', select: 'name' }).
            exec();

    res.send(order.products);
})


module.exports = router
