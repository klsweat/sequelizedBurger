var express = require("express");

var router = express.Router();

// Import the model (models) to use its database functions.
var db = require("../models");

router.get("/", function(req, res) {
    res.redirect("/burgers");
});

// Create all our routes and set up logic within those routes where required.
// GET route for getting all of the burgers
router.get("/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({
        order: [
            ["burger_name", "ASC"]
        ],
        include: [{
            model: db.Customer,
            attributes: ["customer_name"]
        }]
    }).then(function(data) {
        var hbsObject = {
            burgers: data
        };
        // render the burgers to the page
        res.render("index", hbsObject);
    });
});

// POST route for saving a new burger
router.post("/burgers/create", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    // we want to update the burgers table using so we call the burger model
    return db.Burger.create({
        burger_name: req.body.burger_name_input
    }).then(function() {
        // We send the result of the new burger to the burgers page
        res.redirect("/burgers");
    });
});

// PUT route for updating burgers. We can get the updated burger from req.body
router.put("/burgers/update/devour/:id", function(req, res) {
    return db.Customer.create({
        customer_name: req.body.customer
    }).then(function(newCustomer) {
        return db.Burger.update({
            devoured: 1,
            CustomerId: newCustomer.id
        }, {
            where: {
                id: req.params.id
            },
            include: [db.Customer]
        });
    }).then(function() {
        res.redirect("/burgers");
    });
});

router.put("/burgers/update/return/:id", function(req, res) {
    return db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});



module.exports = router;

