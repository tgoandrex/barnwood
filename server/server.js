const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
session = require("express-session"),
passport = require("passport"),
localStrategy = require("passport-local"),
cors = require("cors"),
PORT = 4000,

// Require models
User = require("./database/models/user"),

// Require routes
productRoutes = require("./routes/products"),
messageRoutes = require("./routes/messages"),
orderRoutes = require("./routes/orders"),
userRoutes = require("./routes/users");

app.use(bodyParser.json());
app.use(cors());

// Mongoose config
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/barnwood", { 
	useNewUrlParser: true,
	useCreateIndex: true
});

// Sessions
app.use(
	session({
		secret: "Birdhouses are cool.", // Secret can be any string
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes config
app.use("/products", productRoutes);
app.use("/messages", messageRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// Start server
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});