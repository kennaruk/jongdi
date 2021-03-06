var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'jongdi'
});
// var connection = mysql.createConnection({
//   host     : '188.166.248.254',
//   user     : 'blacksource_ken',
//   password : 'kentidhe',
//   database : 'blacksource_kndb'
// });
// var connection = mysql.createConnection({
//   host     : 'mysql.hostinger.in.th',
//   user     : 'u819621144_jongd',
//   password : 'kennaruk',
//   database : 'u819621144_jongd'
// });
var app = express();
var db = require("./jongdi-db.js")

connection.connect(function(err){
  if(!err) {
      console.log("Jongdi Database is connected");
  } else {
      console.log("Jongdi Database connecting ERROR");
  }
});

// app.get("/",function(req,res){
//   connection.query('SELECT * from object LIMIT 2', function(err, rows, fields) {
//   connection.end();
//     if (!err)
//       console.log('The solution is: ', rows);
//     else
//       console.log('Error while performing Query.');
//     });
// });

exports.tmp = function() {
  var execute = ';';
  connection.query(execute, function(err, rows, fields) {
    if(!err) {

    } else {

    }
  });
}

exports.reserve = function(user_id, item_id, callback) {
  var execute = 'INSERT INTO reserve (user_id, item_id) VALUES ('+user_id+', '+item_id+');'
  console.log(execute);
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      connection.query('UPDATE item SET item_stock = item_stock - 1 WHERE item_id = '+item_id+';', function(err, rows, fields) {
        if(err)
          console.log("minus item db err");
      });
      callback(err, rows, fields);
    } else {
      console.log("reserve db err");
    }
  });
};
exports.deleteReserveFromId = function(user_id, item_id, callback) {
  var execute = 'DELETE FROM reserve WHERE user_id = '+user_id+' AND item_id = '+item_id+' LIMIT 1;';
  console.log(execute);
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      connection.query('UPDATE item SET item_stock = item_stock + 1 WHERE item_id = '+item_id+';', function(err, rows, fields) {
        if(err)
          console.log("increase item db err");
        callback(err, rows, fields);
      });
    } else {
      console.log("delete reserve from id db err");
    }
  });
}
exports.addItem = function(item, shop_id, callback) {
  console.log("add item call "+item['item_name']);
  var execute = 'INSERT INTO item (item_name, item_price, item_stock, item_picture, item_description, shop_id) VALUES ('+'\''+item['item_name']+'\', '+item['item_price']+', '+item['item_stock']+', \''+item['item_picture']+'\', \''+item['item_description']+'\', '+shop_id+');';
  // var execute = "TEST";
  console.log(execute);
  connection.query(execute, function(err, rows, fields) {
    if(!err)
      callback(err, rows, fields);
    else {
      console.log("add item db err");
    }
  });
};
exports.deleteItemFromId = function(item_id, callback) {
  var execute = 'DELETE FROM reserve WHERE item_id = '+item_id+';';
  console.log(execute);
  connection.query(execute, function(err) {
    if(!err) {
      connection.query('DELETE FROM item WHERE item_id = '+item_id+';', function(err) {
        if(!err)
          callback(err);
        else {
          console.log("delete item item_id error");
        }
      })
    } else {
      console.log("deleteItemFromId err");
      console.log(err);
    }
  });
}
exports.getShopFromId = function(shop_id, callback) {
  var execute = 'SELECT * FROM shop WHERE shop_id = '+shop_id+';';
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("Get Shop From Id. err");
    }
  });
};
exports.getShopItems = function(shop_id, callback) {
  var execute = 'SELECT * FROM item WHERE shop_id = '+shop_id+';';
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("Get Shop Item Failed.");
    }
  });
}
exports.getUserFromId = function(user_id, callback) {
  var execute = 'SELECT * FROM user WHERE user_id = '+user_id+';';
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("Get user From Id. err");
    }
  });
};
exports.getItems = function (callback) {
  var execute = 'SELECT * FROM shop;';
  connection.query(execute, function(err, rows, fields) {
    if(!err)
      callback(err, rows, fields);
    else {
      console.log("get items error db");
    }
  });
}
exports.getShops = function (callback) {
  var execute = 'SELECT * FROM shop;'
  connection.query(execute, function(err, rows, fields) {
    if(!err)
      callback(err, rows, fields)
    else {
      console.log("get shops db err");
    }
  });
}
exports.getReserveItemsFromId = function(user_id, callback) {
  // var execute = 'SELECT * FROM reserve WHERE user_id = '+user_id+';';
  var execute = 'SELECT item.*, reserve.*, shop.*'+
                ' FROM item INNER JOIN reserve ON item.item_id=reserve.item_id'+
                ' INNER JOIN shop ON item.shop_id = shop.shop_id WHERE user_id = '+user_id+';';
                // ' WHERE user_id = '+user_id+";"
                // ' UNION'+
                // ' SELECT shop';
                // ' INNER JOIN shop s ON i.item_id = s.item_id;';
                // 'FULL JOIN shop s USING (shop_id);';
  console.log(execute);
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("Get reserve Item Failed.");
    }
  });
}
// db.getReserveItemsFromId(1, function(err, rows, fields) {
//   console.log("rows = "+rows.length);
//   console.log(rows);
// });
exports.findShopUser = function(email, callback) {
  var execute = 'SELECT * FROM shop WHERE shop_email = \''+email+'\';';
  console.log(execute);
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("find shop user error db");
    }
  })
}
exports.findUser = function(email, callback) {
  var execute = 'SELECT * FROM user WHERE user_email = \''+email+'\';';
  console.log(execute);
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("find user error db");
    }
  });
}

exports.findItem = function(item, callback) {
  var execute = 'SELECT * FROM item WHERE item_id = \''+item+'\';';
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("find item error db");
    }
  });
}
exports.updateItemById = function(obj, callback) {
  var execute = 'UPDATE item SET item_name = \''+obj.item_name+'\', item_price = '+obj.item_price+', item_stock = '+obj.item_stock+', item_picture = \''+obj.item_picture+'\', item_description = \''+obj.item_description+'\' WHERE item_id = '+obj.item_id+';';
  console.log(execute);
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("update item from id db error");
    }
  })
}
exports.getItemFromId = function(item_id, callback) {
  var execute = 'SELECT * from item WHERE item_id = '+item_id+';';
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log("get item from id db error");
    }
  });
}
exports.getItemLists = function(callback) {
  var execute = 'SELECT * from item';
  connection.query(execute, function(err, rows, fields) {
    if(!err) {
      console.log(rows);
      callback(err, rows, fields)
    } else {
      console.log("get item lists error db");
    }
  });
}

exports.getTopThree = function(callback) {
  connection.query('SELECT COUNT(DISTINCT item_id) Total FROM reserve', function(err, rows, fields) {
  // connection.query('SELECT item_id FROM ( select item_id, count(*) as count)', function(err, rows, fields) {

    // connection.end();
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log('Get TOP-THREE Error');
    }
  });
}
exports.register = function(name, addr, phone, pass, email, contact, callback) {
  var exec = 'INSERT INTO user (user_name, user_addr, user_phone, user_pass, user_email, user_contact) VALUES (\''+name+'\', \''+addr+'\', '+phone+', \''+pass+'\', \''+email+'\', \''+contact+'\');';
  console.log(exec);
  connection.query(exec, function(err, rows) {
    if(!err) {
      callback(err);
      console.log("Register success");
    } else {
      console.log("resgister db error");
      console.log(err);
      callback(err);
    }
  });
}
exports.registerShop = function(email, pass, name, tel, callback) {
  var exec = 'INSERT INTO shop (shop_email, shop_pass, shop_name, shop_tel) VALUES (\''+email+'\', \''+pass+'\', \''+name+'\', '+tel+');';
  connection.query(exec, function(err, rows) {
    if(!err) {
      callback(err);
      console.log("Register Shop success");
    } else {
      console.log("register shop failed");
      callback(err);
    }
  })
}
// db.register('kenfromjs', 'test', '0832619668', 'kenn', 'wow');
exports.isShopRegister = function(email, callback) {
  var execute = 'SELECT shop_email FROM shop;';
    connection.query(execute, function(err, rows, fields) {
      if(!err) {
        for(var i = 0 ; i < rows.length ; i++) {
          if(email == rows[i].shop_email) {
            callback(true);
            return;
          }
        }
        callback(false);
      } else {
        console.log("is shop registered db err");
      }
    });
}
exports.isRegister = function(email, callback) {
  connection.query('SELECT user_email FROM user', function(err, rows, fields) {
    if(!err) {
      console.log("wow");
      for(var i = 0 ; i < rows.length ; i++) {
        if(email == rows[i].user_email) {
          callback(true);
          return;
        }
      }
      callback(false);
    } else {
      console.log('isRegister Error');
    }
  });
}
// var isRegister;
// db.isRegister('kennaruk', function(isRegister){
//   console.log(isRegister);
// });
exports.getLastItem = function(callback) {
  connection.query('SELECT LAST(item_id) FROM item', function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log('GetLastItem Error');
    }
  });
}





app.listen(8000);
