const pool = require('../connection');

async function getSkills() {
  const { rows } = await pool.query('SELECT * FROM skills ORDER BY position ASC');
  return rows.map((r) => r.skill);
}

async function replaceSkills(skills) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM skills');
    for (let i = 0; i < skills.length; i++) {
      await client.query('INSERT INTO skills (skill, position) VALUES ($1, $2)', [skills[i], i]);
    }
    await client.query('COMMIT');
    return skills;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function addSkill(skill) {
  const { rows: maxRows } = await pool.query('SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM skills');
  const position = maxRows[0].next_pos;
  const { rows } = await pool.query('INSERT INTO skills (skill, position) VALUES ($1, $2) RETURNING *', [skill, position]);
  return rows[0];
}

async function deleteSkill(id) {
  const { rows } = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING skill', [id]);
  return rows[0] || null;
}

module.exports = { getSkills, replaceSkills, addSkill, deleteSkill };
