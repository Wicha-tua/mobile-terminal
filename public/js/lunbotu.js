$(function () {
  var i = 0;
  var iTimer = null;
  var Lis = $('.outer ul').find('li');
  var Spans = $('.outer p').find('span');

  //给所有的span添加点击操作
  Spans.click(function () {

    i = $(this).index();
    //console.log(i);
    fadeFn();

  });
  /* //点击prev，图片显示上一张；
   $('.prev').click(function () {
   if (i > 0) {
   i--;
   fadeFn();
   }
   });

   //点击next,图片显示 下一张；
   $('.next').click(function () {
   //console.log(i);
   if (i < aLi.size() - 1) {
   i++;
   fadeFn();
   }
   });
   */
  //找到所有的li，清空所有li的class;给第一个li添加cur,并且改变li的透明度；给它的下一个li添加class；
  function fadeFn() {
    Lis.removeClass().hide();
    Lis.eq(i).addClass('cur').fadeIn('slow');
    Spans.removeClass();
    Spans.eq(i).addClass('active');
  }

  function autoPlay() {
    i++;
    i %= Lis.size();
    fadeFn();
  }

  iTimer = setInterval(autoPlay, 2000);

  //鼠标移入停止定时器，鼠标移开启动定时器；
  $('.outer').mouseover(function () {
    clearInterval(iTimer);
    $('.prev').show();
    $('.next').show();
  });

  $('.outer').mouseout(function () {
    clearInterval(iTimer); //先停止，再开启；
    iTimer = setInterval(autoPlay, 3000);
    $('.prev').hide();
    $('.next').hide();
  });
});
