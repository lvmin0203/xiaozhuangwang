$(function() {
	$(".proSortFir").mouseenter(function() {
		$(".allproducts-type-nav").css("display", "block");
	}).mouseleave(function() {
		$(".allproducts-type-nav").css("display", "none");
	})
	$(".typeNavLeft").mouseover(function(e) {
		//myfn();
		//e.stopPropagation();
		$(this).css("background", "#f9f9f9")
		$(this).find("h4 span").css("background-position-y", "-100px")
		$(this).find(".allproducts-subtype").css("display", "block").stop().animate({ "left": 200 }, 300);
	}).mouseout(function() {
		$(this).css("background", "#fff")
		$(this).find("h4 span").css("background-position-y", "-60px")
		$(this).find(".allproducts-subtype").css("display", "none").stop().animate({ "left": 190 }, 300);
	})

	//center

	function rand() {
		let randStr = "";
		for(let i = 0; i < 4; i++) {
			let bity = String.fromCharCode(Math.floor(Math.random() * 74 + 1) + 48);
			if(bity.charCodeAt(0) >= 48 && bity.charCodeAt(0) <= 57 || bity.charCodeAt(0) >= 97 && bity.charCodeAt(0) <= 122 || bity.charCodeAt(0) >= 65 && bity.charCodeAt(0) <= 90) {
				randStr += bity;
			} else {
				i--;
			}
		}
		return randStr;
	}
	function form(){
		
		$(".dl_denglu input").click(function(){
			var $user = $(".land_input .input_name");
			var $pass = $(".land_input2 .inputstyle");
		
			var coo = gainCookie("cookies");
			var coos = JSON.parse(coo);
			//console.log(typeof(coo));//字符串
			//console.log(coo.username);//undefined
			if($user.val() == coos.username && $pass.val() == coos.password){
				alert("登录成功!");
				window.location.href = "../index.html";
				
			}else{
				$("#login_error").css("display","block");
				$user.val('');
				$pass.val('');
			}
		})
	}
	form();
})