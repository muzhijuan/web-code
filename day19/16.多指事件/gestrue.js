(function(window){
	window.gesture = function (node,callback){
			var flag = false;
			
			//定义初始角度
			var startD = 0;
			//线段初始值
			var startC = 0;
			
			//gesturestart手指触碰当前元素，屏幕上有两个或者两个以上的手指
			node.addEventListener('touchstart',function(event){
				var touch = event.touches;				
				if(touch.length >= 2){
					//gesturestart
					flag = true;
					
					//初始角度
					startD = getD(touch[0],touch[1]);
					//线段初始值
					startC = getC(touch[0],touch[1]);
					
					if(callback && callback['start']){
						callback['start']();
					};
				};
			});
			//gesturechange手指触碰当前元素，屏幕上有两个或者两个以上的手指位置在发生移动
			node.addEventListener('touchmove',function(event){
				var touch = event.touches;	
				if(touch.length >= 2){
					//gesturechange
					
					//结束角度
					var endD = getD(touch[0],touch[1]);
					event.rotation = endD - startD;
					//线段结束值
					var endC = getC(touch[0],touch[1]);					
					event.scale = endC/startC;
					
					if(callback && callback['change']){
						callback['change'](event);
					};
				};				
			});
			//gestureend  在gesturestart后, 屏幕上只剩下两根以下（不包括两根）的手指
			node.addEventListener('touchend',function(event){
				var touch = event.touches;	
				if(flag){
					if(touch.length < 2){
						//gestureend 
						if(callback && callback['end']){
							callback['end']();
						};
					};					
				};	
				//重置
				flag = false;
			});
									
		};

	//求度数
	window.getD = function (p1,p2){
			var x = p1.clientX - p2.clientX;
			var y = p1.clientY - p2.clientY;
			
			//tan(∠1) = b/a; === 正切
			
			var deg = Math.atan2(y,x); //弧度
			//角度 = 弧度 * 180/Math.PI
			deg = deg * 180 /Math.PI;
			
			return deg;
		};
	//线段长度	
	window.getC = function (p1,p2){
			var a = p1.clientX - p2.clientX;
			var b = p1.clientY - p2.clientY;
			var c = Math.sqrt(a*a + b*b);
			
			return c;
		};

})(window);


		
		
		
		
		