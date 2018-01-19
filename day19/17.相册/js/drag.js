(function(w){
	
	w.dragNav = function (navsWrap,callback){
		//var navsWrap = document.getElementById('wrap');
		//var navsList = document.getElementById('content');
		//父元素中的第一个子元素（剔除掉文本节点）
		var navsList = navsWrap.children[0];
		
		//定义元素和手指初始位置
		var eleY = 0;
		var startY = 0;
		
		//加速
		//起始时间
		var startTime = 0;
		//起始位置
		var startDis = 0;
		//结束时间
		var endTime = 0;
		//结束位置
		var endDis = 0;
		//时间差
		var timeValue = 1;
		//距离差
		var disValue = 0;
		
		var Tween = {
			//正常 --- 加速
			Linear: function(t,b,c,d){ return c*t/d + b; },
			//回弹
			easeOut: function(t,b,c,d,s){
	            if (s == undefined) s = 1.70158;
	            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	        }
			
		};
		
		//var timer = null;
		
		
		navsWrap.addEventListener('touchstart',function(event){
			var touch = event.changedTouches[0];
									
			//清除定时器
			clearInterval(navsWrap.timer);
			
			//清除过渡
			navsList.style.transition = 'none';
			
			//元素初始位置
			eleY = transformCss(navsList,'translateY');
			//手指初始位置
			startY = touch.clientY;
			
			//起始时间   === 毫秒
			startTime = new Date().getTime();				
			//起始位置
			startDis = eleY;
			
			//清除速度 == 清除disValue
			disValue = 0;
			
			if(callback && callback['start']){
				callback['start']();
			};
			
			
		});
		navsWrap.addEventListener('touchmove',function(event){
			var touch = event.changedTouches[0];
			//手指结束位置
			var endY = touch.clientY;
			//手指距离差
			var disY = endY - startY;
			
			//范围限定
			//橡皮筋 === 拖
			
			var left = disY+eleY;
			
			
			if(left > 0){
				//越来越难拖
				//left 逐渐增加 ， 但是 增加的幅度在减小
				//比例 ： 逐渐减小      = 系数 - 留白区域/屏宽
				var scale = 1 - left/navsWrap.clientHeight;
				left = left * scale;					
//					console.log(scale);
//				console.log(left);
				
			}else if(left < navsWrap.clientHeight-navsList.offsetHeight){
				//越来越难拖
				//留白区间  逐渐增加 ， 但是 增加的幅度在减小
									
				//留白 = left - 临界值
				var over = Math.abs(left) - Math.abs(navsWrap.clientHeight-navsList.offsetHeight);
				//比例 ： 逐渐减小  = 系数 - 留白区域/屏宽
				var scale = 1 - over/navsWrap.clientHeight;
				//left = 临界值 + over* scale
				left = (navsWrap.clientHeight-navsList.offsetHeight) - over*scale;
			};
			
			//确定元素位置
			transformCss(navsList,'translateY',left);
			
			//结束时间
			endTime = new Date().getTime();
			//结束位置
			endDis = left;
			
			//时间差
			timeValue = endTime - startTime;
			//距离差
			disValue = endDis - startDis;
			
			
			if(callback && callback['move']){
				callback['move']();
			};
			
		});
		//加速
		navsWrap.addEventListener('touchend',function(){
			
			//速度
			var speed = disValue/timeValue;
			//console.log(speed);
	
			//target = touchmove产生的位移值 + 速度产生的位移值
			var target = transformCss(navsList,'translateY') + speed*100;
			
//			console.log(transformCss(navsList,'translateY'));
			
//			console.log(target);
			
			//回弹
		
			var type = 'Linear';
			if(target > 0){
				target = 0;
				type = 'easeOut';
			}else if(target < navsWrap.clientHeight-navsList.offsetHeight){
				//target = document.documentElement.clientHeight-navsList.offsetHeight;
				target = navsWrap.clientHeight - navsList.offsetHeight
				type = 'easeOut';
			};
			
			//确定元素位置
			var time = 1;
			tweenMove(target,time,type);
			
			if(callback && callback['over']){
				callback['over']();
			};
			
		});
		function tweenMove(target,time,type){
			//t : 当前次数
			var t = 0;
			//b : 初始位置
			var b = transformCss(navsList,'translateY');
//			console.log(b)
			//c : 结束位置与初始位置的差值
			var c = target -b ;
//			console.log(c)
			//d : 总次数
			var d = time/0.02;
			
			navsWrap.timer = setInterval(function(){
				t++;
				
				if(t > d){
					//清除定时器
					clearInterval(navsWrap.timer);
					if(callback && callback['end']){
						callback['end']();
					};
					
				}else{
					//元素位置填上去
					//Tween.Linear(i+1,b,c,d)
					var point = Tween[type](t,b,c,d);
//					console.log(point);
					transformCss(navsList,'translateY',point);
					if(callback && callback['move']){
						callback['move']();
					};
				}
								
			},20);
			
		}
		
	};
		
	
})(window);

	