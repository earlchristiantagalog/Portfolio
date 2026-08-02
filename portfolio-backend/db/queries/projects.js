const pool = require('../connection');

async function getAllProjects() {
  const { rows: projects } = await pool.query('SELECT * FROM projects ORDER BY position ASC');
  const { rows: tags } = await pool.query('SELECT * FROM project_tags');

  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    category: p.category,
    github: p.github,
    live: p.live,
    tags: tags.filter((t) => t.project_id === p.id).map((t) => t.tag),
  }));
}

async function getProjectsConfig() {
  const { rows } = await pool.query('SELECT * FROM projects_config WHERE id = $1', ['projects_config']);
  return rows[0] || null;
}

async function createProject({ title, description, image, category, github, live, tags }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: maxRows } = await client.query('SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM projects');
    const position = maxRows[0].next_pos;

    const { rows } = await client.query(
      `INSERT INTO projects (title, description, image, category, github, live, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, image, category || 'Personal Projects', github || '', live || '', position]
    );
    const project = rows[0];

    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await client.query('INSERT INTO project_tags (project_id, tag) VALUES ($1, $2)', [project.id, tag]);
      }
    }

    await client.query('COMMIT');
    return { ...project, tags: tags || [] };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function updateProject(id, { title, description, image, category, github, live, tags }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      `UPDATE projects SET title=$1, description=$2, image=$3, category=$4, github=$5, live=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [title, description, image, category, github || '', live || '', id]
    );

    if (!rows[0]) {
      await client.query('ROLLBACK');
      return null;
    }

    await client.query('DELETE FROM project_tags WHERE project_id = $1', [id]);
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await client.query('INSERT INTO project_tags (project_id, tag) VALUES ($1, $2)', [id, tag]);
      }
    }

    await client.query('COMMIT');
    return { ...rows[0], tags: tags || [] };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function deleteProject(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM project_tags WHERE project_id = $1', [id]);
    const { rows } = await client.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    await client.query('COMMIT');
    return rows[0] || null;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function updateProjectsConfig({ heading, subtitle }) {
  const { rows } = await pool.query(
    `INSERT INTO projects_config (id, heading, subtitle)
     VALUES ('projects_config', $1, $2)
     ON CONFLICT (id) DO UPDATE SET heading=$1, subtitle=$2, updated_at=NOW()
     RETURNING *`,
    [heading, subtitle]
  );
  return rows[0];
}

async function replaceAllProjects(items) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM project_tags');
    await client.query('DELETE FROM projects');

    for (let i = 0; i < items.length; i++) {
      const p = items[i];
      const { rows } = await client.query(
        `INSERT INTO projects (title, description, image, category, github, live, position)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [p.title, p.description, p.image, p.category, p.github || '', p.live || '', i]
      );
      const projectId = rows[0].id;
      if (p.tags && p.tags.length > 0) {
        for (const tag of p.tags) {
          await client.query('INSERT INTO project_tags (project_id, tag) VALUES ($1, $2)', [projectId, tag]);
        }
      }
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

module.exports = { getAllProjects, getProjectsConfig, createProject, updateProject, deleteProject, updateProjectsConfig, replaceAllProjects };
