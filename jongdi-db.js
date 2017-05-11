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
// db.register('kenfromjs', 'test', '0832619668', 'kenn', 'wow');
exports.isRegister = function(email, callback) {
  connection.query('SELECT * FROM user', function(err, rows, fields) {
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
