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

    FDC_DC.blocks[index].param="[%22ggtj%22,%22"+stockCode.slice(2)+"%22,%22{recentDays}%22,%22{sort}%22,{asc},{page},{num}]";

    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");
    FDC_DC.dealBlocks(0,"");
}