const router = require('express').Router();
const memberController = require('../controllers/memberController');
const auth = require('../middleware/auth');

router.post('/register', memberController.register);
router.post('/login', memberController.login);
router.get('/logout', memberController.logout);
router.get('/refresh_token', memberController.refreshToken);
router.get('/information', memberController.getMember);

module.exports = router;
