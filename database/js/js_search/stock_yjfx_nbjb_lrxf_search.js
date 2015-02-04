$(document).ready(function(){
    //每隔5秒刷新一次
    /*setInterval(function(){
        var s_i=$("#s_i option:selected").attr("value");
        var s_a=$("#s_a option:selected").attr("value");
        var s_c=$("#s_c option:selected").attr("value");
        var s_t=$("#s_t option:selected").attr("value");
        var s_z=$("#s_z option:selected").attr("value");

        var sortFeild="";

        $("#block_1 thead th").each(function (i) {
            if($(this).css("background-image")!="none"){
                sortFeild=blocks[0].field[i];
            }
        });

        //因为dealBlocks里会对asc进行一次调整，所以这里先改变他的值，以保持asc的值不变
        if(asc==0)
            asc=1;
        else
            asc=0;

        blocks[0].param="[%22qgqp%22,%22"+s_i+"%22,%22"+s_a+"%22,%22"+s_c+"%22,%22"+s_t+"%22,%22"+s_z+"%22,%22{sort}%22,{asc},{page},{num}]";

        dealBlocks(0,sortFeild);
    },5000);*/
});

//用户输入时绑定事件
(new SuggestServer()).bind({
    "input": "stockSearchInput",
    "value": "@3@",
    "type": "stock",
    "width": 260
});

function dealSelect(index){
    //表格头部的背景箭头去掉
    var thSpan="#block_"+(index+1)+" thead th";
    $(thSpan).css("background","");

    var s_hy=encodeURI($("#s_hy option:selected").attr("value"));

    FDC_DC.blocks[index].param="[%22lrxf%22,%22"+s_hy+"%22,%22{sort}%22,{asc},{page},{num}]";

    //这里将升降序变量置为0，否则点击确定按钮，排序会一直升序和降序交叉出现
    FDC_DC.asc=0;

    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");
    FDC_DC.dealBlocks(index,"");
}


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

    FDC_DC.blocks[index].param="[%22lrxf_symbol%22,%22"+stockCode.slice(2)+"%22,%22{sort}%22,{asc},{page},{num}]";

    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");
    FDC_DC.dealBlocks(index,"");
}