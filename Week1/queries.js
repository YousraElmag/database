const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect(error => {
  if (error) {
    throw error;
  }
  console.log('Connected.');
});

const queries = {
  createDatabase: `CREATE DATABASE IF NOT EXISTS world;`,

  useDatabase: `USE worldData`,

  createTableCountry: `CREATE TABLE IF NOT EXISTS country (code CHAR(3), Name CHAR(52), Continent CHAR (30), Region CHAR(26),SurfaceArea FLOAT(10,2),Indepyear SMALLINT(6),Population INT(11),LifeExpectancy FLOAT(3.1),GNP FLOAT(10.2),LocalName CHAR(45),GovernmentForm CHAR(45),HeadOfState CHAR(60),Capital INT(11),Code2 CHAR(2),PRIMARY KEY(Code));`,

  createTableCity: `CREATE TABLE IF NOT EXISTS city(ID INT(11) AUTO_INCREMENT,Name CHAR(35),CountryCode CHAR(3),District CHAR(20),Population INT(11),PRIMARY KEY (ID),KEY CountryCode (CountryCode))`,

  useDatabaseTwo: `USE world`,
};

Object.keys(queries).forEach(function(item) {
  connection.query(queries[item], error => {
    if (error) {
      throw error;
    }
    console.log('Query successful...');
  });
});

//Queries
// i.
const country_pop8mil = `SELECT * FROM country WHERE Population > 8000000`;
connection.query(country_pop8mil, (error, data) => {
  if (error) {
    throw error;
  }
  console.log(`Countries with more than 8 million population`);
  data.forEach(element => {
    console.log(`${element.Name} => ${element.Population}`);
  });
});

// ii.
const lands = `SELECT * FROM country WHERE Name LIKE '%land%' `;
connection.query(lands, (error, data) => {
  if (error) {
    throw error;
  }
  console.log(`Countries with “land” in their names:`);
  data.forEach(element => {
    console.log(element.Name);
  });
});

// iii.
const population_between = `SELECT * FROM city WHERE Population BETWEEN 500000 AND 1000000 `;
connection.query(population_between, (error, data) => {
  if (error) {
    throw error;
  }
  console.log(`Cities with population between 500000 and 1 mil. :`);
  data.forEach(element => {
    console.log(element.Name);
  });
});

// iv.
const europe = `SELECT * FROM country WHERE Continent = 'Europe' `;
connection.query(europe, (error, data) => {
  if (error) {
    throw error;
  }
  console.log(`Countries in Europe:`);
  data.forEach(element => {
    console.log(element.Name);
  });
});

// v.
const surface = `SELECT * FROM country ORDER BY SurfaceArea DESC`;
connection.query(surface, (error, data) => {
  if (error) {
    throw error;
  }
  console.log(`All the countries in the descending order based on their surface areas:`);
  data.forEach(element => {
    console.log(`${element.Name} => ${element.SurfaceArea}`);
  });
});

connection.end();
