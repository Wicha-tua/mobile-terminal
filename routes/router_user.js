
var router = require('express').Router();
var userLogic = require('../business_logic/logic_login.js');

//登录
router.post('/login', userLogic.postLogin);

//注册
router.post('/register', userLogic.postRegister);

module.exports = router;