const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { rows } = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    const user = rows[0];

    if (!user || user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.json({ data: { token, username: user.username } });
  } catch (err) {
    next(err);
  }
};

exports.verify = async (req, res) => {
  res.json({ data: { userId: req.user.userId, username: req.user.username } });
};
