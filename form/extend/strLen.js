var strLen = (function(){
	var trim = function(chars){
		return (chars||"").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"")
	}
	
	return function(_str,_model){
		_str = trim(_str),
		_model = _model || "Ch";
		var _strLen= _str.length;
		if(_strLen == 0){
			return 0;
		}else{
			var chinese = _str.match(/[\u4e00-\u9fa5]/g);
			return _strLen + (chinese && _model == "Ch" ? chinese.length : 0);
		}
	}
})()
