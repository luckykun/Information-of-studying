/*
    date:2014-09-02
    author:xiezhiqiang
*/
(function(){
    var bond_zqhq_kzz={
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
        //行情代码数组
        hqSymbolArr:[],

        //初始化，绑定事件
        initEvents:function(){
            //为pageDiv里的分页标签们添加事件
            $("#pageDiv_0 input[type=button]").attr("onclick","bond_zqhq_kzz.gotoPage()");
            $("#pageDiv_0 .firstPageSpan").attr("onclick","bond_zqhq_kzz.firstPage()");
            $("#pageDiv_0 .lastPageSpan").attr("onclick","bond_zqhq_kzz.lastPage()");
            $("#pageDiv_0 .previousPageSpan").attr("onclick","bond_zqhq_kzz.previousPage()");
            $("#pageDiv_0 .nextPageSpan").attr("onclick","bond_zqhq_kzz.nextPage()");

            //为表格字段排序绑定事件
            var thList=$("#block_1 thead th");
            for(var i=0; i<thList.length;i++){
                //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                if($(thList[i]).find("span").length!=0){
                    //为含有span标签的th标签绑定事件
                    $(thList[i]).find("span").attr("onclick","bond_zqhq_kzz.fieldSort(this)");
                }
            }

            //为每页显示条数绑定事件
            $("#numberDiv_0").find("a").attr("onclick","bond_zqhq_kzz.changeNumber(this)");
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
                bond_zqhq_kzz.insertTableData();
            }
            else{
                //alert("输入的数据有误。");
                showmsg("输入的数据有误。",1);
            }
        },

        //响应首页span点击事件
        firstPage:function(){
            $("#pageDiv_0 .currentPageSpan").text("1");
            bond_zqhq_kzz.insertTableData();
        },

        //响应尾页span点击事件
        lastPage:function (){
            var totalPage=$("#pageDiv_0 .totalPageSpan").text();
            $("#pageDiv_0 .currentPageSpan").text(totalPage);
            bond_zqhq_kzz.insertTableData();
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
                bond_zqhq_kzz.insertTableData();
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
                bond_zqhq_kzz.insertTableData();
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
            var totalPage=Math.ceil(bond_zqhq_kzz.dataCount/number);//计算总页数
            $("#pageDiv_0 .totalPageSpan").text(totalPage);


            //处理并显示数据
            bond_zqhq_kzz.insertTableData();
        },

        //点击表头时，改变背景色
        fieldSort:function(element){
            $(element).parent().parent().find("th").css("background","");

            if(bond_zqhq_kzz.asc==1){
                $(element).parent().css("background","url('images/down_arrow.gif') no-repeat center right");
                bond_zqhq_kzz.asc=0;
            }
            else{
                $(element).parent().css("background","url('images/up_arrow.gif') no-repeat center right");
                bond_zqhq_kzz.asc=1;
            }

            var index=0;
            if($(".fixedThead").length!=0)
                index=$("#block_1 .fixedThead tr th").index($(element).parent());
            else
                index=$("#block_1 thead tr th").index($(element).parent());

            //var index=$("#block_1 thead tr th").index($(element).parent());
			
            //arrSort(d, s, asc)参数分别为：二维数组，排序的字段在数组对应的索引，升降序
            bond_zqhq_kzz.totalArray=bond_zqhq_kzz.arrSort(bond_zqhq_kzz.totalArray,index,bond_zqhq_kzz.asc);
            bond_zqhq_kzz.insertTableData();
        },

        getASC:function(){
            var sortFeild="";
            var blockId="#block_1";

            $(blockId+" thead th").each(function (i) {
                if($(this).css("background-image")!="none"){
                    var imageUrlArr=$(this).css("background-image").split("/");
                    if(imageUrlArr[imageUrlArr.length-1]=="down_arrow.gif)")
                        bond_zqhq_kzz.asc=0;
                    else
                        bond_zqhq_kzz.asc=1;
                }
            });
        },

        getTableData:function(){
            //var theURL="http://vip.stock.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22bc%22,%22%22,0,1,0]]&callback=bond_zqhq_kzz.theTableData";
            //var theURL="http://finance.sina.com.cn/data_center/zq/bond_zqhq_kzz.js?callback=bond_zqhq_kzz.theTableData";
            var theURL="http://finance.sina.com.cn/data_center/zq/bond_zqhq_kzz.js";

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
                    bond_zqhq_kzz.getTotalPage(data[0].count);

                    //将需要在表格中显示的字段，按顺序放入数组中
                    bond_zqhq_kzz.pushIntoArray(data[0].items);
                    bond_zqhq_kzz.insertTableData();
                }
            });*/

            bond_zqhq_kzz.tableDataScript=document.createElement("script");
            bond_zqhq_kzz.tableDataScript.setAttribute("src",theURL);
            document.body.insertBefore(bond_zqhq_kzz.tableDataScript, document.body.childNodes[0]);

            //如果是IE
            if(document.all){
                bond_zqhq_kzz.tableDataScript.onreadystatechange=function(){
                    if(bond_zqhq_kzz.tableDataScript.readyState=="loaded" || bond_zqhq_kzz.tableDataScript.readyState=="complete") {
                        bond_zqhq_kzz.theTableData(bond_zqhq_kzz_data);
                    }
                }
            }
            else{
                bond_zqhq_kzz.tableDataScript.onload=function(){
                    bond_zqhq_kzz.theTableData(bond_zqhq_kzz_data);
                }
            }
        },

        theTableData:function(data){
            try{
                //删除掉刚才请求接口时创建的script的标签
                document.body.removeChild(bond_zqhq_kzz.tableDataScript);
            }
            catch(error){
                //do nothing
            }

            bond_zqhq_kzz.getTotalPage(data[0].count);

            //将需要在表格中显示的字段，按顺序放入数组中
            bond_zqhq_kzz.pushIntoArray(data[0].items);
            //bond_zqhq_kzz.insertTableData();
        },

        pushIntoArray:function(dataArr){
            //将数据放在二维数组里
            for(var i=0;i<dataArr.length;i++){
                var currentArray=new Array();

                currentArray.push(dataArr[i][0]);//代码
                currentArray.push(dataArr[i][1]);//名称
                currentArray.push(dataArr[i][2]);//最新价
                currentArray.push(dataArr[i][4]);//涨跌幅
                currentArray.push(dataArr[i][44]);//正股名称

                //console.log(dataArr[i][46]);


                var currentSymbol="";
                if(dataArr[i][46].substr(0,2)=="60" || dataArr[i][46].substr(0,2)=="90" || dataArr[i][46].substr(0,2)=="58"){
                    currentSymbol="s_sh"+dataArr[i][46];
                }
                else{
                    currentSymbol="s_sz"+dataArr[i][46];
                }
                bond_zqhq_kzz.hqSymbolArr.push(currentSymbol);

                currentArray.push(parseFloat(dataArr[i][43]).toFixed(2));//转股价
                currentArray.push(dataArr[i][29]);//每年付息日
                currentArray.push(dataArr[i][42]);//剩余年限
                currentArray.push(dataArr[i][30].substr(0,10));//到期时间
                currentArray.push(dataArr[i][46]);//正股代码

                bond_zqhq_kzz.totalArray.push(currentArray);
            }

            //通过正股代码，请求行情接口，获取正股最新价和涨跌幅
            var hqURL="http://hq.sinajs.cn/?_="+Math.random()+"&list="+bond_zqhq_kzz.hqSymbolArr.toString();

            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.setAttribute("src", hqURL);
            script.setAttribute("id", "hqScript");
            head.appendChild(script);

            //如果是IE
            if(document.all){
                script.onreadystatechange=function(){
                    if(script.readyState=="loaded" || script.readyState=="complete") {
                        //获取到最新价和涨跌幅后，这里删除向head中添加的script标签，以免影响下次数据的显示
                        head.removeChild(script);

                        for(var i=0;i<bond_zqhq_kzz.hqSymbolArr.length;i++){
                            //正股最新价
                            var price=eval("hq_str_"+bond_zqhq_kzz.hqSymbolArr[i]).split(",")[1];
                            if(price==undefined)
                                price="--";
                            //正股涨跌幅
                            var percent=eval("hq_str_"+bond_zqhq_kzz.hqSymbolArr[i]).split(",")[3];
                            if(percent==undefined)
                                percent="--";

                            bond_zqhq_kzz.totalArray[i].splice(5,0,price);//向二维数组中特定位置添加正股最新价
                            bond_zqhq_kzz.totalArray[i].splice(6,0,percent+"%");//向二维数组中特定位置添加正股涨跌幅

                            //转股价值
                            var kzz_zgjz=(parseFloat(price)/parseFloat(bond_zqhq_kzz.totalArray[i][7])*100).toFixed(2);
                            //溢价率
                            var kzz_yjl=((parseFloat(bond_zqhq_kzz.totalArray[i][2])-parseFloat(kzz_zgjz))/parseFloat(kzz_zgjz)*100).toFixed(2)+"%";
                            if(kzz_yjl=="NaN%")
                                kzz_yjl="--";

                            bond_zqhq_kzz.totalArray[i].splice(8,0,kzz_zgjz);//向二维数组中特定位置添加转股价值
                            bond_zqhq_kzz.totalArray[i].splice(9,0,kzz_yjl);//向二维数组中特定位置添加溢价率
                        }
                    }

                    //数据处理完毕后，开始向表格中插入数据
                    bond_zqhq_kzz.insertTableData();
                }
            }
            else{
                script.onload=function(){
                    //获取到最新价和涨跌幅后，这里删除向head中添加的script标签，以免影响下次数据的显示
                    head.removeChild(script);

                    for(var i=0;i<bond_zqhq_kzz.hqSymbolArr.length;i++){
                        //正股最新价
                        var price=eval("hq_str_"+bond_zqhq_kzz.hqSymbolArr[i]).split(",")[1];
                        if(price==undefined)
                            price="--";
                        //正股涨跌幅
                        var percent=eval("hq_str_"+bond_zqhq_kzz.hqSymbolArr[i]).split(",")[3];
                        if(percent==undefined)
                            percent="--";

                        bond_zqhq_kzz.totalArray[i].splice(5,0,price);//向二维数组中特定位置添加正股最新价
                        bond_zqhq_kzz.totalArray[i].splice(6,0,percent+"%");//向二维数组中特定位置添加正股涨跌幅

                        //转股价值
                        var kzz_zgjz=(parseFloat(price)/parseFloat(bond_zqhq_kzz.totalArray[i][7])*100).toFixed(2);
                        //溢价率
                        var kzz_yjl=((parseFloat(bond_zqhq_kzz.totalArray[i][2])-parseFloat(kzz_zgjz))/parseFloat(kzz_zgjz)*100).toFixed(2)+"%";
                        if(kzz_yjl=="NaN%")
                            kzz_yjl="--";

                        bond_zqhq_kzz.totalArray[i].splice(8,0,kzz_zgjz);//向二维数组中特定位置添加转股价值
                        bond_zqhq_kzz.totalArray[i].splice(9,0,kzz_yjl);//向二维数组中特定位置添加溢价率
                    }

                    //数据处理完毕后，开始向表格中插入数据
                    bond_zqhq_kzz.insertTableData();
                }
            }
        },

        insertTableData:function(){
            var page=parseInt($(".currentPageSpan").text());
            var number=parseInt($("#numberDiv_0 .currentNum").text());

            var beginIndex=(page-1)*number;
            var totalLength=0;

            if(page*number>bond_zqhq_kzz.totalArray.length){
                totalLength=bond_zqhq_kzz.totalArray.length;
            }
            else{
                totalLength=page*number;
            }

            var tableHTML="";

            for(var i=beginIndex;i<totalLength;i++){
                var trDataArr=bond_zqhq_kzz.totalArray[i];

                tableHTML+="<tr>";
                for(var j=0;j<trDataArr.length-1;j++){
                    switch(j){
                        case 0:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[0]+"' target='_blank'>"+trDataArr[0].slice(2)+"</a></td>";
                            break;
                        case 1:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[0]+"' target='_blank'>"+trDataArr[1]+"</a></td>";
                            break;
                        /*case 2:
                            if(trDataArr[3]>0)
                                tableHTML+="<td><span class='percentRed'>"+parseFloat(trDataArr[2]).toFixed(2)+"</span></td>";
                            if(trDataArr[3]<0)
                                tableHTML+="<td><span class='percentGreen'>"+parseFloat(trDataArr[2]).toFixed(2)+"</span></td>";
                            if(trDataArr[3]==0)
                                tableHTML+="<td>"+parseFloat(trDataArr[2]).toFixed(2)+"</td>";
                            break;
                        case 3:
                            if(trDataArr[3]>0)
                                tableHTML+="<td><span class='percentRed'>"+parseFloat(trDataArr[3]).toFixed(2)+"%</span></td>";
                            if(trDataArr[3]<0)
                                tableHTML+="<td><span class='percentGreen'>"+parseFloat(trDataArr[3]).toFixed(2)+"%</span></td>";
                            if(trDataArr[3]==0)
                                tableHTML+="<td>"+parseFloat(trDataArr[3]).toFixed(2)+"</td>";
                            break;*/
                        case 4:
                            if(trDataArr[13].toString().substr(0,2)=="60" || trDataArr[13].toString().substr(0,2)=="90" || trDataArr[13].toString().substr(0,2)=="58")
                                tableHTML+="<td><a href='http://finance.sina.com.cn/realstock/company/sh"+trDataArr[13]+"/nc.shtml' target='_blank'>"+trDataArr[4]+"</a></td>";
                            else
                                tableHTML+="<td><a href='http://finance.sina.com.cn/realstock/company/sz"+trDataArr[13]+"/nc.shtml' target='_blank'>"+trDataArr[4]+"</a></td>";
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
            bond_zqhq_kzz.dataCount=parseInt(count);

            var theCount=parseInt(count);

            var number=$("#numberDiv_0 .currentNum").text();
            var totalPage=Math.ceil(theCount/number);//计算总页数

            $("#pageDiv_0 .totalPageSpan").text(totalPage);
        }
    }

    window.bond_zqhq_kzz=bond_zqhq_kzz;
})();

