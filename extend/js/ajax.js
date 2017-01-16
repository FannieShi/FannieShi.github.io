function getHTTPObject(){
	if(typeof XMLHttpRequest == 'undefined'){
		XMLHttpRequest = function(){
			try{ 
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP")
			}catch(e){}
			return false;
		}
	}
	return new XMLHttpRequest();
}

function Ajax(type, url, async){
	var request = getHTTPObject();
	if(request){
		request.open(type, url, async);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//Do something...
			}
		}
		request.send(null);
	}else {
		alert('Sorry, your browser doesn\'t support XMLHttpRequest');
	}
}
