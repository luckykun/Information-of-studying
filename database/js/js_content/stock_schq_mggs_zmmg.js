/*
 date:2014-09-10
 author:xiezhiqiang
 */
(function(){
    var stock_schq_mggs_zmmg={
        //表格字段升降序
        asc:0,
        //代码数组
        symbolArr:[],
        //代码script标签
        codeDataScript:null,
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
            $("#pageDiv_0 input[type=button]").attr("onclick","stock_schq_mggs_zmmg.gotoPage()");
            $("#pageDiv_0 .firstPageSpan").attr("onclick","stock_schq_mggs_zmmg.firstPage()");
            $("#pageDiv_0 .lastPageSpan").attr("onclick","stock_schq_mggs_zmmg.lastPage()");
            $("#pageDiv_0 .previousPageSpan").attr("onclick","stock_schq_mggs_zmmg.previousPage()");
            $("#pageDiv_0 .nextPageSpan").attr("onclick","stock_schq_mggs_zmmg.nextPage()");

            //为表格字段排序绑定事件
            var thList=$("#block_1 thead th");
            for(var i=0; i<thList.length;i++){
                //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                if($(thList[i]).find("span").length!=0){
                    //为含有span标签的th标签绑定事件
                    $(thList[i]).find("span").attr("onclick","stock_schq_mggs_zmmg.fieldSort(this)");
                }
            }

            //为每页显示条数绑定事件
            $("#numberDiv_0").find("a").attr("onclick","stock_schq_mggs_zmmg.changeNumber(this)");
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
                stock_schq_mggs_zmmg.insertTableData();
            }
            else{
                //alert("输入的数据有误。");
                showmsg("输入的数据有误。",1);
            }
        },

        //响应首页span点击事件
        firstPage:function(){
            $("#pageDiv_0 .currentPageSpan").text("1");
            stock_schq_mggs_zmmg.insertTableData();
        },

        //响应尾页span点击事件
        lastPage:function (){
            var totalPage=$("#pageDiv_0 .totalPageSpan").text();
            $("#pageDiv_0 .currentPageSpan").text(totalPage);
            stock_schq_mggs_zmmg.insertTableData();
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
                stock_schq_mggs_zmmg.insertTableData();
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
                stock_schq_mggs_zmmg.insertTableData();
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
            var totalPage=Math.ceil(stock_schq_mggs_zmmg.dataCount/number);//计算总页数
            $("#pageDiv_0 .totalPageSpan").text(totalPage);


            //处理并显示数据
            stock_schq_mggs_zmmg.insertTableData();
        },

        //点击表头时，改变背景色
        fieldSort:function(element){
            $(element).parent().parent().find("th").css("background","");

            if(stock_schq_mggs_zmmg.asc==1){
                $(element).parent().css("background","url('http://www.sinaimg.cn/cj/data_20140924/down_arrow.gif') no-repeat center right");
                stock_schq_mggs_zmmg.asc=0;
            }
            else{
                $(element).parent().css("background","url('http://www.sinaimg.cn/cj/data_20140924/up_arrow.gif') no-repeat center right");
                stock_schq_mggs_zmmg.asc=1;
            }

            var index=0;
            if($(".fixedThead").length!=0)
                index=$("#block_1 .fixedThead tr th").index($(element).parent());
            else
                index=$("#block_1 thead tr th").index($(element).parent());

            //var index=$("#block_1 thead tr th").index($(element).parent());

            //arrSort(d, s, asc)参数分别为：二维数组，排序的字段在数组对应的索引，升降序
            stock_schq_mggs_zmmg.totalArray=stock_schq_mggs_zmmg.arrSort(stock_schq_mggs_zmmg.totalArray,index,stock_schq_mggs_zmmg.asc);
            stock_schq_mggs_zmmg.insertTableData();
        },

        /*ajaxTotalPage:function(){
            var countURL="http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/getTotalPage/Market_Center.getNameCount?node="+stock_schq_mggs_zmmg.hqNode;

            var theScript=$("<script>").attr("src",countURL);
            $("head").append(theScript);
            theScript.remove();
        },*/

        getASC:function(){
            var sortFeild="";
            var blockId="#block_1";

            $(blockId+" thead th").each(function (i) {
                if($(this).css("background-image")!="none"){
                    var imageUrlArr=$(this).css("background-image").split("/");
                    if(imageUrlArr[imageUrlArr.length-1]=="down_arrow.gif)")
                        stock_schq_mggs_zmmg.asc=0;
                    else
                        stock_schq_mggs_zmmg.asc=1;
                }
            });
        },

        getSymbol:function(){
            //var symbolURL="http://stock.finance.sina.com.cn/usstock/api/json_v2.php/US_OpenService.getHqList?num=&page=";
            var symbolURL="http://stock.finance.sina.com.cn/usstock/api/openapi.php/US_OpenService.getHqList?callback=stock_schq_mggs_zmmg.theTableData&num=&page=";

            /*FDC_DC.theRequest=$.ajax({
                type:"get",
                url:symbolURL,
                dataType:"jsonp",
                jsonpCallback:"theTableData",
                data:{
                    _:0000000000000,
                    dpc:1
                },
                success:function(data){
                    //console.log(data);
                    //获取总页数并显示
                    stock_schq_mggs_zmmg.getTotalPage(data.result.data);
                    //获取代码，并通过代码获取表格数据
                    stock_schq_mggs_zmmg.symbolData(data.result.data);
                }
            });*/

            stock_schq_mggs_zmmg.codeDataScript=document.createElement("script");
            stock_schq_mggs_zmmg.codeDataScript.setAttribute("src",symbolURL);
            document.body.insertBefore(stock_schq_mggs_zmmg.codeDataScript, document.body.childNodes[0]);
        },

        theTableData:function(data){
            try{
                //删除掉刚才请求接口时创建的script的标签
                document.body.removeChild(stock_schq_mggs_zmmg.codeDataScript);
            }
            catch(error){
                //do nothing
            }

            //获取总页数并显示
            stock_schq_mggs_zmmg.getTotalPage(data.result.data);
            //获取代码，并通过代码获取表格数据
            stock_schq_mggs_zmmg.symbolData(data.result.data);
        },

        getTableData:function(){
            var newSymbolArr=[];
            var symbolPlaceArr=[];

            for(var i=0;i<stock_schq_mggs_zmmg.symbolArr.length;i++){
                newSymbolArr.push("gb_"+stock_schq_mggs_zmmg.symbolArr[i].replace(".","").toLowerCase());
                symbolPlaceArr.push("gb_"+stock_schq_mggs_zmmg.symbolArr[i].replace(".","").toLowerCase()+"_i");
            }
            var dataURL="http://hq.sinajs.cn/?_="+Math.random()+"&list="+newSymbolArr.toString()+","+symbolPlaceArr.toString();

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
                        stock_schq_mggs_zmmg.pushIntoArray(newSymbolArr);
                        stock_schq_mggs_zmmg.insertTableData();
                    }
                }
            }
            else{
                script.onload=function(){
                    stock_schq_mggs_zmmg.pushIntoArray(newSymbolArr);
                    stock_schq_mggs_zmmg.insertTableData();
                }
            }

            stock_schq_mggs_zmmg.tableDataScript=script;
        },

        pushIntoArray:function(newSymbolArr){
            //将数据放在二维数组里
            for(var i=0;i<newSymbolArr.length;i++){
                var currentArray=new Array();

                var currentDataArr=eval("hq_str_"+newSymbolArr[i]).split(",");

                currentArray.push(currentDataArr[0]);//名称
                currentArray.push(stock_schq_mggs_zmmg.symbolArr[i]);//代码
                currentArray.push(currentDataArr[1]);//最新价
                currentArray.push(currentDataArr[4]);//涨跌额
                currentArray.push(currentDataArr[2]);//涨跌幅
                currentArray.push(currentDataArr[26]);//昨收
                currentArray.push(currentDataArr[5]);//今开
                currentArray.push(currentDataArr[6]);//最高价
                currentArray.push(currentDataArr[7]);//最低价
                currentArray.push(parseFloat(currentDataArr[10]).toLocaleString());//成交量
                currentArray.push(parseFloat(parseFloat(currentDataArr[12])/100000000).toLocaleString());//市值
                currentArray.push(currentDataArr[14]);//市盈率

                var thePlace="--";
                var placeArr=eval("hq_str_"+newSymbolArr[i]+"_i").split(",");
                if(placeArr[0]=="N")
                    thePlace="纽交所";
                if(placeArr[0]=="O")
                    thePlace="纳斯达克交易所";
                if(placeArr[0]=="A")
                    thePlace="美国交易所";

                currentArray.push(thePlace);//上市地

                stock_schq_mggs_zmmg.totalArray.push(currentArray);
            }
        },

        insertTableData:function(){
            var page=parseInt($(".currentPageSpan").text());
            var number=parseInt($("#numberDiv_0 .currentNum").text());

            var beginIndex=(page-1)*number;
            var totalLength=0;

            if(page*number>stock_schq_mggs_zmmg.symbolArr.length){
                totalLength=stock_schq_mggs_zmmg.symbolArr.length;
            }
            else{
                totalLength=page*number;
            }

            var tableHTML="";

            for(var i=beginIndex;i<totalLength;i++){
                var trDataArr=stock_schq_mggs_zmmg.totalArray[i];

                tableHTML+="<tr>";
                for(var j=0;j<trDataArr.length;j++){
                    switch(j){
                        case 0:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[1]+"&country=usstock' target='_blank'>"+trDataArr[1]+"</a></td>";//名称
                            break;
                        case 1:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[1]+"&country=usstock' target='_blank'>"+trDataArr[0]+"</a></td>";//代码
                            break;
                        case 2:
                            if(parseFloat(trDataArr[3])>0){
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[2]+"</span></td>";
                            }
                            if(parseFloat(trDataArr[3])<0){
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[2]+"</span></td>";
                            }
                            if(parseFloat(trDataArr[3])==0){
                                tableHTML+="<td>"+trDataArr[2]+"</td>";
                            }
                            break;
                        case 3:
                            if(parseFloat(trDataArr[3])>0){
                                tableHTML+="<td><span class='percentRed'>\+"+trDataArr[3]+"</span></td>";
                            }
                            if(parseFloat(trDataArr[3])<0){
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[3]+"</span></td>";
                            }
                            if(parseFloat(trDataArr[3])==0){
                                tableHTML+="<td>"+trDataArr[3]+"</td>";
                            }
                            break;
                        case 4:
                            if(parseFloat(trDataArr[4])>0){
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[4]+"%</span></td>";
                            }
                            if(parseFloat(trDataArr[4])<0){
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[4]+"%</span></td>";
                            }
                            if(parseFloat(trDataArr[4])==0){
                                tableHTML+="<td>"+trDataArr[4]+"%</td>";
                            }
                            break;
                        default :
                            tableHTML+="<td>"+trDataArr[j]+"</td>";
                    }
                }
                tableHTML+="</tr>";
            }

            $("#block_1 tbody").html(tableHTML);

            //表格数据添加完毕，删除表格数据script标签
            $(stock_schq_mggs_zmmg.tableDataScript).remove();
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
        },

        symbolData:function(data){
            for(var i=0;i<data.length;i++){
                //stock_schq_mggs_zmmg.symbolArr.push("gb_"+data[i].replace(".","").toLowerCase());
                stock_schq_mggs_zmmg.symbolArr.push(data[i]);
            }
            stock_schq_mggs_zmmg.symbolArr.sort();

            //将代码存放到数组后，获取表格数据
            stock_schq_mggs_zmmg.getTableData();
        },

        getTotalPage:function(data){
            stock_schq_mggs_zmmg.dataCount=data.length;

            var count=data.length;
            var number=$("#numberDiv_0 .currentNum").text();
            //计算总页数
            var totalPage=Math.ceil(count/number);

            $("#pageDiv_0 .totalPageSpan").text(totalPage);
        }
    }

    window.stock_schq_mggs_zmmg=stock_schq_mggs_zmmg;
})();
