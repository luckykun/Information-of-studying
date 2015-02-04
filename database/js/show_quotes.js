/**
 http://i2.sinaimg.cn/cj/news/2007/1206/stock_v1.js
 TO DO : finance news stock keywords show
 */
!function ()
{
    var newspan = document.createElement("span");
    newspan.id = "s_chart";
    document.body.appendChild(newspan);

    var _refreshHKStock = false;
    function show_quote(str,type,arrayPriceLast)
    {
        var code = new Array();
        code = str.split(",");
        var l = code.length;
        if(arrayPriceLast)
        {
            arrayPriceLast = arrayPriceLast.split(",");
        }
        arrayPrice = new Array();

        for(var i = 0;i < l;i++)
        {
            //if ( type == "hkstock" )
            //	code[i] = "rt_" + code[i];

            var a = eval("hq_str_" + code[i]);
            if(a == "")
            {
                continue;
            }
            var s = a.split(",");

            if(type == "stock")
            {
                var price = s[3];
                if(price == 0) price = s[2];
                var variable = price - s[2];
                var percent = variable / s[2] * 100;
                var time = s[30] + " " + s[31];
                percent = percent.toFixed(2);
                variable = variable.toFixed(2);
            }
            if(type == "forex")
            {
                var price = s[8];
                if(s[3] == "" || s[3] == 0)
                {
                    s[3] = 0;
                    percent = 0;
                    variable = 0;
                } else
                {
                    var variable = price - s[3];
                    variable = variable.toFixed(4);
                    var percent = variable / s[3] * 100;
                    var time = s[0];
                    percent = percent.toFixed(2);
                }
            }

            if(type == "futures")
            {
                var price = s[8] * 1;
                var variable = price - s[10];
                var percent = variable / s[10] * 100;
                var time = s[1];
                price = code[i] == "au0806" ? price.toFixed(2) : Math.ceil(price);
                percent = percent.toFixed(2);
                variable = variable.toFixed(2);
            }
            if(type == "overseas_futures")
            {
                var price = s[0] * 1;
                var variable = price - s[7];
                var percent = variable / s[7] * 100;
                var time = s[12] + "&nbsp;" + s[6];
                price = price.toFixed(2);
                percent = percent.toFixed(2);
                variable = variable.toFixed(2);
            }
            if(type == "hkstock")
            {
                var price = s[6] * 1;
                var variable = s[7] * 1;
                var percent = s[8] * 1;
                var time = s[17] + " " + s[18];
                percent = percent.toFixed(2);
                variable = variable.toFixed(2);
            }
            if(type == "usstock"){
                var price = s[1] * 1;
                var variable = s[4] * 1;
                var percent = s[2] * 1;
                var time = s[3];
                percent = percent.toFixed(2);
                variable = variable.toFixed(2);
            }

            if(variable > 0)
            {
                color = "red";
            } else if(variable < 0)
            {
                color = "green";
            } else
            {
                color = "black";
            }
            if(type == "hkstock" || type == "overseas_futures" || type == 'usstock')
            {
                if(variable > 0)
                {
                    color = "green";
                } else if(variable < 0)
                {
                    color = "red";
                } else
                {
                    color = "black";
                }
            }

            var arrow = "";
            arrayPrice[i] = price;
            var P = "<font color=" + color + ">" + price + "</font>";
            var V = "<font color=" + color + ">" + variable + "</font>";
            var C = "<font color=" + color + ">" + percent + "%</font>";
//            var Q = "(" + P + "," + V + "," + C + ")";
            var Q;

            if(type == 'hkstock' && /^rt_hk\d+$/.test(code[i]) == true)
            {
                var R = '<a href="http://stock.finance.sina.com.cn/hkstock/quotes/' + code[i].replace("rt_hk","") + '.html" target="_blank" class="keyword">实时行情</a>'
                Q = "(" + P + ", " + V + ", " + C + ", " + R + ")";
            }
            else
            {
                Q = "(" + P + ", " + V + ", " + C + ")";
            }

            var myImage;
            if(type == 'usstock'){
//                console.log('quote_' + code[i].replace("gb_","").replace('$','.').toUpperCase());
                //$('quote_' + code[i].replace("gb_","").replace('$','.').toUpperCase()).innerHTML = Q;
                myImage = new setImg(type,code[i].replace("gb_","").replace('$','.').toUpperCase() ,time);
            }else{
                //$('quote_' + code[i].replace("rt_","")).innerHTML = Q;
                myImage = new setImg(type,code[i].replace("rt_",""),time);
            }


            myImage.showImage();

        }
        //改为实时的key
        if(type == "hkstock")
            str = code.join(",");

        var url = "http://hq.sinajs.cn/list=" + str;
        load_quote_data(url);

        if(type == "hkstock")
        {
            if(_refreshHKStock == false)
            {
                _refreshHKStock = true;
                setTimeout("show_quote('" + str + "','" + type + "','" + arrayPrice + "')",5000);
            }
        }
        else
        {
            setTimeout("show_quote('" + str + "','" + type + "','" + arrayPrice + "')",5000);
        }
    }
    window.show_quote = show_quote;

    Function.prototype.method = function (name,func)
    {
        this.prototype[name] = func;
        return this;
    };
    function setImg(type,code,time)
    {
        this.v = {};
        this.setvalue('code',code);
        this.setvalue('type',type);
        this.setvalue('time',time);
    }
    setImg.method('setvalue',function (key,value)
    {
        this.v[key] = value;
        return this;
    });
    setImg.method('getValue',function (k) { return this.v[k]; });
    setImg.method('showImage',function ()
    {
        code = this.getValue('code');
        type = this.getValue('type');
        var _self = this;
        alink = $(type + '_' + code);
		blink = $(type + '_name_' + code);
        myShow = function (evt)
        {
            clearTimeout($('s_chart').timer);
            _code = _self.getValue('code');
            _type = _self.getValue('type');
            _time = _self.getValue('time');
            var Obj = $('s_chart');

            e = window.event ? window.event : evt;
            objEvent = e.target || e.srcElement;
            x = objPosX(objEvent);
            y = objPosY(objEvent);

            Obj.style.position = "absolute";
            Obj.style.left = x + "px";
            Obj.style.top = y + 16 + "px";
            Obj.style.visibility = "visible";

            var code_a = _code.substr(0,2);
            var code_b = _code.substr(2,6);
            if(_type == "stock")
            {
                var CHART = "";
                CHART += "<form action=\"http://biz.finance.sina.com.cn/suggest/lookup_n.php\" method='get' target='_blank'>";
                CHART += "<div class=\"s0\">";
                CHART += "<div class=\"s1\">";
                CHART += "<ul>";
                CHART += "<li><a href=\"http://vip.stock.finance.sina.com.cn/portfolio/qjia.php?symbol=" + _code + "&ru=" + window.location.href + "\" target='_self' title='点击加入我的自选股' style='color:#f00' suda-uatrack='key=finance_zwfc_cn&value=1'>加入自选股</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://money.finance.sina.com.cn/corp/go.php/vCB_AllNewsStock/symbol/" + code_a + code_b + ".phtml\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=2'>资讯</a></li>";
                CHART += "<li>┊</li>";
                //				CHART += "<li><a href=\"http://comment.finance.sina.com.cn/comment/skin/cj_stock.html?channel=gg&newsid="+code_a+"-"+code_b+"&style=1\" target='_blank'>论坛</a></li>";
                CHART += "<li><a href=\"http://guba.sina.com.cn/bar.php?name=" + _code + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=3'>股吧</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://biz.finance.sina.com.cn/stock/company/bulletin_list.php?code=" + code_b + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=4'>公告</a></li>";
                CHART += "</ul>";
                CHART += "</div>";
                CHART += "<div class=\"s2\">";
                CHART += "<input name=\"q\" type=\"text\" size=\"6\" style=\"font-size:12px;\"/>&nbsp;";
                CHART += "<select name=\"country\" style=\"font-size:12px;\">";
                CHART += "<option value=\"stock\" selected=\"selected\">大陆股市</option>";
                CHART += "<option value=\"fund\">大陆基金</option>";
                CHART += "<option value=\"hk\">香港股市</option>";
                CHART += "<option value=\"us\">美国股市</option>";
                CHART += "</select>&nbsp;";
                CHART += "<input type=\"submit\" value=\"查询\" style=\"font-size:12px;\"/ name=\"Submit\" suda-uatrack='key=finance_zwfc_cn&value=5'>";
                CHART += "</div>";
                CHART += "<div>";
                CHART += "<div class=\"s5\">";
                CHART += "TIME: " + _time;
                CHART += "</div>";
                CHART += "<div class=s6><a href=\"http://finance.sina.com.cn/realstock/company/" + _code + "/nc.shtml\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=6'><img src=\"http://fchart.sina.com.cn/newchart/small/b" + _code + ".gif\" width=\"199\" height=\"125\" border=0></a></div>";
                if(code_b.substr(0,3) != "000" && code_b.substr(0,2) != "39")
                {
                    CHART += "<div class=\"s3\">";
                    CHART += "<ul>";
                    CHART += "<li>·<a href=\"http://biz.finance.sina.com.cn/qmx/stockreports.php?symbol=" + code_b + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=7'>研究报告</a></li>";
                    CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradedetail.php?symbol=" + _code + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=8'>成交明细</a></li>";
                    CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/quotes_service/view/cn_bill.php?symbol=" + _code + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>大单追踪</a></li>";
                    CHART += "<li>·<a href=\"http://money.finance.sina.com.cn/corp/go.php/vCI_CorpInfo/stockid/" + code_b + ".phtml\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=10'>公司简介</a></li>";
                    CHART += "<li>·<a href=\"http://money.finance.sina.com.cn/corp/go.php/vCI_StockStructure/stockid/" + code_b + ".phtml\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=11'>股本结构</a></li>";
                    CHART += "<li>·<a href=\"http://money.finance.sina.com.cn/corp/go.php/vFD_FinanceSummary/stockid/" + code_b + "/displaytype/4.phtml\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=12'>财务数据</a></li>";
                    CHART += "</ul>";
                    CHART += "</div>";
                }
                CHART += "<div class=\"s4\">";
                //				CHART += "<a href=\"http://guba.sina.com.cn/bar.php?name="+_code+"\" style='text-decoration:none;' target='_blank'>吧</a>";
                //				CHART += "&nbsp;&nbsp;";
                CHART += "<a href=\"http://comment.finance.sina.com.cn/comment/skin/default.html?channel=cj&newsid=31-1-2989739\" target='_blank'>意见反馈</a>";
                CHART += "</div>";
                CHART += "</div>";
                CHART += "</form>";

                window._S_uaTrack && _S_uaTrack("finance_zwfc_cn","pageview");
            }

            if(_type == "forex")
            {

                var CHART = "";
                CHART += "<form action='http://biz.finance.sina.com.cn/forex/quote.php' method='get' target='_blank'>";
                CHART += "<div class=\"s0\">";
                CHART += "<div class=\"s7\">";
                CHART += "<ul>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/forex/\" target='_blank'>资讯</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://forum.finance.sina.com.cn/?6:71\" target='_blank'>论坛</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://iask.finance.sina.com.cn/info/finance_exp_forex.html\" target='_blank'>问答</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/money/\" target='_blank'>理财</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://biz.finance.sina.com.cn/forex/quote.php?code=" + _code + "&img_type=min\" target='_blank'>更多</a></li>";
                CHART += "</ul>";
                CHART += "</div>";
                CHART += "<div class=\"s2\">";
                CHART += "<select name='code'><option value='JPY' >日元</option><option value='CHF' >瑞郎</option><option value='GBP' >英镑</option><option value='EUR' selected>欧元</option><option value='HKD' >港币</option><option value='AUD' >澳元</option><option value='CAD' >加元</option><option value='ERUK' >欧元英镑</option><option value='ERSF' >欧元瑞郎</option><option value='SFYN' >瑞郎日元</option><option value='ERYN' >欧元日元</option><option value='ERCA' >欧元加元</option><option value='ERHK' >欧元港币</option><option value='AUER' >澳元欧元</option><option value='AUCA' >澳元加元</option><option value='AUSF' >澳元瑞郎</option><option value='UKHK' >英镑港币</option><option value='UKSF' >英镑瑞郎</option><option value='UKCA' >英镑加元</option><option value='UKYN' >英镑日元</option><option value='UKAU' >英镑澳元</option><option value='CAYN' >加元日元</option><option value='CAHK' >加元港币</option><option value='CHFCAD' >瑞郎加元</option><option value='SFHK' >瑞郎港币</option><option value='HKYN' >港币日元</option><option value='AUYN' >澳元日元</option><option value='ERAU' >欧元澳元</option><option value='UKER' >英镑欧元</option><option value='CASF' >加元瑞郎</option></select>";
                CHART += "<input type='hidden' name='img_type' value='min'>&nbsp;&nbsp;<input type='submit' value='查    询' >";
                CHART += "</div>";
                CHART += "<div>";
                CHART += "<div class=\"s5\">";
                CHART += "TIME: " + _time;
                CHART += "</div>";
                CHART += "<div class=s6><a href=\"http://biz.finance.sina.com.cn/forex/quote.php?code=" + _code + "&img_type=min\" target='_blank'><img src=\"http://fchart.sina.com.cn/newchart/forex/min_small/" + _code + ".gif\" width=\"199\" height=\"125\" border=0></a></div>";
                CHART += "<div class=\"s3\">";
                CHART += "<ul>";
                CHART += "</ul>";
                CHART += "</div>";
                CHART += "<div class=\"s4\">";
                CHART += "<a href=\"http://comment.finance.sina.com.cn/comment/skin/default.html?channel=cj&newsid=31-1-2989739\" target='_blank'>意见反馈</a>";
                CHART += "</div>";
                CHART += "</div>";
                CHART += "</form>";
            }

            if(_type == "futures")
            {

                var Futures_type = "";
                var news_url = "http://finance.sina.com.cn/futuremarket/futuresroll.html";
                switch(_code.replace(/^hf_/,"").replace(/\d+/,""))
                {
                    case "GC":
                    case "au":
                        news_url = "http://finance.sina.com.cn/futuremarket/gold.html";
                        break;
                    case "CL":
                    case "fu":
                        news_url = "http://finance.sina.com.cn/futuremarket/oilroll.html";
                        break;
                    case "cu":
                    case "al":
                    case "zn":
                    case "ru":
                    case "l":
                    case "TA":
                    case "v":
                    case "rb":
                    case "wr":
                        news_url = "http://finance.sina.com.cn/futuremarket/indu.html";
                        break;
                    case "a":
                    case "m":
                    case "y":
                    case "RO":
                    case "p":
                    case "CF":
                    case "SR":
                    case "c":
                    case "WS":
                    case "WT":
                    case "ER":
                        news_url = "http://finance.sina.com.cn/futuremarket/agri.html";
                        break;
                }
                _time = _time.substr(0,2) + ":" + _time.substr(2,2) + ":" + _time.substr(4,2);

                var CHART = "";
                CHART += "<form action='http://biz.finance.sina.com.cn/forex/quote.php' method='get' target='_blank'>";
                CHART += "<div class=\"s0\">";
                CHART += "<div class=\"s7\">";
                CHART += "<ul>";
                CHART += "<li><a href=" + news_url + " target='_blank'>资讯</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/futuremarket/comm.html\" target='_blank'>评论</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/futuremarket/rese.html\" target='_blank'>研究</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://biz.finance.sina.com.cn/futures/ask/\" target='_blank'>答疑</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/money/future/quote.html?code=" + _code + "\" target='_blank'>更多</a></li>";
                CHART += "</ul>";
                CHART += "</div>";
                //CHART += "<div class=\"s2\">";
                //CHART += "";
                //CHART += "<input type='hidden' name='img_type' value='min'>&nbsp;&nbsp;<input type='submit' value='查    询' >";
                //CHART += "</div>";
                CHART += "<div>";
                CHART += "<div class=\"s5\">";
                CHART += "TIME: " + _time;
                CHART += "</div>";
                CHART += "<div class=s6><a href=\"http://finance.sina.com.cn/money/future/quote.html?code=" + _code + "\" target='_blank'><img src=\"http://image.sinajs.cn/newchart/v5/futures/min1/" + _code + ".gif\" width=\"199\" height=\"125\" border='0'></a></div>";
                CHART += "<div class=\"s3\">";
                CHART += "<ul>";
                CHART += "</ul>";
                CHART += "</div>";
                CHART += "<div class=\"s4\">";
                CHART += "<a href=\"http://comment.finance.sina.com.cn/comment/skin/default.html?channel=cj&newsid=31-1-2989739\" target='_blank'>意见反馈</a>";
                CHART += "</div>";
                CHART += "</div>";
                CHART += "</form>";

            }
            if(_type == "overseas_futures")
            {
                var news_url = "http://finance.sina.com.cn/futuremarket/futuresroll.html";
                switch(_code.replace("hf_","").replace(/\d+/,""))
                {
                    case "GC":
                    case "au":
                        news_url = "http://finance.sina.com.cn/futuremarket/gold.html";
                        break;
                    case "CL":
                    case "fu":
                        news_url = "http://finance.sina.com.cn/futuremarket/oilroll.html";
                        break;
                    case "cu":
                    case "al":
                    case "zn":
                    case "ru":
                    case "l":
                    case "TA":
                    case "v":
                    case "rb":
                    case "wr":
                        news_url = "http://finance.sina.com.cn/futuremarket/indu.html";
                        break;
                    case "a":
                    case "m":
                    case "y":
                    case "RO":
                    case "p":
                    case "CF":
                    case "SR":
                    case "c":
                    case "WS":
                    case "WT":
                    case "ER":
                        news_url = "http://finance.sina.com.cn/futuremarket/agri.html";
                        break;
                }
                var CHART = "";
                CHART += "<form action='http://biz.finance.sina.com.cn/forex/quote.php' method='get' target='_blank'>";
                CHART += "<div class=\"s0\">";
                CHART += "<div class=\"s7\">";
                CHART += "<ul>";
                CHART += "<li><a href=\"" + news_url + "\" target='_blank'>资讯</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/futuremarket/comm.html\" target='_blank'>评论</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/futuremarket/rese.html\" target='_blank'>研究</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://biz.finance.sina.com.cn/futures/ask/\" target='_blank'>答疑</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/money/future/" + _code.replace("hf_","") + "/quote.shtml\" target='_blank'>更多</a></li>";
                CHART += "</ul>";
                CHART += "</div>";
                //CHART += "<div class=\"s2\">";
                //CHART += "";
                //CHART += "<input type='hidden' name='img_type' value='min'>&nbsp;&nbsp;<input type='submit' value='查    询' >";
                //CHART += "</div>";
                CHART += "<div>";
                CHART += "<div class=\"s5\">";
                CHART += "TIME: " + _time;
                CHART += "</div>";
                CHART += "<div class=s6><a href=\"http://finance.sina.com.cn/money/future/" + _code.replace("hf_","") + "/quote.shtml\" target='_blank'><img src=\"http://image.sinajs.cn/newchart/v5/futures/global/mint/" + _code.replace("hf_","") + ".gif\" width=\"199\" height=\"125\" border='0'></a></div>";
                CHART += "<div class=\"s3\">";
                CHART += "<ul>";
                CHART += "</ul>";
                CHART += "</div>";
                CHART += "<div class=\"s4\">";
                CHART += "<a href=\"http://comment.finance.sina.com.cn/comment/skin/default.html?channel=cj&newsid=31-1-2989739\" target='_blank'>意见反馈</a>";
                CHART += "</div>";
                CHART += "</div>";
                CHART += "</form>";

            }

            if(_type == "hkstock")
            {
                var CHART = "";
                CHART += "<form action=\"http://biz.finance.sina.com.cn/suggest/lookup_n.php\" method='get' target='_blank'>";
                CHART += "<div class=\"s0\" style='width:220px;'>";
                CHART += "<div class=\"s1\">";
                CHART += "<ul>";
                CHART += "<li><a href=\"http://vip.stock.finance.sina.com.cn/hkstock/main.php\" target='_self' title='港股自选' style='color:#f00' suda-uatrack='key=finance_zwfc_hk&value=1'>港股自选</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://stock.finance.sina.com.cn/hkstock/quotes/" + code_b + ".html\" target='_blank' suda-uatrack='key=finance_zwfc_hk&value=2'>行情</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://hkstock.finance.sina.com.cn/company/list.php?symbol=" + code_b + "\" target='_blank' suda-uatrack='key=finance_zwfc_hk&value=3'>公告</a></li>";
                CHART += "<li>┊</li>";
                CHART += "<li><a href=\"http://finance.sina.com.cn/stock/hkstock/anh.shtml\" target='_blank' suda-uatrack='key=finance_zwfc_hk&value=4'>AH比价</a></li>";
                CHART += "</ul>";
                CHART += "</div>";
                CHART += "<div class=\"s2\">";
                CHART += "<input name=\"q\" type=\"text\" size=\"6\" style=\"font-size:12px;\"/>&nbsp;";
                CHART += "<select name=\"country\" style=\"font-size:12px;\">";
                CHART += "<option value=\"hk\" selected=\"selected\">香港股市</option>";
                CHART += "<option value=\"stock\">大陆股市</option>";
                CHART += "<option value=\"fund\">大陆基金</option>";
                CHART += "<option value=\"us\">美国股市</option>";
                CHART += "</select>&nbsp;";
                CHART += "<input type=\"submit\" value=\"查询\" style=\"font-size:12px;\"/ name=\"Submit\" suda-uatrack='key=finance_zwfc_hk&value=5'>";
                CHART += "</div>";
                CHART += "<div>";
                CHART += "<div class=\"s5\">";
                CHART += "TIME: " + _time;
                CHART += "</div>";
                CHART += "<div class=s6><a href=\"http://stock.finance.sina.com.cn/hkstock/quotes/" + code_b + ".html\" target='_blank' suda-uatrack='key=finance_zwfc_hk&value=6'><img src=\"http://3g.sina.com.cn/3g/static/images/finance/hkstock/wap_min5/" + code_b + ".gif\" border=0></a></div>";
                CHART += "</div>";
                CHART += "</form>";

                window._S_uaTrack && _S_uaTrack("finance_zwfc_hk","pageview");
            }

            if(_type == 'usstock'){
                var CHART = "";
                if(_code != '.DJI' && _code!='.INX' && _code !='.IXIC'){
                    CHART += "<div class=\"s0\">";
                    CHART += "<div class=\"s1\">";
                    CHART += "<ul class='clearfix'>";
                    CHART += "<li><a href=\"http://i.finance.sina.com.cn/guide_zixuan.html?usstock"+ "\" target='_self' title='点击加入我的自选股' style='color:#f00' suda-uatrack='key=finance_zwfc_cn&value=1'>加入自选股</a></li>";
                    CHART += "<li>┊</li>";
                    CHART += "<li><a href=\"http://biz.finance.sina.com.cn/usstock/usstock_news.php?symbol=" + _code.toUpperCase() +"\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=2'>资讯</a></li>";
                    CHART += "</ul>";
                    CHART += "</div>";
                    CHART += "<div>";
                    CHART += "<div class=s6><a href=\"http://stock.finance.sina.com.cn/usstock/quotes/"+_code.toUpperCase()+".html\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=6'><img src=\"http://image.sinajs.cn/newchart/v5/usstock/wap/min_daily/226/"  + _code +".gif?r=1374470986\" width=\"199\" border=0></a></div>";
                    if(code_b.substr(0,3) != "000" && code_b.substr(0,2) != "39")
                    {
                        CHART += "<div class=\"s3\">";
                        CHART += "<ul class='clearfix'>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/summary.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=7'>公司摘要</a></li>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/officers.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=8'>公司高管</a></li>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/directors.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>公司董事</a></li>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/tradeactive.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>高管交易</a></li>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/owership.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>持股状况</a></li>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/income.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>利润分配</a></li>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/balance.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>资产负债</a></li>";
                        CHART += "<li>·<a href=\"http://vip.stock.finance.sina.com.cn/usstock/cash.php?s=" + _code.toUpperCase() + "\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>现金流量</a></li>";
                        CHART += "</ul>";
                        CHART += "</div>";
                    }
                    CHART += "</div>";
                }else{
                    CHART += "<div class=\"s0\">";
                    CHART += "<div class=\"s1\">";
                    CHART += "<ul class='clearfix'>";
                    CHART += "<li><a href=\"http://i.finance.sina.com.cn/guide_zixuan.html?usstock"+ "\" target='_self' title='点击加入我的自选股' style='color:#f00' suda-uatrack='key=finance_zwfc_cn&value=1'>加入自选股</a></li>";
                    CHART += "<li>┊</li>";
                    CHART += "<li><a href=\"http://roll.finance.sina.com.cn/s/channel.php?ch=03#col=49&spec=&type=&ch=03&k=&offset_page=0&offset_num=0&num=60&asc=&page=1\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=2'>资讯</a></li>";
                    CHART += "</ul>";
                    CHART += "</div>";
                    CHART += "<div>";
                    CHART += "<div class=s6><a href=\"http://stock.finance.sina.com.cn/usstock/quotes/"+_code.toUpperCase()+".html\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=6'><img src=\"http://image.sinajs.cn/newchart/v5/usstock/wap/min_daily/226/"  + _code +".gif?r=1374470986\" width=\"199\" border=0></a></div>";
                    if(code_b.substr(0,3) != "000" && code_b.substr(0,2) != "39")
                    {
                        CHART += "<div class=\"s3\">";
                        CHART += "<ul class='clearfix'>";
                        CHART += "<li>·<a href=\"http://roll.finance.sina.com.cn/s/channel.php?ch=03#col=49&spec=&type=&ch=03&k=&offset_page=0&offset_num=0&num=60&asc=&page=1\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=7'>美股滚动</a></li>";
                        CHART += "<li>·<a href=\"http://roll.finance.sina.com.cn/finance/mg/mgpl/index.shtml\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=8'>美股评论</a></li>";
                        CHART += "<li>·<a href=\"http://tech.sina.com.cn/internet/\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>互联网</a></li>";
                        CHART += "<li>·<a href=\"http://finance.sina.com.cn/stock/usstock/uslist.html#titlePos_1\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>科技股</a></li>";
                        CHART += "<li>·<a href=\"http://finance.sina.com.cn/temp/stock/usstock/sector.shtml#f_zscf\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>成分股</a></li>";
                        CHART += "<li>·<a href=\"http://finance.sina.com.cn/stock/usstock/sector.shtml\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>板块行情</a></li>";
                        CHART += "<li>·<a href=\"http://finance.sina.com.cn/stock/usstock/cnlist.html\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>中概股</a></li>";
                        CHART += "<li>·<a href=\"http://finance.sina.com.cn/money/globalindex/\" target='_blank' suda-uatrack='key=finance_zwfc_cn&value=9'>环球股指</a></li>";
                        CHART += "</ul>";
                        CHART += "</div>";
                    }
                    CHART += "</div>";
                }
            }

            $('s_chart').innerHTML = CHART;

            _alink = $('s_chart');
            _alink.onmouseover = function ()
            {
                this.style.visibility = "visible";
                clearTimeout(this.timer);
            };
            _alink.onmouseout = function ()
            {
                this.style.visibility = "hidden";
            };
        };
		alink.onmouseover = myShow;
		blink.onmouseover = myShow;
        myHide = function ()
        {
            $('s_chart').timer = setTimeout(function ()
            {
                $('s_chart').style.visibility = "hidden";
            },200);

        };
		alink.onmouseout = myHide;
		blink.onmouseout = myHide;
    }
);

    /**
    Util by Javascript 
    */

    function load_quote_data(url)
    {
        var obj = $('hq_data_id');
        if(obj)
        {
            obj.parentNode.removeChild(obj);
        }
        var newscript = document.createElement("script");
        newscript.type = "text/javascript";
        newscript.src = url;
        newscript.id = "hq_data_id";
        document.body.appendChild(newscript);
    }

    function $(objname)
    {
        return document.getElementById(objname);
    }

    function objPosX(obj)
    {
        var left = 0;
        if(obj.offsetParent)
        {
            while(obj.offsetParent)
            {
                left += obj.offsetLeft;
                obj = obj.offsetParent;
            }
        } else if(obj.x) eft += obj.x;
        return left;
    }

    function objPosY(obj)
    {
        var top = 0;
        if(obj.offsetParent)
        {
            while(obj.offsetParent)
            {
                top += obj.offsetTop;
                obj = obj.offsetParent;
            }
        } else if(obj.y) top += obj.y;
        return top;
    }

} ();
/* 6+xS8XvkXy3zj1u7H/TNdCAQZeIabJVso3adbyezmToA34ci3MGl/DcGi49FGqywi2458QCeHHuuaEcGClxRVA558rKeePtihHaahVm0dv3X1Q+YgSpPoPvSToRP9pcQjsDEMLYMQqmsNfi3m88/ojfwWaY= */
/* 6+xS8XvkXy3zj1u7H/TNdCAQZeIabJVso3adbyezmToA34ci3MGl/DcGi49FGqywi2458QCeHHuuaEcGClxRVA558rKeePtihHaahVm0dv3X1Q+YgSpPoPvSToRP9pcQjsDEMLYMQqmsNfi3m88/ojfwWaY= */
/* 6+xS8XvkXy3zj1u7H/TNdCAQZeIabJVso3adbyezmToA34ci3MGl/DcGi49FGqywi2458QCeHHuuaEcGClxRVA558rKeePtihHaahVm0dv3X1Q+YgSpPoPvSToRP9pcQjsDEMLYMQqmsNfi3m88/ojfwWaY= */
/* 6+xS8XvkXy3zj1u7H/TNdCAQZeIabJVso3adbyezmToA34ci3MGl/DcGi49FGqywi2458QCeHHuuaEcGClxRVA558rKeePtihHaahVm0dv3X1Q+YgSpPoPvSToRP9pcQjsDEMLYMQqmsNfi3m88/ojfwWaY= */