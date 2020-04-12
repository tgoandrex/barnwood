const mongoose = require("mongoose"),
Schema = mongoose.Schema,
passportLocalMongoose = require("passport-local-mongoose");

// Define user schema
let userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);