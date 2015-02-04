/*
 date:2014-08-14
 author:xiezhiqiang
 */
(function(){
    var bond_zqhq_hg={
        //表格字段升降序
        asc:0,
        //代码数组
        symbolArr:["sh204001","sh204002","sh204003","sh204004","sh204007","sh204014","sh204028","sh204091","sh204182","sz131810","sz131811","sz131800","sz131809","sz131801","sz131802","sz131803","sz131805","sz131806"],
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
            $("#pageDiv_0 input[type=button]").attr("onclick","bond_zqhq_hg.gotoPage()");
            $("#pageDiv_0 .firstPageSpan").attr("onclick","bond_zqhq_hg.firstPage()");
            $("#pageDiv_0 .lastPageSpan").attr("onclick","bond_zqhq_hg.lastPage()");
            $("#pageDiv_0 .previousPageSpan").attr("onclick","bond_zqhq_hg.previousPage()");
            $("#pageDiv_0 .nextPageSpan").attr("onclick","bond_zqhq_hg.nextPage()");

            //为表格字段排序绑定事件
            var thList=$("#block_1 thead th");
            for(var i=0; i<thList.length;i++){
                //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                if($(thList[i]).find("span").length!=0){
                    //为含有span标签的th标签绑定事件
                    $(thList[i]).find("span").attr("onclick","bond_zqhq_hg.fieldSort(this)");
                }
            }

            //为每页显示条数绑定事件
            $("#numberDiv_0").find("a").attr("onclick","bond_zqhq_hg.changeNumber(this)");
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
                bond_zqhq_hg.insertTableData();
            }
            else{
                //alert("输入的数据有误。");
                showmsg("输入的数据有误。",1);
            }
        },

        //响应首页span点击事件
        firstPage:function(){
            $("#pageDiv_0 .currentPageSpan").text("1");
            bond_zqhq_hg.insertTableData();
        },

        //响应尾页span点击事件
        lastPage:function (){
            var totalPage=$("#pageDiv_0 .totalPageSpan").text();
            $("#pageDiv_0 .currentPageSpan").text(totalPage);
            bond_zqhq_hg.insertTableData();
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
                bond_zqhq_hg.insertTableData();
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
                bond_zqhq_hg.insertTableData();
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
            var totalPage=Math.ceil(bond_zqhq_hg.dataCount/number);//计算总页数
            $("#pageDiv_0 .totalPageSpan").text(totalPage);


            //处理并显示数据
            bond_zqhq_hg.insertTableData();
        },

        //点击表头时，改变背景色
        fieldSort:function(element){
            $(element).parent().parent().find("th").css("background","");

            if(bond_zqhq_hg.asc==1){
                $(element).parent().css("background","url('images/down_arrow.gif') no-repeat center right");
                bond_zqhq_hg.asc=0;
            }
            else{
                $(element).parent().css("background","url('images/up_arrow.gif') no-repeat center right");
                bond_zqhq_hg.asc=1;
            }

            var index=0;
            if($(".fixedThead").length!=0)
                index=$("#block_1 .fixedThead tr th").index($(element).parent());
            else
                index=$("#block_1 thead tr th").index($(element).parent());

            //var index=$("#block_1 thead tr th").index($(element).parent());

            //arrSort(d, s, asc)参数分别为：二维数组，排序的字段在数组对应的索引，升降序
            bond_zqhq_hg.totalArray=bond_zqhq_hg.arrSort(bond_zqhq_hg.totalArray,index,bond_zqhq_hg.asc);
            bond_zqhq_hg.insertTableData();
        },

        getTotalPage:function(){
            var count=bond_zqhq_hg.symbolArr.length;

            var number=$("#numberDiv_0 .currentNum").text();
            var totalPage=Math.ceil(count/number);//计算总页数

            $("#pageDiv_0 .totalPageSpan").text(totalPage);
        },

        getTableData:function(){
            /*var tempSymbolList=[];
            for(var i=0;i<bond_zqhq_hg.symbolArr.length;i++){
                tempSymbolList.push("f_"+bond_zqhq_hg.symbolArr[i]);

                //sh 60,90,58   sz 00,30,20
                if(bond_zqhq_hg.symbolArr[i].substr(0,2)=="60" || bond_zqhq_hg.symbolArr[i].substr(0,2)=="90" || bond_zqhq_hg.symbolArr[i].substr(0,2)=="58")
                    tempSymbolList.push("sh"+bond_zqhq_hg.symbolArr[i]);
                else
                    tempSymbolList.push("sz"+bond_zqhq_hg.symbolArr[i]);
            }*/

            var dataURL="http://hq.sinajs.cn/?_="+Math.random()+"&list="+bond_zqhq_hg.symbolArr.toString();

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
                        bond_zqhq_hg.pushIntoArray();
                        bond_zqhq_hg.insertTableData();
                    }
                }
            }
            else{
                script.onload=function(){
                    bond_zqhq_hg.pushIntoArray();
                    bond_zqhq_hg.insertTableData();
                }
            }

            bond_zqhq_hg.tableDataScript=script;
        },

        pushIntoArray:function(){
            //将数据放在二维数组里
            for(var i=0;i<bond_zqhq_hg.symbolArr.length;i++){
                var currentArray=new Array();
                currentArray.push(bond_zqhq_hg.symbolArr[i].slice(2));//代码

                var currentDataArr=eval("hq_str_"+bond_zqhq_hg.symbolArr[i]).split(",");

                currentArray.push(currentDataArr[0]);//名称
                currentArray.push(currentDataArr[1]+"%");//最新回购利率
                currentArray.push(currentDataArr[4]);//最高
                currentArray.push(currentDataArr[5]);//最低
                currentArray.push(currentDataArr[8]/1000);//成交量

                bond_zqhq_hg.totalArray.push(currentArray);
            }
        },

        insertTableData:function(){
            var page=parseInt($(".currentPageSpan").text());
            var number=parseInt($("#numberDiv_0 .currentNum").text());

            var beginIndex=(page-1)*number;
            var totalLength=0;

            if(page*number>bond_zqhq_hg.symbolArr.length){
                totalLength=bond_zqhq_hg.symbolArr.length;
            }
            else{
                totalLength=page*number;
            }

            var tableHTML="";

            for(var i=beginIndex;i<totalLength;i++){
                var trDataArr=bond_zqhq_hg.totalArray[i];

                tableHTML+="<tr>";
                for(var j=0;j<trDataArr.length;j++){
                    tableHTML+="<td>"+trDataArr[j]+"</td>";
                }
                tableHTML+="</tr>";
            }

            $("#block_1 tbody").html(tableHTML);

            //表格数据添加完毕，删除表格数据script标签
            $(bond_zqhq_hg.tableDataScript).remove();
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

    window.bond_zqhq_hg=bond_zqhq_hg;
})();

