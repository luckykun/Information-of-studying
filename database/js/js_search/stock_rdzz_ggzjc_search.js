//时间选择器
$(document).ready(function () {
    $('.input-daterange').datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        language: "zh-CN",
        keyboardNavigation: false,
        forceParse: false,
        todayHighlight: true
    });
});


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

    FDC_DC.blocks[index].param="[%22nbjy%22,%22"+stockCode.slice(2)+"%22,%22"+beginDate+"%22,%22"+endDate+"%22,{page},{num}]";

    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");
    FDC_DC.dealBlocks(0,"");
}