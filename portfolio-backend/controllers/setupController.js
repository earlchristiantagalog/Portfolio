const fs = require('fs');
const path = require('path');
const pool = require('../db/connection');

exports.setup = async (req, res, next) => {
  try {
    const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');

    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      console.log(`Running migration: ${file}...`);
      await pool.query(sql);
      console.log(`Completed: ${file}`);
    }

    res.json({ success: true, message: 'Database setup complete', migrations: files });
  } catch (err) {
    console.error('Setup failed:', err.message);
    next(err);
  }
};
