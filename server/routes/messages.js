const express = require("express"),
router = express.Router(),
Message = require("../database/models/message"),
Product = require("../database/models/product");

// Message list route
router.get("/", function(req, res) {
    Message.find().then(messages => {
        res.status(200).json(messages);
    }).catch(err => {
        console.log("Message list error: ", err.message);
    });
});

// Message details route
router.get("/:message_id", function(req, res) {
    Message.findById(req.params.message_id).then(message => {
        res.status(200).json(message);        
    }).catch(err => {
        console.log("Message details error: ", err.message);
    });
});

// Message create logic route
router.post("/add", function(req, res) {
    Product.findById(req.body.productID).then(foundProduct =>{
        let message = new Message(req.body.messageToCreate);
        message.save().then(message => {
            foundProduct.messages.push(message);
            foundProduct.save();
            res.status(200).json(`Message added successfully! Created message details: ${message}`);
        }).catch(err => {
            console.log("Message create error: ", err.message);
        });
    }).catch( err => {
        console.log("Message create error: ", err.message);
    })
});

// Message update route
router.put("/:message_id", function(req, res) {
    Message.findById(req.params.message_id).then(message => {
        message.content = req.body.content;

        message.save().then(message => {
            res.status(200).json(`Message updated! Updated message details: ${message}`);
        }).catch(err => {
            console.log("Message update error: ", err.message);
        });
    }).catch(err => {
        console.log("Message update error: ", err.message);
    });
});

// Message destroy route
router.delete("/:message_id", function(req, res) {
    Message.findByIdAndDelete(req.params.message_id).then(message => {
        if(message) {
            console.log(req.body)
            console.log(req.body.productID)
            Product.findByIdAndUpdate(req.body.productID, {$pull: {messages: req.params.message_id}}).then(product =>{
                return res.status(200).json(`Message deleted! Deleted message details: ${message}`);
            }).catch(err => {
                console.log("Message delete error: ", err.message);
            })
        } else {
            console.log("Message not found: ", err.message);
        }
    })
    .catch(err => {
        console.log("Message delete error: ", err.message);
    });
});

module.exports = router;