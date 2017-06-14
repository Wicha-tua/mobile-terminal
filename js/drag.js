(function(w){
	
		w.frag = function(node){
			//鼠标开始的位置
		var startP = {left:0, top:0};
		//元素的起始位置
		var elemP = {left:0, top:0};
		node.onmousedown = function(ev){
			//兼容性
			var ev = ev || window.event;
			//console.log(ev);
			
			//获取鼠标开始的位置
			startP.left = ev.clientX;
			startP.top = ev.clientY;
			//获取元素开始的位置
			elemP.left = node.offsetLeft;
			elemP.top = node.offsetTop;
			//全局捕获
			/*if(node.setCapture){
				node.setCapture();
			}*/
			
			node.setCapture && node.setCapture();
			document.onmousemove = function(ev){
				//兼容
				var ev = ev || window.event;
				
				//鼠标移动结束的位置
				var endP = {};
				endP.left = ev.clientX;
				endP.top = ev.clientY;
				
				//鼠标的距离差
				var nowX = 0;
				var nowY = 0;
				nowX = endP.left - startP.left;
				nowY = endP.top - startP.top;
				
				//范围的限定
				
				var left = nowX + elemP.left;
				var top = nowY + elemP.top;
				if(left < 50){
					left = 0;
				}else if(left > document.documentElement.clientWidth - node.offsetWidth - 50){
					left = document.documentElement.clientWidth - node.offsetWidth;
				}
				
				if(top < 50){
					top = 0;
				}else if(top > document.documentElement.clientHeight-node.offsetHeight - 50){
					top = document.documentElement.clientHeight-node.offsetHeight;
				}
				//元素结束的位置
				node.style.left = left +'px';
				node.style.top = top + 'px';
				
			}
			
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
				//解除全局捕获
				/*if(node.releaseCapture){
				node.releaseCapture();
			}*/
				node.releaseCapture && node.releaseCapture();
			}
			//取消系统的默认行为
			return false;
		}
		}
})(window);
