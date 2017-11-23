$(function() {
	function myfn(e) {
		window.event ? window.event.cancelBubble = true : e.stopPropagation();

	}
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
	$("#notice-list").mouseenter(function(){
		$(this).css({"cursor":"pointer","color":"red"});
	}).mouseleave(function(){
		$(this).css({"color":"#666"});
	})
	
	//banner部分
	var timer = null;
	var index = 0;
	/*$.getJSON("../json/banner.json",data,function(data){
		console.log(data);
	})*/
	function ban(){
		var data;
		var deffered = $.ajax({
			url: "./json/banner.json",
			type: "get"
		});
		deffered.done(function(res) {
			data = res;
			//console.log(data);
			init(data);
		})
		
		//console.log(this);
		function init(data) {
			interval();
			for(var i = 0; i < data.length; i++) {
				var banImg = '<h3><img src="' + data[i].url + '" alt="" style="opacity:0"></h3>';
				var banA = '<a href="javascript:;"></a>';
				$("#banner").append(banImg);
				$("#banner p").append(banA);
			}
			$("#banner img").eq(0).css("opacity", 1);
			$("#banner p a").eq(0).css("background", "pink");

			$("#banner").mouseenter(function() {
				$(this).find("span").stop().animate({ "opacity": 0.7, "z-index": 10 }, 1000);
			}).mouseleave(function() {
				$(this).find("span").stop().animate({ "opacity": 0, "z-index": 10 }, 1000);
			})
			$(".leftBtn").mouseenter(function(){
				$(this).css({"cursor":"pointer"});
			})
			$(".rightBtn").mouseenter(function(){
				$(this).css({"cursor":"pointer"});
			})
			$(".leftBtn").click(function() {
				
				clearInterval(timer);
				index--;
				re(index);
				sport(index);
				interval();
			});
			$(".rightBtn").click(function() {
				clearInterval(timer);
				index++;
				re(index);
				sport(index);
				interval();
			});

			$("#banner p a").click(function() {
				clearInterval(timer);
				index = $(this).index();
				re(index);
				sport(index);
				interval();
			});
			$("#banner img").mouseover(function(){
				clearInterval(timer);
			}).mouseout(function(){
				interval();
			})
		 function re(iIndex) {
			for(var i = 0; i < data.length; i++) {
				if(i != iIndex % data.length) {
					$("#banner img").eq(i).css({
						opacity: 0
					});
					$("#banner a").eq(i).css({
						background: '#666'
					});
				}
			}
		}
		 function sport(iIndex) {
			$("#banner img").eq(iIndex % data.length).css({
				opacity: 1
			});
			$("#banner a").eq(iIndex % data.length).css({
				background: 'pink'
			});
		}
		function interval() {
			
			timer = setInterval(function() {
				index++;
				re(index);
				sport(index);
			}, 2000);
		}
	}
}
	ban();
	//product部分
	//超级特卖
	function products(){
		let data;
		var deffered = $.ajax({
			url: "./json/superSale.json",
			type: "get"
		});
		var that = this;
		deffered.done(function(res){
		  	data = res;
			//console.log(data[0].url);
			init(data);
		});
		function init(data){
			for(var i = 0;i < data.length;i ++){
				var oLi = `<li>
							<div class="sale_img">
								<a href="html/detail.html" class="sale_imgs">
									<img src="${data[i].url}" alt="" />
								</a>
								<div class="time">
									<p active-date-val="2017/11/30 00:00">仅剩：<b></b>天<b></b>时<b></b>分<b></b>秒</p>
								</div>
							</div>
							<h4>
								<a href="javascript:;">${data[i].introduce}</a>
							</h4>
							<div class="sale_price">
								<span class="priced"><dfn>¥</dfn>${data[i].price}</span>
								<del class="price"><dfn>¥</dfn>${data[i].oldPrice}</del>
								<a href="html/detail.html" class="sale_buys">立即抢购</a>
							</div>
						</li>`;
				$(".super-sale .superList").append(oLi);		
			}
			$(".superList h4 a").mouseenter(function(){
				$(this).css("color","#E73A77");
			}).mouseleave(function(){
				$(this).css("color","#666");
			})
		}
		function time(){
			var timer = null;
			timer = setInterval(function(){
				//获得结束日期的毫秒数
				var dateEnd = new Date($(".time p").attr("active-date-val")).getTime();

				//console.log(dateEnd);
				//获得今天的毫秒数
				var nowDate = new Date().getTime();
				//console.log(nowDate);
				//获得p标签下的b标签
				$(".superList li").each(function(){
					var oB = $(this).find("b");
					//console.log(oB);
					var d = Math.floor((dateEnd - nowDate)/1000/60/60/24);
					var h = Math.floor((dateEnd - nowDate)/1000/60/60%24);
					var m = Math.floor((dateEnd - nowDate)/1000/60%60);
					var s = Math.floor((dateEnd - nowDate)/1000%60);
					oB.eq(0).html(d);
					oB.eq(1).html(h);
					oB.eq(2).html(m);
					oB.eq(3).html(s);
				})
					
			},1000)
		}
		time();
	}
	products();
	//品牌热卖
	$(".brandSale .content-brand ul li").mouseenter(function(){
		$(this).find(".brand-detail").animate({"bottom":0},300);
	}).mouseleave(function(){
		$(this).find(".brand-detail").animate({"bottom":-97},300);
		
	})
	//热销推荐
	function hot(){
		var data;
		$.ajax({
			type:"get",
			url:"./json/hot.json",
			async:true,
			success : function(res){
				data = res;
				//console.log(data);
				init(data);
			}
		});
		function init(data){
			for(var i = 0;i < data.length;i ++){
				var hotLi = `<li><div class="hot_img">
								<a href="javascrip:;"><img src="${data[i].url}"></a>
							</div>
								<div class="sale_pink">${data[i].sign}</div>
								<h2><a href="javascrip:;">${data[i].logo}</a></h2>
								<p>${data[i].introduce}</p>
								<div class="sale_price">
									<span class="sale_num"><strong>${data[i].numPeople}</strong>人已购买</span>
									<span class="priced"><dfn>¥</dfn>${data[i].price}</span>

									<del class="price"><dfn>¥</dfn>${data[i].oldPrice}</del>
									<span class="discount">${data[i].discount}</span>
								<a href="javascript:;" class="sale_buy" data-product-id="59871">立即抢购</a>
							</div></li>`;
				$(".hot-li").append(hotLi);
			}
		}
	}
	hot();
	//foot-head
	function foot(){
        $(".foot-head a").mouseover(function(){
            $(this).stop().animate({'background-position-y': -60},150);
        }).mouseout(function(){
            $(this).stop().animate({'background-position-y': 0},150);
        }) 
    }
    foot();
    //工具条
    //左侧工具条左侧工具条,点击时跳转到列表页鼠标滑过显示title
    function left(){
    	$(".leftStair li").mouseenter(function(){
    		$(this).find("a").css("display","inline");
    	}).mouseleave(function(){
    		$(this).find("a").css("display","none");
    	})
    }
    left();
    //右侧工具条点击校妆网，跳转到校妆网页面，点击购物车跳转到购物车页面，单击top，回到top
	function right(){
		$(".rightStair li a").mouseenter(function(){
			$(this).css({"background-position-x":"-67px"});
			$(this).find("span").css("color","#e73a77");
		}).mouseleave(function(){
			$(this).css({"background-position-x":"0"});
			$(this).find("span").css("color","#fff");
		})
		$(".rightStair .stair3").click(function(){
			$("html,body").animate({"scrollTop":0},300);
		})
		$(window).scroll(function(){
			var sTop = $(document).scrollTop();
			//var mHeight = $("#banner").offset().top;
			if(sTop > 875){
				$(".leftStair").css("display","block")
				$(".rightStair").css("display","block")
			}else{
				$(".leftStair").css("display","none")
				$(".rightStair").css("display","none")
			}
		})
	}
	right();
})