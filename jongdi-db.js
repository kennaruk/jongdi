var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'jongdi'
});
var app = express();
exports.test = function() {
  connection.query('SELECT * from user', function(err, rows, fields) {
    connection.end();
      if (!err)
        console.log('The solution is: ', rows.length);
      else
        console.log('Error while performing Query.');
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

exports.getLastItem = function(callback) {
  connection.query('SELECT LAST(item_id) FROM item', function(err, rows, fields) {
    if(!err) {
      callback(err, rows, fields);
    } else {
      console.log('GetLastItem Error');
    }
  });
}



connection.connect(function(err){
  if(!err) {
      console.log("Jongdi Database is connected");
  } else {
      console.log("Jongdi Database connecting ERROR");
  }
});

app.get("/",function(req,res){
  connection.query('SELECT * from object LIMIT 2', function(err, rows, fields) {
  connection.end();
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
    });
});

app.listen(8000);
