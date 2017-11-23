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
	function list() {
		var flag = true;
		$(".btn_close").click(function() {
			//console.log(index);
			if(flag) {
				$(this).css("background", "url(../images/list_open.jpg) no-repeat center")
				$(this).parent().next().css("display", "block");
				flag = false;
			} else {
				$(this).css("background", "url(../images/list_close.jpg) no-repeat center")
				$(this).parent().next().css("display", "none");
				flag = true;
			}
		})
		var data;
		$.ajax({
			type: "get",
			url: "../json/listleft.json",
			async: true,
			dataType: "json",
			success: function(res) {
				data = res;
				//console.log(res);
				init(data);
			}
		});

		function init(data) {
			for(var i = 0; i < data.length; i++) {
				$(".rankList1").find(".nation_hot").eq(i).find("dt").find("img").attr({ "src": data[i].url });
				$(".rankList1").find(".nation_hot").eq(i).find(".p_name").find("a").text(data[i].introduce);
				$(".rankList1").find(".nation_hot").eq(i).find(".p_price").text(data[i].price);
				$(".rankList1").find(".nation_hot").eq(i).find(".p_price").find("span").text(data[i].oldPrice)

				$(".rankList2").find(".nation_hot").eq(i).find("dt").find("img").attr({ "src": data[i].url });
				$(".rankList2").find(".nation_hot").eq(i).find(".p_name").find("a").text(data[i].introduce);
				$(".rankList2").find(".nation_hot").eq(i).find(".p_price").text(data[i].price);
				$(".rankList2").find(".nation_hot").eq(i).find(".p_price").find("span").text(data[i].oldPrice)

				$(".rankList3").find(".nation_hot").eq(i).find("dt").find("img").attr({ "src": data[i].url });
				$(".rankList3").find(".nation_hot").eq(i).find(".p_name").find("a").text(data[i].introduce);
				$(".rankList3").find(".nation_hot").eq(i).find(".p_price").text(data[i].price);
				$(".rankList3").find(".nation_hot").eq(i).find(".p_price").find("span").text(data[i].oldPrice)
			}
		}
	}
	list();

	function listProduct() {
		let json;
		$.getJSON('../json/listright.json', function(data) {
			json = data;
			init();
		});
		$(".productList a>span:nth-of-type(1)").hover(function() {
			$(this).css({
				color: '#e67fae'
			});
		}, function() {
			$(this).css({
				color: '#666'
			});
		});

		function init() {
			for(let i = 0; i < json.length; i++) {
				$(".productList>ul img").eq(i).attr({
					src: json[i].url
				});
				$(".productList>ul a").eq(i).children('span:nth-of-type(1)').text(json[i].introduce);
				$(".productList>ul a").eq(i).children('span:nth-of-type(2)').append(json[i].price);
				$(".productList>ul a").eq(i).children('span:nth-of-type(3)').append(json[i].oldPrice);
			}
			$(".productList>ul>li").mouseover(function() {
				if(($(this).index() + 1) % 4 == 0 || ($(this).index() + 2) % 4 == 0) {
					$(this).children('div').css({
						display: 'block',
						left: -220
					});
				}
				$(this).children('div').css({
					display: 'block'
				});
			});
			$(".productList>ul>li").mouseout(function() {
				$(this).children('div').css({
					display: 'none'
				});
			});
		}
	}
	 listProduct();

	/*$(".productList a>span:nth-of-type(1)").hover(function() {
		$(this).css({
			color: '#e67fae'
		});
	}, function() {
		$(this).css({
			color: '#666'
		});
	});*/

	/*var oUl = document.getElementsByClassName("oul");
	var oRight = document.getElementsByClassName("xiayiye");
	var index = 1; //页码 默认显示第一页
	var pageNum = 16; // 每页显示数据量
	getData();

	function getData() {
		var url = "../json/listright.json";
		ajaxGet(url, fn);

		function fn(msg) {
			var arr = JSON.parse(msg);
			var str = "";
			for(var i = (index - 1) * 16; i < index * 16; i++) {
				//末尾页下标可能会出现越界    解决  判断变量  i  不能大于数组中最大下标  
				if(i < arr.length) {
					$(".productList>ul img").eq(i).attr({
						src: arr[i].url
					});
					$(".productList>ul a").eq(i).children('span:nth-of-type(1)').text(arr[i].introduce);
					$(".productList>ul a").eq(i).children('span:nth-of-type(2)').text(arr[i].price);
					$(".productList>ul a").eq(i).children('span:nth-of-type(3)').text(arr[i].oldPrice);
				}
			}

			//计算总页数   
			pageTotal = Math.ceil(arr.length / pageNum);
			var page = "";
			//重新设置页码
			for(var j = 1; j <= pageTotal; j++) {
				page += `<li>${j}</li>`;
			}
			oUl.innerHTML = page;
			//oUl.children[index-1].className = "active";
			oUl.onclick = function(e) {
				var e = e || event;
				var target = e.target || e.srcElement;
				if(target.nodeName.toLowerCase() == "li") {
					index = target.innerHTML;
					getData();
				}

			}

			//下一页
			oRight.onclick = function() {
				if(index == pageTotal) {
					index = pageTotal;
					alert("已经是最后一页了");
				} else {
					index++;
				}
				getData();
			}
		}

	}

	$(".productList>ul>li").mouseover(function() {
		if(($(this).index() + 1) % 4 == 0 || ($(this).index() + 2) % 4 == 0) {
			$(this).children('div').css({
				display: 'block',
				left: -220
			});
		}
		$(this).children('div').css({
			display: 'block'
		});
	});
	$(".productList>ul>li").mouseout(function() {
		$(this).children('div').css({
			display: 'none'
		});
	})
*/
	function brand() {
		let flag1 = false;
		let flag2 = false;
		$(".listScreen ul a").hover(function() {
			$(this).css({
				color: '#e67fae'
			});
		}, function() {
			$(this).css({
				color: '#111'
			});
		});
		$(".listScreen div").children('span').click(function(event) {
			if(flag1) {
				$(this).parent('div').children('ul').css({
					height: '38'
				});
				$(this).css({});
				flag1 = false;
			} else {
				$(this).parent('div').children('ul').css({
					height: 'auto'
				});
				$(this).css({
					'background': 'url(../images/nomore1.jpg) no-repeat center'
				});
				flag1 = true;
			}
		});
		$(".listScreen p").click(function(event) {
			if(flag2) {
				$(".origin").css({
					display: 'none'
				});
				$(this).css({
					'background': 'url(../images/more2.jpg) no-repeat center'
				});
				flag2 = false;
			} else {
				$(".origin").css({
					display: 'block'
				});
				$(this).css({
					'background': 'url(../images/nomore2.jpg) no-repeat center'
				});
				flag2 = true;
			}

		});
	}
	brand();

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