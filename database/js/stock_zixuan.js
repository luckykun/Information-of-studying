stock_zixuan();
function stock_zixuan(){
	dataLoader("http://stock.finance.sina.com.cn/portfolio/api/openapi.php/HoldService.getSymbolListByPid?type=cn&callback=getData.getPyListFace");
	//var t = setTimeout("stock_zixuan()",10000);
}
getData.getPyListFace = function(d){
	var hq_str_arr = [];
	var hq_str_code = [];
	for(var key in d.result.data){
		if(d.result.data[key].code){
			hq_str_arr.push(d.result.data[key].market+d.result.data[key].code);
			hq_str_code.push("hq_str_"+d.result.data[key].market+d.result.data[key].code);
		}
	}
	if(hq_str_arr.length>0){
		$(".get_data_stock_zixuan").remove();
		var r = Math.random().toString().replace("0.","");
		script = document.createElement('script');
		script.id = "getDataScript"+r;
		script.setAttribute('src', "http://hq.sinajs.cn/list=" + (hq_str_arr.join(",") ? hq_str_arr.join(",") : ""));
		script.setAttribute('class', "get_data_stock_zixuan");
		script.setAttribute('charset', 'gbk');
		document.body.insertBefore(script, document.body.childNodes[0]);
		if (script.readyState){
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					insert_zixuan();
				}
			};
		}else{ //Others
			script.onload = function(){
				insert_zixuan();
			};
		}
	}else{
		var html = "";
		html +="<tr><td style='text-align:center;' colspan='5'><a href='http://i.finance.sina.com.cn/zixuan' target='_blank'>您未登录或未使用自选股</a></td></tr>";
		$(".stock_zixuan tbody").html(html);
	}
	function insert_zixuan(){
		var html = "";
		for(var i=0;i<hq_str_code.length;i++){
			var _hq_str_code = eval(hq_str_code[i]).split(",");
			var _hq_str_code_code = "<a href='http://finance.sina.com.cn/realstock/company/" + hq_str_code[i].replace("hq_str_","") + "/nc.shtml' target='_blank'>" + hq_str_code[i].replace("hq_str_sh","").replace("hq_str_sz","") + "</a>";
			var _hq_str_code_name = "<a href='http://finance.sina.com.cn/realstock/company/" + hq_str_code[i].replace("hq_str_","") + "/nc.shtml' target='_blank'>" + (_hq_str_code[0]?_hq_str_code[0]:"--") + "</a>";
			var _hq_str_code_change = (_hq_str_code[3] - _hq_str_code[2])*100/_hq_str_code[2];
			if(_hq_str_code_change > 0 && _hq_str_code_change < 0.01){
				_hq_str_code_change = 0.01;
			}
			if(_hq_str_code_change < 0 && _hq_str_code_change > -0.01){
				_hq_str_code_change = -0.01;
			}
			_hq_str_code_change = parseFloat(_hq_str_code_change).toFixed(2);
			if(_hq_str_code_change > 0){
				_hq_str_code_change = "+" + _hq_str_code_change;
			}
			if(_hq_str_code_change == 0){
				_hq_str_code_change = "0";
			}
			if(_hq_str_code[2] == 0 || _hq_str_code[3] == 0 || !_hq_str_code[2]){
				_hq_str_code_change ="--";
			}
			var change_class = "";
			if(_hq_str_code_change < 0){
				change_class = "percentGreen";
			}
			if(_hq_str_code_change > 0){
				change_class = "percentRed";
			}
			html += "<tr><td>" + _hq_str_code_code + "</td><td>" + _hq_str_code_name + "</td><td>" + (_hq_str_code[3]?_hq_str_code[3]:"--") + "</td><td><span class='" + change_class + "'>" + _hq_str_code_change + "</span></td><td>" + (_hq_str_code[8]?_hq_str_code[8]:"--") + "</td></tr>";
		}
		if(hq_str_code.length){
			html +="<tr><td style='text-align:center;' colspan='5'><a href='http://i.finance.sina.com.cn/zixuan' target='_blank'>进入我的自选股</a></td></tr>";
		}else{
			html +="<tr><td style='text-align:center;' colspan='5'><a href='http://i.finance.sina.com.cn/zixuan' target='_blank'>您未登录或未使用自选股</a></td></tr>";
		}
		$(".stock_zixuan tbody").html(html);
	}
};