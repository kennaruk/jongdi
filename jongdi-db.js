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
  console.log("TEST");
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
