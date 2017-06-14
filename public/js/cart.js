angular.module('myApp', []).controller('myCtrl', function ($scope) {
    $scope.carts = [
        {
          src: './images/p1.jpg',
          name: '隔离BB霜组合',
          count: 1,
          price: 159
        },
        {
          src: './images/p2.jpg',
          name: '水感保湿三件套',
          count: 1,
          price: 232
        },
        {
          src: './images/p3.jpg',
          name: '保湿补水六件套',
          count: 2,
          price: 437
        }
  ];
    //总购买价
    $scope.getTotalPrice = function () {
        var totalPrice = 0;
        $scope.carts.forEach(function (cart, index) {
          totalPrice += cart.count * cart.price;
        });
      return totalPrice;
    };
   //总购买数量
    $scope.getTotalCount = function () {
      var totalCount = 0;
      $scope.carts.forEach(function (cart, index) {
        totalCount += cart.count ;
      });
      return  totalCount;
    };
    //清除购物车
  $scope.empty = function () {
    if(confirm('你确定要删除吗？')){
      $scope.carts = '';
    }
  };
  //定义移出产品的方法
  $scope.remove = function (index) {
      if(confirm('你确认删除' + $scope.carts[index].name + '吗？')){
        $scope.carts.splice(index, 1);
      }
  };
    // 点击 + - 改变数量的函数
  $scope.changeCount = function (index, isAdd) {
      var cart = $scope.carts[index];
      if(isAdd){
        cart.count++;
      }else{
        //判断count是否小于1
        if(cart.count == 1){
          $scope.remove(index);
          return;
        }
        cart.count--;
      }
  };
    //监视cart数据变化
  $scope.$watch('carts', function (newValue, oldValue) {
      //判断数据是否变化
    if(newValue !== oldValue){
      //数据发生变化
      newValue.forEach(function (cart, index) {
        //判断用户输入的是不是空格
        if(cart.count == ''){
            return
          }
          //非数字，小于等于0
        if(isNaN(cart.count * 1) || cart.count <= 0){
            cart.count = oldValue[index].count;
        }
      });
      //输入的空格
    }
  }, true);//深度监视
  //全部购买
  $scope.bothBuy = function () {
    if(confirm('你确定要付款吗？')){
      document.write('订单已付款，请关注物流信息');
    }
  }
});
