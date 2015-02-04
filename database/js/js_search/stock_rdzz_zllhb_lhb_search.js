$(document).ready(function () {
    $('.input-daterange').datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        language: "zh-CN",
        keyboardNavigation: false,
        forceParse: false,
        todayHighlight: true
    });

    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22lhb%22,%22%22,1,20]]";
    lhbInsertData(theURL,"left");
});

//数据处理入口
function lhbInsertData(url,leftOrCenter){
    //先清空data_panel中weekTable后面的所有内容
    $(".weekTable").nextAll().remove();

    //请求接口数据
    //var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22lhb%22,%22"+date+"%22,1,20]]";
    $.ajax({
        type:"get",
        url:url,
        dataType:"jsonp",
        success:function(data){
            var contentStr="";

            //如果传入的值为left，初始化和一周某一天情况的逻辑处理，如果传入的是center的话，处理搜索情况
            if(leftOrCenter=="left"){
                for(var key in data[0].items){

                    //获取title内容，创建titleDiv，并将获得的内容添加到titleDiv中
                    var currentTitleStr=createTitleDiv(data[0].more.types[key],"left");

                    //创建表格并填充数据
                    var currentTableStr=createContentTable(data[0].items[key],key,data[0].more.types[key]);

                    contentStr=contentStr+currentTitleStr+currentTableStr;
                }
            }
            else{
                //获取title内容，创建titleDiv，并将获得的内容添加到titleDiv中
                var currentTitleStr=createTitleDiv(data[0].more.sName,"center");

                console.log("t_"+data[0].items[0][4]);
                //创建表格并填充数据
                var currentTableStr=createContentTable(data[0].items,"","");

                contentStr=contentStr+currentTitleStr+currentTableStr;
            }

            //向data_panel中添加内容
            $("#data_panel").append($(contentStr));
        }
    });
}


function createTitleDiv(titleContent,leftOrCenter){
    //return "<div class='lhbContentTitle'>"+titleContent+"</div>";
    if(leftOrCenter=="left")
        return "<div class='lhbContentTitle'>"+titleContent+"</div>";
    else
        return "<div class='lhbContentTitle' style='text-align:center;'><span style='margin-right:20px;'>"+titleContent+"</span>龙虎榜信息</div>";
}

function createContentTable(data,key,titleContent){
    var contentTableStr="<table><thead>";
        contentTableStr+="  <tr>";
        contentTableStr+="      <td>序号</td>";
        contentTableStr+="      <td>股票代码</td>";
        contentTableStr+="      <td>股票名称</td>";
        contentTableStr+="      <td>收盘价(元)</td>";
        contentTableStr+="      <td>对应值(%)</td>";
        contentTableStr+="      <td>成交量(万股)</td>";
        contentTableStr+="      <td>成交额(万元)</td>";
        contentTableStr+="      <td>查看详情</td>";
        contentTableStr+="  </tr></thead>";

    //最终数据在数组中对应的索引
    var indexArr=[4,6,7,1,2,3];
    if(titleContent==""){
        indexArr=[6,7,5,1,2,3];
    }

    for(var i=0;i<data.length;i++){
        //添加序号
        contentTableStr=contentTableStr+"<tr><td>"+(i+1)+"</td>";

        for(var j=0;j<indexArr.length;j++){
            if(j==0||j==1){
                contentTableStr=contentTableStr+"<td><a target='_blank' href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+data[i][indexArr[0]]+"'>"+data[i][indexArr[j]]+"</a></td>";
            }
            else{
                contentTableStr=contentTableStr+"<td>"+data[i][indexArr[j]]+"</td>";
            }
        }

        var theId="";
        if(key==""){
            theId="t_"+data[i][4]+"_"+data[i][indexArr[0]]+"_"+i;
        }
        else{
            theId=key+"_"+data[i][indexArr[0]]+"_"+i;
        }


        var theDate=data[i][0].substr(0,10);
        //添加“查看交易详情”单元格
        contentTableStr+="<td><span class=\"viewTradeInfoSpan\" onclick=\"viewTradeInfo(this,\'"+theId+"\',\'"+theDate+"\')\">查看交易详情</span></td></tr>";

        var symbolCode=data[i][indexArr[0]];
        var symbolName=data[i][indexArr[1]];

        //插入交易详情部分的HTML代码
        contentTableStr=contentTableStr+insertTradeInfoHTML(theId,titleContent,symbolCode,symbolName);
    }
    contentTableStr+="</table>";

    return contentTableStr;
}

function viewTradeInfo(element,id,date){
    if($(element).text()=="查看交易详情"){
        $(element).text("关闭交易详情");
        $("#"+id).css("display","table-row");

        //如果还没发送了请求
        if($("#"+id+" table tbody").children().length==0){
            insertTradeInfo(id,date);
        }
    }
    else{
        $(element).text("查看交易详情");
        $("#"+id).css("display","none");
    }
}

function insertTradeInfo(id,date){
    var strArr=id.split("_");

    //请求接口数据
    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22lhb_detail%22,%22"+strArr[2]+"%22,%22"+date+"%22,%22"+strArr[1]+"%22]]";
    $.ajax({
        type:"get",
        url:theURL,
        dataType:"jsonp",
        success:function(data){
            insertBuyData(id,data[0].buy);
            insertSellData(id,data[0].sell);
        }
    });
}

function insertBuyData(id,buyData){
    var buyDataStr="";
    for(var i=0;i<buyData.length;i++){
        buyDataStr+="<tr>";
        if(buyData[i].comName=="机构专用"){
            buyDataStr+="  <td>"+buyData[i].comName+"</td>";
        }
        else{
            buyDataStr+="  <td><a href='http://vip.stock.finance.sina.com.cn/q/go.php/vInvestConsult/kind/lhb/index.phtml?comcode="+buyData[i].comCode+"' target='_blank'>"+buyData[i].comName+"</a></td>";
        }
        buyDataStr+="  <td>"+parseFloat(buyData[i].buyAmount).toFixed(4)+"</td>";
        buyDataStr+="  <td>"+parseFloat(buyData[i].sellAmount).toFixed(4)+"</td>";
        buyDataStr+="  <td>"+parseFloat(buyData[i].netAmount).toFixed(4)+"</td>";
        buyDataStr+="</tr>";
    }

    $("#"+id+" .buyInfoTable tbody").html(buyDataStr);
}

function insertSellData(id,sellData){
    var sellDataStr="";
    for(var i=0;i<sellData.length;i++){
        sellDataStr+="<tr>";
        if(sellData[i].comName=="机构专用") {
            sellDataStr+="<td>"+sellData[i].comName+"</td>";
        }
        else{
            sellDataStr+="<td><a href='http://vip.stock.finance.sina.com.cn/q/go.php/vInvestConsult/kind/lhb/index.phtml?comcode="+sellData[i].comCode+"' target='_blank'>" + sellData[i].comName + "</a></td>";
        }
        sellDataStr+="  <td>"+parseFloat(sellData[i].buyAmount).toFixed(4)+"</td>";
        sellDataStr+="  <td>"+parseFloat(sellData[i].sellAmount).toFixed(4)+"</td>";
        sellDataStr+="  <td>"+parseFloat(sellData[i].netAmount).toFixed(4)+"</td>";
        sellDataStr+="</tr>";
    }

    $("#"+id+" .sellInfoTable tbody").html(sellDataStr);
}


function insertTradeInfoHTML(id,reason,symbolCode,symbolName){
    var TradeInfoHTML="<tr class='tradeInfoTd' id='"+id+"'>";
        TradeInfoHTML+="    <td colspan='8' style='text-align:left; padding:15px; background-color:#DEDEE0;'>";
        TradeInfoHTML+="        <div style='padding:15px; background-color:#E7EBF3;'>";
        if(reason!=""){
            TradeInfoHTML+="            <span>上榜原因：</span>";
            TradeInfoHTML+="            <span class='lhbReasonSpan' style='margin-right:50px;'>"+reason+"</span>";
        }
        TradeInfoHTML+="            <a style='text-decoration: none;' href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+symbolCode+"' target='_blank'>查看"+symbolName+"股票行情</a>";
        TradeInfoHTML+="        </div>";
        TradeInfoHTML+="        <div style='background-color:#EEF6FF; padding:15px;'>买入金额最大的营业所</div>";
        TradeInfoHTML+="        <table class='buyInfoTable' style='border-style:none;'>";
        TradeInfoHTML+="            <thead>";
        TradeInfoHTML+="                <tr>";
        TradeInfoHTML+="                    <td>交易营业所</td>";
        TradeInfoHTML+="                    <td>买入金额(万元)</td>";
        TradeInfoHTML+="                    <td>卖出金额(万元)</td>";
        TradeInfoHTML+="                    <td>净买入(万元)</td>";
        TradeInfoHTML+="                </tr>";
        TradeInfoHTML+="            </thead>";
        TradeInfoHTML+="            <tbody>";
        TradeInfoHTML+="            </tbody>";
        TradeInfoHTML+="        </table>";
        TradeInfoHTML+="        <div style='background-color:#EEF6FF; padding:15px;'>卖出金额最大的营业所</div>";
        TradeInfoHTML+="        <table class='sellInfoTable' style='border-style:none;'>";
        TradeInfoHTML+="            <thead>";
        TradeInfoHTML+="                <tr>";
        TradeInfoHTML+="                    <td>交易营业所</td>";
        TradeInfoHTML+="                    <td>买入金额(万元)</td>";
        TradeInfoHTML+="                    <td>卖出金额(万元)</td>";
        TradeInfoHTML+="                    <td>净买入(万元)</td>";
        TradeInfoHTML+="                </tr>";
        TradeInfoHTML+="            </thead>";
        TradeInfoHTML+="            <tbody>";
        TradeInfoHTML+="            </tbody>";
        TradeInfoHTML+="        </table>";
        TradeInfoHTML+="    </td>";
        TradeInfoHTML+="</tr>";

    return TradeInfoHTML;
}




//用户输入时绑定事件
(new SuggestServer()).bind({
    "input": "stockSearchInput",
    "value": "@3@",
    "type": "stock",
    "width": 260
});


function beginSearch(index){
    var stockCode=$("#stockSearchInput").val();
    if(stockCode==""){
        alert("请输入股票代码。");
        return;
    }

    var pattern = /^(sh|sz)?[0-9]{6}$/;
    if(pattern.test(stockCode) == false){
        alert("不正确的股票代码。");
        return;
    }

    var beginDate=$("#beginDateInput").val();//开始日期，有的页面有，有的页面没有
    var endDate=$("#endDateInput").val();//结束日期，有的页面有，有的页面没有


    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22lhb_stock%22,%22"+stockCode.slice(2)+"%22,%22"+beginDate+"%22,%22"+endDate+"%22,1,40]]";

    lhbInsertData(theURL,"center");
}


function selectWeek(obj)
{
    var selectDate=$(obj).attr("dt");

    jQuery(obj).parent().parent().find("a").css("background-color","");
    jQuery(obj).css("background-color","#FFEAB1");

    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22lhb%22,%22"+selectDate+"%22,1,20]]";
    lhbInsertData(theURL,"left");
}
!function ($)
{
    var weekday = new function ()
    {
        var _days,_up,_down,_offset = 0;
        var _dayToCN = ['日','一','二','三','四','五','六'];
        function _draw()
        {
            var StandardBJTime=Math.ceil((new Date().getTime())/1000);

            var _now = StandardBJTime * 1000 + 1000 * 60 * 60 * 24 * _offset * 7;
            var _today = new Date(_now);
            var _dayToday = _today.getDay();
            if(_dayToday == 0)
            {
                _dayToday = -1;
            }
            else
            {
                _dayToday -= 1;
            }
            var _start = _now - 1000 * 60 * 60 * 24 * _dayToday;
            var _day;
            for(var i = 0;i < 5;i++)
            {
                _day = new Date(_start + 1000 * 60 * 60 * 24 * i);
                _days.eq(i).attr('dt',_day.getFullYear() + '-' + formatDT(_day.getMonth() + 1) + '-' + formatDT(_day.getDate()));

                var year=new Date().getFullYear();
                var month=new Date().getMonth()+1;
                var day=new Date().getDate();

                if(month<10)
                    month="0"+month;
                if(day<10)
                    day="0"+day;

                if(_days.eq(i).attr('dt') == year+"-"+month+"-"+day)
                    _days.eq(i).css('background-color','#FFEAB1');
                else
                    _days.eq(i).css('color','#000000');
                _days.eq(i).html(_day.getMonth() + 1 + '月' + _day.getDate() + '日(周' + _dayToCN[_day.getDay()] + ')');
            }
        }
        function formatDT(dt)
        {
            return dt < 10 ? '0' + dt : dt;
        }
        function _goUp()
        {
            _offset -= 1;
            $(".weekTable a").css("background-color","");
            _draw();
        }
        function _goDown()
        {
            _offset += 1;
            $(".weekTable a").css("background-color","");
            _draw();
        }
        this.init = function ()
        {
            _days = $('a.js-day');
            _up = $('#weekUp');
            _up.click(_goUp);
            _down = $('#weekDown');
            _down.click(_goDown);
            _draw();
        };
    } ();
    $(function ()
    {
        weekday.init();
    });
} (jQuery);