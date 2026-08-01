const pool = require('../connection');

async function getContact() {
  const { rows } = await pool.query('SELECT * FROM contact WHERE id = $1', ['contact']);
  return rows[0] || null;
}

async function updateContact({ heading, subtitle }) {
  const { rows } = await pool.query(
    `INSERT INTO contact (id, heading, subtitle)
     VALUES ('contact', $1, $2)
     ON CONFLICT (id) DO UPDATE SET heading=$1, subtitle=$2, updated_at=NOW()
     RETURNING *`,
    [heading, subtitle]
  );
  return rows[0];
}

module.exports = { getContact, updateContact };
