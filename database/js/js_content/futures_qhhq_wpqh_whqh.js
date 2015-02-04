/*
    date:2014-09-02
    author:xiezhiqiang
*/
(function(){
    var futures_qhhq_wpqh_whqh={
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
            $("#pageDiv_0 input[type=button]").attr("onclick","futures_qhhq_wpqh_whqh.gotoPage()");
            $("#pageDiv_0 .firstPageSpan").attr("onclick","futures_qhhq_wpqh_whqh.firstPage()");
            $("#pageDiv_0 .lastPageSpan").attr("onclick","futures_qhhq_wpqh_whqh.lastPage()");
            $("#pageDiv_0 .previousPageSpan").attr("onclick","futures_qhhq_wpqh_whqh.previousPage()");
            $("#pageDiv_0 .nextPageSpan").attr("onclick","futures_qhhq_wpqh_whqh.nextPage()");

            //为表格字段排序绑定事件
            var thList=$("#block_1 thead th");
            for(var i=0; i<thList.length;i++){
                //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                if($(thList[i]).find("span").length!=0){
                    //为含有span标签的th标签绑定事件
                    $(thList[i]).find("span").attr("onclick","futures_qhhq_wpqh_whqh.fieldSort(this)");
                }
            }

            //为每页显示条数绑定事件
            $("#numberDiv_0").find("a").attr("onclick","futures_qhhq_wpqh_whqh.changeNumber(this)");
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
                futures_qhhq_wpqh_whqh.insertTableData();
            }
            else{
                //alert("输入的数据有误。");
                showmsg("输入的数据有误。",1);
            }
        },

        //响应首页span点击事件
        firstPage:function(){
            $("#pageDiv_0 .currentPageSpan").text("1");
            futures_qhhq_wpqh_whqh.insertTableData();
        },

        //响应尾页span点击事件
        lastPage:function (){
            var totalPage=$("#pageDiv_0 .totalPageSpan").text();
            $("#pageDiv_0 .currentPageSpan").text(totalPage);
            futures_qhhq_wpqh_whqh.insertTableData();
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
                futures_qhhq_wpqh_whqh.insertTableData();
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
                futures_qhhq_wpqh_whqh.insertTableData();
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
            var totalPage=Math.ceil(futures_qhhq_wpqh_whqh.dataCount/number);//计算总页数
            $("#pageDiv_0 .totalPageSpan").text(totalPage);


            //处理并显示数据
            futures_qhhq_wpqh_whqh.insertTableData();
        },

        //点击表头时，改变背景色
        fieldSort:function(element){
            $(element).parent().parent().find("th").css("background","");

            if(futures_qhhq_wpqh_whqh.asc==1){
                $(element).parent().css("background","url('images/down_arrow.gif') no-repeat center right");
                futures_qhhq_wpqh_whqh.asc=0;
            }
            else{
                $(element).parent().css("background","url('images/up_arrow.gif') no-repeat center right");
                futures_qhhq_wpqh_whqh.asc=1;
            }

            var index=0;
            if($(".fixedThead").length!=0)
                index=$("#block_1 .fixedThead tr th").index($(element).parent());
            else
                index=$("#block_1 thead tr th").index($(element).parent());

            //var index=$("#block_1 thead tr th").index($(element).parent());
			
            //arrSort(d, s, asc)参数分别为：二维数组，排序的字段在数组对应的索引，升降序
            futures_qhhq_wpqh_whqh.totalArray=futures_qhhq_wpqh_whqh.arrSort(futures_qhhq_wpqh_whqh.totalArray,index,futures_qhhq_wpqh_whqh.asc);
            futures_qhhq_wpqh_whqh.insertTableData();
        },

        getASC:function(){
            var sortFeild="";
            var blockId="#block_1";

            $(blockId+" thead th").each(function (i) {
                if($(this).css("background-image")!="none"){
                    var imageUrlArr=$(this).css("background-image").split("/");
                    if(imageUrlArr[imageUrlArr.length-1]=="down_arrow.gif)")
                        futures_qhhq_wpqh_whqh.asc=0;
                    else
                        futures_qhhq_wpqh_whqh.asc=1;
                }
            });
        },

        getTableData:function(){
            var theURL="http://vip.stock.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22wpqh%22,%22whqh%22]]&callback=futures_qhhq_wpqh_whqh.theTableData";

            /*FDC_DC.theRequest=$.ajax({
                type:"get",
                url:theURL,
                dataType:"jsonp",
                jsonpCallback:"theTableData",
                data:{
                    _:0000000000000,
                    dpc:1
                },
                success:function(data){
                    futures_qhhq_wpqh_whqh.getTotalPage(data[0].count);

                    //将需要在表格中显示的字段，按顺序放入数组中
                    futures_qhhq_wpqh_whqh.pushIntoArray(data[0].items);
                    futures_qhhq_wpqh_whqh.insertTableData();
                }
            });*/

            futures_qhhq_wpqh_whqh.tableDataScript=document.createElement("script");
            futures_qhhq_wpqh_whqh.tableDataScript.setAttribute("src",theURL);
            document.body.insertBefore(futures_qhhq_wpqh_whqh.tableDataScript, document.body.childNodes[0]);
        },

        theTableData:function(data){
            try{
                //删除掉刚才请求接口时创建的script的标签
                document.body.removeChild(futures_qhhq_wpqh_whqh.tableDataScript);
            }
            catch(error){
                //do nothing
            }

            futures_qhhq_wpqh_whqh.getTotalPage(data[0].count);

            //将需要在表格中显示的字段，按顺序放入数组中
            futures_qhhq_wpqh_whqh.pushIntoArray(data[0].items);
            futures_qhhq_wpqh_whqh.insertTableData();
        },

        pushIntoArray:function(dataArr){
            //将数据放在二维数组里
            for(var i=0;i<dataArr.length;i++){
                var currentArray=new Array();

                currentArray.push(dataArr[i][1]);//名称
                currentArray.push(dataArr[i][2]);//最新价
                currentArray.push(dataArr[i][10]);//涨跌额
                currentArray.push(dataArr[i][3]);//涨跌幅
                currentArray.push(dataArr[i][11]);//开盘价
                currentArray.push(dataArr[i][6]);//最高价
                currentArray.push(dataArr[i][7]);//最低价
                currentArray.push(dataArr[i][9]);//昨日结算价
                currentArray.push(dataArr[i][12]);//持仓量
                currentArray.push(dataArr[i][4]);//买价
                currentArray.push(dataArr[i][5]);//卖价
                currentArray.push(dataArr[i][15]);//行情时间

                currentArray.push(dataArr[i][0]);//代码

                futures_qhhq_wpqh_whqh.totalArray.push(currentArray);
            }
        },

        insertTableData:function(){
            var page=parseInt($(".currentPageSpan").text());
            var number=parseInt($("#numberDiv_0 .currentNum").text());

            var beginIndex=(page-1)*number;
            var totalLength=0;

            if(page*number>futures_qhhq_wpqh_whqh.totalArray.length){
                totalLength=futures_qhhq_wpqh_whqh.totalArray.length;
            }
            else{
                totalLength=page*number;
            }

            var tableHTML="";

            for(var i=beginIndex;i<totalLength;i++){
                var trDataArr=futures_qhhq_wpqh_whqh.totalArray[i];

                tableHTML+="<tr>";
                for(var j=0;j<trDataArr.length-1;j++){
                    switch(j){
                        case 0:
                            tableHTML+="<td><a href='http://finance.sina.com.cn/futures/quotes/"+trDataArr[trDataArr.length-1]+".shtml' target='_blank'>"+trDataArr[0]+"</a></td>";
                            break;
                        case 1:
                            if(trDataArr[2]>0)
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[1]+"</span></td>";
                            if(trDataArr[2]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[1]+"</span></td>";
                            if(trDataArr[2]==0)
                                tableHTML+="<td>"+trDataArr[1]+"</td>";
                            break;
                        case 2:
                            if(trDataArr[2]>0)
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[2]+"</span></td>";
                            if(trDataArr[2]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[2]+"</span></td>";
                            if(trDataArr[2]==0)
                                tableHTML+="<td>"+trDataArr[2]+"</td>";
                            break;
                        case 3:
                            if(trDataArr[3]>0)
                                tableHTML+="<td><span class='percentRed'>\+"+parseFloat(trDataArr[3]).toFixed(2)+"%</span></td>";
                            if(trDataArr[3]<0)
                                tableHTML+="<td><span class='percentGreen'>"+parseFloat(trDataArr[3]).toFixed(2)+"%</span></td>";
                            if(trDataArr[3]==0)
                                tableHTML+="<td>"+parseFloat(trDataArr[3]).toFixed(2)+"%</td>";
                            break;
                        default :
                            tableHTML+="<td>"+trDataArr[j]+"</td>";
                    }
                }
                tableHTML+="</tr>";
            }

            $("#block_1 tbody").html(tableHTML);
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

        getTotalPage:function(count){
            futures_qhhq_wpqh_whqh.dataCount=parseInt(count);

            var theCount=parseInt(count);

            var number=$("#numberDiv_0 .currentNum").text();
            var totalPage=Math.ceil(theCount/number);//计算总页数

            $("#pageDiv_0 .totalPageSpan").text(totalPage);
        }
    }

    window.futures_qhhq_wpqh_whqh=futures_qhhq_wpqh_whqh;
})();

