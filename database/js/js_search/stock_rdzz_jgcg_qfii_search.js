function viewDetail(element){
    if($(element).text()=="展开详情"){
        $(element).text("关闭详情");

        if($(element).parent().parent().next().attr("class")!="detailTr"){
            //添加详细信息
            insertDetail(element);
        }
        else{
            //直接显示
            $(element).parent().parent().next().css("display","table-row")
        }
    }
    else{
        $(element).text("展开详情");
        $(element).parent().parent().next().css("display","none");
    }
}

function insertDetail(element) {
    var currentTr=$(element).parent().parent();
    var stockCode=$(element).parent().parent().find("td").first().text();

    var s_rd=$("#s_rd option:selected").attr("value");
    var s_q=$("#s_q option:selected").attr("value");

    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22jg_detail%22,%22"+stockCode+"%22,%22QFII%22,%22"+s_rd+s_q+"%22]]";

    //alert(stockCode);

    $.ajax({
        type:"get",
        url:theURL,
        dataType:"jsonp",
        success:function(data){
            var detailTable=createDetailTable(data[0].items.data);
            currentTr.after(detailTable);
        }
    });
}

function createDetailTable(data){
    var detailTableStr="<tr class='detailTr'>";
        detailTableStr+="   <td colspan='10' style='background-color:#DEDEE0; padding:10px;'>";
        detailTableStr+="       <table>";
        detailTableStr+="           <thead>";
        detailTableStr+="               <tr>";
        detailTableStr+="                   <td>QFII代码</td>";
        detailTableStr+="                   <td>QFII名称</td>";
        detailTableStr+="                   <td>本期持有(万股)</td>";
        detailTableStr+="                   <td>持股占已流通A股比例(%)</td>";
        detailTableStr+="                   <td>同上期增减(万股)</td>";
        detailTableStr+="                   <td>持股比例(%)</td>";
        detailTableStr+="                   <td>持股比例增幅(%)</td>";
        detailTableStr+="               </tr>";
        detailTableStr+="           </thead>";
        detailTableStr+="           <tbody>";



        for(var key in data){
            if(key!="total"){
                detailTableStr+="<tr>";
                detailTableStr+="   <td>"+data[key].orgCode+"</td>";
                detailTableStr+="   <td>"+data[key].orgName+"</td>";
                detailTableStr+="   <td>"+data[key].stockAmount+"</td>";
                detailTableStr+="   <td>"+data[key].stockPercent+"</td>";
                detailTableStr+="   <td>"+data[key].stockAmountBalance+"</td>";
                detailTableStr+="   <td>"+data[key].stockPercentLast+"</td>";
                detailTableStr+="   <td>"+data[key].stockPercentBalance+"</td>";
                detailTableStr+="</tr>";
            }
        }

        detailTableStr+="           </tbody>";
        detailTableStr+="       </table>";
        detailTableStr+="   </td>";
        detailTableStr+="</tr>";


    return $(detailTableStr);
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

    var s_rd=$("#s_rd option:selected").attr("value");
    var s_q=$("#s_q option:selected").attr("value");


    FDC_DC.blocks[index].param="[%22jg%22,%22"+stockCode.slice(2)+"%22,%22QFII%22,%22"+s_rd+s_q+"%22,{page},{num}]";

    FDC_DC.dealBlocks(index,"");
}