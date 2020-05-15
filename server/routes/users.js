const express = require("express"),
router = express.Router(),
passport = require("passport"),
User = require("../database/models/user"),
Message = require("../database/models/message"),
Order = require("../database/models/order");

// Login logic route
router.post("/login", passport.authenticate("local"), (req, res) => {
    if(req.user) {
        res.status(200).json(req.user);
    } else {
        console.log("req.user not found");
    }
});

// User list route
router.get("/", function(req, res) {
    User.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log("User list error: ", err.message);
    });
})

// User details route
router.get("/:user_id", function(req, res) {
    User.findById(req.params.user_id).then(user => {
        Message.find({"owner.id": user._id}).then(messages => {
            Order.find({"owner.id": user._id}).then(orders => {
                res.status(200).json({user, messages, orders});
            }).catch(err => {
                console.log("Orders find error: ", err.message);
            });
        }).catch(err => {
            console.log("Messages find error: ", err.message);
        });
    }).catch(err => {
        console.log("User details error: ", err.message);
    });
});

// User create (register) logic route
router.post("/add", function(req, res) {
	let newUser = new User({
		username: req.body.username,
	});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
            console.log("User register error: ", err.message);
		}
		passport.authenticate("local")(req, res, function() {
            res.json(user)
		});
	});
});

// User update route (not currently in use)
router.put("/:user_id", function(req, res) {
    User.findById(req.params.user_id).then(user => {
        user.username = req.body.username;
        user.isAdmin = req.body.isAdmin;

        user.save().then(user => {
            res.status(200).json(`User updated! Updated user details: ${user}`);
        }).catch(err => {
            console.log("User update error: ", err.message);
        });
    }).catch(err => {
        console.log("User update error: ", err.message);
    });
})

// User destroy route
router.delete("/:user_id", function(req, res) {
    User.findByIdAndDelete(req.params.user_id).then(user => {
        if(user) {
            Message.updateMany(
                {"owner.id": user._id},
                {"content": "(Message deleted because the user was removed by an admin)"}
            ).then(messages => {
            }).catch(err => {
                console.log("User destroy error: ", err.message);
            });
            Message.updateMany({"owner.id": user._id}, {"owner.username": "(User removed)"}).then(messages => {
            }).catch(err => {
                console.log("User destroy error: ", err.message);
            });
            return res.status(200).json(`User and their messages (if any) deleted! Deleted user details: ${user}`);
        } else {
            console.log("User not found");
        }
    })
    .catch(err => {
        console.log("User destroy error: ", err.message);
    });
});

module.exports = router;