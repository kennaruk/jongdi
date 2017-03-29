var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fronts/index.ejs', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('fronts/about.ejs', { title: 'Express' });
});
router.get('/menu', function(req, res, next) {
  res.render('fronts/burger.ejs', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.render('fronts/contact.ejs', { title: 'Express' });
});
router.get('/blog', function(req, res, next) {
  res.render('fronts/blog.ejs', { title: 'Express' });
});

module.exports = router;
