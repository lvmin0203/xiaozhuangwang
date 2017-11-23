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
function mirror(){
	//获取小小图的下标
	$(".smallImg_s .smallCenter img").mouseenter(function(){
		var index = $(this).index();
		$(this).css("border-color","red");
		$(".smallImg img").eq(index).show().siblings().hide();
		$(".bigImg img").eq(index).show().siblings().hide();
	}).mouseleave(function(){
		$(this).css("border-color","rgb(232, 232, 232)");
	})
	//小图
	$(".smallImg").mouseover(function(){
		
		$(".mask").show();
		$(".bigImg").show();
		//$(".bigImg img").eq(ind).show().siblings().hide();
	}).mouseleave(function(){
		$(".mask").hide();
		$(".bigImg").hide();
		//$(".bigImg img").eq(ind).show().siblings().hide();
	})
	//鼠标跟随事件
	$(".smallImg").mousemove(function(e){
		var e = e || event;
		var x = e.pageX - $(".mask").width()/2 - $(".smallImg").offset().left;
		var y = e.pageY - $(".mask").height()/2 - $(".smallImg").offset().top;
		var maxL = $(".smallImg").width() - $(".mask").width();
		var maxT = $(".smallImg").height() - $(".mask").height();
		
		x = Math.min( maxL, Math.max(0,x));
		y = Math.min(maxT,Math.max(0,y));
		$(".mask").css({
			"left":x,
			"top":y
		})
		
		//大图移动
		var bigImgx = x * $(".dtp").width()/$(".smallImg").width();
		var bigImgy = y * $(".dtp").height()/$(".smallImg").height();
		
		$(".dtp").css({
			"left":-bigImgx,
			"top":-bigImgy
		})
	})
}
mirror();
//加减商品
function add(){
	var index = 1;
	$(".sub_num").click(function(){
		$(".show_num input").val(index--);
		if(index <= 1){
			index=1;
		}
	})
	$(".add_num").click(function(){
		
		if($(".show_num input").val() < 10){
			$(".show_num input").val(++index);
		}
	})

	
}
add();
//吸顶
function ding(){
	var tit = $(".fixed_title").offset().top;
	$(window).scroll(function(){
		var gun = $(document).scrollTop();
		if(gun > tit){
			$(".fixed_title").css({"position":"fixed","top":0});
		}else{
			$(".fixed_title").css({"position":"static"});
			
		}
	})
}
 ding()
//foot-head
	function foot() {
		$(".foot-head a").mouseover(function() {
			$(this).stop().animate({ 'background-position-y': -60 }, 150);
		}).mouseout(function() {
			$(this).stop().animate({ 'background-position-y': 0 }, 150);
		})
	}
	foot();

})