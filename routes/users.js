const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req, res, next) {
    User.findAll().then((users) => {
      res.render('users', { users: [...users] });
    }).catch(next);
});

router.get('/:userId', function(req, res, next) {
    var userPromise = User.findByPk(req.params.userId);
    var pagesPromise = Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    Promise.all([
      userPromise, 
      pagesPromise
    ])
    .then(function(values) {
      var user = values[0];
      var pages = values[1];
      res.render('user', { user: user, pages: pages });
    })
    .catch(next);
});

module.exports = router;