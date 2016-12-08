$(function(){
	var html = document.querySelector('html');
	var rem = html.offsetWidth / 7.5;
	      if(html.offsetWidth>750){
		rem = 750 / 7.5;
	}
	html.style.fontSize = rem + "px";
});
