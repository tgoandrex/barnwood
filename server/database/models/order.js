const mongoose = require("mongoose"),
Schema = mongoose.Schema;

let orderSchema = new Schema({
    product: {
        _id: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    },
    total: {
        type: Number
    },
    status: { // Created (Order created), Paid (Order paid for), or Completed (Order paid for and shipped)
        type: String
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    },
    owner: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
 
module.exports = mongoose.model("Order", orderSchema);