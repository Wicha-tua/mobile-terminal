
// 引入 mongoose 模块
var mongoose = require('mongoose');
//发起连接
mongoose.connect('mongodb://localhost:27017/todo'); //todo数据库的名字

var connection = mongoose.connection;
connection.on('error', function(err){
    console.error(err);
});
connection.on('open', function() {
    // we're connected!
    console.log('we are connected!');
});


//1. schema     2. model    3. entity

var UserSchema = new mongoose.Schema({
    userName:String,
    password:String,
    email:String
});

var UserModel = mongoose.model('user', UserSchema);

//创建 数据
var wukong = {
    userName:'wukong',
    password:'123456',
    email:'wukong@atguigu.com'
};

/*

UserModel.create(wukong, function (err) {
    console.log(err);
});
*/


/*----------------------- 登录  ---------------------*/
function findUser(userName, cb) {
  UserModel.findOne({userName: userName}, function (err, doc) {
      if(err){
        //console.error(err);
        cb(err);
      }else{
        //console.log(doc);
        cb(null, doc);
      }
  })
}

exports.findUser = findUser;



/*-----------------------  注册  ---------------------------*/

function addUser(userName, password, email, cb) {
    var userEntity = new UserModel({

      userName: userName,
      password: password,
      email: email
    });

  userEntity.save(function (err, doc) {
      if(err){
        //console.log(err);
        cb(err);
      }else{
        cb(null, doc);
      }
  });


}

exports.addUser = addUser;


/*-------------------------- item --------------------------------------------------*/

var ItemSchema = new mongoose.Schema({
      userID: String,     //关联某个用户
      title: String,
      post_date: {type: Date},
      finish_state: {type: Number, default: 1} //1.未完成  2.已经完成
});

var ItemModel = mongoose.model('item', ItemSchema);

function addItem(title, userID, cb) {
    var itemEntity = new ItemModel({
      userID: userID,     //关联某个用户
      title: title,
      post_date: new Date()
    });
  itemEntity.save(function (err, doc) {
      if(err){
        cb(err);
      }else{
        cb(null, doc);
      }
  });

}

exports.addItem = addItem;


function findItems(userId, cb) {
    ItemModel.find({userID: userId}, function (err, docs) {
        if(err){
          cb(err);
        }else{
          //docs  数组
          cb(null, docs);
        }
    });
}

exports.findItems = findItems;

/*---------------- 待办事项-完成  -----------------------------------------------*/

function updateFinishState(itemId, state, cb) {
  ItemModel.findById(itemId,function (err, doc) {
      if(err){
        cb(err);
      }else{
        doc.finish_state = state;
        doc.save(function (err, doc) {
            if(err){
              cb(err);
            }else{
              cb(null, doc);
            }
        });

      }
  })
}

exports.updateFinishState = updateFinishState;


/*--------------------  待办事项---删除  --------------------------------------*/

function deleteItem(itemId, cb) {
  ItemModel.findById(itemId, function (err, doc) {
      if(err){
        cb(err);
      }else{
        doc.remove(function (err, doc) {
            if(err){
              cb(err);
            }else{
              cb(null, doc);
            }
        })
      }
  })
}

exports.deleteItem = deleteItem;

/*-------------------  待办事项---修改  ----------------------------------------------*/

function editItem(itemId, cb) {
  ItemModel.findById(itemId, function (err, doc) {
      if(err){
        cb(err);
      }else{
        cb(null, doc);
      }
  })
}

exports.editItem = editItem;

function editFinishItem(itemID, title, cb) {
  ItemModel.findById(itemID, function (err, doc) {
     if(err){
       cb(err);
     }else{
       doc.title = title;
       doc.save(function (err, doc) {
           if(err){
             cb(err);
           }else{
             cb(null, doc);
           }
       })
     }
  });
}

exports.editFinishItem = editFinishItem;