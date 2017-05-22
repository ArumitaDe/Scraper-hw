// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var models= require("../models");
var express = require('express');
var router = express.Router();
// ===============================================================================
// ROUTING
// ===============================================================================
router.get('/', function(req, res) {
  models.burgers.findAll().then(function(data) {

    var hbsObject = {burgers: data};

    res.render('index', hbsObject);

  });
});

router.post('/burgers', function(req, res) {
 models.burgers.create({

    burger_name: req.body.burger_name,

  }).then(function() {

    res.redirect('/');

  });
});

router.put('/burgers/:id', function(req, res) {
  models.burgers.update(

  {

    devoured: 1

  },

  {

    where: { id : req.params.id }

  })

  .then(function (result) {

    res.redirect('/');

  });
});

module.exports = router;
