
var router = require('express').Router();
var userLogic = require('../business_logic/logic_login.js');
var itemLogic = require('../business_logic/logic_item.js');

//登录
router.post('/login', userLogic.postLogin);

//注册
router.post('/register', userLogic.postRegister);


//添加待办事项
router.post('/addItem', itemLogic.addItem);
//向外暴露router


//待办事项---完成
router.get('/finish/:id', itemLogic.updateFinishState);

//待办事项---删除
// /delete/58e63077af408607286f4109
router.get('/delete/:id', itemLogic.deleteItem);

//待办事项---修改

router.get('/edit/:id', itemLogic.editItem);

// 待办事项---修改
router.post('/edit/:id', itemLogic.editFinishItem);

module.exports = router;