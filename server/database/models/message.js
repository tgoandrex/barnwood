const mongoose = require("mongoose"),
Schema = mongoose.Schema;

let messageSchema = new Schema({
    content: {
        type: String
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
 
module.exports = mongoose.model("Message", messageSchema);