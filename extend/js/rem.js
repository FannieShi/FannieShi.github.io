//手机适应尺寸
/*设置REM*/
var html = document.querySelector('html');
var rem = html.offsetWidth <= 750 ? html.offsetWidth / 7.5 : 100;
html.style.fontSize = rem + "px";

/*屏幕者宽度改变时，重载*/
var beforeWidth = screen.availWidth;
window.resize = function(){
	var currentWidth = screen.availWidth;
	if((currentWidth - beforeWidth) != 0 ) {
		location.reload();
	}
	beforeWidth = screen.availWidth;
}