require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const crypto = require('crypto');
const pool = require('../db/connection');

async function createAdmin(username, password) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO admin_users (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET password_hash = $2
       RETURNING id, username`,
      [username, password]
    );
    console.log('Admin user created/updated:', rows[0].username);
  } catch (err) {
    console.error('Failed to create admin user:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

const username = process.argv[2] || 'admin';
const password = process.argv[3] || 'changeme123';

console.log(`Creating admin user: ${username}`);
createAdmin(username, password);
