/*添加新的onload事件*/
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof oldonload != 'function'){
		window.onload = func;
	}else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

/*插入到某个元素的后面*/
function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

/*cookie*/
function setCookie(key, value, day){
	var d = new Date();
	d.setDate(d.getDate() + day);
	document.cookie = key + '=' + value +';expires=' + d;
}

/*style*/
function css(ele, attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else {
		return getComputedStyle(ele, null)[attr];
	}
}

/**by FannieShi 2017-01-19
 * GitHub: https://github.com/fannieshi
 * o: 缓动对象, 必须;
 * a: 缓动属性, 字符串, 必须, 只对能通过obj[attr]或者obj.style[attr]访问的属性有效;
 * t: 目标数值, 可选, 默认值为0;
 * r: 缓动速率, 可选, 默认值为5;
 * callback: 回调函数, 参数为isEnding, 表示动画是否结束, 可选.
 */
function easeout(o, a, t, r, callback){
	if(!(o && a)){ return ;}
	if(typeof callback != 'function'){ callback = function(){} };
	t = t || 0;
	r = r || 5;
	o = o[a] != undefined ? o : o.style;
	var unit = typeof o[a] == 'string' && o[a].indexOf('px') > -1 ? 'px' : '' ;
	
	(function step(){
		var c = parseInt(o[a]);
		if(Math.abs((t - c)/r ) <= 1){
			callback(true);
			o[a] = t;
			return ;
		}
		o[a] = c + (t - c)/r + unit;
		callback(false);
		requestAnimationFrame(step);
	})();
}

//requestAnimationFrame兼容
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback){
            	window.setTimeout(callback, 1000 / 60);
            };
})();

/**
 * by FannieShi 2017-02-13
 * http://fannieshi.com/
 * 倒计时实现
 * @param o: 对象, 格式如：{day: #day, hour: #hour}, 支持天、时、分、秒、毫秒;
 * @param t: 截止时间, 格式如: 2017/02/13 19:00:00, 字符串;
 * @param open: 开关, 可选, 默认为false, 控制时间是否自动叠加到下一单位。
 * 调用示例
 * var sf = {
 *     $: function(id){
 *         return document.getElementById(id);
 *     },
 *     obj: function(){
 *         return {
 *             msec: this.$('msec'),
 *             sec: this.$('sec'),
 *             minute: this.$('minute'),
 *             hour: this.$('hour'),
 *             day: this.$('day')
 *         }
 *     },
 *     date: '2018/01/01 00:00:00'
 * }
 * new countDown(sf.obj(), sf.date, true);
 */
function countDown(o, t, open){
    //参数处理，变量声明
    if(!o || !t) return ;
    open = open || false;
    var future = new Date(t),
        now = new Date();
    var diff = future.getTime() - now.getTime(),
        c = {
            day: '0',
            hour: '0',
            minute: '0',
            sec: '0',
            msec: '00'
        };
    //时间处理
    if(diff > 0){
        c.msec = (diff % 1000) < 100 ? '0' + (diff % 1000) :  diff % 1000;
        c.sec = (diff - c.msec)/1000 % 60;
        c.minute = (diff - c.msec - c.sec * 1000)/1000/60 % 60;
        c.hour = (diff - c.msec - c.sec * 1000 - c.minute * 1000 * 60)/1000/60/60 % 24;
        c.day = (diff - c.msec - c.sec * 1000 - c.minute * 1000 * 60 - c.hour * 1000 * 60 * 60)/1000/60/60/24;
        if(open){
            c.hour += o.day ? 0 : c.day * 24;
            c.minute += o.hour ? 0 : c.hour * 60;
            c.sec += o.minute ? 0 : c.minute * 60;
            c.msec += o.sec ? '' : c.sec * 1000;
        }
        setTimeout(function () {
            new countDown(o, t, open);
        })
    }
    for(var i in o){
        if(c[i] < 10) {
            c[i] = '0' + c[i];
        }
        o[i].innerHTML = c[i];
    }
}

/**
 * by FannieShi 2017-03-05
 * http://fannieshi.com/
 * 拖拽组件
 * @param o: 触发拖拽对象
 * @param box: 被拖拽的对象
 */
function drag(o, box){
    o.addEventListener('mousedown', function (e) {
        var e = e || window.event;
        var _this = this;
        var body = document.getElementsByTagName('body')[0];
        var oWidth = body.offsetWidth > window.innerWidth ? body.offsetWidth : window.innerWidth;
        var oHeight = body.offsetHeight > window.innerHeight ? body.offsetHeight : window.innerHeight;
        var diffX = parseInt(css(box,'left')) - e.clientX;
        var diffY = parseInt(css(box,'top')) - e.clientY;

        document.addEventListener('mousemove', move, false);
        document.addEventListener('mouseup', up, false);

        function move(e) {
            var left = e.clientX + diffX;
            var top = e.clientY + diffY;
            if(left < 0){
                left = 0;
            }else if (left > oWidth - box.offsetWidth) {
                left = oWidth - box.offsetWidth;
            }

            if(top < 0) {
                top = 0;
            }else if (top > oHeight - box.offsetHeight ){
                top = oHeight - box.offsetHeight;
            }

            box.style.left = left + 'px';
            box.style.top = top + 'px';

            if (typeof _this.setCapture != 'undefined') {
                _this.setCapture();
            }
        }
        function up() {
            document.removeEventListener('mousemove', move, false);
            document.removeEventListener('mouseup', up, false);
            if (typeof _this.releaseCapture != 'undefined') {
                _this.releaseCapture();
            }
        }
    }, false)
}