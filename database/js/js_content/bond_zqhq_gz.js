/*
    date:2014-09-02
    author:xiezhiqiang
*/
(function(){
    var bond_zqhq_gz={
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
            //为表格字段排序绑定事件
            var thList=$("#block_1 thead th");
            for(var i=0; i<thList.length;i++){
                //如果当前th标签里有span标签（这里就要求所有对应表格的字段，都要写成th标签，否则会出错）
                if($(thList[i]).find("span").length!=0){
                    //为含有span标签的th标签绑定事件
                    $(thList[i]).find("span").attr("onclick","bond_zqhq_gz.fieldSort(this)");
                }
            }
        },

        //点击表头时，改变背景色
        fieldSort:function(element){
            $(element).parent().parent().find("th").css("background","");

            if(bond_zqhq_gz.asc==1){
                $(element).parent().css("background","url('images/down_arrow.gif') no-repeat center right");
                bond_zqhq_gz.asc=0;
            }
            else{
                $(element).parent().css("background","url('images/up_arrow.gif') no-repeat center right");
                bond_zqhq_gz.asc=1;
            }

            var index=0;
            if($(".fixedThead").length!=0)
                index=$("#block_1 .fixedThead tr th").index($(element).parent());
            else
                index=$("#block_1 thead tr th").index($(element).parent());

            //var index=$("#block_1 thead tr th").index($(element).parent());
			
            //arrSort(d, s, asc)参数分别为：二维数组，排序的字段在数组对应的索引，升降序
            bond_zqhq_gz.totalArray=bond_zqhq_gz.arrSort(bond_zqhq_gz.totalArray,index,bond_zqhq_gz.asc);
            bond_zqhq_gz.insertTableData();
        },

        getASC:function(){
            var sortFeild="";
            var blockId="#block_1";

            $(blockId+" thead th").each(function (i) {
                if($(this).css("background-image")!="none"){
                    var imageUrlArr=$(this).css("background-image").split("/");
                    if(imageUrlArr[imageUrlArr.length-1]=="down_arrow.gif)")
                        bond_zqhq_gz.asc=0;
                    else
                        bond_zqhq_gz.asc=1;
                }
            });
        },

        getTableData:function(){
            var theURL="http://finance.sina.com.cn/data_center/zq/bond_zqhq_gz.js";

            bond_zqhq_gz.tableDataScript=document.createElement("script");
            bond_zqhq_gz.tableDataScript.setAttribute("src",theURL);
            document.body.insertBefore(bond_zqhq_gz.tableDataScript, document.body.childNodes[0]);

            //如果是IE
            if(document.all){
                bond_zqhq_gz.tableDataScript.onreadystatechange=function(){
                    if(bond_zqhq_gz.tableDataScript.readyState=="loaded" || bond_zqhq_gz.tableDataScript.readyState=="complete") {
                        bond_zqhq_gz.theTableData(bond_zqhq_gz_data);
                    }
                }
            }
            else{
                bond_zqhq_gz.tableDataScript.onload=function(){
                    bond_zqhq_gz.theTableData(bond_zqhq_gz_data);
                }
            }
        },

        theTableData:function(data){
            try{
                //删除掉刚才请求接口时创建的script的标签
                document.body.removeChild(bond_zqhq_gz.tableDataScript);
            }
            catch(error){
                //do nothing
            }

            //将需要在表格中显示的字段，按顺序放入数组中
            bond_zqhq_gz.pushIntoArray(data[0].items);
        },

        pushIntoArray:function(dataArr){
            //将数据放在二维数组里
            for(var i=0;i<dataArr.length;i++){
                var currentArray=new Array();

                currentArray.push(dataArr[i][0]);//代码
                currentArray.push(dataArr[i][1]);//名称
                currentArray.push(parseFloat(dataArr[i][2]).toFixed(2));//最新价
                currentArray.push(parseFloat(dataArr[i][3]).toFixed(3));//涨跌额
                currentArray.push(parseFloat(dataArr[i][4]).toFixed(2)+'%');//涨跌幅
                currentArray.push(dataArr[i][34]);//全价
                currentArray.push(parseFloat(dataArr[i][11])/100);//成交量
                currentArray.push(parseFloat(parseFloat(dataArr[i][12])/10000).toFixed(2));//成交额
                currentArray.push(dataArr[i][31]);//每年付息日
                currentArray.push(parseFloat(dataArr[i][36]).toFixed(2));//剩余年限
                currentArray.push(dataArr[i][29]+"%");//票面利息
                currentArray.push(dataArr[i][32].toString().substr(0,10));//到期时间

                bond_zqhq_gz.totalArray.push(currentArray);
            }

            //数据处理完毕后，开始向表格中插入数据
            bond_zqhq_gz.insertTableData();
        },

        insertTableData:function(){
            var totalLength=bond_zqhq_gz.totalArray.length;
            var tableHTML="";

            for(var i=0;i<totalLength;i++){
                var trDataArr=bond_zqhq_gz.totalArray[i];

                tableHTML+="<tr>";
                for(var j=0;j<trDataArr.length;j++){
                    switch(j){
                        case 0:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[0]+"' target='_blank'>"+trDataArr[0].slice(2)+"</a></td>";
                            break;
                        case 1:
                            tableHTML+="<td><a href='http://biz.finance.sina.com.cn/suggest/lookup_n.php?q="+trDataArr[0]+"' target='_blank'>"+trDataArr[1]+"</a></td>";
                            break;
                        case 2:
                            if(trDataArr[3]>0)
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[2]+"</span></td>";
                            if (trDataArr[3]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[2]+"</span></td>";
                            if (trDataArr[3]==0)
                                tableHTML+="<td>"+trDataArr[2]+"</td>";
                            break;
                        case 3:
                            if(trDataArr[3]>0)
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[3]+"</span></td>";
                            if (trDataArr[3]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[3]+"</span></td>";
                            if (trDataArr[3]==0)
                                tableHTML+="<td>"+trDataArr[3]+"</td>";
                            break;
                        case 4:
                            if(trDataArr[3]>0)
                                tableHTML+="<td><span class='percentRed'>"+trDataArr[4]+"</span></td>";
                            if (trDataArr[3]<0)
                                tableHTML+="<td><span class='percentGreen'>"+trDataArr[4]+"</span></td>";
                            if (trDataArr[3]==0)
                                tableHTML+="<td>"+trDataArr[4]+"</td>";
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
        }
    }

    window.bond_zqhq_gz=bond_zqhq_gz;
})();

