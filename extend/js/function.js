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