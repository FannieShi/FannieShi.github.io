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

/**
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

