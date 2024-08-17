const mysql = require('mysql2/promise');

async function createTables() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'recipe'
    });

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS recipes (
            recipe_id INT AUTO_INCREMENT PRIMARY KEY,
            recipe_name VARCHAR(255) NOT NULL
        );
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS categories (
            category_id INT AUTO_INCREMENT PRIMARY KEY,
            category_name VARCHAR(100) UNIQUE NOT NULL
        );
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS recipe_categories (
            recipe_id INT,
            category_id INT,
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
            FOREIGN KEY (category_id) REFERENCES categories(category_id),
            PRIMARY KEY (recipe_id, category_id)
        );
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS ingredients (
            ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
            ingredient_name VARCHAR(255) UNIQUE NOT NULL
        );
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS recipe_ingredients (
            recipe_id INT,
            ingredient_id INT,
            quantity VARCHAR(50),
            unit VARCHAR(50),
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
            FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
            PRIMARY KEY (recipe_id, ingredient_id)
        );
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS steps (
            step_id INT AUTO_INCREMENT PRIMARY KEY,
            step_description TEXT NOT NULL
        );
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS recipe_steps (
            recipe_id INT,
            step_id INT,
            step_order INT,
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
            FOREIGN KEY (step_id) REFERENCES steps(step_id),
            PRIMARY KEY (recipe_id, step_id)
        );
    `);

    console.log("Tables created successfully.");
    await connection.end();
}

createTables();
