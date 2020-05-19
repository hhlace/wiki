const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req, res, next) {
    Page.findAll().then((pages)=>{
        res.render('index', {pages: [...pages]})
    })
});
router.post('/', function(req, res, next) {
    User.findOrCreate({
        where: {
          name: req.body.name,
          email: req.body.email
        }
      })
      .then(function (values) {
        var user = values[0];
        var page = Page.create({
          title: req.body.title,
          content: req.body.content
        });
        return page.then(function (page) {
          return page.setAuthor(user);
        });
      })
      .then(function (page) {
        res.redirect(page.urlTitle);
      })
      .catch(next);
});
router.get('/add', function(req, res, next) {
    //res.send('funcionó GET /wiki/add');
    res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        },
        include: [
          {model: User, as: 'author'}
      ]
    }).then((url) => {
      if(url === null) {
        res.status(404).send();
      }else{
        res.render("wikipage", { page: url })
      }
    }).catch(next)
});

module.exports = router;