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

function dealSelectChange(selectId) {
    var selectIndex= $("#"+selectId+" option:selected").index();

    $("#stockCodeSpan,#theNumberSpan,#dateRangeSpan").css("display","none");
    switch(selectIndex){
        case 0:
            $("#stockCodeSpan").css("display","inline-block");
            break;
        case 1:
            $("#dateRangeSpan").css("display","inline-block");
            break;
        case 2:
            $("#theNumberSpan").css("display","inline-block");
            break;
    }
}


//用户输入时绑定事件
(new SuggestServer()).bind({
    "input": "stockSearchInput",
    "value": "@3@",
    "type": "stock",
    "width": 260
});


function beginSearch(index){
    var selectIndex= $("#xsjjSelect option:selected").index();
    if(selectIndex==0){
        var stockCode=$("#stockSearchInput").val().slice(2);
        //blocks是全局变量，指的是当前内容页面所有模块
        FDC_DC.blocks[index].param="[%22xsjj_symbol%22,%22"+stockCode+"%22,{page},{num}]";
    }
    else if(selectIndex==1){
        var beginDate=$("#beginDateInput").val();
        var endDate=$("#endDateInput").val();
        FDC_DC.blocks[index].param="[%22xsjj%22,%22%22,%22"+beginDate+"%22,%22"+endDate+"%22,{page},{num}]";
    }
    else{
        var inputNumber=$("#numberInput").val();
        FDC_DC.blocks[index].param="[%22xsjj%22,%22"+inputNumber+"%22,%22%22,%22%22,{page},{num}]";
    }


    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");

    FDC_DC.dealBlocks(index,"");

    //执行完请求之后，将blocks[index]里的param置为初始值
    //blocks[index].param="[%22xsjj%22,%22%22,%22{bdate}%22,%22{edate}%22,{page},{num}]";
}