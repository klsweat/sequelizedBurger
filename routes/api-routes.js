// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
// Requiring our models
var db = require('../models');

// Routes
// =============================================================
module.exports = function (app) {
  app.get('/', function (req, res) {
    db.Burger.findAll({
        order: [
            ["burger_name", "ASC"]
        ], 
        include: [{
            model: db.Customer,
            attributes: ["customer_name"]
        }]
    }).then(function (data) {
        var hbsObject = {
            burgers: data
        };
      res.render('index', hbsObject)
    }).catch(function (error) {
      console.log(error);
    })
  })

  // POST route for saving a new burger
  app.post('/burgers/create', function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    // we want to update the burgers table using so we call the burger model
    db.Burger.create({
        burger_name: req.body.burger_name_input
    }).then(function () {
      res.redirect('/');
    }).catch(function (error) {
      console.log(error);
    })
  })

  // PUT route for updating burgers. We can get the updated burger from req.body
  app.put('/burgers/update/devour/:id', function (req, res) {
    return db.Customer.create({
      customer_name: req.body.customer
    }).then(function (newCustomer) {
      return db.Burger.update({
        devoured: 1,
        CustomerId: newCustomer.id
      }, {
        where: {
          id: req.params.id
        },
        include: [db.Customer]
      })
    }).then(function (customerName) {
      res.redirect('/');
    })
  })



// ==================================
// end module exports  
}
