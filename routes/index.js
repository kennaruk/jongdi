var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fronts/index.ejs', { page: 'home' });
});
router.get('/about', function(req, res, next) {
  res.render('fronts/about.ejs', { page: 'about' });
});
router.get('/menu', function(req, res, next) {
  res.render('fronts/burger.ejs', { page: 'menu' });
});
router.get('/register', function(req, res, next) {
  res.render('fronts/register.ejs', { page: 'register' });
});
router.get('/log-in', function(req, res, next) {
  res.render('fronts/log-in.ejs', { page: 'log-in' });
});
router.get('/log-out', function(req, res, next) {
  res.render('fronts/log-out.ejs', { page: 'log-out' });
});
// router.get('/menu/:menu_name', function(req, res, next) {
//   var menu_name = req.params.menu_name;
//   res.render('fronts/burger.ejs', { page: 'menu', menu_name: menu_name });
// });
router.get('/contact', function(req, res, next) {
  res.render('fronts/contact.ejs', { page: 'contact' });
});
router.get('/blog', function(req, res, next) {
  res.render('fronts/blog.ejs', { page: 'blog' });
});
router.get('/shake', function(req, res, next) {
  res.render('fronts/shake.ejs', { page: 'shake' });
});
router.get('/hotdog', function(req, res, next) {
  res.render('fronts/hotdog.ejs', { page: 'hotdog' });
});
router.get('/breakfast', function(req, res, next) {
  res.render('fronts/breakfast.ejs', { page: 'breakfast' });
});

module.exports = router;
