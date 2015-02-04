$(document).ready(function () {
    $('.input-daterange').datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        language: "zh-CN",
        keyboardNavigation: false,
        forceParse: false,
        todayHighlight: true
    });

    getSumValue("");
});

function getSumValue(date){
    /*var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22rzrq%22,%22"+date+"%22]]";
    $.ajax({
        type:"get",
        url:theURL,
        dataType:"jsonp",
        success:function(data){
            $("#sh_td_1").text(parseFloat(data[0].sum.CNSESH.SEFTRADE1).toLocaleString());
            $("#sh_td_2").text(parseFloat(data[0].sum.CNSESH.SEFTRADE2).toLocaleString());
            $("#sh_td_3").text(parseFloat(data[0].sum.CNSESH.SEFTRADE3).toLocaleString());
            $("#sh_td_4").text(parseFloat(data[0].sum.CNSESH.SEFTRADE4).toLocaleString());

            $("#sz_td_1").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE1).toLocaleString());
            $("#sz_td_2").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE2).toLocaleString());
            $("#sz_td_3").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE3).toLocaleString());
            $("#sz_td_4").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE4).toLocaleString());
        }
    });*/

    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22rzrq%22,%22"+date+"%22]]&callback=displaySumValue";

    var theScript = document.createElement("script");
    theScript.setAttribute("src",theURL);
    theScript.setAttribute("id","sumScript");
    document.body.insertBefore(theScript, document.body.childNodes[0]);
    //document.body.removeChild(theScript);
}

function displaySumValue(data){
    document.body.removeChild(document.getElementById("sumScript"));

    $("#sh_td_1").text(parseFloat(data[0].sum.CNSESH.SEFTRADE1).toLocaleString());
    $("#sh_td_2").text(parseFloat(data[0].sum.CNSESH.SEFTRADE2).toLocaleString());
    $("#sh_td_3").text(parseFloat(data[0].sum.CNSESH.SEFTRADE3).toLocaleString());
    $("#sh_td_4").text(parseFloat(data[0].sum.CNSESH.SEFTRADE4).toLocaleString());

    $("#sz_td_1").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE1).toLocaleString());
    $("#sz_td_2").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE2).toLocaleString());
    $("#sz_td_3").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE3).toLocaleString());
    $("#sz_td_4").text(parseFloat(data[0].sum.CNSESZ.SEFTRADE4).toLocaleString());
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

    FDC_DC.blocks[1].param="[%22rzrq_stock%22,%22"+stockCode.slice(2)+"%22,%22"+beginDate+"%22,%22"+endDate+"%22]";

    /*var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22rzrq_stock%22,%22"+stockCode.slice(2)+"%22,%22"+beginDate+"%22,%22"+endDate+"%22]]";
    $.ajax({
        type:"get",
        url:theURL,
        dataType:"jsonp",
        success:function(data){
            $("#stockNameSpan").text(data[0].more.sName);
        }
    });*/

    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22rzrq_stock%22,%22"+stockCode.slice(2)+"%22,%22"+beginDate+"%22,%22"+endDate+"%22]]&callback=getStockName";

    var theScript = document.createElement("script");
    theScript.setAttribute("src",theURL);
    document.body.insertBefore(theScript, document.body.childNodes[0]);
    document.body.removeChild(theScript);

    //将block_1和rzrq_total_table隐藏，block_2显示
    $("#block_1,#rzrq_total_table").css("display","none");
    $("#block_2").css("display","table");
    FDC_DC.dealBlocks(1,"");
}

function getStockName(data){
    $("#stockNameSpan").text(data[0].more.sName);
}


function selectWeek(obj)
{
    //将block_1和rzrq_total_table显示，block_2隐藏
    $("#block_1,#rzrq_total_table").css("display","table");
    $("#block_2").css("display","none");

    var selectDate=$(obj).attr("dt");

    jQuery(obj).parent().parent().find("a").css("background-color","");
    jQuery(obj).css("background-color","#FFEAB1");

    //总数查找
    getSumValue(selectDate);

    //内容显示
    FDC_DC.blocks[0].param="[%22rzrq%22,%22"+selectDate+"%22]";
    FDC_DC.dealBlocks(0,"");
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
