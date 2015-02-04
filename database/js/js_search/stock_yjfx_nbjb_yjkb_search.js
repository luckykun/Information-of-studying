$(document).ready(function(){
    $("#mouseOverLayerDiv").attr("onmouseleave","closeMouseOverLayerDiv()");
});

window.onresize=function(){
    $("#mouseOverLayerDiv").css("display","none");
}

function openMouseOverLayerDiv(element) {
    var stockCode="";

    if($(element).attr("class")=="stockCode_mouseOverLayer"){
        stockCode=$(element).text();
    }
    else{
        stockCode=$(element).parent().parent().prev().find("span").text();
    }


    if(stockCode.substr(0,2)=="60" || stockCode.substr(0,2)=="90" || stockCode.substr(0,2)=="58")
        stockCode="sh"+stockCode;
    else
        stockCode="sz"+stockCode;


    var left=$(element).offset().left;
    var top=$(element).offset().top+25;

    $("#mouseOverLayerDiv").css({
        "display":"block",
        "left":left,
        "top":top
    });

    $("#yjbb_zxg_link").attr("href","http://vip.stock.finance.sina.com.cn/portfolio/qjia.php?symbol="+stockCode+"&ru=http://vip.stock.finance.sina.com.cn/q/go.php/vFinanceAnalyze/kind/mainindex/index.phtml");
    $("#yjbb_zixun_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vCB_AllNewsStock/symbol/"+stockCode+".phtml");
    $("#yjbb_guba_link").attr("href","http://guba.sina.com.cn/bar.php?name="+stockCode);
    $("#yjbb_gonggao_link").attr("href","http://biz.finance.sina.com.cn/stock/company/bulletin_list.php?code="+stockCode.slice(2));

    var date=new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1>10 ? date.getMonth()+1 : "0"+(date.getMonth()+1);
    var day=date.getDate()>10 ? date.getDate() : "0"+date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();

    var dateStr=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;

    $(".layerDateDiv span").text(dateStr);

    $(".layerImageDiv img").attr("src","http://fchart.sina.com.cn/newchart/small/b"+stockCode+".gif");

    $("#yjbb_yjbg_link").attr("href","http://biz.finance.sina.com.cn/qmx/stockreports.php?symbol="+stockCode.slice(2));
    $("#yjbb_cjmx_link").attr("href","http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradedetail.php?symbol="+stockCode);
    $("#yjbb_ddzz_link").attr("href","http://vip.stock.finance.sina.com.cn/quotes_service/view/cn_bill.php?symbol="+stockCode);
    $("#yjbb_gsjj_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vCI_CorpInfo/stockid/"+stockCode.slice(2)+".phtml");
    $("#yjbb_gbjg_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vCI_StockStructure/stockid/"+stockCode.slice(2)+".phtml");
    $("#yjbb_cwsj_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vFD_FinanceSummary/stockid/"+stockCode.slice(2)+"/displaytype/4.phtml");
}


/*function openMouseOverLayerDiv(element,stockCode) {
 var left=$(element).offset().left+7;
 var top=$(element).offset().top+35;

 $("#mouseOverLayerDiv").css({
 "display":"block",
 "left":left,
 "top":top
 });

 $("#yjbb_zxg_link").attr("href","http://vip.stock.finance.sina.com.cn/portfolio/qjia.php?symbol="+stockCode+"&ru=http://vip.stock.finance.sina.com.cn/q/go.php/vFinanceAnalyze/kind/mainindex/index.phtml");
 $("#yjbb_zixun_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vCB_AllNewsStock/symbol/"+stockCode+".phtml");
 $("#yjbb_guba_link").attr("href","http://guba.sina.com.cn/bar.php?name="+stockCode);
 $("#yjbb_gonggao_link").attr("href","http://biz.finance.sina.com.cn/stock/company/bulletin_list.php?code="+stockCode.slice(2));

 var date=new Date();

 var year=date.getFullYear();
 var month=date.getMonth()+1>10 ? date.getMonth()+1 : "0"+(date.getMonth()+1);
 var day=date.getDate()>10 ? date.getDate() : "0"+date.getDate();
 var hour=date.getHours();
 var minute=date.getMinutes();
 var second=date.getSeconds();

 var dateStr=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;

 $(".layerDateDiv span").text(dateStr);

 $(".layerImageDiv img").attr("src","http://fchart.sina.com.cn/newchart/small/b"+stockCode+".gif");

 $("#yjbb_yjbg_link").attr("href","http://biz.finance.sina.com.cn/qmx/stockreports.php?symbol="+stockCode.slice(2));
 $("#yjbb_cjmx_link").attr("href","http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradedetail.php?symbol="+stockCode);
 $("#yjbb_ddzz_link").attr("href","http://vip.stock.finance.sina.com.cn/quotes_service/view/cn_bill.php?symbol="+stockCode);
 $("#yjbb_gsjj_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vCI_CorpInfo/stockid/"+stockCode.slice(2)+".phtml");
 $("#yjbb_gbjg_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vCI_StockStructure/stockid/"+stockCode.slice(2)+".phtml");
 $("#yjbb_cwsj_link").attr("href","http://money.finance.sina.com.cn/corp/go.php/vFD_FinanceSummary/stockid/"+stockCode.slice(2)+"/displaytype/4.phtml");
 }*/


function closeMouseOverLayerDiv() {
    $("#mouseOverLayerDiv").css("display","none");
}

function yjbbLayerSearch() {
    var queryText=$("#yjbbLayerInput").val();
    var stockType=$("#yjbbLayerSelect option:selected").attr("value");

    window.open ("http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+queryText+"&country="+stockType+"&Submit=%B2%E9%D1%AF");
}




function beginSearch(index){
    var s_i=$("#s_i option:selected").attr("value");
    var s_a=$("#s_a option:selected").attr("value");
    var s_c=$("#s_c option:selected").attr("value");
    var s_rd=$("#s_rd option:selected").attr("value");
    var s_q=$("#s_q option:selected").attr("value");

    /*var sortFeild="";

     $("#block_1 thead th").each(function (i) {
     if($(this).css("background-image")!="none"){
     sortFeild=FDC_DC.blocks[0].field[i];
     }
     });*/

    /*//因为dealBlocks里会对asc进行一次调整，所以这里先改变他的值，以保持asc的值不变
    if(FDC_DC.asc==0)
        FDC_DC.asc=1;
    else
        FDC_DC.asc=0;*/

    FDC_DC.blocks[0].param="[%22yjkb%22,%22"+s_i+"%22,%22"+s_a+"%22,%22"+s_c+"%22,%22"+s_rd+"%22,%22"+s_q+"%22,%22{sort}%22,{asc},{page},{num}]";

    FDC_DC.dealBlocks(0,"");
}