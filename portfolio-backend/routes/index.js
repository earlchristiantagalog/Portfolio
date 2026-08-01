const express = require('express');
const router = express.Router();
const portfolioRoutes = require('./portfolio');
const adminRoutes = require('./admin');
const authRoutes = require('./auth');
const auth = require('../middleware/auth');

router.use('/', portfolioRoutes);
router.use('/auth', authRoutes);
router.use('/admin', auth, adminRoutes);

module.exports = router;
