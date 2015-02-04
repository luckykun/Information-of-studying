/*
    date:2014-08-14
    author:xiezhiqiang
*/
(function(){
    var futures_xhsj_boce={
        //表格字段升降序
        asc:0,
        //代码数组
        symbolArr:[],
        //代码script标签
        codeDataScript:null,
        //页数script标签
        totalPageScript:null,
        //表格数据script标签
        tableDataScript:null,
        //行情接口id
        hqNode:"",
        //接口数据总数
        dataCount:0,
        //二维数组，保存表格所有数据
        totalArray:[],

        //初始化，绑定事件
        initEvents:function(){
            //为pageDiv里的分页标签们添加事件
            $("#pageDiv_0 input[type=button]").attr("onclick","futures_xhsj_boce.gotoPage()");
            $("#pageDiv_0 .firstPageSpan").attr("onclick","futures_xhsj_boce.firstPage()");
            $("#pageDiv_0 .lastPageSpan").attr("onclick","futures_xhsj_boce.lastPage()");
            $("#pageDiv_0 .previousPageSpan").attr("onclick","futures_xhsj_boce.previousPage()");
            $("#pageDiv_0 .nextPageSpan").attr("onclick","futures_xhsj_boce.nextPage()");

            //为表格字段排序绑定事件
            var thList=$("#block_1 thead th");
            for(var i=0; i<thList.length;i++){
                //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                if($(thList[i]).find("span").length!=0){
                    //为含有span标签的th标签绑定事件
                    $(thList[i]).find("span").attr("onclick","futures_xhsj_boce.fieldSort(this)");
                }
            }

            //为每页显示条数绑定事件
            $("#numberDiv_0").find("a").attr("onclick","futures_xhsj_boce.changeNumber(this)");
        },

        //响应页数跳转按钮点击事件
        gotoPage:function(){
            var currentPageSpan=$("#pageDiv_0 .currentPageSpan");
            var totalPage=$("#pageDiv_0 .totalPageSpan").text();

            var inputPage=$("#pageDiv_0 input[type=text]").val();

            if(parseInt(inputPage)){
                if(parseInt(inputPage)<1 || parseInt(inputPage)>parseInt(totalPage)){
                    //alert("输入的数字超出范围。");
                    showmsg("输入的数字超出范围。",1);
                    return;
                }

                currentPageSpan.text(parseInt(inputPage));
                futures_xhsj_boce.insertTableData();
            }
            else{
                //alert("输入的数据有误。");
                showmsg("输入的数据有误。",1);
            }
        },

        //响应首页span点击事件
        firstPage:function(){
            $("#pageDiv_0 .currentPageSpan").text("1");
            futures_xhsj_boce.insertTableData();
        },

        //响应尾页span点击事件
        lastPage:function (){
            var totalPage=$("#pageDiv_0 .totalPageSpan").text();
            $("#pageDiv_0 .currentPageSpan").text(totalPage);
            futures_xhsj_boce.insertTableData();
        },

        //响应上一页span点击事件
        previousPage:function(){
            var currentPageSpan= $("#pageDiv_0 .currentPageSpan");

            if(parseInt(currentPageSpan.text())-1<1){
                //alert("已到首页。");
                showmsg("已到首页。",1);
            }
            else{
                currentPageSpan.text(parseInt(currentPageSpan.text())-1);
                futures_xhsj_boce.insertTableData();
            }
        },

        //响应下一页span点击事件
        nextPage:function() {
            var currentPageSpan=$("#pageDiv_0 .currentPageSpan");
            var totalPage= $("#pageDiv_0 .totalPageSpan").text();

            if(parseInt(currentPageSpan.text())+1>parseInt(totalPage)){
                //alert("已到尾页。");
                showmsg("已到尾页。",1);
            }
            else{
                currentPageSpan.text(parseInt(currentPageSpan.text())+1);
                futures_xhsj_boce.insertTableData();
            }
        },

        //响应每页显示条数span标签点击事件
        changeNumber:function(element){
            //每次改变每页显示条数时，表格头部的背景箭头去掉
            var thSpan="#block_1 thead th";
            $(thSpan).css("background","");

            $(element).parent().find("a").removeClass("currentNum");
            $(element).addClass("currentNum");

            $("#pageDiv_0 .currentPageSpan").text("1");


            var number=$("#numberDiv_0 .currentNum").text();
            var totalPage=Math.ceil(futures_xhsj_boce.dataCount/number);//计算总页数
            $("#pageDiv_0 .totalPageSpan").text(totalPage);


            //处理并显示数据
            futures_xhsj_boce.insertTableData();
        },

        //点击表头时，改变背景色
        fieldSort:function(element){
            $(element).parent().parent().find("th").css("background","");

            if(futures_xhsj_boce.asc==1){
                $(element).parent().css("background","url('images/down_arrow.gif') no-repeat center right");
                futures_xhsj_boce.asc=0;
            }
            else{
                $(element).parent().css("background","url('images/up_arrow.gif') no-repeat center right");
                futures_xhsj_boce.asc=1;
            }

            var index=0;
            if($(".fixedThead").length!=0)
                index=$("#block_1 .fixedThead tr th").index($(element).parent());
            else
                index=$("#block_1 thead tr th").index($(element).parent());

            //var index=$("#block_1 thead tr th").index($(element).parent());
			
            //arrSort(d, s, asc)参数分别为：二维数组，排序的字段在数组对应的索引，升降序
            futures_xhsj_boce.totalArray=futures_xhsj_boce.arrSort(futures_xhsj_boce.totalArray,index,futures_xhsj_boce.asc);
            futures_xhsj_boce.insertTableData();
        },

        ajaxTotalPage:function(){
            //var countURL="http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/getTotalPage/Market_Center.getNameCount?node="+futures_xhsj_boce.hqNode;
            var countURL="http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/getTotalPage/Market_Center.getBohaiCount?node="+futures_xhsj_boce.hqNode;

            /*var theScript=$("<script>").attr("src",countURL);
            $("head").append(theScript);
            theScript.remove();*/

            futures_xhsj_boce.totalPageScript = document.createElement("script");
            futures_xhsj_boce.totalPageScript.setAttribute("src",countURL);
            document.body.insertBefore(futures_xhsj_boce.totalPageScript, document.body.childNodes[0]);
        },

        getASC:function(){
            var sortFeild="";
            var blockId="#block_1";

            $(blockId+" thead th").each(function (i) {
                if($(this).css("background-image")!="none"){
                    var imageUrlArr=$(this).css("background-image").split("/");
                    if(imageUrlArr[imageUrlArr.length-1]=="down_arrow.gif)")
                        futures_xhsj_boce.asc=0;
                    else
                        futures_xhsj_boce.asc=1;
                }
            });
        },

        getSymbol:function(){
            //var symbolURL="http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/symbolData/Market_Center.getNameList?_s_r_a=init"+"&node="+futures_xhsj_boce.hqNode;
            var symbolURL="http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/symbolData/Market_Center.getBohaiSymbols?node="+futures_xhsj_boce.hqNode;

            /*var theScript=$("<script>").attr("src",symbolURL);
            $("head").append(theScript);
            theScript.remove();*/

            futures_xhsj_boce.codeDataScript=document.createElement("script");
            futures_xhsj_boce.codeDataScript.setAttribute("src",symbolURL);
            document.body.insertBefore(futures_xhsj_boce.codeDataScript, document.body.childNodes[0]);
        },

        getTableData:function(){
            var dataURL="http://hq.sinajs.cn/?_="+Math.random()+"&list="+futures_xhsj_boce.symbolArr.toString();

            //返回数据的“涨跌幅”和“涨跌额”需要计算
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");

            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", dataURL);
            head.appendChild(script);

            //如果是IE
            if(document.all){
                script.onreadystatechange=function(){
                    if(script.readyState=="loaded" || script.readyState=="complete") {
                        futures_xhsj_boce.pushIntoArray();
                        futures_xhsj_boce.insertTableData();
                    }
                }
            }
            else{
                script.onload=function(){
                    futures_xhsj_boce.pushIntoArray();
                    futures_xhsj_boce.insertTableData();
                }
            }

            futures_xhsj_boce.tableDataScript=script;
        },

        pushIntoArray:function(){
            //将数据放在二维数组里
            for(var i=0;i<futures_xhsj_boce.symbolArr.length;i++){
                var currentArray=new Array();

                var currentDataArr=eval("hq_str_"+futures_xhsj_boce.symbolArr[i]).split(",");

                currentArray.push(currentDataArr[0]);//代码
                currentArray.push(currentDataArr[1]);//名称
                currentArray.push(currentDataArr[2]);//最新价
                currentArray.push(currentDataArr[3]);//涨跌
                currentArray.push(currentDataArr[4]);//买价
                currentArray.push(currentDataArr[5]);//买量
                currentArray.push(currentDataArr[6]);//卖价
                currentArray.push(currentDataArr[7]);//卖量
                currentArray.push(currentDataArr[8]);//成交量
                currentArray.push(currentDataArr[9]);//今开盘
                currentArray.push(currentDataArr[10]);//昨结算
                currentArray.push(currentDataArr[11]);//最高价
                currentArray.push(currentDataArr[12]);//最低价

                futures_xhsj_boce.totalArray.push(currentArray);
            }
        },

        insertTableData:function(){
            var page=parseInt($(".currentPageSpan").text());
            var number=parseInt($("#numberDiv_0 .currentNum").text());

            var beginIndex=(page-1)*number;
            var totalLength=0;

            if(page*number>futures_xhsj_boce.symbolArr.length){
                totalLength=futures_xhsj_boce.symbolArr.length;
            }
            else{
                totalLength=page*number;
            }

            var tableHTML="";

            for(var i=beginIndex;i<totalLength;i++){
                var trDataArr=futures_xhsj_boce.totalArray[i];

                tableHTML+="<tr>";
                for(var j=0;j<trDataArr.length;j++){
                    tableHTML+="<td>"+trDataArr[j]+"</td>";
                    /*switch(j){
                        case 0:
                            tableHTML+="<td><a href='http://finance.sina.com.cn/money/forex/hq/"+trDataArr[0]+".shtml' target='_blank'>"+trDataArr[0]+"</a></td>";//代码
                            break;
                        case 1:
                            tableHTML+="<td><a href='http://finance.sina.com.cn/money/forex/hq/"+trDataArr[0]+".shtml' target='_blank'>"+trDataArr[1]+"</a></td>";//名称
                            break;
                        case 2:
                            if(parseFloat(trDataArr[4])>0){
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[2]+"</span></td>";
                            }
                            if(parseFloat(trDataArr[4])<0){
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[2]+"</span></td>";
                            }
                            break;
                        case 3:
                            if(parseFloat(trDataArr[3])>0){
                                tableHTML+="<td><span class='percentRed'>\+"+trDataArr[3]+"%</span></td>";
                            }
                            if(parseFloat(trDataArr[3])<0){
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[3]+"%</span></td>";
                            }
                            break;
                        case 4:
                            if(parseFloat(trDataArr[4])>0){
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[4]+"</span></td>";
                            }
                            if(parseFloat(trDataArr[4])<0){
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[4]+"</span></td>";
                            }
                            break;
                        default :
                            tableHTML+="<td>"+trDataArr[j]+"</td>";
                    }*/
                }
                tableHTML+="</tr>";
            }

            $("#block_1 tbody").html(tableHTML);

            //表格数据添加完毕，删除表格数据script标签
            $(futures_xhsj_boce.tableDataScript).remove();
        },

        arrSort:function(d, s, asc) {
            var j = d;

            if(s==0){
                j.sort(function(a, b) {
                    return a[s].localeCompare(b[s]);
                });
                if (asc == 0) {
                    j.reverse();
                }
            }
            else{
                j.sort(function(a, b) {
                    if (asc == 1) {
                        return parseFloat(a[s]) - parseFloat(b[s]);
                    } else {
                        return parseFloat(b[s]) - parseFloat(a[s]);
                    }
                });
            }

            return j;
        }
    }

    window.futures_xhsj_boce=futures_xhsj_boce;
})();


function symbolData(data){
    try{
        //删除掉刚才请求接口时创建的script的标签
        document.body.removeChild(futures_xhsj_boce.codeDataScript);
    }
    catch(error){
        //do nothing
    }

    futures_xhsj_boce.symbolArr=[];
    for(var i=0;i<data.length;i++){
        futures_xhsj_boce.symbolArr.push("bohai_exchange_"+data[i].symbol);
    }
    futures_xhsj_boce.symbolArr.sort();

    futures_xhsj_boce.getTableData();
}

function getTotalPage(data){
    try{
        //删除掉刚才请求接口时创建的script的标签
        document.body.removeChild(futures_xhsj_boce.totalPageScript);
    }
    catch(error){
        //do nothing
    }

    futures_xhsj_boce.dataCount=parseInt(data);

    var count=parseInt(data);

    var number=$("#numberDiv_0 .currentNum").text();
    var totalPage=Math.ceil(count/number);//计算总页数

    $("#pageDiv_0 .totalPageSpan").text(totalPage);
}