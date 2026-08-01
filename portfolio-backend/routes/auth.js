const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const { loginSchema } = require('../utils/validators');

router.post('/login', validate(loginSchema), authCtrl.login);
router.get('/verify', auth, authCtrl.verify);

module.exports = router;
