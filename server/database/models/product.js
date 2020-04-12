const mongoose = require("mongoose"),
Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

module.exports = mongoose.model('Product', Product);