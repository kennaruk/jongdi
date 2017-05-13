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
router.get('/shop/login', function(req, res, next) {
    var email = req.query.email;
    var password = req.query.password;
    console.log("req session shop"+req.session.user);
    db.findShopUser(email, function(err, rows, fields) {
      console.log(rows);
      console.log("rows.length = "+rows.length);
      if(rows.length == 0 || rows[0].shop_pass != password || err) { //login failed
        var user = { status: 'log-in-success',
                      user_name: req.session['user_name'],
                      user_addr: req.session['user_addr'],
                      user_phone: req.session['user_phone'],
                      user_pass: req.session['user_pass'],
                      user_email: req.session['user_email'],
                      user_contact: req.session['user_contact'],
                      user_status: req.session['user_status']};
        res.render('fronts/shop-log-in.ejs', { user:user, page: 'shop-log-in', status: 'log-in-failed' });
      }
      else { //login success
        req.session.user = rows[0].shop_name;
        console.log("rows[0].shop_name = "+rows[0].shop_name);
        console.log(req.session.user);
        req.session['user_id'] = rows[0].shop_id;
        req.session['user_name'] = rows[0].shop_name;
        req.session['user_phone'] = rows[0].shop_phone;
        req.session['user_pass'] = rows[0].shop_pass;
        req.session['user_email'] = rows[0].shop_email;
        req.session['user_status'] = 'shop';
          var user_id = req.session['user_id'];
          var user = { status: 'log-in-success',
                        user_name: req.session['user_name'],
                        user_addr: req.session['user_addr'],
                        user_phone: req.session['user_phone'],
                        user_pass: req.session['user_pass'],
                        user_email: req.session['user_email'],
                        user_contact: req.session['user_contact'],
                        user_status: req.session['user_status']};
          console.log(req.session.user);
          if(req.session.user == undefined)
            user['status'] = 'log-in-failed';
          db.getShopItems(user_id, function(err, rows, fields) {
            if(rows.length == 0) {
              res.render('fronts/shop-item.ejs', { shop: {}, items: {}, user: user, page: 'shop-item' });
            } else {
              db.getShopFromId(rows[0].shop_id, function(err, shop, fields) {
                res.render('fronts/shop-item.ejs', { shop: shop, items: rows, user: user, page: 'shop-item' });
              });
            }
          });
      }
        // db.getItemLists(function(err, rows, fields) {
        //   if(rows.length == 0) {
        //     var user = { status: 'log-in-success',
        //                   user_name: req.session['user_name'],
        //                   user_addr: req.session['user_addr'],
        //                   user_phone: req.session['user_phone'],
        //                   user_pass: req.session['user_pass'],
        //                   user_email: req.session['user_email'],
        //                   user_contact: req.session['user_contact'],
        //                   user_status: req.session['user_status']};
        //     res.render('fronts/null-item.ejs', { user: user, page: 'menu', items: rows });
        //   }
      //     else {
      //       var length = rows.length;
      //       var first = Math.floor(Math.random() * length);
      //       var count = 0;
      //       var arr = [];
      //       for(var i = 0 ; i < 3 ; i++) {
      //         if(count+1 == length)
      //           break;
      //         while(true) {
      //           var random = Math.floor(Math.random() * length);
      //           console.log("random = "+random);
      //           var notSame = false;
      //           for(var j = 0 ; j < arr.length ; j++) {
      //             if(random == arr[j])
      //               notSame = true;
      //           }
      //           if(!notSame && random != first) {
      //             arr.push(random);
      //             count++;
      //             break;
      //           }
      //         }
      //       }
      //       var first_picture = rows[first].item_picture;
      //       var first_id = rows[first].item_id;
      //       var bottoms = [];
      //       for(var i = 0 ; i < arr.length ; i++) {
      //         bottoms.push({ id: rows[arr[i]].item_id, picture: rows[arr[i]].item_picture });
      //       }
      //       // console.log(bottoms);
      //     } // end else
      //     var user = { status: 'log-in-success',
      //                   user_name: req.session['user_name'],
      //                   user_addr: req.session['user_addr'],
      //                   user_phone: req.session['user_phone'],
      //                   user_pass: req.session['user_pass'],
      //                   user_email: req.session['user_email'],
      //                   user_contact: req.session['user_contact'],
      //                   user_status: req.session['user_status']};
      //     res.render('fronts/index.ejs', { user: user, page: 'home', first_picture: first_picture, first_id: first_id, bottoms: bottoms });
      //   });
      //   // res.render('fronts/index.ejs', { page: 'log-in', status: 'log-in-success' });
      //   console.log("req session shop "+req.session.user);
      // }
    });
});
router.get('/login', function(req, res, next) {
  var email = req.query.email;
  var password = req.query.password;
  console.log("req session user"+req.session.user);
  db.findUser(email, function(err, rows, fields) {
    console.log(rows);
    console.log("rows.length = "+rows.length);
    if(rows.length == 0 || rows[0].user_pass != password || err) { //login failed
      var user = { status: 'log-in-failed',
                    user_name: req.session['user_name'],
                    user_addr: req.session['user_addr'],
                    user_phone: req.session['user_phone'],
                    user_pass: req.session['user_pass'],
                    user_email: req.session['user_email'],
                    user_contact: req.session['user_contact'],
                    user_status: req.session['user_status']};
      res.render('fronts/log-in.ejs', { user:user, page: 'log-in', status: 'log-in-failed' });
    }
    else { //login success
      req.session.user = rows[0].user_name;
      req.session['user_id'] = rows[0].user_id;
      req.session['user_name'] = rows[0].user_name;
      req.session['user_addr'] = rows[0].user_addr;
      req.session['user_phone'] = rows[0].user_phone;
      req.session['user_pass'] = rows[0].user_pass;
      req.session['user_email'] = rows[0].user_email;
      req.session['user_contact'] = rows[0].user_contact;
      req.session['user_status'] = 'user';
      db.getItemLists(function(err, rows, fields) {
        if(rows.length == 0) {
          var user = { status: 'log-in-success',
                        user_name: req.session['user_name'],
                        user_addr: req.session['user_addr'],
                        user_phone: req.session['user_phone'],
                        user_pass: req.session['user_pass'],
                        user_email: req.session['user_email'],
                        user_contact: req.session['user_contact'],
                        user_status: req.session['user_status']};
          res.render('fronts/null-item.ejs', { user: user, page: 'menu', items: rows });
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
                      user_contact: req.session['user_contact'],
                      user_status: req.session['user_status']};
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
                  user_contact: req.session['user_contact'],
                  user_status: req.session['user_status']};
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
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
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
                  user_contact: req.session['user_contact'],
                  user_status: req.session['user_status']};
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
                    user_contact: req.session['user_contact'],
                    user_status: req.session['user_status']};
      if(req.session.user == undefined)
        user['status'] = 'log-in-failed';
      res.render('fronts/item.ejs', { user: user, page: 'menu', items: items, id: rows[0].item_id, name: rows[0].item_name, picture: rows[0].item_picture, price: rows[0].item_price, stock: rows[0].item_stock, description: rows[0].item_description});
    });
  });
});
router.get('/register/shop', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  res.render('fronts/register-shop.ejs', { user: user, page: 'register-bttn' });
});
router.get('/register', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  res.render('fronts/register.ejs', { user: user, page: 'register-bttn' });
});
router.get('/shop/log-in', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
    if(req.session.user == undefined)
      user['status'] = 'not-login';
    res.render('fronts/shop-log-in.ejs', { user: user, page: 'log-in-bttn' });
});
router.get('/log-in', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
  if(req.session.user == undefined)
    user['status'] = 'not-login';

  res.render('fronts/log-in.ejs', { user: user, page: 'log-in-bttn' });
});
router.post('/logout', function(req, res, next) {
  req.session.destroy();
});
router.get('/log-out', function(req, res, next) {
  res.render('fronts/log-out.ejs', { page: 'log-out-bttn' });
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
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  res.render('fronts/contact.ejs', { user: user, page: 'contact' });
});
router.get('/user/delete/:itemId', function(req, res, next) {
  var item_id = req.params.itemId;
  var user_id = req.session['user_id'];
  db.deleteReserveFromId(user_id, item_id, function(err, rows, fields) {
    var user = { status: 'log-in-success',
                  user_name: req.session['user_name'],
                  user_addr: req.session['user_addr'],
                  user_phone: req.session['user_phone'],
                  user_pass: req.session['user_pass'],
                  user_email: req.session['user_email'],
                  user_contact: req.session['user_contact'],
                  user_status: req.session['user_status']};
    if(req.session.user == undefined)
      user['status'] = 'log-in-failed';
    db.getReserveItemsFromId(user_id, function(err, reserves, fields) {
      if(reserves.length == 0) {
        res.render('fronts/user-item.ejs', { reserves: {}, user: user, page: 'user-item' });
      } else {
        res.render('fronts/user-item.ejs', { reserves: reserves, user: user, page: 'user-item' });
      }
    });
  });
});
router.get('/user/reserve/:itemId', function(req, res, next) {
  var item_id = req.params.itemId;
  var user_id = req.session['user_id'];
  db.reserve(user_id, item_id, function(err, rows, fields) {
    var user = { status: 'log-in-success',
                  user_name: req.session['user_name'],
                  user_addr: req.session['user_addr'],
                  user_phone: req.session['user_phone'],
                  user_pass: req.session['user_pass'],
                  user_email: req.session['user_email'],
                  user_contact: req.session['user_contact'],
                  user_status: req.session['user_status']};
    if(req.session.user == undefined)
      user['status'] = 'log-in-failed';
    db.getReserveItemsFromId(user_id, function(err, reserves, fields) {
      if(reserves.length == 0) {
        res.render('fronts/user-item.ejs', { reserves: {}, user: user, page: 'user-item' });
      } else {
        res.render('fronts/user-item.ejs', { reserves: reserves, user: user, page: 'user-item' });
      }
    });
  });
});
router.get('/delete/:itemId', function(req, res, next) {
  // res.json("delete item id");
  var item_id = req.params.itemId;
  var user_id = req.session['user_id'];
  db.deleteItemFromId(item_id, function(err) {
    var user = { status: 'log-in-success',
                  user_name: req.session['user_name'],
                  user_addr: req.session['user_addr'],
                  user_phone: req.session['user_phone'],
                  user_pass: req.session['user_pass'],
                  user_email: req.session['user_email'],
                  user_contact: req.session['user_contact'],
                  user_status: req.session['user_status']};
    if(req.session.user == undefined)
      user['status'] = 'log-in-failed';
    db.getShopItems(user_id, function(err, rows, fields) {
      if(rows.length == 0) {
        res.render('fronts/shop-item.ejs', { shop: {}, items: {}, user: user, page: 'shop-item' });
      } else {
        db.getShopFromId(rows[0].shop_id, function(err, shop, fields) {
          res.render('fronts/shop-item.ejs', { shop: shop, items: rows, user: user, page: 'shop-item' });
        });
      }
    });
  });
});
router.post('/edit', function(req, res, next) {
  console.log("call post edit service");
  var obj = req.body;
  db.updateItemById(obj, function(err, rows, fields) {
    res.json("edit success");
  });
});
router.get('/edit/:itemId', function(req, res, next) {
  var item_id = req.params.itemId;
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  db.getItemFromId(item_id, function(err, rows, fields) {
    res.render('fronts/edit.ejs', { item: rows[0], user: user, page: 'edit' });
  })
});
router.get('/shop/item', function(req, res, next) {
  var user_id = req.session['user_id'];
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
  console.log(req.session.user);
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  db.getShopItems(user_id, function(err, rows, fields) {
    if(rows.length == 0) {
      res.render('fronts/shop-item.ejs', { shop: {}, items: {}, user: user, page: 'shop-item' });
    } else {
      db.getShopFromId(rows[0].shop_id, function(err, shop, fields) {
        res.render('fronts/shop-item.ejs', { shop: shop, items: rows, user: user, page: 'shop-item' });
      });
    }
  });
});
router.get('/user/item', function(req, res, next) {
  var user = { status: 'log-in-success',
                user_name: req.session['user_name'],
                user_addr: req.session['user_addr'],
                user_phone: req.session['user_phone'],
                user_pass: req.session['user_pass'],
                user_email: req.session['user_email'],
                user_contact: req.session['user_contact'],
                user_status: req.session['user_status']};
  var user_id = req.session['user_id'];
  if(req.session.user == undefined)
    user['status'] = 'log-in-failed';
  db.getReserveItemsFromId(user_id, function(err, reserves, fields) {
    if(reserves.length == 0) {
      res.render('fronts/user-item.ejs', { reserves: {}, user: user, page: 'user-item' });
    } else {
      res.render('fronts/user-item.ejs', { reserves: reserves, user: user, page: 'user-item' });
      // db.getUserFromId(rows[0].user_id, function(err, shop, fields) {
      //   res.render('fronts/blog.ejs', { shop: shop, items: rows, user: user, page: 'user-item' });
      // });
    }
  });
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
router.post('/register/shop', function(req, res, next) {
    console.log("register shop service call");
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    console.log("register shop service call 2");

    db.isShopRegister(email, function(is) {
      console.log("register shop service call 3");
      if(is) {
        console.log("isRegister router");
        res.json({ status: "isRegisted" });
      } else {
        console.log("not Register router");
        db.registerShop(email, password, name, phone, function(err) {
          console.log("register shop service call 4");
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
router.post('/shop/add/item', function(req, res, next) {
  console.log("pass 569");
  var item_name = req.body.item_name;
  var item_price = req.body.item_price;
  var item_stock = req.body.item_stock;
  var item_picture = req.body.item_picture;
  var item_description = req.body.item_description;
  var item = { item_name: item_name,
                item_price: item_price,
                item_stock: item_stock,
                item_picture: item_picture,
                item_description: item_description };
  var shop_id = req.session['user_id'];
  console.log(item);
  console.log(shop_id);
  console.log("pass here 580");
  db.addItem(item, shop_id, function(err, rows, fields) {
    if(!err)
      res.json({status: 'success'});
    else {
      res.json({status: 'err'});
    }
  });
});
module.exports = router;
