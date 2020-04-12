const express = require("express"),
router = express.Router(),
Product = require("../database/models/product"),
Message = require("../database/models/message");

// Product list route
router.get("/", function(req, res) {
    Product.find().then(products => {
        res.status(200).json(products);
    }).catch(err => {
        console.log("Product list error: ", err.message);
    });
});

// Product details route
router.get("/:product_id", function(req, res) {
    Product.findById(req.params.product_id).then(product => {
        Message.find({_id: product.messages}).then(foundMessages => {
            res.status(200).json({ product: product, messages: foundMessages });
        }).catch(err => {
            console.log("Product details error: ", err.message);
        });
    }).catch(err => {
        console.log("Product details error: ", err.message);
    });
});

// Product create logic route
router.post("/add", function(req, res) {
    let product = new Product(req.body);
    product.save().then(product => {
        res.status(200).json(`Product added successfully! Created product details: ${product}`);
    }).catch(err => {
        console.log("Product create error: ", err.message);
    });
});

// Product update route
router.put("/:product_id", function(req, res) {
    Product.findById(req.params.product_id).then(product => {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stock = req.body.stock;

        product.save().then(product => {
            res.status(200).json(`Product updated! Updated product details: ${product}`);
        }).catch(err => {
            console.log("Product update error: ", err.message);
        });
    }).catch(err => {
        console.log("Product update error: ", err.message);
    });
});

// Product destroy route
router.delete("/:product_id", function(req, res) {
    Product.findByIdAndDelete(req.params.product_id).then(product => {
        if(product) {
            Message.deleteMany({_id: {$in: product.messages}}).then(messages => {
                return res.status(200).json(`Product deleted! Deleted product details: ${product}`);
            });
        } else {
            console.log("Product not found: ", err.message);
        }
    })
    .catch(err => {
        console.log("Product destroy error: ", err.message);
    });
});

module.exports = router;