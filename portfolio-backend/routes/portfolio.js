const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/portfolioController');
const validate = require('../middleware/validation');
const { messageSchema } = require('../utils/validators');

router.get('/portfolio', ctrl.getPortfolio);
router.post('/messages', validate(messageSchema), ctrl.submitMessage);

module.exports = router;
