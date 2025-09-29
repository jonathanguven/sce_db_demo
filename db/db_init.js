const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to database
const db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create Posts table if it doesn't exist
const createPostsTable = () => {

  const sql = `
    Write your SQL here!
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('Error creating Posts table:', err.message);
      process.exit(1);
    } else {
      console.log('Posts table created successfully (or already exists)');
    }
  });
};

// Initialize database
createPostsTable();

// Close database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database initialization complete');
  }
});
