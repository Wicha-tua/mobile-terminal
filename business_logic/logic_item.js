

var db = require('../dao/db.js');


var userlogic = require('./logic_login.js');

var userLogic = require('./logic_login');
function addItem(req, res, next) {
   //输入
    var title = req.body.title;

    //处理
  var userID = global.userId;
   db.addItem(title, userID, function (err, doc) {
       if(err){
         res.send('添加失败');
       }else{
         //res.send('添加成功');
         userlogic.indexPage(userId, res);
       }
   });


}


exports.addItem = addItem;

/*------------------------------  待办事项-完成  -----------------------------------------------*/

function updateFinishState(req, res, next) {
    var itemId = req.params.id;
    var state = req.query.state;
    state = ('yes' == state)? 2 : 1;
    db.updateFinishState(itemId, state, function (err, doc) {
        if(err){
          res.send('网络出错，请稍后重试');
        }else{
          //res.send('修改成功');
          userId = doc.userID;
          userlogic.indexPage(userId, res);
        }
    });
}


exports.updateFinishState = updateFinishState;


/*-------------------  待办事项---删除  --------------------------------------------*/

function deleteItem(req, res, next) {
    var itemId = req.params.id;
    db.deleteItem(itemId, function (err, doc) {
        if(err){
          res.send('网络出错，删除失败');
        }else{
         // res.send('删除成功');
          userId = doc.userID;
          userlogic.indexPage(userId, res);
        }
    });
}

exports.deleteItem = deleteItem;


/*-------------------------  待办事项---修改  -----------------------------------------*/

function editItem(req, res, next) {
    var itemId = req.params.id;
    db.editItem(itemId, function (err, doc) {
        if(err){
          res.send('网络出错，请稍候重试');
        }else{
          var userName = global.userName;
          res.render('edit.ejs', {title: doc.title, userName: userName, itemId: itemId});
        }
    });
}

exports.editItem = editItem;

function editFinishItem(req, res, next) {
    var itemID = req.params.id;
    var title = req.body.title;
    db.editFinishItem(itemID, title, function (err, doc) {
        if(err){
          res.send('修改失败');
        }else{
          //res.send('修改成功');
          userId = doc.userID;
          userlogic.indexPage(userId, res);
        }
    });

}

exports.editFinishItem = editFinishItem;