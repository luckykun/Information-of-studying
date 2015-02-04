function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
function addCookie(objName,objValue,objHours){
	var str = objName + "=" + escape(objValue);
	if(objHours > 0){
		var date = new Date();
		var ms = objHours*3600*1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString() + ";path=/; domain=.finance.sina.com.cn";
	}
	document.cookie = str;
}
function contains(arr,str){
	var i = arr.length;
	while (i--) {
		if (arr[i] == str){
			return true;
		}
	}
	return false;
}

function stock_visited(){
	var visited_all = getCookie("FIN_ALL_VISITED") ? getCookie("FIN_ALL_VISITED").replace(/\./g,"").split(",") : "";
	var visited_a_stocks = getCookie("FINA_V_S_2") ? getCookie("FINA_V_S_2").split(",") : "";
	var visited_hk_stocks = getCookie("hk_visited_stocks") ? getCookie("hk_visited_stocks").split("|") : "";
	var visited_us_stocks = getCookie("visited_uss") ? getCookie("visited_uss").replace(/\./g,"").split("|") : "";
	var visited_bonds = getCookie("VISITED_BOND") ? getCookie("VISITED_BOND").split(",") : "";
	var visited_futures = getCookie("VISITED_FUTURE") ? getCookie("VISITED_FUTURE").replace(/_1/g,"").split(",") : "";
	var visited_funds = getCookie("visited_funds") ? getCookie("visited_funds").split("|") : "";
	var html = "";
	var html_all = "";
	if(visited_all){
		for(var key=0;key<visited_all.length;key++){
			if(contains(visited_hk_stocks, visited_all[key])){
				visited_all[key] = "hk" + visited_all[key];
			}
			if(contains(visited_us_stocks, "gb_" + visited_all[key])){
				visited_all[key] = "gb_" + visited_all[key];
			}
			if(contains(visited_funds, visited_all[key].replace(/^of/,""))){
				visited_all[key] = "f_" + visited_all[key].replace(/^of/,"");
			}
			if(contains(visited_funds, visited_all[key].replace(/^00/,""))){
				visited_all[key] = "fu_" + visited_all[key].replace(/^00/,"");
			}
		}
		var r = Math.random().toString().replace("0.","");
		script = document.createElement('script');
		script.id = "getDataScript"+r;
		script.setAttribute('src', "http://hq.sinajs.cn/?func=getData.getVisitedAll();&list=" + (visited_all ? visited_all : ""));
		script.setAttribute('charset', 'gbk');
		document.body.insertBefore(script, document.body.childNodes[0]);
		if((navigator.appName == "Microsoft Internet Explorer")&&((navigator.userAgent.indexOf("MSIE 6.0")>0)||(navigator.userAgent.indexOf("MSIE 7.0")>0)||(navigator.userAgent.indexOf("MSIE 8.0")>0))){}else{
			$("#getDataScript"+r).remove();
		}
		var t = setTimeout("stock_visited()",10000);
	}else{
		html += "<tr><td colspan='5' style='text-align:center;'>您最近没有访问证券数据或没有开启cookies</td></tr>";
		html_all += "<tr><td colspan='6' style='text-align:center;'>您最近没有访问证券数据或没有开启cookies</td></tr>";
		$(".stock_visited tbody").html(html);
		$(".stock_visited_all tbody").html(html_all);	//用于详情页面
	}
	getData.getVisitedAll = function(){
		insert();
		function insert(){
			var hq_str = {};
			if(visited_all){
				for(var key=0;key<visited_all.length;key++){
					if(eval("hq_str_" + visited_all[key])){
						var _hq_str = eval("hq_str_" + visited_all[key]).split(",");
						hq_str.type = "<a href='http://finance.sina.com.cn/stock' target='_blank'>A股</a>";
						hq_str.code = visited_all[key];
						hq_str.link = "http://finance.sina.com.cn/realstock/company/" + hq_str.code + "/nc.shtml";
						hq_str.name = _hq_str[0];
						hq_str.price = _hq_str[3];
						hq_str.change = (_hq_str[3] - _hq_str[2])*100/_hq_str[2];
						hq_str.qrnh = "";
						if(_hq_str[3] == 0 || _hq_str[2] == 0){
							hq_str.change ="--";
						}
						hq_str.chgclass = "";
						if(contains(visited_hk_stocks, hq_str.code.replace(/^hk/,""))){
							hq_str.type = "<a href='http://finance.sina.com.cn/stock/hkstock' target='_blank'>港股</a>";
							hq_str.code = hq_str.code.replace(/^hk/,"");
							hq_str.link = "http://stock.finance.sina.com.cn/hkstock/quotes/" + hq_str.code + ".html";
							hq_str.name = _hq_str[1];
							hq_str.price = _hq_str[6];
							hq_str.change = _hq_str[8];
						}
						if(contains(visited_us_stocks, hq_str.code)){
							hq_str.type = "<a href='http://finance.sina.com.cn/stock/usstock' target='_blank'>美股</a>";
							hq_str.code = hq_str.code.replace(/^gb_/,"");
							hq_str.link = "http://stock.finance.sina.com.cn/usstock/quotes/" + hq_str.code + ".html";
							hq_str.price = _hq_str[1];
							hq_str.change = _hq_str[2];
						}
						if(contains(visited_bonds, hq_str.code)){
							hq_str.type = "<a href='http://finance.sina.com.cn/bond' target='_blank'>债券</a>";
							hq_str.link = "http://money.finance.sina.com.cn/bond/quotes/" + hq_str.code + ".html";
						}
						if(contains(visited_futures, hq_str.code)){
							hq_str.type = "<a href='http://finance.sina.com.cn/futuremarket' target='_blank'>期货</a>";
							hq_str.link = "http://stock.finance.sina.com.cn/futures/quotes/" + hq_str.code + ".html";
							hq_str.price = _hq_str[8];
							hq_str.change = (_hq_str[8] - _hq_str[10])*100/_hq_str[10];
							if(_hq_str[8] == 0 || _hq_str[10] == 0){
								hq_str.change ="--";
							}
						}
						if(contains(visited_funds, hq_str.code.replace(/^f_/,""))){
							hq_str.type = "<a href='http://finance.sina.com.cn/fund' target='_blank'>基金</a>";
							hq_str.code = hq_str.code.replace(/^f_/,"Avoid_being_found_in_funds");
							hq_str.link = "http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=fund&q=" + hq_str.code;
							hq_str.price = parseFloat(_hq_str[1]).toFixed(2) + " (万份收益)";
							hq_str.change = _hq_str[2];
							hq_str.qrnh = " (七日年化)";
						}
						if(contains(visited_funds, hq_str.code.replace(/^fu_/,""))){
							hq_str.type = "<a href='http://finance.sina.com.cn/fund' target='_blank'>基金</a>";
							hq_str.code = hq_str.code.replace(/^fu_/,"");
							hq_str.link = "http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=fund&q=" + hq_str.code;
							hq_str.price = _hq_str[3] +" (净值)";
							hq_str.change = _hq_str[6];
						}
						hq_str.code = hq_str.code.replace("Avoid_being_found_in_funds","");
						hq_str.link = hq_str.link.replace("Avoid_being_found_in_funds","");
						if(hq_str.change > 0 && hq_str.change < 0.01){
							hq_str.change = 0.01;
						}
						if(hq_str.change < 0 && hq_str.change > -0.01){
							hq_str.change = -0.01;
						}
						hq_str.change = parseFloat(hq_str.change).toFixed(2);
						if(hq_str.change > 0){
							hq_str.change = "+" + hq_str.change;
							hq_str.chgclass = "percentRed";
						}
						if(hq_str.change == 0){
							hq_str.change = "0";
						}
						if(hq_str.change < 0){
							hq_str.chgclass = "percentGreen";
						}
						if(hq_str.change == "NaN"){
							hq_str.change = "--";
						}
						
						html += "<tr><td class='"+hq_str.code+"'>" + hq_str.type + "</td><td><a href='" + hq_str.link + "' target='_blank'>" + hq_str.name + "</a></td><td>" + hq_str.price + "</td><td><span class='" + hq_str.chgclass+ "'>" + hq_str.change + "</span>" + hq_str.qrnh + "</td><td><span class='del'></span></td></tr>";
						html_all += "<tr><td class='"+hq_str.code+"'>" + hq_str.type + "</td><td><a href='" + hq_str.link + "' target='_blank'>" + hq_str.code.toUpperCase() + "</a></td><td><a href='" + hq_str.link + "' target='_blank'>" + hq_str.name + "</a></td><td>" + hq_str.price + "</td><td><span class='" + hq_str.chgclass+ "'>" + hq_str.change + "</span>" + hq_str.qrnh + "</td><td><span class='del' style='margin:0 auto;'></span></td></tr>";
					}
				}
			}
			$(".stock_visited tbody").html(html);
			$(".stock_visited_all tbody").html(html_all);	//用于详情页面
			html = "";	//填写后立即清空，避免回调函数延迟造成重复
			html_all = "";
			$(".stock_visited table tbody td span.del").click(function(){
				$(this).parent("td").parent("tr").children("td").animate({"textIndent":"-200px","opacity":"0"},500,function(){
					visited_del($(this).parent("tr").children("td:eq(0)").attr("class"));
					$(this).parent("tr").remove();
				});
			});
			$(".stock_visited_all table tbody td span.del").click(function(){
				$(this).parent("td").parent("tr").children("td").animate({"textIndent":"-200px","opacity":"0"},200,function(){
					visited_del($(this).parent("tr").children("td:eq(0)").attr("class"));
					$(this).parent("tr").remove();
				});
			});
		}
		function visited_del(code){
			var _visited_all = getCookie("FIN_ALL_VISITED").split(",");
			for(var key in _visited_all){
				if(_visited_all[key] == "."+code || _visited_all[key] == code || _visited_all[key] == "00" + code ){
					_visited_all.splice(key,1);
				}
			}
			addCookie("FIN_ALL_VISITED", _visited_all, 720);
		}
	};
}
stock_visited();