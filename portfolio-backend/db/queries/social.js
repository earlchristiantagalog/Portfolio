const pool = require('../connection');

async function getSocial() {
  const { rows } = await pool.query('SELECT * FROM social WHERE id = $1', ['social']);
  return rows[0] || null;
}

async function updateSocial({ github, linkedin, email }) {
  const { rows } = await pool.query(
    `INSERT INTO social (id, github, linkedin, email)
     VALUES ('social', $1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET github=$1, linkedin=$2, email=$3, updated_at=NOW()
     RETURNING *`,
    [github, linkedin, email]
  );
  return rows[0];
}

module.exports = { getSocial, updateSocial };
