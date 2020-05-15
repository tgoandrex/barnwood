const express = require("express"),
router = express.Router(),
Order = require("../database/models/order"),
Transaction = require("../database/models/transaction"),
Product = require("../database/models/product");

// Order list route
router.get("/", function(req, res) {
    Order.find().then(orders => {
        res.status(200).json(orders);
    }).catch(err => {
        console.log("Order list error: ", err.message);
    });
});

// Order details route
router.get("/:order_id", function(req, res) {
    Order.findById(req.params.order_id).then(order => {
        Transaction.findById(order.transaction).then(transaction => {
            res.status(200).json({order, transaction});
        }).catch(err => {
            console.log("Transaction get error: ", err.message);
        });
    }).catch(err => {
        console.log("Order details error: ", err.message);
    });
});

// Order complete logic route
router.put("/:order_id", function(req, res) {
    Order.findById(req.params.order_id).then(order => {
        order.status = "Completed";
        order.save().then(order => {
            res.status(200).json(`Order completed! Completed order details: ${order}`);
        }).catch(err => {
            console.log("Order complete error: ", err.message);
        });
    }).catch(err => {
        console.log("Order get error: ", err.message);
    });
});

// Order create logic route
router.post("/new", function(req, res) {
    const productInfo = req.body.productInfo;
    let order = new Order();
    order.product = {
        _id: productInfo.id,
        name: productInfo.name,
        description: productInfo.description,
        price: productInfo.price,
        quantity: productInfo.quantity
    }
    order.status = "Created";
    order.total = productInfo.price * productInfo.quantity;
    order.owner = {
        id: req.body.userID,
        username: req.body.username
    }
    order.save().then(order => {
        res.status(200).json(order);
    }).catch(err => {
        console.log("Order create error: ", err.message);
    });
});

// Paypal success logic route
router.post("/success", function(req, res) {
    const orderID = req.body.orderID;
    const productId = req.body.productInfo.id;
    const productQuantity = req.body.productInfo.quantity;

    Product.findByIdAndUpdate(productId, { $inc: { stock: -productQuantity } }).then(product => {
        Order.findById(orderID).then(order => {
            order.status = "Paid";
            let transaction = new Transaction();
            transaction.details = req.body.data;
            transaction.save().then(transaction => {
                order.transaction = transaction;
                order.save().then(order => {
                    res.status(200).json(`Order paid for! Paid order details: ${order}`);
                }).catch(err => {
                    console.log("Order pay error: ", err.message);
                });
            }).catch(err => {
                console.log("Transaction create error: ", err.message);
            });
        }).catch(err => {
            console.log("Order update error: ", err.message);
        });
    }).catch(err => {
        console.log("Product stock update error: ", err.message);
    });
});

// Paypal cancel logic route
router.post("/cancel", function(req, res) {
    const orderID = req.body.orderID;

    Order.findByIdAndDelete(orderID).then(order => {
        res.status(200).json(`Order Cancelled and deleted. Cancelled order details: ${order}`);
    }).catch(err => {
        console.log("Order delete error: ", err.message);
    });
});

module.exports = router;