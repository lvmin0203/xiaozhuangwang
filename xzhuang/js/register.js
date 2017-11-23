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

	//foot-head
	function foot() {
		$(".foot-head a").mouseover(function() {
			$(this).stop().animate({ 'background-position-y': -60 }, 150);
		}).mouseout(function() {
			$(this).stop().animate({ 'background-position-y': 0 }, 150);
		})
	}
	foot();

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

	function form() {
		var yzmStr;
		var phoneyzm;

		yzmStr = rand();
		phoneyzm = rand();
		//获得验证码
		$(".form p:nth-of-type(2) input").focus(function(event){
			//yzmStr = rand();
			$yzmSpan = $(".form p:nth-of-type(2) span").text(yzmStr);
		});
		//获得手机验证码
		$(".form p:nth-of-type(3) button").click(function(event){
			// phoneyzm = rand();
			// alert(phoneyzm)
			alert("手机验证码是: " + phoneyzm.toLowerCase());
		});

		$phone = $(".form input").eq(0);
		$yzm = $(".form input").eq(1);
		$phoneyzm = $(".form input").eq(2);
		$password1 = $(".form input").eq(3);
		$password2 = $(".form input").eq(4);
		$agree = $(".form input").eq(5);
		var phone = false;
		var yzm = false;
		var phyzm = false;
		var pass1 = false;
		var pass2 = false;
		//聚焦value都为空
		$phone.focus(function(event) {
			$phone.val('');
		});
		$yzm.focus(function(event) {
			$yzm.val('');
		});
		
		$phoneyzm.focus(function(event) {
			$phoneyzm.val('');
		});
		$phone.blur(function(event) {
			var res = /^[1][3,5,7,8][0-9][0-9]{8}$/;
			if(res.test($phone.val())) {
				phone = true;
				$(this).siblings('strong').css('display', 'none');
			} else {
				phone = false;
				$(this).parent('p').children('strong').css('display', 'block');
			}
			
		});
		
		$yzm.blur(function(event) {
			if(yzmStr.toLowerCase() == $yzm.val().toLowerCase()) {
				yzm = true;
				$(this).siblings('strong').css('display', 'none');
			} else {
				yzm = false;
				$(this).siblings('strong').css('display', 'block');
			}

		});

		$phoneyzm.blur(function(event) {
			//alert( phoneyzm )
			if(phoneyzm.toLowerCase() == $phoneyzm.val().toLowerCase()) {
				phyzm = true;
				$(this).siblings('strong').css('display', 'none');
			} else {
				phyzm = false;
				$(this).siblings('strong').css('display', 'block');
			}

		});

		$password1.blur(function(event) {
			let regular = /^[0-9a-zA-Z\_]{6,16}$/;
			if(regular.test($password1.val())) {
				pass1 = true;
				$(this).siblings('strong').css('display', 'none');
			} else {
				pass1 = false;
				$(this).siblings('strong').css('display', 'block');
			}

		});
		$password2.blur(function(event) {
			if($password1.val() == $password2.val()) {
				pass2 = true;
				$(this).siblings('strong').css('display', 'none');
			} else {
				pass2 = false;
				$(this).siblings('strong').css('display', 'block');
			}

		});
		$(".sub").click(function(event){	
			
			if($(".form p:nth-last-of-type(1) input").is(":checked") && phone && yzm && phyzm && pass1 && pass2){
				alert("注册成功！");
				window.location.href = "../html/login.html";
				
				//存cookie
				var json = {
					"username" : $phone.val(),
					"password" : $password1.val()
				}
				var jsonStr = JSON.stringify(json);
				console.log(jsonStr);
				//{"username":"17866626473","password":"123456"}
				var createCookies =  createCookie("cookies",jsonStr,7);
				//location.href="login.html";
			}else{
				$phone.val('');
				$yzm.val('');
				$phoneyzm.val('');
				$password1.val('');
				$password2.val('');
			}
		})
		
	}
	form();
})