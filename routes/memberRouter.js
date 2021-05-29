const router = require('express').Router();
const memberController = require('../controllers/memberController');

router.post('/register', memberController.register);
router.post('/login', memberController.register);
router.get('/refresh_token', memberController.refreshToken);

module.exports = router;
