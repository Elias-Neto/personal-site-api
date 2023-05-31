const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === "production" ? true : false,
})

const initDatabase = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS experiences (
      id SERIAL PRIMARY KEY, 
      title VARCHAR(255) NOT NULL, 
      type VARCHAR(255) NOT NULL, 
      description VARCHAR(255), 
      "startYear" VARCHAR(255),
      "endYear" VARCHAR(255) 
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      demonstration VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      github VARCHAR(255) NOT NULL,
      deploy VARCHAR(255)
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS information (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      "profilePic" VARCHAR(255) NOT NULL,
      office VARCHAR(255) NOT NULL,
      resume VARCHAR NOT NULL  
    );

    INSERT INTO information (name, "profilePic", office, resume) 
    SELECT '', '', '', ''
    WHERE NOT EXISTS (
      SELECT 1 FROM information
      WHERE id = 1   
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    INSERT INTO users (email, password) 
    SELECT 'teste@email.com', '123456'
    WHERE NOT EXISTS (
      SELECT 1 FROM users
      WHERE email = 'teste@email.com'  
    );
  `);

  console.log("Database initialized")
}

module.exports = {
  initDatabase,
  pool
}