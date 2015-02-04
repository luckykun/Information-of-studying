function beginSearch(index){
    var s_i=$("#s_i option:selected").attr("value");
    var s_a=$("#s_a option:selected").attr("value");
    var s_c=$("#s_c option:selected").attr("value");
    var s_rd=$("#s_rd option:selected").attr("value");
    var s_q=$("#s_q option:selected").attr("value");

    var sortFeild="";

    $("#block_1 thead th").each(function (i) {
        if($(this).css("background-image")!="none"){
            sortFeild=FDC_DC.blocks[0].field[i];
        }
    });

    /*//因为dealBlocks里会对asc进行一次调整，所以这里先改变他的值，以保持asc的值不变
    if(FDC_DC.asc==0)
        FDC_DC.asc=1;
    else
        FDC_DC.asc=0;*/

    FDC_DC.blocks[0].param="[%22cznl%22,%22"+s_i+"%22,%22"+s_a+"%22,%22"+s_c+"%22,%22"+s_rd+"%22,%22"+s_q+"%22,%22{sort}%22,{asc},{page},{num}]";

    FDC_DC.dealBlocks(0,sortFeild);
}