/*
 date:2014-09-18
 author:xiezhiqiang
 */
(function(){
    var fund_jjfl_fjjj={
        //表格字段升降序
        asc:0,
        //代码数组
        symbolArr:[],
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
            $("#pageDiv_0 input[type=button]").attr("onclick","fund_jjfl_fjjj.gotoPage()");
            $("#pageDiv_0 .firstPageSpan").attr("onclick","fund_jjfl_fjjj.firstPage()");
            $("#pageDiv_0 .lastPageSpan").attr("onclick","fund_jjfl_fjjj.lastPage()");
            $("#pageDiv_0 .previousPageSpan").attr("onclick","fund_jjfl_fjjj.previousPage()");
            $("#pageDiv_0 .nextPageSpan").attr("onclick","fund_jjfl_fjjj.nextPage()");

            //为表格字段排序绑定事件
            var thList=$("#block_1 thead th");
            for(var i=0; i<thList.length;i++){
                //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                if($(thList[i]).find("span").length!=0){
                    //为含有span标签的th标签绑定事件
                    $(thList[i]).find("span").attr("onclick","fund_jjfl_fjjj.fieldSort(this)");
                }
            }

            //为每页显示条数绑定事件
            $("#numberDiv_0").find("a").attr("onclick","fund_jjfl_fjjj.changeNumber(this)");
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
                fund_jjfl_fjjj.insertTableData();
            }
            else{
                //alert("输入的数据有误。");
                showmsg("输入的数据有误。",1);
            }
        },

        //响应首页span点击事件
        firstPage:function(){
            $("#pageDiv_0 .currentPageSpan").text("1");
            fund_jjfl_fjjj.insertTableData();
        },

        //响应尾页span点击事件
        lastPage:function (){
            var totalPage=$("#pageDiv_0 .totalPageSpan").text();
            $("#pageDiv_0 .currentPageSpan").text(totalPage);
            fund_jjfl_fjjj.insertTableData();
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
                fund_jjfl_fjjj.insertTableData();
            }
        },

        //响应下一页span点击事件
        nextPage:function() {
            var currentPageSpan=$("#pageDiv_0 .currentPageSpan");
            var totalPage= $("#pageDiv_0 .totalPageSpan").text();

            if(parseInt(currentPageSpan.text())+1>parseInt(totalPage)){
                alert("已到尾页。");
                showmsg("已到尾页。",1);
            }
            else{
                currentPageSpan.text(parseInt(currentPageSpan.text())+1);
                fund_jjfl_fjjj.insertTableData();
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
            var totalPage=Math.ceil(fund_jjfl_fjjj.dataCount/number);//计算总页数
            $("#pageDiv_0 .totalPageSpan").text(totalPage);


            //处理并显示数据
            fund_jjfl_fjjj.insertTableData();
        },

        //点击表头时，改变背景色
        fieldSort:function(element){
            $(element).parent().parent().find("th").css("background","");

            if(fund_jjfl_fjjj.asc==1){
                $(element).parent().css("background","url('images/down_arrow.gif') no-repeat center right");
                fund_jjfl_fjjj.asc=0;
            }
            else{
                $(element).parent().css("background","url('images/up_arrow.gif') no-repeat center right");
                fund_jjfl_fjjj.asc=1;
            }

            var index=0;
            if($(".fixedThead").length!=0)
                index=$("#block_1 .fixedThead tr th").index($(element).parent());
            else
                index=$("#block_1 thead tr th").index($(element).parent());

            //var index=$("#block_1 thead tr th").index($(element).parent());

            //arrSort(d, s, asc)参数分别为：二维数组，排序的字段在数组对应的索引，升降序
            fund_jjfl_fjjj.totalArray=fund_jjfl_fjjj.arrSort(fund_jjfl_fjjj.totalArray,index,fund_jjfl_fjjj.asc);
            fund_jjfl_fjjj.insertTableData();
        },

        /*ajaxTotalPage:function(){
            var countURL="http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/getTotalPage/Market_Center.getNameCount?node="+fund_jjfl_fjjj.hqNode;

            *//*var theScript=$("<script>").attr("src",countURL);
             $("head").append(theScript);
             theScript.remove();*//*

            var theScript = document.createElement("script");
            theScript.setAttribute("src",countURL);
            document.body.insertBefore(theScript, document.body.childNodes[0]);
            document.body.removeChild(theScript);
        },*/

        getTotalPage:function(){
            fund_jjfl_fjjj.dataCount=CREFUND.split(",").length;

            var count=CREFUND.split(",").length;

            var number=$("#numberDiv_0 .currentNum").text();
            var totalPage=Math.ceil(count/number);//计算总页数

            $("#pageDiv_0 .totalPageSpan").text(totalPage);
        },

        /*getASC:function(){
            var sortFeild="";
            var blockId="#block_1";

            $(blockId+" thead th").each(function (i) {
                if($(this).css("background-image")!="none"){
                    var imageUrlArr=$(this).css("background-image").split("/");
                    if(imageUrlArr[imageUrlArr.length-1]=="down_arrow.gif)")
                        fund_jjfl_fjjj.asc=0;
                    else
                        fund_jjfl_fjjj.asc=1;
                }
            });
        },*/

        symbolData:function(){
            var symbolList=CREFUND.split(",");

            fund_jjfl_fjjj.symbolArr=[];
            for(var i=0;i<symbolList.length;i++){
                fund_jjfl_fjjj.symbolArr.push(symbolList[i].split("|")[0]);
            }
            fund_jjfl_fjjj.symbolArr.sort();
        },

        getTableData:function(){
            var tempSymbolList=[];
            for(var i=0;i<fund_jjfl_fjjj.symbolArr.length;i++){
                tempSymbolList.push("f_"+fund_jjfl_fjjj.symbolArr[i]);

                //sh 60,90,58   sz 00,30,20
                if(fund_jjfl_fjjj.symbolArr[i].substr(0,2)=="60" || fund_jjfl_fjjj.symbolArr[i].substr(0,2)=="90" || fund_jjfl_fjjj.symbolArr[i].substr(0,2)=="58")
                    tempSymbolList.push("sh"+fund_jjfl_fjjj.symbolArr[i]);
                else
                    tempSymbolList.push("sz"+fund_jjfl_fjjj.symbolArr[i]);
            }

            var dataURL="http://hq.sinajs.cn/?_="+Math.random()+"&list="+tempSymbolList.toString();

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
                        fund_jjfl_fjjj.pushIntoArray();
                        fund_jjfl_fjjj.insertTableData();
                    }
                }
            }
            else{
                script.onload=function(){
                    fund_jjfl_fjjj.pushIntoArray();
                    fund_jjfl_fjjj.insertTableData();
                }
            }

            fund_jjfl_fjjj.tableDataScript=script;
        },

        pushIntoArray:function(){
            //将数据放在二维数组里
            for(var i=0;i<fund_jjfl_fjjj.symbolArr.length;i++){
                var currentArray=new Array();
                currentArray.push(fund_jjfl_fjjj.symbolArr[i]);//代码

                var currentDataArr=eval("hq_str_f_"+fund_jjfl_fjjj.symbolArr[i]).split(",");

                currentArray.push(currentDataArr[0]);//名称
                if(currentDataArr[1]=="")
                    currentArray.push("--");//最新价
                else
                    currentArray.push(parseFloat(currentDataArr[1]).toFixed(4));//最新价

                var currentDataNewArr=[];

                //sh 60,90,58   sz 00,30,20
                if(fund_jjfl_fjjj.symbolArr[i].substr(0,2)=="60" || fund_jjfl_fjjj.symbolArr[i].substr(0,2)=="90" || fund_jjfl_fjjj.symbolArr[i].substr(0,2)=="58")
                    currentDataNewArr=eval("hq_str_sh"+fund_jjfl_fjjj.symbolArr[i]).split(",");
                else
                    currentDataNewArr=eval("hq_str_sz"+fund_jjfl_fjjj.symbolArr[i]).split(",");

                if(currentDataNewArr.length==1){
                    currentArray.push("--");
                    currentArray.push("--");
                    currentArray.push("--");
                    currentArray.push("--");
                    currentArray.push("--");
                    currentArray.push("--");
                    currentArray.push("--");
                }
                else{
                    currentArray.push(parseFloat(currentDataNewArr[3]).toFixed(3));//最新价
                    currentArray.push(parseFloat(currentDataNewArr[3]-currentDataNewArr[2]).toFixed(3));//涨跌额=最新价-昨收价
                    currentArray.push(parseFloat((currentDataNewArr[3]-currentDataNewArr[2])/currentDataNewArr[2]).toFixed(3));//涨跌幅=(最新价-昨收价)/昨收价
                    currentArray.push(currentDataNewArr[2]);//昨收价
                    currentArray.push(currentDataNewArr[1]);//今开价
                    currentArray.push(parseInt(currentDataNewArr[8]/100));//成交量
                    currentArray.push(parseFloat(currentDataNewArr[9]/10000).toFixed(2));//成交额
                }

                currentArray.push("--");//关注
                currentArray.push("--");//基金吧

                fund_jjfl_fjjj.totalArray.push(currentArray);
            }
        },

        insertTableData:function(){
            var page=parseInt($(".currentPageSpan").text());
            var number=parseInt($("#numberDiv_0 .currentNum").text());

            var beginIndex=(page-1)*number;
            var totalLength=0;

            if(page*number>fund_jjfl_fjjj.symbolArr.length){
                totalLength=fund_jjfl_fjjj.symbolArr.length;
            }
            else{
                totalLength=page*number;
            }

            var tableHTML="";

            for(var i=beginIndex;i<totalLength;i++){
                var trDataArr=fund_jjfl_fjjj.totalArray[i];

                tableHTML+="<tr>";
                for(var j=0;j<trDataArr.length;j++){
                    switch(j){
                        case 0:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[0]+"&country=fund' target='_blank'>"+trDataArr[0]+"</a></td>";//代码
                            break;
                        case 1:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[0]+"&country=fund' target='_blank'>"+trDataArr[1]+"</a></td>";//名称
                            break;
                        case 3:
                            if(trDataArr[4]>0)
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[3]+"</span></td>";//最新价
                            if(trDataArr[4]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[3]+"</span></td>";//最新价
                            if(trDataArr[4]==0 || trDataArr[4]=="--")
                                tableHTML+="<td>"+trDataArr[3]+"</td>";//涨跌额
                            break;
                        case 4:
                            if(trDataArr[4]>0)
                                tableHTML+="<td><span class='percentRed'>\+"+trDataArr[4]+"</span></td>";//涨跌额
                            if(trDataArr[4]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[4]+"</span></td>";//涨跌额
                            if(trDataArr[4]==0 || trDataArr[4]=="--")
                                tableHTML+="<td>"+trDataArr[4]+"</td>";//涨跌额
                            break;
                        case 5:
                            if(trDataArr[5]>0)
                                tableHTML+="<td><span class='percentRed'>\+"+trDataArr[5]+"%</span></td>";//涨跌幅
                            if(trDataArr[5]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[5]+"%</span></td>";//涨跌幅
                            if(trDataArr[5]==0)
                                tableHTML+="<td>"+trDataArr[5]+"%</td>";//涨跌幅
                            if(trDataArr[5]=="--")
                                tableHTML+="<td>"+trDataArr[5]+"</td>";//涨跌幅
                            break;
                        case 10:
                            break;
                        case 11:
                            tableHTML+="<td><a href='http://guba.sina.com.cn/bar.php?fundType=fund&name="+trDataArr[0]+"' target='_blank'><span style='display:inline-block; width:20px; height:15px; background:url(images/sc_gb.png) no-repeat 3px 3px;'></span></a></td>";//基金吧
                            break;
                        default :
                            tableHTML+="<td>"+trDataArr[j]+"</td>";
                    }
                }
                tableHTML+="</tr>";
            }

            $("#block_1 tbody").html(tableHTML);

            //表格数据添加完毕，删除表格数据script标签
            $(fund_jjfl_fjjj.tableDataScript).remove();
        },

        arrSort:function(d, s, asc) {
            var j = d;

            if(s==0 || s==1){
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

    window.fund_jjfl_fjjj=fund_jjfl_fjjj;
})();

