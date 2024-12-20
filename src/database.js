const mysql = require('mysql');
require('dotenv').config();


const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
  });

  // connection.connect( function(err){
  //   if(err){
  //       console.error("error connecting:" + err.stack)
  //       return;
  //   }
  //   console.log('connected')
  // });

  connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: " + err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = {connection}

