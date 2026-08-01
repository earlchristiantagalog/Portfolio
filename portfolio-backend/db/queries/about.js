const pool = require('../connection');

async function getAboutBio() {
  const { rows } = await pool.query('SELECT * FROM about_bio ORDER BY position ASC');
  return rows.map((r) => r.paragraph);
}

async function replaceAboutBio(paragraphs) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM about_bio');
    for (let i = 0; i < paragraphs.length; i++) {
      await client.query('INSERT INTO about_bio (paragraph, position) VALUES ($1, $2)', [paragraphs[i], i]);
    }
    await client.query('COMMIT');
    return paragraphs;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function getEducation() {
  const { rows } = await pool.query('SELECT * FROM education WHERE id = $1', ['education']);
  const row = rows[0];
  if (!row) return null;
  return {
    school: row.school,
    degree: row.degree,
    status: row.status,
    description: row.description,
    logo: row.logo,
  };
}

async function updateEducation({ school, degree, status, description, logo }) {
  const { rows } = await pool.query(
    `INSERT INTO education (id, school, degree, status, description, logo)
     VALUES ('education', $1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE SET school=$1, degree=$2, status=$3, description=$4, logo=$5, updated_at=NOW()
     RETURNING *`,
    [school, degree, status, description, logo]
  );
  return { school: rows[0].school, degree: rows[0].degree, status: rows[0].status, description: rows[0].description, logo: rows[0].logo };
}

module.exports = { getAboutBio, replaceAboutBio, getEducation, updateEducation };
