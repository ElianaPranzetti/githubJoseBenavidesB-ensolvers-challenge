const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fielValidator');

const router = Router();

router.post('/',[
    check('email', 'Check the input email').isEmail(),
    check('password', 'Password is necessary').not().isEmpty(),
    fieldValidator
], login);


module.exports = router;