var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'datacollection'
});

connection.on('error', function(err) {
    console.log("Connection Error -- "+ err.message); // 'ER_BAD_DB_ERROR'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

module.exports = connection;