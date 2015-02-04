/*
    date:2014-07-01
    author:xiezhiqiang
*/
(function(){
    //FDC_DC means finance data center display content
    var FDC_DC={
        //控制升序排列还是降序排列
        asc:0,
        //ajax对象
        //theRequest:null,
        //用于记录为请求表格数据而创建的script标签
        tableDataScript:null,
        //txt文件里的blocks模块索引
        blockIndex:0,
        //当前内容页所要呈现的所有模块
        blocks:[],

        //该方法在util.js中的dataCate()方法中被调用
        displayContent:function(hashArr){
            //每次加载新的页面时，先清除前一个页面的ajax请求
            /*if(FDC_DC.theRequest){
                FDC_DC.theRequest.abort();
            }*/


            //通过hash数组得到需要加载的txt文件
            var txtName=hashArr.toString().replace(/,/g, "_")+".txt";
            // var txtName=hashArr.toString().replace(/,/g, "_")+".json";
            //ajax请求对应的txt文件
            var theResult=$.ajax({url:"./blocks/"+txtName,async:false});
            //获取请求结果
            var blockJSON=eval('(' + theResult.responseText.replace(/[\r\n]/g,"") + ')');

            //向data_panel中填充html代码
            $("#data_panel").html(blockJSON.html);


            FDC_DC.blocks=blockJSON.blocks;


            for(var i=0; i<FDC_DC.blocks.length;i++){
                //为每页各个显示条数Div添加事件
                $("#numberDiv_"+i).find("a").attr("onclick","FDC_DC.changeNumber(this,"+i+")");

                //为最近几日标签添加事件
                $("#recentDaysDiv_"+i).find("a").attr("onclick","FDC_DC.changeDays(this,"+i+")");

                (function(i){
                    var block_field=FDC_DC.blocks[i].field;
                    var block_id=FDC_DC.blocks[i].blockId;

                    //为表格各个列排序添加事件
                    var thList=$("#"+block_id+" thead th");
                    for(var j=0; j<thList.length;j++){
                        //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                        if($(thList[j]).find("span").length!=0){
                            //为含有span标签的th标签绑定事件
                            $(thList[j]).find("span").attr("onclick","FDC_DC.fieldSort(this,"+i+",'"+block_field[j]+"')");
                        }
                    }

                    //为pageDiv里的分页标签们添加事件
                    $("#pageDiv_"+i+" input[type=button]").attr("onclick","FDC_DC.gotoPage("+i+")");
                    $("#pageDiv_"+i+" .firstPageSpan").attr("onclick","FDC_DC.firstPage("+i+")");
                    $("#pageDiv_"+i+" .lastPageSpan").attr("onclick","FDC_DC.lastPage("+i+")");
                    $("#pageDiv_"+i+" .previousPageSpan").attr("onclick","FDC_DC.previousPage("+i+")");
                    $("#pageDiv_"+i+" .nextPageSpan").attr("onclick","FDC_DC.nextPage("+i+")");

                    FDC_DC.dealBlocks(i,"");
                })(i);
            }
        },

        //点击表头时，改变背景色，并且访问接口
        fieldSort:function(element,index,sortField){
            if($(element).parent().css("background-image")=="none"){
                //$(element).parent().parent().parent()找到表格页头里的thead标签
                $(element).parent().parent().parent().find("th").css("background","");

                FDC_DC.asc=0;
                $(element).parent().css("background","url(images/down_arrow.gif) no-repeat center right");
                //$(element).parent().css("background","url(http://www.sinaimg.cn/cj/data_20140924/down_arrow.gif) no-repeat center right");
            }
            else{
                var splitArr=$(element).parent().css("background-image").split('/');
                var arrowName=splitArr[splitArr.length-1].split(".")[0];

                if(arrowName=="down_arrow"){
                    //$(element).parent().parent().parent()找到表格页头里的thead标签
                    $(element).parent().parent().parent().find("th").css("background","");

                    FDC_DC.asc=1;
                    $(element).parent().css("background","url(images/up_arrow.gif) no-repeat center right");
                    //$(element).parent().css("background","url(http://www.sinaimg.cn/cj/data_20140924/up_arrow.gif) no-repeat center right");
                }
                else{
                    //$(element).parent().parent().parent()找到表格页头里的thead标签
                    $(element).parent().parent().parent().find("th").css("background","");

                    FDC_DC.asc=0;
                    $(element).parent().css("background","url(images/down_arrow.gif) no-repeat center right");
                    //$(element).parent().css("background","url(http://www.sinaimg.cn/cj/data_20140924/down_arrow.gif) no-repeat center right");
                }
            }

            FDC_DC.dealBlocks(index,sortField);
        },

        //响应每页显示几条数据span标签点击事件
        changeNumber:function(element,index){
            //每次改变每页显示条数时，表格头部的背景箭头去掉
            var thSpan="#block_"+(index+1)+" thead th";
            $(thSpan).css("background","");

            $(element).parent().find("a").removeClass("currentNum");
            $(element).addClass("currentNum");

            $("#pageDiv_"+index+" .currentPageSpan").text("1");

            FDC_DC.dealBlocks(index,"");
        },

        //响应最近几日span标签点击事件
        changeDays:function(element,index){
            //每次改变每页显示条数时，表格头部的背景箭头去掉
            var thSpan="#block_"+(index+1)+" thead th";
            $(thSpan).css("background","");

            $(element).parent().find("a").removeClass("currentRecentDays");
            $(element).addClass("currentRecentDays");

            $("#pageDiv_"+index+" .currentPageSpan").text("1");

            FDC_DC.dealBlocks(index,"");
        },

        getAscAndSort:function(index){
            var sortFeild="";
            var blockId="#block_"+(index+1);

            $(blockId+" thead:first th").each(function (i) {
                if($(this).css("background-image")!="none"){
                    sortFeild=FDC_DC.blocks[0].field[i];
                }
            });

            if($(blockId+" .fixedThead th").length!=0){
                $(blockId+" .fixedThead th").each(function (i) {
                    if($(this).css("background-image")!="none"){
                        sortFeild=FDC_DC.blocks[0].field[i];
                    }
                });
            }
            else{
                $(blockId+" thead th").each(function (i) {
                    if($(this).css("background-image")!="none"){
                        sortFeild=FDC_DC.blocks[0].field[i];
                    }
                });
            }

            return sortFeild;
        },

        //响应页数跳转按钮点击事件
        gotoPage:function(index){
            var currentPageSpan=$("#pageDiv_"+index+" .currentPageSpan");
            var totalPage=$("#pageDiv_"+index+" .totalPageSpan").text();

            var inputPage=$("#pageDiv_"+index+" input[type=text]").val();

            if(parseInt(inputPage)){
                if(parseInt(inputPage)<1 || parseInt(inputPage)>parseInt(totalPage)){
                    //alert("输入的数字超出范围。");
                    showmsg("输入的数字超出范围。",1);
                    return;
                }

                currentPageSpan.text(parseInt(inputPage));
                FDC_DC.dealBlocks(index,FDC_DC.getAscAndSort(index));
            }
            else{
                if(inputPage==""){
                    showmsg("请输入页码。",1);
                    return;
                }
                /*if(parseInt(inputPage)==0){
                    showmsg("输入的数字超出范围。",1);
                    return;
                }*/

                //alert("输入的数据有误。");
                showmsg("输入的数据有误。",1);
            }
        },

        //响应首页span点击事件
        firstPage:function(index){
            var currentPage=$("#pageDiv_"+index+" .currentPageSpan").text();
            //如果当前页已是首页，点击时，提示信息并直接返回
            if(currentPage=="1"){
                showmsg("已到首页。",1);
                return;
            }

            $("#pageDiv_"+index+" .currentPageSpan").text("1");
            FDC_DC.dealBlocks(index,FDC_DC.getAscAndSort(index));
        },

        //响应尾页span点击事件
        lastPage:function (index){
            var totalPage=$("#pageDiv_"+index+" .totalPageSpan").text();
            var currentPage=$("#pageDiv_"+index+" .currentPageSpan").text();
            //如果当前页已是尾页，点击时，提示信息并直接返回
            if(currentPage==totalPage){
                showmsg("已到尾页。",1);
                return;
            }

            $("#pageDiv_"+index+" .currentPageSpan").text(totalPage);
            FDC_DC.dealBlocks(index,FDC_DC.getAscAndSort(index));
        },

        //响应上一页span点击事件
        previousPage:function(index){
            var currentPageSpan= $("#pageDiv_"+index+" .currentPageSpan");

            if(parseInt(currentPageSpan.text())-1<1){
                //alert("已到首页。");
                showmsg("已到首页。",1);
            }
            else{
                currentPageSpan.text(parseInt(currentPageSpan.text())-1);
                FDC_DC.dealBlocks(index,FDC_DC.getAscAndSort(index));
            }
        },

        //响应下一页span点击事件
        nextPage:function(index) {
            var currentPageSpan= $("#pageDiv_"+index+" .currentPageSpan");
            var totalPage= $("#pageDiv_"+index+" .totalPageSpan").text();

            if(parseInt(currentPageSpan.text())+1>parseInt(totalPage)){
                //alert("已到尾页。");
                showmsg("已到尾页。",1);
            }
            else{
                currentPageSpan.text(parseInt(currentPageSpan.text())+1);
                FDC_DC.dealBlocks(index,FDC_DC.getAscAndSort(index));
            }
        },

        //定义该方法的目的是为了排序使用
        /*参数是：block索引，待排序的json字段*/
        dealBlocks:function(index,sortField){
            FDC_DC.blockIndex=index;

            var param=FDC_DC.blocks[index].param;

            var number=$("#numberDiv_"+index+" .currentNum").text();
            var page=$("#pageDiv_"+index+" .currentPageSpan").text();
            var recentDays=$("#recentDaysDiv_"+index+" .currentRecentDays").attr("value");//最近几日标签，有的页面有，有的页面没有

            var theURL = "http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=["+param+"]"+"&callback=FDC_DC.theTableData";
                theURL = theURL.replace("{page}",page);
                theURL = theURL.replace("{num}",number);
                theURL = theURL.replace("{asc}",FDC_DC.asc);
                theURL = theURL.replace("{sort}",sortField);
                theURL = theURL.replace("{recentDays}",recentDays);
            //上面的repalce不用写判断，有些字段（如：recentDays）有些页面如果没有，将不会替换，不影响程序的执行

            FDC_DC.tableDataScript=document.createElement("script");
            FDC_DC.tableDataScript.setAttribute("src",theURL);
            document.body.insertBefore(FDC_DC.tableDataScript, document.body.childNodes[0]);
            //如果及时的删除创建的script标签的话，在ie8下面有问题，在其它浏览器下没问题
        },

        /*参数是：block索引，待排序的json字段*/
        /*dealBlocks:function(index,sortField){
            var blockType=FDC_DC.blocks[index].type;
            var blockField=FDC_DC.blocks[index].field;
            var blockId=FDC_DC.blocks[index].blockId;
            var hasIndex=FDC_DC.blocks[index].hasIndex;
            var tdLink=FDC_DC.blocks[index].tdLink;
            var tdColor=FDC_DC.blocks[index].tdColor;
            var contentParse=FDC_DC.blocks[index].contentParse;
            var param=FDC_DC.blocks[index].param;

            var number=$("#numberDiv_"+index+" .currentNum").text();
            var page=$("#pageDiv_"+index+" .currentPageSpan").text();
            var recentDays=$("#recentDaysDiv_"+index+" .currentRecentDays").attr("value");//最近几日标签，有的页面有，有的页面没有

            var theURL = "http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=["+param+"]"+"&callback=FDC_DC.theTableData";
            theURL = theURL.replace("{page}",page);
            theURL = theURL.replace("{num}",number);
            theURL = theURL.replace("{asc}",FDC_DC.asc);
            theURL = theURL.replace("{sort}",sortField);
            theURL = theURL.replace("{recentDays}",recentDays);
            //上面的repalce不用写判断，有些字段（如：recentDays）有些页面如果没有，将不会替换，不影响程序的执行

            FDC_DC.theRequest=$.ajax({
                type:"get",
                url:theURL,
                dataType:"jsonp",
                success:function(data){
                    try{
                        //如果返回的json里有count属性的话，处理分页
                        FDC_DC.dealPageDiv(data[index].count,index);
                    }
                    catch (error) {
                        //do nothing
                    }

                    switch(blockType){
                        case "table":
                            FDC_DC.insertTableData(data,blockField,blockId,hasIndex,tdLink,tdColor,contentParse);
                            break;
                        case "rect":
                            //
                            break;
                    }
                }
            });
        },*/

        theTableData:function(data){
            try{
                //删除掉刚才请求接口时创建的script的标签
                document.body.removeChild(FDC_DC.tableDataScript);
            }
            catch (error){
                //do nothing
            }

            //var blockType=FDC_DC.blocks[FDC_DC.blockIndex].type;
            var blockField=FDC_DC.blocks[FDC_DC.blockIndex].field;
            var blockId=FDC_DC.blocks[FDC_DC.blockIndex].blockId;
            var hasIndex=FDC_DC.blocks[FDC_DC.blockIndex].hasIndex;
            var tdLink=FDC_DC.blocks[FDC_DC.blockIndex].tdLink;
            var tdColor=FDC_DC.blocks[FDC_DC.blockIndex].tdColor;
            var contentParse=FDC_DC.blocks[FDC_DC.blockIndex].contentParse;

            try{
                //如果返回的json里有count属性的话，处理分页
                FDC_DC.dealPageDiv(data[FDC_DC.blockIndex].count,FDC_DC.blockIndex);
            }
            catch (error) {
                //do nothing
            }

            FDC_DC.insertTableData(data,blockField,blockId,hasIndex,tdLink,tdColor,contentParse);
        },

        //处理页码
        dealPageDiv:function(count,index) {
            var number=$("#numberDiv_"+index+" .currentNum").text();
            var totalPage=Math.ceil(count/number);//计算总页数

            $("#pageDiv_"+index+" .totalPageSpan").text(totalPage);
        },

        //插入表格数据
        insertTableData:function(json,block_field,block_id,has_index,td_link,td_color,content_parse){
            //先清空当前表格内容
            $("#"+block_id+" tbody").html("");

            var html = "";
            var newJson=json[0].items;//现在是每个模块都发送一次请求，所以这里参数直接用0
            var fields=json[0].fields;//获取jsonp中所有字段
            var valueIndexArr=[];//需要实现的字段内容在返回的jsonp中对应的索引

            for(var m=0;m<block_field.length;m++){
                for(var n=0;n<fields.length;n++){
                    if(block_field[m]==fields[n]){
                        valueIndexArr.push(n);
                    }
                }
            }

            for(var i=0;i<newJson.length;i++) {
                var curObj=newJson[i];

                html += "<tr>";

                if(has_index){
                    html+="<td>"+(i+1)+"</td>";
                }

                for(var j=0;j<valueIndexArr.length;j++){
                    //如果取到的值是null或空字符串，则将其改变为--
                    if(curObj[valueIndexArr[j]]==null || curObj[valueIndexArr[j]]=="")
                        curObj[valueIndexArr[j]]="--";

                    //默认只显示数据，放到该循环的最开头
                    var currentHTML="<td>" + curObj[valueIndexArr[j]] + "</td>";

                    //当前字段转换后的结果值
                    var parseResult="";

                    //如果该字段需要进行百分比转换，日期字符串截取等效果的话
                    if(content_parse[block_field[j]]!=""){
                        if(content_parse[block_field[j]]=="object"){
                            var objectArr=curObj[valueIndexArr[j]];
                            for(var key in objectArr){
                                parseResult=parseResult+"，"+key;
                            }
                            parseResult=parseResult.slice(1);//去掉开头的逗号
                        }
                        else{
                            parseResult=eval(content_parse[block_field[j]].replace(block_field[j],curObj[valueIndexArr[j]]));
                        }

                        //parseResult=eval(content_parse[block_field[j]].replace(block_field[j],curObj[valueIndexArr[j]]));
                        currentHTML="<td>" + parseResult + "</td>";

                        //如果经eval()转义执行后的结果是NaN，则将其改变为--
                        if(parseResult=="NaN" || parseResult=="")
                            currentHTML="<td>--</td>";
                    }

                    //如果字段值转换后，需要添加链接
                    if(td_link[block_field[j]]){
                        var hrefArr=td_link[block_field[j]];
                        var href=hrefArr[0]+curObj[hrefArr[1]]+hrefArr[2];

                        if(parseResult!=""){
                            currentHTML="<td><a target='_blank' href='"+href+"'>" + parseResult + "</a></td>";
                        }
                        else{
                            currentHTML="<td><a target='_blank' href='"+href+"'>" + curObj[valueIndexArr[j]] + "</a></td>";
                        }
                    }

                    //只有涨跌幅的情况才会改变文本的颜色，涨跌幅的情况下，不会有链接
                    //涨跌幅需要判断除权除息的情况
                    if(typeof td_color[j] == "object"){
                        //td_color[j][1]取到的是当前涨跌幅列flag的值，如果flag=1，需要加小括号，=0时，不用管
                        //var flagValue=curObj[td_color[j][1]];

                        if(parseResult.toString().split("%")[0]>0){
                            if(curObj[td_color[j][1]]=="1")
                                currentHTML="<td><span class='percentRed'>（\+" + parseResult + "）</span></td>";
                            else
                                currentHTML="<td><span class='percentRed'>\+" + parseResult + "</span></td>";
                        }
                        if(parseResult.toString().split("%")[0]<0){
                            if(curObj[td_color[j][1]]=="1")
                                currentHTML="<td><span class='percentGreen'>（" + parseResult + "）</span></td>";
                            else
                                currentHTML="<td><span class='percentGreen'>" + parseResult + "</span></td>";
                        }
                    }
                    //涨跌幅不需要判断除权除息的情况
                    if(td_color[j]==block_field[j]){
                        if(parseResult.toString().split("%")[0]>0){
                            currentHTML="<td><span class='percentRed'>\+" + parseResult + "</span></td>";
                        }
                        if(parseResult.toString().split("%")[0]<0){
                            currentHTML="<td><span class='percentGreen'>" + parseResult + "</span></td>";
                        }
                    }

                    html+=currentHTML;
                }

                html+="</tr>";
            }

            $("#"+block_id+" tbody").html(html);


            //表格数据加载完毕后，如果表格有涨跌幅和最新价这两列，最新价的颜色置为与涨跌额的颜色相同
            FDC_DC.changeNewPriceColor();

            //表格数据添加完毕后，如果有需要通过股票代码请求行情接口，获取最新价和涨跌幅的，这里进行判断处理
            FDC_DC.hqDeal();

            //处理表格表头数据日期等
            FDC_DC.dealThead(json);

            //数据加载结束
            dataRightReady(block_id,FDC_DC.blocks);
        },

        //处理表格表头
        dealThead:function(json){
            //获取数据日期
            $("#deadlineSpan").text(json[0].day);
        },

        //改变最新价单元格的颜色
        changeNewPriceColor:function(){
            //如果表头已固定
            if($(".fixedThead").length==1){
                //如果同时存在最新价和涨跌额
                if($(".fixedThead .priceChange").length==1 && $(".fixedThead .newPrice").length==1){
                    var pcIndex=$(".fixedThead .priceChange").index();
                    var npIndex=$(".fixedThead .newPrice").index();

                    $("#block_1 tbody tr").each(function(){
                        var theClass=$(this).find("td").eq(pcIndex).find("span").attr("class");
                        $(this).find("td").eq(npIndex).html("<span class='"+theClass+"'>"+$(this).find("td").eq(npIndex).text()+"</span>");
                    });
                }
            }
            else{
                //如果同时存在最新价和涨跌额
                if($(".priceChange").length==1 && $(".newPrice").length==1){
                    var pcIndex=$(".priceChange").index();
                    var npIndex=$(".newPrice").index();

                    $("#block_1 tbody tr").each(function(){
                        var theClass=$(this).find("td").eq(pcIndex).find("span").attr("class");
                        $(this).find("td").eq(npIndex).html("<span class='"+theClass+"'>"+$(this).find("td").eq(npIndex).text()+"</span>");
                    });
                }
            }
        },

        //请求行情接口，获取最新价和涨跌幅
        hqDeal:function(){
            var symbolList=$(".hqSymbol");
            if(symbolList.length==0) return;

            var symbolArr=[];
            symbolList.each(function(){
                var currentSymbol=$(this).text();
                currentSymbol=currentSymbol.substr(currentSymbol.length-6,6);
                if(currentSymbol.substr(0,2)=="60"||currentSymbol.substr(0,2)=="90"||currentSymbol.substr(0,2)=="58"){
                    currentSymbol="s_sh"+currentSymbol;
                }
                else{
                    currentSymbol="s_sz"+currentSymbol;
                }
                symbolArr.push(currentSymbol);
            });

            var hqURL="http://hq.sinajs.cn/?_="+Math.random()+"&list="+symbolArr.toString();

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

                        $(".hqPrice").each(function(i){
                            var price=eval("hq_str_"+symbolArr[i]).split(",")[1];
                            if(price==undefined)
                                price="--";
                            $(this).text(price);
                        });
                        $(".hqPercent").each(function(i){
                            var percent=eval("hq_str_"+symbolArr[i]).split(",")[3];
                            if(percent==undefined){
                                $(this).text("--");
                            }
                            else{
                                if(parseFloat(percent)>0){
                                    $(this).addClass("percentRed");
                                    $(this).text("+"+percent+"%");
                                }
                                else{
                                    $(this).addClass("percentGreen");
                                    $(this).text(percent+"%");
                                }
                            }
                        });

                        //如果是可转债页面，计算转股价值和溢价率
                        if($(".kzz_zgjz").length!=0){
                            FDC_DC.kzzCalculate();
                        }
                    }
                }
            }
            else{
                script.onload=function(){
                    //获取到最新价和涨跌幅后，这里删除向head中添加的script标签，以免影响下次数据的显示
                    head.removeChild(script);

                    $(".hqPrice").each(function(i){
                        var price=eval("hq_str_"+symbolArr[i]).split(",")[1];
                        if(price==undefined)
                            price="--";
                        $(this).text(price);
                    });
                    $(".hqPercent").each(function(i){
                        var percent=eval("hq_str_"+symbolArr[i]).split(",")[3];
                        if(percent==undefined){
                            $(this).text("--");
                        }
                        else{
                            if(parseFloat(percent)>0){
                                $(this).addClass("percentRed");
                                $(this).text("+" + percent + "%");
                            }
                            else{
                                $(this).addClass("percentGreen");
                                $(this).text(percent + "%");
                            }
                        }
                    });

                    //如果是可转债页面，计算转股价值和溢价率
                    if($(".kzz_zgjz").length!=0){
                        FDC_DC.kzzCalculate();
                    }
                }
            }

            //获取到最新价和涨跌幅后，这里删除向head中添加的script标签，以免影响下次数据的显示
            //head.removeChild(script);
        },

        //如果是可转债页面，计算转股价值和溢价率
        kzzCalculate:function(){
            var hqPriceArr=[];
            var kzz_zgj_array=[];

            var kzz_new_price_array=[];
            var kzz_zgjz_array=[];

            $(".hqPrice").each(function(){
                hqPriceArr.push($(this).text());
            });
            $(".kzz_zgj").each(function(){
                kzz_zgj_array.push($(this).text());
            });

            $(".kzz_new_price").each(function(){
                kzz_new_price_array.push($(this).text());
            });

            $(".kzz_zgjz").each(function(i){
                var kzz_zgjz=(parseFloat(hqPriceArr[i])/parseFloat(kzz_zgj_array[i])*100).toFixed(2);
                $(this).text(kzz_zgjz);
                kzz_zgjz_array.push(kzz_zgjz);
            });
            $(".kzz_yjl").each(function(i){
                $(this).text((parseFloat(kzz_new_price_array[i])-parseFloat(kzz_zgjz_array[i])).toFixed(2)+"%");
            });
        }
    }

    window.FDC_DC=FDC_DC;
})();
