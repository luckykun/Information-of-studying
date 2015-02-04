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


function beginSearch(){
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

    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");
    dealBlocks(0,"");
}