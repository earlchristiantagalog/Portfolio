const jwt = require('jsonwebtoken');
const { verifyToken } = require('@clerk/backend');

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = header.split(' ')[1];

  // Try Clerk token first
  if (process.env.CLERK_SECRET_KEY && process.env.CLERK_SECRET_KEY !== 'your-clerk-secret-key-here') {
    try {
      const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
      req.user = { userId: payload.sub, username: payload.sub };
      return next();
    } catch {
      // Not a valid Clerk token — fall through to local JWT
    }
  }

  // Fallback: local JWT
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
