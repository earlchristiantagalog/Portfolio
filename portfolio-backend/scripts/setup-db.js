require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const fs = require('fs');
const path = require('path');
const pool = require('../db/connection');

async function runMigration(filename) {
  const filePath = path.join(__dirname, '..', 'db', 'migrations', filename);
  const sql = fs.readFileSync(filePath, 'utf8');
  console.log(`Running migration: ${filename}...`);
  await pool.query(sql);
  console.log(`Completed: ${filename}`);
}

async function setup() {
  try {
    await runMigration('001_create_tables.sql');
    await runMigration('002_seed_data.sql');
    console.log('\nDatabase setup complete!');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setup();
