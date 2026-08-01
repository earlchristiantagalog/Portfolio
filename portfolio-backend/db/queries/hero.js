const pool = require('../connection');

async function getHero() {
  const { rows } = await pool.query('SELECT * FROM hero WHERE id = $1', ['hero']);
  return rows[0] || null;
}

async function updateHero({ name, title, tagline, availability }) {
  const { rows } = await pool.query(
    `INSERT INTO hero (id, name, title, tagline, availability)
     VALUES ('hero', $1, $2, $3, $4)
     ON CONFLICT (id) DO UPDATE SET name=$1, title=$2, tagline=$3, availability=$4, updated_at=NOW()
     RETURNING *`,
    [name, title, tagline, availability]
  );
  return rows[0];
}

module.exports = { getHero, updateHero };
