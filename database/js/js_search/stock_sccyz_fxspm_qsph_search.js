function dealSelect(index){
    //表格头部的背景箭头去掉
    var thSpan="#block_"+(index+1)+" thead th";
    $(thSpan).css("background","");

    var year=$("#qsphYearSelect option:selected").attr("value");
    var quarter=$("#qsphQuarterSelect option:selected").attr("value");

    FDC_DC.blocks[index].param="[%22qsph%22,%22"+year+"%22,%22"+quarter+"%22,%22{sort}%22,{asc},{page},{num}]";

    //这里将升降序变量置为0，否则点击确定按钮，排序会一直升序和降序交叉出现
    asc=0;

    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");
    FDC_DC.dealBlocks(index,"");
}


function beginSearch(index){
    var orgName=encodeURI($("#orgNameInput").val());

    FDC_DC.blocks[index].param="[%22qsph_name%22,%22"+orgName+"%22,%22{sort}%22,{asc},{page},{num}]";

    //这里必须把当前页数span的值置为1
    $("#pageDiv_0 .currentPageSpan").text("1");
    FDC_DC.dealBlocks(index,"");
}