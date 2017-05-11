var express = require('express');
var session = require('express-session')
var router = express.Router();
var db = require('../jongdi-db.js')
router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
// var auth = function(req, res, next) {
//   if (req.session && req.session.user === "amy" &&lo-gin req.session.admin)
//     return next();
//   else
//     return res.sendStatus(401);
// };
router.get('/login', function(req, res, next) {
  var email = req.query.email;
  var password = req.query.password;
  console.log("req session user"+req.session.user);
  db.findUser(email, function(err, rows, fields) {
    console.log(rows);
    if(rows.length == 0 || rows[0].user_pass != password) { //login failed
      res.render('fronts/log-in.ejs', { page: 'log-in', status: 'log-in-failed' });
    }
    else { //login success
      req.session.user = rows[0].user_name;
      req.session['user_name'] = rows[0].user_name;
      req.session['user_addr'] = rows[0].user_addr;
      req.session['user_phone'] = rows[0].user_phone;
      req.session['user_pass'] = rows[0].user_pass;
      req.session['user_email'] = rows[0].user_email;
      req.session['user_contact'] = rows[0].user_contact;
      db.getItemLists(function(err, rows, fields) {
        if(rows.length == 0) {
          res.render('fronts/null-item.ejs', { page: 'menu', items: rows });
        } else {
          var length = rows.length;
          var first = Math.floor(Math.random() * length);
          var count = 0;
          var arr = [];
          for(var i = 0 ; i < 3 ; i++) {
            if(count+1 == length)
              break;
            while(true) {
              var random = Math.floor(Math.random() * length);
              console.log("random = "+random);
              var notSame = false;
              for(var j = 0 ; j < arr.length ; j++) {
                if(random == arr[j])
                  notSame = true;
              }
              if(!notSame && random != first) {
                arr.push(random);
                count++;
                break;
              }
            }
          }
          var first_picture = rows[first].item_picture;
          var first_id = rows[first].item_id;
          var bottoms = [];
          for(var i = 0 ; i < arr.length ; i++) {
            bottoms.push({ id: rows[arr[i]].item_id, picture: rows[arr[i]].item_picture });
          }
          console.log(bottoms);
        } // end else
        var user = { status: 'log-in-success',
                      user_name: req.session['user_name'],
                      user_addr: req.session['user_addr'],
                      user_phone: req.session['user_phone'],
                      user_pass: req.session['user_pass'],
                      user_email: req.session['user_email'],
                      user_contact: req.session['user_contact'] };
        res.render('fronts/index.ejs', { user: user, page: 'home', first_picture: first_picture, first_id: first_id, bottoms: bottoms });
      });
      // res.render('fronts/index.ejs', { page: 'log-in', status: 'log-in-success' });
      console.log("req session user"+req.session.user);
    }
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  db.getItemLists(function(err, rows, fields) {
    if(rows.length == 0) {
      res.render('fronts/null-item.ejs', { page: 'menu', items: rows });
    } else {
      var length = rows.length;
      var first = Math.floor(Math.random() * length);
      var count = 0;
      var arr = [];
      for(var i = 0 ; i < 3 ; i++) {
        if(count+1 == length)
          break;
        while(true) {
          var random = Math.floor(Math.random() * length);
          console.log("random = "+random);
          var notSame = false;
          for(var j = 0 ; j < arr.length ; j++) {
            if(random == arr[j])
              notSame = true;
          }
          if(!notSame && random != first) {
            arr.push(random);
            count++;
            break;
          }
        }
      }
      var first_picture = rows[first].item_picture;
      var first_id = rows[first].item_id;
      var bottoms = [];
      for(var i = 0 ; i < arr.length ; i++) {
        bottoms.push({ id: rows[arr[i]].item_id, picture: rows[arr[i]].item_picture });
      }
      console.log(bottoms);
    } // end else
    var user = { status: 'log-in-success',
                  user_name: req.session['user_name'],
                  user_addr: req.session['user_addr'],
                  user_phone: req.session['user_phone'],
                  user_pass: req.session['user_pass'],
                  user_email: req.session['user_email'],
                  user_contact: req.session['user_contact'] };
    if(req.session.user == undefined)
      user['status'] = 'log-in-failed';
    res.render('fronts/index.ejs', { user: user, page: 'home', first_picture: first_picture, first_id: first_id, bottoms: bottoms });
  });
});

router.get('/about', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'] };
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  res.render('fronts/about.ejs', { user: user, page: 'about' });
});
router.get('/item', function(req, res, next) {
  db.getItemLists(function(err, rows, fields) {
    if(rows.length == 0) {
      res.render('fronts/null-item.ejs', { page: 'menu', items: rows });
    }
    var user = { status: 'log-in-success',
                  user_name: req.session['user_name'],
                  user_addr: req.session['user_addr'],
                  user_phone: req.session['user_phone'],
                  user_pass: req.session['user_pass'],
                  user_email: req.session['user_email'],
                  user_contact: req.session['user_contact'] };
    if(req.session.user == undefined)
      user['status'] = 'log-in-failed';
    res.render('fronts/item.ejs', { user: user, page: 'menu', items: rows, id: rows[0].item_id, name: rows[0].item_name, picture: rows[0].item_picture, price: rows[0].item_price, stock: rows[0].item_stock, description: rows[0].item_description});
  });
});
router.get('/item/:itemId', function(req, res, next) {
  var itemId = req.params.itemId;
  console.log("item id = "+itemId);
  db.getItemLists(function(err, items, fields) {
    if(items.length == 0) {
      res.render('fronts/null-item.ejs', { page: 'menu', items: items });
    }
    db.findItem(itemId, function(err, rows, fields){
      var user = { status: 'log-in-success',
                    user_name: req.session['user_name'],
                    user_addr: req.session['user_addr'],
                    user_phone: req.session['user_phone'],
                    user_pass: req.session['user_pass'],
                    user_email: req.session['user_email'],
                    user_contact: req.session['user_contact'] };
      if(req.session.user == undefined)
        user['status'] = 'log-in-failed';
      res.render('fronts/item.ejs', { user: user, page: 'menu', items: items, id: rows[0].item_id, name: rows[0].item_name, picture: rows[0].item_picture, price: rows[0].item_price, stock: rows[0].item_stock, description: rows[0].item_description});
    });
  });
});
router.get('/register', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'] };
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  res.render('fronts/register.ejs', { user: user, page: 'register' });
});
router.get('/log-in', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'] };
  if(req.session.user == undefined)
    user['status'] = 'not-login';

  res.render('fronts/log-in.ejs', { user: user, page: 'log-in' });
});
router.post('/logout', function(req, res, next) {
  req.session.destroy();
});
router.get('/log-out', function(req, res, next) {
  res.render('fronts/log-out.ejs', { page: 'log-out' });
});
router.get('/cart', function(req, res, next) {
  res.render('fronts/cart.ejs', { page: 'cart' });
});
// router.get('/menu/:menu_name', function(req, res, next) {
//   var menu_name = req.params.menu_name;
//   res.render('fronts/burger.ejs', { page: 'menu', menu_name: menu_name });
// });
router.get('/contact', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'] };
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  res.render('fronts/contact.ejs', { user: user, page: 'contact' });
});
router.get('/blog', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'] };
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  res.render('fronts/blog.ejs', { user: user, page: 'blog' });
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
router.post('/register', function(req, res, next){
  var name = req.body.name;
  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  var contact = req.body.contact;
  var addr = req.body.addr;
  db.isRegister(email, function(is) {
    if(is) {
      console.log("isRegister router");
      res.json({ status: "isRegisted" });
    } else {
      console.log("not Register router");
      db.register(name, addr, phone, password, email, contact, function(err) {
        if(err) {
          console.log("res err");
          res.json({ status: "err" });
        } else {
          console.log("res success");
          res.json({ status: "success" });
        }
      });
    }
  });
});
module.exports = router;
