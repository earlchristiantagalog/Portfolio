const express = require('express');
const router = express.Router();
const setupCtrl = require('../controllers/setupController');

router.post('/', setupCtrl.setup);

module.exports = router;
