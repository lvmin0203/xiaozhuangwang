//创建cookie
function createCookie(key,value,expires,path){
	var cookieText = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	if(typeof expires === "number"){
		var date = new Date();
		date.setDate(date.getDate() + expires);
		cookieText += ";expires=" + date; 
	}
	if(path){
		cookieText += ";path=" + path;
	}
	document.cookie = cookieText;
}
//获取cookie
//一
//"%E5%A7%93%E5%90%8D=%E5%BC%A0%E5%BF%97%E6%9E%97; url=Michael.1000phone.com; email=zhangzhilin@1000phone.com"
/*
 * substring(start,end)
 * substr(start,length)
 * slice(start,end)
 * 
 * 
 * start: indexOf("url")  -1
 * end : indexOf(";",start)    document.cookie.length
 * 
 * 
 * "姓名"  start : 0     end 46
 * "url" start  : 48    end 73
 * "email"      :75     -1
 */
function getCookie(key){
	var keyText = encodeURIComponent(key) + "=";
	var start = document.cookie.indexOf(keyText);
	if(start != -1){
		var end = document.cookie.indexOf(";",start);
		if(end == -1){
			end = document.cookie.length;
		}
		return decodeURIComponent(document.cookie.substring(start + keyText.length,end));
	}
}
//二
//"%E5%A7%93%E5%90%8D=%E5%BC%A0%E5%BF%97%E6%9E%97; url=Michael.1000phone.com; email=zhangzhilin@1000phone.com"
//["%E5%A7%93%E5%90%8D=%E5%BC%A0%E5%BF%97%E6%9E%97; url=Michael.1000phone.com; email=zhangzhilin@1000phone.com","url=Michael.1000phone.com","email=zhangzhilin@1000phone.com"]
//[["姓名","张志林"],["url","Michael.1000phone.com"],["email","zhangzhilin@1000phone.com"]]
function gainCookie( key){
	var arr = document.cookie.split("; ");
	for(var i = 0;i < arr.length;i ++){
		var list = arr[i].split("=");
		if(list[0] == encodeURIComponent(key)){
			return decodeURIComponent(list[1]);//value
		}
	}
}
//删除cookie
function removeCookie(key,path){
	if(path){
		document.cookie = encodeURIComponent(key) + "=;expires=" + new Date(0) + ";path=" + path;
	}else{
		document.cookie = encodeURIComponent(key) + "=;expires=" + new Date(0);
	}
}
