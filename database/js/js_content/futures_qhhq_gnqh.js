var p = [
	[
		[1],["8:30","15:30"],["20:30","24:00"]
	],
	[
		[2,3,4,5],["00:00","03:00"],["8:30","15:30"],["20:30","24:00"]
	],
	[
		[6],["00:00","03:00"]
	]
];
function futures_qhhq_gnqh(){
    $(".get_data_futures_qhhq_gnqh").remove();
    var r = Math.random().toString().replace("0.","");
    script = document.createElement("script");
    script.id = "getDataScript"+r;
    script.setAttribute("src", "http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22qhhq%22,%22qbhy%22,%22zdf%22,1000]]&callback=getData.futures_qhhq_gnqh");
    script.setAttribute("charset", "gbk");
    script.setAttribute("class", "get_data_futures_qhhq_gnqh");
    document.body.insertBefore(script, document.body.childNodes[0]);
	var c = (startRefresh(p) > 10000) ? startRefresh(p) :10000;
	//var t = setTimeout("futures_qhhq_gnqh()",c);
}
getData.futures_qhhq_gnqh = function(d){
    var is_hot;
    var market;
    var presets = [1,2,"shfe","dce","czce","zjs",""];	//顶部按钮对应的参数
    var fields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var volume = 0;
    var price = "";
    var sort ="";
    var asc = 0;
    var sel = 0; //按种类判断小数点保留位数
	//获取is_hot和market参数
    for(var i=0;i<6;i++){
        if($(".leftSelectDiv span:eq("+i+")").hasClass("current") == true){
            if(i<2){
                is_hot = presets[i];
            }else{
                market = presets[i];
                $(".gotoAnchorDiv").css("display","none");
                var SDI = $(".futures_qhhq_gnqh thead th span.sort_down").parent("th").index();	//降序字段
                var SUI = $(".futures_qhhq_gnqh thead th span.sort_up").parent("th").index();	//升序字段
				//不论是降序字段还是升序字段，只要字段是前两个排序的，就显示交易所的分类导航
                if((SDI>=0&&SDI<2)||(SUI>=0&&SUI<2)){
                    $(".gotoAnchorDiv:eq("+(i-2)+")").css("display","block");
                }
            }
        }
    }
	//获取排序sort，asc参数
    for(var i=0;i<$(".futures_qhhq_gnqh thead th").length;i++){
        if($(".futures_qhhq_gnqh thead th:eq("+i+") span").hasClass("sort_down") == true ){
            sort = fields[i];
        }
        if($(".futures_qhhq_gnqh thead th:eq("+i+") span").hasClass("sort_up") == true ){
            sort = fields[i];
            asc = 1;
        }
    }
	//获取成交量volume参数
    if($(".rightSelectDiv input[type=checkbox]:eq(0)").prop("checked") == true){
        volume = $(".rightSelectDiv input[type=text]").val();
        if(!isNaN(volume) && volume >=0){}else{
            showmsg("成交量须设为不小于0的数字", 2);
            volume = 0;
        }
    }
	//获取价格突破price参数
    if($(".rightSelectDiv input[type=checkbox]:eq(1)").prop("checked") == true){
        price = $(".rightSelectDiv select").val();
    }
    insert(is_hot, market, volume, price);
    function insert(is_hot, market, volume, price){
        $("#allAnchorDiv .gotoAnchorDiv").html("");
        var html = "";
        var _html = "";
        var _anchor = "";
        var _data = d[0].items;
        var data = _data;
        if(sort){arrSort(data, sort, asc);}
        _data = data;
        data =[];
        if(is_hot == 1){
            for(var key in _data){
                if(_data[key][12] == 1){
                    data.push(_data[key]);
                }
            }
        }else if(is_hot == 2){
            for(var key in _data){
                if(_data[key][12] == 1 || _data[key][12] == 2){
                    data.push(_data[key]);
                }
            }
        }else{
            data = _data;
        }
        _data = data;
        data =[];
        if(volume){
            for(var key in _data){
                if(parseFloat(volume) < parseFloat(_data[key][10])){
                    data.push(_data[key]);
                }
            }
        }else{
            data = _data;
        }
        _data = data;
        data =[];
        if(price){
            for(var key in _data){
                if(price == 15 || price == 17 || price == 19){
                    if(parseFloat(_data[key][3]) > parseFloat(_data[key][price])){
                        data.push(_data[key]);
                    }
                }else{
                    if(parseFloat(_data[key][3]) < parseFloat(_data[key][price])){
                        data.push(_data[key]);
                    }
                }
            }
        }else{
            data = _data;
        }
        _data = data;
        data =[];
        if(market){
            var anchor = [];
            for(var key in _data){
                if(market == _data[key][0]){
                    data.push(_data[key]);
                    if(!contains(anchor, _data[key][2].replace(/\d*/g,""))){
                        anchor.push(_data[key][2].replace(/\d*/g,""));
                        _anchor = _data[key][1];
                        _html += "<span class='" + _anchor + "'>" + _data[key][2].replace(/\d*/g,"") + "</span>";
                    }
                }
            }
            if(_html){
                $("#allAnchorDiv ."+market).html(_html);
            }else{
                $(".gotoAnchorDiv").css("display","none");
            }
        }else{
            $(".gotoAnchorDiv").css("display","none");
            data = _data;
        }
        for(var key=0;key<data.length;key++){
            var market = data[key][0],symbol = data[key][1],name = data[key][2],trade = data[key][3],prevsettlement = data[key][4],zde = data[key][5],zdf = data[key][6],open = data[key][7],high = data[key][8],low = data[key][9],volume = data[key][10],position = data[key][11],is_hot = data[key][12],h_5t = data[key][13],l_5t = data[key][14],h_10t = data[key][15],l_10t = data[key][16],h_20t = data[key][17],l_20t = data[key][18],h_55t = data[key][19],l_55t = data[key][20],atr = data[key][21];
            if(parseFloat(zdf) > -0.01 && parseFloat(zdf) < 0){
                zdf = -0.01;
            }
            if(parseFloat(zdf) < 0.01 && parseFloat(zdf) > 0){
                zdf = 0.01;
            }
            if(zde > 0){
                chgclass = "percentRed";
                zde = "+" + parseFloat(zde).toFixed(1);
                zdf = "+" + parseFloat(zdf).toFixed(2);
            }
            if(zde < 0){
                chgclass = "percentGreen";
                zde = parseFloat(zde).toFixed(1);
                zdf = parseFloat(zdf).toFixed(2);
            }
            if(zde == 0){
                chgclass = "";
                zde = parseInt(zde);
                zdf = parseInt(zdf);
            }
            if (data[key][1].indexOf('TF') == 0) {
                sel = 3;
            } else if (data[key][1].indexOf('AU') == 0 || data[key][1].indexOf('BB') == 0 || data[key][1].indexOf('FB') == 0) {
                sel = 2;
            } else if (data[key][1].indexOf('IF') == 0 || data[key][1].indexOf('TC') == 0) {
                sel = 1;
            } else {
                sel = 0;
            }
            html += "<tr>";
            html += "<td class='" + data[key][1] + "'><a href='http://finance.sina.com.cn/futures/quotes/" + data[key][1] + ".shtml' target='_blank'>" + data[key][1] + "</a></td>";
            html += "<td><a href='http://finance.sina.com.cn/futures/quotes/" + data[key][1] + ".shtml' target='_blank'>" + data[key][2] + "</a></td>";
            if (data[key][10] == 0){
                html += "<td>--</td>";
                html += "<td>" + parseFloat(data[key][4]).toFixed(sel) + "</td>";
                html += "<td>--</td>";
                html += "<td>--</td>";
                html += "<td>--</td>";
                html += "<td>--</td>";
                html += "<td>--</td>";
            } else {
                html += "<td>" + parseFloat(data[key][3]).toFixed(sel) + "</td>";
                html += "<td>" + parseFloat(data[key][4]).toFixed(sel) + "</td>";
                html += "<td class=" + chgclass + ">" + zde + "</td>";
                html += "<td class=" + chgclass + ">" + zdf + "%</td>";
                html += "<td>" + parseFloat(data[key][7]).toFixed(sel) + "</td>";
                html += "<td>" + parseFloat(data[key][8]).toFixed(sel) + "</td>";
                html += "<td>" + parseFloat(data[key][9]).toFixed(sel) + "</td>";
            }
            html += "<td>" + data[key][10] + "</td>";
            html += "<td>" + data[key][11] + "</td>";
            html += "<td>" + parseFloat(data[key][15]).toFixed(sel).replace("NaN","--") + "/" + parseFloat(data[key][16]).toFixed(sel).replace("NaN","--") + "</td>";
            html += "<td>" + parseFloat(data[key][17]).toFixed(sel).replace("NaN","--") + "/" + parseFloat(data[key][18]).toFixed(sel).replace("NaN","--") + "</td>";
            html += "<td>" + parseFloat(data[key][19]).toFixed(sel).replace("NaN","--") + "/" + parseFloat(data[key][20]).toFixed(sel).replace("NaN","--") + "</td>";
            html += "<td>" + parseFloat(data[key][21]).toFixed(sel).replace("NaN","--") + "</td>";
            html += "</tr>";
        }
        $(".futures_qhhq_gnqh tbody").html(html);
        $(".gotoAnchorDiv span").unbind("click");
        $(".gotoAnchorDiv span").click(function(){
            var gotoAnchor = $(this).attr("class");
            $("html,body").animate({scrollTop:$("." + gotoAnchor + ":eq(1)").offset().top-45}, 0);
        });
    };
};
//点击动作
$(".leftSelectDiv span").click(function(){
    if($(this).hasClass("current") == false){
        $(".leftSelectDiv span").removeClass("current");
        $(this).addClass("current");
		//如果点击是交易所，按照第一个字段升序排序，否则按照涨跌额降序排序
        if($(this).index()>1 && $(this).index()<6){
            $(".futures_qhhq_gnqh thead th span").removeClass();
            $(".futures_qhhq_gnqh thead th:eq(0) span").addClass("sort_up");
        }else{
            $(".futures_qhhq_gnqh thead th span").removeClass();
            $(".futures_qhhq_gnqh thead th:eq(4) span").addClass("sort_down");
        }
        futures_qhhq_gnqh();
    }
});
$(".rightSelectDiv input[type=checkbox]").click(function(){
        futures_qhhq_gnqh();
});
$(".rightSelectDiv input[type=text]").bind("input propertychange", function(){
    futures_qhhq_gnqh();
});
$(".rightSelectDiv select").change(function(){
    futures_qhhq_gnqh();
});
$(".futures_qhhq_gnqh thead th span").click(function(){
    if($(this).hasClass("sort_down") == true){
        $(".futures_qhhq_gnqh thead th span").removeClass();
        $(this).addClass("sort_up");
    }else{
        $(".futures_qhhq_gnqh thead th span").removeClass();
        $(this).addClass("sort_down");
    }
	//排序字段小于2，并且选择按钮索引大于1，才显示本交易所的分类导航
    if($(this).parent("th").index() < 2 && $(".leftSelectDiv span.current").index() > 1){
        $(".gotoAnchorDiv:eq(" + ($(".leftSelectDiv span.current").index()-2) + ")").css("display","block");
    }else{
        $(".gotoAnchorDiv").css("display","none");
    }
    futures_qhhq_gnqh();
});
function contains(arr,str){
    var i = arr.length;
    while (i--) {
        if (arr[i] == str){
            return true;
        }
    }
    return false;
}
//数组排序，参数分别为：需排序数组、排序字段、升降序
function arrSort(d,s,asc){var j=d;j.sort(function (a,b){if(asc == 1){return a[s]-b[s];}else{return b[s]-a[s];}});if(s == 1 || s == 2){j.sort(function(a,b){return a[s].localeCompare(b[s]);});if(asc == 0){j.reverse();}}return j;}
futures_qhhq_gnqh();