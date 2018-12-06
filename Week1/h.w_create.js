var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'class17'
});

connection.connect();

connection.query('create database if not exists world', function (error, results, fields) {
  if (error) throw error.message;
  console.log("database created successfully");
});
connection.query('use world', function (error, results, fields) {
  if (error) throw error.message;
  console.log("using database world");
});

let create_country_query = "create table if not exists countries (country_name varchar(15) not null primary key, population int, continent  varchar(15), surface_area float)";
connection.query(create_country_query, function (error, results, fields) {
  if (error) {
    throw error.message;
  }
  console.log("table countries created successfully");
});

let create_city_query = "create table if not exists cities (id int not null primary key, city_name varchar(25), population int, country_name varchar(15))";
connection.query(create_city_query, function (error, results, fields) {
  if (error) {
    throw error.message;
  }
  console.log("table cities created successfully");
});

connection.end();
