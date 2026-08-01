const fs = require('fs');
const path = require('path');
const pool = require('../db/connection');

function splitStatements(sql) {
  const lines = sql.split('\n');
  const cleaned = [];
  let inDollarQuote = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (inDollarQuote) {
      cleaned.push(line);
      if (trimmed.match(/\$\$;?$/)) {
        inDollarQuote = false;
      }
      continue;
    }

    if (trimmed.match(/^\$[^$]*\$/) || trimmed === '$$') {
      inDollarQuote = true;
      cleaned.push(line);
      continue;
    }

    if (trimmed.startsWith('--')) {
      cleaned.push('');
    } else {
      cleaned.push(line);
    }
  }

  const sqlClean = cleaned.join('\n');
  const rawStatements = sqlClean.split(';');
  const statements = [];

  for (const raw of rawStatements) {
    const stmt = raw.trim();
    if (stmt.length > 0) {
      statements.push(stmt);
    }
  }

  return statements;
}

exports.setup = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    await client.query('BEGIN');

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      const statements = splitStatements(sql);
      console.log(`Running ${statements.length} statements from ${file}...`);

      for (const stmt of statements) {
        console.log(`  > ${stmt.substring(0, 80).replace(/\n/g, ' ')}...`);
        await client.query(stmt);
      }
      console.log(`Completed: ${file}`);
    }

    await client.query('COMMIT');
    console.log('Setup completed successfully');
    res.json({ success: true, message: 'Database setup complete', migrations: files });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Setup failed:', err.message);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
};
