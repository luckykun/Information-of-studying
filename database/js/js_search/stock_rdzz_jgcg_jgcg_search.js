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

    var theURL="http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22jgcg_detail%22,%22"+stockCode+"%22,%22"+s_rd+s_q+"%22]]";

    //alert(stockCode);

    $.ajax({
        type:"get",
        url:theURL,
        dataType:"jsonp",
        success:function(data){
            var detailTable=createDetailTable(data[0].items.fund);
            currentTr.after(detailTable);
        }
    });
}

function createDetailTable(data){
    var detailTableStr="<tr class='detailTr'>";
        detailTableStr+="   <td colspan='9' style='background-color:#DEDEE0; padding:10px;'>";
        detailTableStr+="       <table>";
        detailTableStr+="           <thead>";
        detailTableStr+="               <tr>";
        detailTableStr+="                   <td>基金名称</td>";
        detailTableStr+="                   <td>持股数(万股)</td>";
        detailTableStr+="                   <td>持股比例(%)</td>";
        detailTableStr+="                   <td>持股比例增幅(%)</td>";
        detailTableStr+="                   <td>占流通股比例(%)</td>";
        detailTableStr+="                   <td>占流通股比例增幅(%)</td>";
        detailTableStr+="               </tr>";
        detailTableStr+="           </thead>";
        detailTableStr+="           <tbody>";



        for(var key in data){
            if(key!="total"){
                detailTableStr+="<tr>";
                detailTableStr+="   <td>";
                detailTableStr+="       <a href='"+"http://finance.sina.com.cn/fund/quotes/of"+data[key].orgCode+"/bc.shtml' target='_blank'>"+data[key].orgName+"</a>";
                detailTableStr+="   </td>";
                detailTableStr+="   <td>"+parseFloat(data[key].stockAmount).toFixed(2)+"</td>";
                detailTableStr+="   <td>"+parseFloat(data[key].stockPercent).toFixed(2)+"</td>";
                detailTableStr+="   <td>"+parseFloat(data[key].stockPercentBalance).toFixed(2)+"</td>";
                detailTableStr+="   <td>"+parseFloat(data[key].currentPercent).toFixed(2)+"</td>";
                detailTableStr+="   <td>"+parseFloat(data[key].currentPercentBalance).toFixed(2)+"</td>";
                detailTableStr+="</tr>";
            }
            else{
                detailTableStr+="<tr>";
                detailTableStr+="   <td>小计</td>";
                if(data[key].totalAmount==undefined){
                    detailTableStr+="<td>--</td>";
                }
                else{
                    detailTableStr+="<td>"+parseFloat(data[key].totalAmount).toFixed(2)+"</td>";
                }
                //detailTableStr+="   <td>"+parseFloat(data[key].totalAmount).toFixed(2)+"</td>";
                if(data[key].totalStockPercent==undefined){
                    detailTableStr+="<td>--</td>";
                }
                else{
                    detailTableStr+="<td>"+parseFloat(data[key].totalStockPercent).toFixed(2)+"</td>";
                }
                //detailTableStr+="   <td>"+data[key].totalStockPercent+"</td>";
                if(data[key].totalPercentBalance==undefined){
                    detailTableStr+="<td>--</td>";
                }
                else{
                    detailTableStr+="<td>"+parseFloat(data[key].totalPercentBalance).toFixed(2)+"</td>";
                }
                //detailTableStr+="   <td>"+data[key].totalPercentBalance+"</td>";
                if(data[key].totalCurrentPercent==undefined){
                    detailTableStr+="<td>--</td>";
                }
                else{
                    detailTableStr+="<td>"+parseFloat(data[key].totalCurrentPercent).toFixed(2)+"</td>";
                }
                //detailTableStr+="   <td>"+data[key].totalCurrentPercent+"</td>";
                if(data[key].totalCurrentBalance==undefined){
                    detailTableStr+="<td>--</td>";
                }
                else{
                    detailTableStr+="<td>"+parseFloat(data[key].totalCurrentBalance).toFixed(2)+"</td>";
                }
                //detailTableStr+="   <td>"+data[key].totalCurrentBalance+"</td>";
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


    FDC_DC.blocks[index].param="[%22jgcg%22,%22"+stockCode.slice(2)+"%22,%22"+s_rd+"%22,%22"+s_q+"%22,%22{sort}%22,{asc},{page},{num}]";

    FDC_DC.dealBlocks(index,"");

    if($("#block_1 tbody").text().trim()=="")
        alert("无搜索结果。");
}