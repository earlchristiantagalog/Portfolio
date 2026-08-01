const pool = require('../connection');

async function getMeta() {
  const { rows } = await pool.query('SELECT * FROM meta WHERE id = $1', ['meta']);
  return rows[0] || null;
}

async function updateMeta({ title, description }) {
  const { rows } = await pool.query(
    `INSERT INTO meta (id, title, description)
     VALUES ('meta', $1, $2)
     ON CONFLICT (id) DO UPDATE SET title=$1, description=$2, updated_at=NOW()
     RETURNING *`,
    [title, description]
  );
  return rows[0];
}

module.exports = { getMeta, updateMeta };
