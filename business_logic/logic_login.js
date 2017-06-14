var db = require('../dao/db.js');


/*----------------  登录  -----------------------------------*/
function postLogin(req, res, next){
    //输入
    var userName = req.body.userName;
    var password = req.body.password;

    // 处理
    db.findUser(userName, function (err, doc) {
        if(err){
            console.log(err);
        }else{
            if(doc){
              if(password === doc.password){
                //res.send('登录成功');
                                                                                          //重定向页面
                //res.redirect('/item_list.html');

                var userId = doc._id;
                var userName = doc.userName;

                global.userId = userId;
                global.userName = userName;
                //渲染页面

                indexPage(userId, res);


              }else{
                res.send('用户名或密码错误');
              }
            }else{
                res.send('请去注册');
            }

        }

    });


}


exports.postLogin = postLogin;


/*-----------------  注册  ------------------------------------------*/

function postRegister(req, res, next) {

    //输入
  var userName = req.body.userName;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;
  var email = req.body.email;


   // 处理
  db.findUser(userName, function (err, doc) {
      if(err){
          console.log(err);
      }else{
          if(doc){
              res.send('用户名已被占用，请更换用户名');
          }else{
              db.addUser(userName, password, email, function (err, doc) {
                  if(err){
                      console.error(err);
                      res.send('注册失败，请稍候重试');
                  }else{
                      //res.send('注册成功');
                    res.render('login.ejs', {});
                  }
              });
          }
      }
  })

}

exports.postRegister = postRegister;

/*---------------------- 待办事项  ----------------------------------------------*/

function indexPage(userId, res) {
  db.findItems(userId, function (err, docs) {
    if(err){
      res.send('出错了');
    }else{
      //res.send(docs);

            var dataObj = {
              items: docs,
              userName: userName
            };
            res.render('index.ejs', dataObj);
          }
  });
}

exports.indexPage = indexPage;