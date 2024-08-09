// queries.js

const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'recipe'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Example Query: Get all vegetarian recipes with potatoes
connection.query(
  `SELECT r.name FROM recipe r
   JOIN recipe_ingredients ri ON r.id = ri.recipe_id
   JOIN ingredients i ON ri.ingredient_id = i.id
   JOIN recipe_categories rc ON r.id = rc.recipe_id
   JOIN categories c ON rc.category_id = c.id
   WHERE i.ingredient_name = 'Potatoes' AND c.name = 'Vegetarian';`,
  (error, results) => {
    if (error) throw error;
    console.log('Vegetarian recipes with potatoes:', results);
  }
);

// Example Query: Get all cakes that do not need baking
connection.query(
  `SELECT r.name FROM recipe r
   JOIN recipe_categories rc ON r.id = rc.recipe_id
   JOIN categories c ON rc.category_id = c.id
   WHERE r.name LIKE '%Cake%' AND c.name = 'No-Bake';`,
  (error, results) => {
    if (error) throw error;
    console.log('Cakes that do not need baking:', results);
  }
);

// Example Query: Get all vegan and Japanese recipes
connection.query(
  `SELECT r.name FROM recipe r
   JOIN recipe_categories rc ON r.id = rc.recipe_id
   JOIN categories c ON rc.category_id = c.id
   WHERE c.name IN ('Vegan', 'Japanese')
   GROUP BY r.id
   HAVING COUNT(DISTINCT c.name) = 2;`,
  (error, results) => {
    if (error) throw error;
    console.log('Vegan and Japanese recipes:', results);
  }
);

// Close the connection
connection.end();
