const mongoose = require("mongoose"),
Schema = mongoose.Schema;

let transactionSchema = new Schema({
    details: {},
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
 
module.exports = mongoose.model("Transaction", transactionSchema);