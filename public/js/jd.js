
$(function(){

  // TODO 3. 详情页商品小图标与大图标动态效果
  $('#icon_list>li>img').mouseover(function(){
    // TODO 当前小图片增加class,删除其他所有兄弟元素的class
    $(this).addClass('hoveredThumb');
    $(this).parent('li').siblings('li').children('img').removeClass('hoveredThumb');
    // TODO 切换大图片
    var path = 'images\\';
    var type = '.jpg';
    var srcS = $(this).attr('src');// TODO images\g1.jpg
    // TODO
    var imgName = srcS.substring(path.length);
    var img = imgName.substring(0,imgName.length-type.length);
    var srcM = path+img+'-m'+type;// TODO images\g1-m.jpg

    $('#mediumImg').attr('src',srcM);
  }).mouseout(function(){
    // TODO 当前小图片删除class
    $(this).removeClass('hoveredThumb');
  });

  // TODO 产品描述小图片的轮播效果
  var countLeft = 0;
  $('#preview>h1>a:first').click(function(){
    var width = $('#icon_list>li').width();
    var left = parseInt($('#icon_list').css('left'));
    countLeft++;
    $('#icon_list').animate({
      left : left + width
    });
    if(countLeft == 3){
      $('#preview>h1>a:first').attr('class','backward_disabled');
      $('#preview>h1>a:last').attr('class','forward');
    }
  });

  $('#preview>h1>a:last').attr('class','forward');
  var count = 0;// TODO 计数器
  $('#preview>h1>a:last').click(function(){
    var width = $('#icon_list>li').width();
    count++;
    $('#icon_list').animate({
      left : -(width * count)
    });
    if(count == 1){
      $('#preview>h1>a:first').attr('class','backward');
    }else if(count == 3){
      $('#preview>h1>a:last').attr('class','forward_disabled');
    }
  });

    //TODO 商品介绍等页签的切换效果
    $('#product_detail>ul>li').click(function(){
        $(this).addClass('current').siblings('li').removeClass();

        var $div = $('#product_detail').children('div:not(:first)');
        // TODO 获取当前操作的li是第几个或索引值是几
        var num = $.inArray(this,$('#product_detail>ul>li'));
        // TODO 根据值在五个div里，找到对应的div元素
        var div = $div.get(num);
        $(div).show().siblings('div:not(:first)').hide();
    })


    // TODO 详情页商品大图标的放大镜效果
    $('#maskTop').mouseover(function(event){
        // TODO 显示小黄块
        var left = event.offsetX - parseInt($('#mask').width())/2;
        var top = event.offsetY - parseInt($('#mask').height())/2;
        // TODO 最小边界判断
        if(left < 0){
            left = 0;
        }
        if(top < 0){
            top = 0;
        }
        var max = parseInt($('#maskTop').width()) - parseInt($('#mask').width());
        if(left > max){
            left = max;
        }
        if(top > max){
            top = max;
        }
        $('#mask').css('display','inline').css({
            left : left,
            top : top
        });

        var p1 = left/parseInt($('#maskTop').width());
        var p2 = top/parseInt($('#maskTop').height());

        $('#largeImgContainer').css('display','inline');
        // TODO 加载放大镜图片
        var srcM = $('#mediumImg').attr('src');// TODO images/products/product-s1-m.jpg
        /*var path = srcM.substring(0,srcM.length-type.length);
        var srcL = path + '-l.jpg'// TODO images/products/product-s1-l.jpg*/

        var srcL = srcM.replace('-m.jpg','-l.jpg');

        $('#largeImg').attr('src',srcL);

        $('#largeImg').bind('load',function(){
            $('#loading').remove();
            $(this).show()

            $(this).css({
                left : -(parseInt($('#largeImg').width()) * p1),
                top : -(parseInt($('#largeImg').height()) * p2)
            });
        })

    }).mousemove(function(event){
        var left = event.offsetX - parseInt($('#mask').width())/2;
        var top = event.offsetY - parseInt($('#mask').height())/2;
        if(left < 0){
            left = 0;
        }
        if(top < 0){
            top = 0;
        }
        var max = parseInt($('#maskTop').width()) - parseInt($('#mask').width());
        if(left > max){
            left = max;
        }
        if(top > max){
            top = max;
        }
        $('#mask').css({
            left : left,
            top : top
        });

        var p1 = left/parseInt($('#maskTop').width());
        var p2 = top/parseInt($('#maskTop').height());

        $('#largeImg').css({
            left : -(parseInt($('#largeImg').width()) * p1),
            top : -(parseInt($('#largeImg').height()) * p2)
        });
    }).mouseout(function(){
        $('#mask').css('display','none');
        $('#largeImgContainer').css('display','none');
    });
});

