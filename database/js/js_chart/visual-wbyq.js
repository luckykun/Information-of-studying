function visual_wbyh(){
	
	var chartmenuClick=0;
	$('#chart-menu-0').addClass("chart-ggbd-menuover");
	$("#chart-ggbd-menu li").mouseover(function(){
		$(this).addClass("chart-ggbd-menuover");
	}).mouseout(function(){
		if(chartmenuClick!=String($(this)[0].id).substr(11))	$(this).removeClass("chart-ggbd-menuover");
	});
	
	var _visual_option={};
	
	var chartClientWidth=document.documentElement.clientWidth,chartClientEdge=20,chartLFWidth=20,
		chartVisualWidth=chartClientWidth-224-30;
	if(!dataPanelWidth)var dataPanelWidth=chartVisualWidth-chartClientEdge;	
	_visual_option={
		w:dataPanelWidth,//chartVisualWidth-chartClientEdge,
		h:400
	}
	
	function setDOM(){
		document.getElementById('chart-container').style.width=document.getElementById('chart-gprd').style.width=document.getElementById('chart-ggbd').style.width=_visual_option.w+'px';
		document.getElementById('chart-container').style.height=_visual_option.h+60+'px';
		document.getElementById('chart-bdss').style.width=document.getElementById('chart-bdxj').style.width=(_visual_option.w-20)/2+'px';
	}
	setDOM();
	
	var windowCata='';
	$('#ggbdID').hide();
	function getHrefSymbol(){
		var href=window.location.href,arr=href.split('#');
		var hrefa;
		if(arr.length>1)	hrefa=arr[1].split('/');
		
    	if(hrefa&&hrefa.length>1){
    		windowCata=hrefa[1];
    	}else{
    		windowCata='';
    	}
    	if(windowCata){
    		$('#wbyqID').hide();
    		$('#ggbdID').show();
    	}
	}
	getHrefSymbol();
	
// 个股舆情页面显示&关闭

	var config={
		datas:{
			stockHeat:{//微博股票热度趋势
				times:[],
				sh:[],
				sz:[],
                _times:[],
                _sh:[],
                _sz:[],
				k_sh:[],
                k_sz:[],
				k_time:[]
			},
			stockMentioned:{
			},
			changeMentioned:{//微博股票变动上升&下降
				cate:[],
				desc:[],
                desc_symbol:[],
				cate_asc:[],
				asc:[],
                asc_symbol:[]
			},
            ggbd:{//微博个股提及情况
                k:[],//个股K线
                k_time:[],
                pos:[],//正面情感
                neg:[],//负面情感
                cen:[],//中性情感
                ref:[],//总和
                times:[],
                _pos:[],
                _neg:[],
                _cen:[],
                _ref:[],
                _times:[],
                name:[],
                intro:[],
                area:[]
            }
		},
		params:{
			rd_sh:'BO',
			rd_sz:'TO',
			data:[],
			desc:'DE',
			asc:'AC',
            ggbd:'GG',
            cb:'BT',
            area:'AREA'
		},
        symbol:{
            ggbdSymbol:'sz300033'
        },
		dom:{
			gprd:"chart-gprd",
			//bdss:"chart-bdss",
			//bdxj:"chart-bdxj",

			desc:'chart-bdss',
			asc:'chart-bdxj',
            ggbd:'chart-ggbd'
		},
		url: {
			heartURL:{
				url_gprd:"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRefMkt?type=CN&mkt=$sc&callback=$cb",
				kURL:'http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day',//2014-07-15
            	hqURL:'http://hq.sinajs.cn/?_=$random&list=$symbol'
			},
			
			changeMentioned:{
				descURL:"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRefChange?code=CNHOUR24D&callback=$cb",
				ascURL: "http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRefChange?code=CNHOUR24A&callback=$cb"
			},
            ggbd:{
                ggURL:'http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getSentiHQ?symbol=$ggcb&callback=$cb',
                gareaURL:'http://vip.stock.finance.sina.com.cn/api/openapi.php/CI_CorpBasicService.getCorpInfo?PaperCode=$gCode&callback=$cb'
            }
		},
		URL:[
			//
			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getListSymbol?code=CNHOUR2&callback=$cb",
			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getListSymbol?code=CNHOUR6&callback=$cb",
			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getListSymbol?code=CNHOUR12&callback=$cb",
			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getListSymbol?code=CNHOUR24&callback=$cb",
			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getListSymbol?code=CNDAY7&callback=$cb",
			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getListSymbol?code=CNDAY30&callback=$cb"
			],
		NAVURL:window.location.href,
		HQURL:"http://hq.sinajs.cn/?_=$random&list=",
		COLOR:{
			RANGECOLOR:['#00E717','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'],

			DAREACOLOR:['#d3edd4','#7cd29a','#4cbb73','#23ab4c'],
			UAREACOLOR:['#ffdfd6','#ff8080','#ff5656','#f54545'],
			BTNCOLOR:{over:"#EEF6FF",out:"#ffffff"},
			uc:['rgb(255,223,214)','rgb(255,128,128)','rgb(255,86,86)','rgb(245,69,69)'],
			dc:['rgb(211,237,212)','rgb(124,210,154)','rgb(76,187,115)','rgb(35,166,76)'],
			zc:'#F3F3F3',
			lfc:['#ffffff','#ffffff','#ffffff','#23a64c','#666666','#f54545','#ffffff','#ffffff','#ffffff'],
			LEDENGCOLOR:['#23ab4c','#4cbb73','#7cd29a','#d3edd4','#F3F3F3','#ffdfd6','#ff8080','#ff5656','#f54545']
		},
		POPUPTEMPLATE:
			'<li><span>名称：</span><span>$name</span><li><span">最新价：</span><span>$price</span></li><li><span>涨跌幅：</span><span>$flow</span></li>'
		};
function createElement(t){return document.createElement(t);}
function fontColorLegend(zdf){
	var cl;
	if(zdf>0)	cl=config.COLOR.lfc[5];
	if(zdf>=1)	cl=config.COLOR.lfc[0];
	if(zdf>=2)	cl=config.COLOR.lfc[0];
	if(zdf>=3)	cl=config.COLOR.lfc[0];
	
	if(zdf<0)	cl=config.COLOR.lfc[3];
	if(zdf<=-1)	cl=config.COLOR.lfc[0];
	if(zdf<=-2)	cl=config.COLOR.lfc[0];
	if(zdf<=-3)	cl=config.COLOR.lfc[0];
	
	if(zdf==0)  {
		cl=config.COLOR.lfc[4];
	} 
	return cl;
}
//解码
function A_S_KLC_D(src){
        var _p, _a = arguments, _s, _sl, _f, _r, _c, _b, _v, DAYSEC = 86400000, CNSTOCK_BASEDAY = 7657, B64CHARS = [],
        EXPTABLE = [], CUTMASK = ~(3 << 30), CUTBIT = 1 << 30, X3TRANS = [
            0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30
        //  0, -1, -1, 1, -1, 2, 3, -1,
        //  -1, 4, 5, -1, 6, -1, -1, 7,
        //  -1, 8, 9, -1, 10, -1, -1, 11,
        //  12, -1, -1, 13, -1, 14, 15, -1
            ], _M = Math,
        _init = function()
        {
            var i, v;
            for (i = 0; i < 64; i++)
            {
                EXPTABLE[i] = _M.pow(2, i);
                if (i < 26)
                {
                    B64CHARS[i] = _asc(i + 65);
                    B64CHARS[i + 26] = _asc(i + 97);
                    if (i < 10)
                    {
                        B64CHARS[i + 52] = _asc(i + 48);
                    }
                }
            }
            B64CHARS.push('+', '/');
            B64CHARS = B64CHARS.join('');
            _s = src.split('');
            _sl = _s.length;
            for (i = 0; i < _sl; i++)
            {
                _s[i] = B64CHARS.indexOf(_s[i]);
            }
            _f = {};
            _p = _b = 0;
            _c = {};
            v = _decode([12, 6]);
            _v = 63 ^ v[1];
            return {_1479: _kl_run}['_' + v[0]] || function(){return [];};
        },
        _asc = String.fromCharCode,
        _isundef = function(x)
        {
            return x === {}._;
        },
        /*_drawback = function(b)
        {
            var x = b % 6;
            _p -= (b - x) / 6 + ((x > _b) ? 1 : 0);
            _b -= (x > _b) ? (6 - x) : x;
        },*/
        _findbitldef = function()
        {
            var s, d;
            s = _getbit();
            d = 1;
            for(;;)
            {
                if (_getbit())
                {
                    d++;
                }
                else
                {
                    return d * (s * 2 - 1);
                }
            }
        },
        _getbit = function()
        {
            var d;
            if (_p >= _sl)
            {
                return 0;
            }
            d = _s[_p] & (1 << _b);
            _b++;
            if (_b >= 6)
            {
                _b -= 6;
                _p++;
            }
            return !!d;
        },
        _decode = function(l, s, a)
        {
            var i, r, d, n, b;
            r = [];
            d = 0;
            if (!s)
            {
                s = [];
            }
            if (!a)
            {
                a = [];
            }
            for (i = 0; i < l.length; i++)
            {
                n = l[i];
                d = 0;
                if (!n)
                {
                    r[i] = 0;
                    continue;
                }
                if (_p >= _sl)
                {
                    return r;
                }
                if (l[i] <= 0)
                {
                    d = 0;
                }
                else if (l[i] <= 30)
                {
                    for(;;)
                    {
                        b = 6 - _b;
                        b = b < n ? b : n;
                        d |= (((_s[_p] >> _b) & ((1 << b) - 1)) << (l[i] - n));
                        _b += b;
                        if (_b >= 6)
                        {
                            _b -= 6;
                            _p++;
                        }
                        n -= b;
                        if (n <= 0)
                        {
                            break;
                        }
                    }
                    if (s[i] && d >= EXPTABLE[l[i] - 1])
                    {
                        d -= EXPTABLE[l[i]];
                    }
                }
                else
                {
                    d = _decode([30, l[i] - 30], [0, s[i]]);
                    if (!a[i])
                    {
                        d = d[0] + d[1] * EXPTABLE[30];
                    }
                }
                r[i] = d;
            }
            return r;
        },
        _nextday = function(n)
        {
            var i, d, w;
            if (n > 1)
            {
                i = 0;
            }
            for (i = 0; i < n; i++)
            {
                _f.d++;
                w = _f.d % 7;
                if (w == 3 || w == 4)
                {
                    _f.d += 5 - w;
                }
            }
            d = new Date();
            d.setTime((CNSTOCK_BASEDAY + _f.d) * DAYSEC);
            return d;
        },
        _kl_run = function()
        {
            var r, i, j, a, x, v, t, f;
            if (_v >= 1)
            {
                return [];
            }
            _f.lv = 0;
            _f.ld = 0;
            _f.cd = 0;
            _f.cv = [0, 0];
            _f.p = _decode([6])[0];
            _f.d = _decode([18], [1])[0] - 1;
            _f.m = _M.pow(10, _f.p);
            v = _decode([3, 3]);
            _f.md = v[0];
            _f.mv = v[1];
            r = [];
            for (;;)
            {
                v = _decode([6]);
                if (!v.length)
                {
                    break;
                }
                a = {c: v[0]};
                x = {};
                a.d = 1;
                if (a.c & 32)
                {
                    for(;;)
                    {
                        v = _decode([6])[0];
                        if ((v | 16) == 63)
                        {
                            f = (v & 16) ? 'x' : 'u';
                            v = _decode([3, 3]);
                            a[f + '_d'] = v[0] + _f.md;
                            a[f + '_v'] = v[1] + _f.mv;
                            break;
                        }
                        else if (v & 32)
                        {
                            t = (v & 8) ? 'd' : 'v';
                            f = (v & 16) ? 'x' : 'u';
                            a[f + '_' + t] = (v & 7) + _f['m' + t];
                            break;
                        }
                        else
                        {
                            t = v & 15;
                            if (t == 0)
                            {
                                a.d = _decode([6])[0];
                            }
                            else if(t == 1)
                            {
                                _f.d = t = _decode([18])[0];
                                a.d = 0;
                            }
                            else
                            {
                                a.d = t;
                            }
                            if (!(v & 16))
                            {
                                break;
                            }
                        }
                    }
                }
                x.date = _nextday(a.d);
                for (t in {v: 0, d: 0})
                {
                    if (!_isundef(a['x_' + t]))
                    {
                        _f['l' + t] = a['x_' + t];
                    }
                    if (_isundef(a['u_' + t]))
                    {
                        a['u_' + t] = _f['l' + t];
                    }
                }
                a.l_l = [a.u_d, a.u_d, a.u_d, a.u_d, a.u_v];
                f = X3TRANS[a.c & 15];
                if (a.u_v & 1)
                {
                    f = 31 - f;
                }
                if (a.c & 16)
                {
                    a.l_l[4] += 2;
                }
                for (j = 0; j < 5; j++)
                {
                    if (f & (1 << (4 - j)))
                    {
                        a.l_l[j]++;
                    }
                    a.l_l[j] *= 3;
                }
                a.d_v = _decode(a.l_l, [1, 0, 0, 1, 1], [0, 0, 0, 0, 1]);
                t = _f.cd + a.d_v[0];
                x.open = (t) / _f.m;
                x.high = (t + a.d_v[1]) / _f.m;
                x.low = (t - a.d_v[2]) / _f.m;
                x.close = (t + a.d_v[3]) / _f.m;
                v = a.d_v[4];
                if (typeof(v) == 'number')
                {
                    v = [v, v >= 0 ? 0 : -1];
                }
                _f.cd = t + a.d_v[3];
                f = (_f.cv[0] + v[0]);
                _f.cv = [f & CUTMASK, 
                    (_f.cv[1] + v[1] + !!(((_f.cv[0] & CUTMASK) + (v[0] & CUTMASK)) & CUTBIT))];
                x.volume = (_f.cv[0] & (CUTBIT - 1)) + _f.cv[1] * CUTBIT;
                r.push(x);
            }
            return r;
        }
        return _init()();
    };
function wn_varLoader(url_,cb_,errCb_,charset_){//utf-8
	var isLoaded=false,s=document.getElementsByTagName('script')[0],n=document.createElement('script'),
		head=document.head||document.getElementsByTagName('head')[0]||document.documentElement,
		baseElement=head.getElementsByTagName('base')[0]
	n.type='text/javascript';	n.charset=charset_||'gbk';	n.src=url_;	n.async=true;
	n.onload=n.onreadystatechange=function(){
		if(!isLoaded && (!this.readyState || this.readyState==='loaded' || this.readyState==='complete') ){
			isLoaded=true;
			(typeof(cb_)==='function')&&cb_();
			n.onload=n.onreadystatechange=n.onerror=null;	n.parentNode.removeChild(n);
		}
	};
	n.onerror=function(){
		(typeof(errCb_)==='function')&&errCb_();
		n.onload=n.onreadystatechange=n.onerror=null;	n.parentNode.removeChild(n);
	};
	s.parentNode?s.parentNode.insertBefore(n,s):
				 baseElement?head.insertBefore(n,baseElement):head.appendChild(n);
}
function getDocument(n,c){
	c=c||document;
	return c.getElementById(n);
}
function insight_wbyq(stockCode){
    var ex=/^s[hz][0-9]{6}/;
    if(ex.test(stockCode)){
        window._cate=stockCode;
        var url=window.location.href+"/"+stockCode;
        window.open(url);
    }
};

function gprdChart(){
		if(!echarts)return;
		var _myChart;
		if(_myChart&&_myChart.dispose){
			_myChart.dispose();
		}
		
		_myChart=echarts.init(document.getElementById(config.dom.gprd));
		var _option={
			tooltip:{
				    trigger: 'axis',
                    backgroundColor : 'rgba(0,0,0,0.7)',//'#E8E8E8',
                    borderColor : "#0088cc",//'#ccc',
                    borderRadius : 8,
                    borderWidth: 2,
                    padding: 10,    // [5, 10, 15, 20]
                    position : function(p) {
                        // 位置回调
                        //console.log && console.log(p);
                        return [p[0] + 10, p[1] - 10];
                    },
                    textStyle : {
                        color: 'white',
                        decoration: 'none',
                        fontSize: 12
                    }
				},

				dataZoom: {
						show: true,
						start : 80,
						end : 100
				},
                grid:{
                    y:70
                },
				legend: {
                        orient: 'horizontal', // 'vertical'
                        x: '25%', 
                        y: '9%', 
                        //backgroundColor: 'rgb(232,232,232)',
                        //borderColor: 'rgba(178,34,34,0.8)',
                        borderWidth: 1,
                        padding: 10,    // [5, 10, 15, 20]
                        itemGap: 20,
                        textStyle: {fontSize:'14px'},
						data:['微博沪市股票热度值','微博深市股票热度值','上证指数收盘价','深成指数收盘价']
				},
			    xAxis : [
			        {
			            type : 'category',
			            power: 1,
			            precision: 2,
						data:config.datas.stockHeat.times,
			            scale:true
			        }
			    ],
			    yAxis : [
			         {
			            type : 'value',
						boundaryGap:[0.15,0.1],
			            name:'指数',
			            scale:true
			        },
			         {
			            type : 'value',
						boundaryGap:[0,0.1],
			            name:'微博股票热度值',
			            scale:true,
                        boundaryGap:[0.55,0.05],
			            splitArea : {
			                show: true,
			                areaStyle:{
			                    color:['#F7F7F7','#F0F0F0']
			                }
			            }
			         }
			      ],
				  animation: false,
			      series : [
			      		{
			            name:'上证指数收盘价',
			            type:'line',
			            data:config.datas.stockHeat.k_sh,
			            itemStyle: {
			                normal: {
			                    color: 'rgb(105,105,105)'}
			                }
			            },
			        	{
			        		name:'微博沪市股票热度值',
			            	type:'line',
			            	yAxisIndex:1,
			            	data:config.datas.stockHeat.sh, 
			            	itemStyle: {
				                normal: {
				                    color: 'tomato'
				                }
					        }        
			           	}
			        ]
				};
		function _init(){
			var curl_sh=config.url.heartURL.url_gprd.replace('$sc','sh').replace('$cb',"var "+config.params.rd_sh+"="),
				curl_sz=config.url.heartURL.url_gprd.replace('$sc','sz').replace('$cb',"var "+config.params.rd_sz+"=");
			// console.log(curl);
			wn_varLoader(curl_sh,function(){
				data_sh=window[config.params.rd_sh];
				_loadedData_sh(data_sh);
				wn_varLoader(curl_sz,function(){
					data_sz=window[config.params.rd_sz];
					_loadedData_sz(data_sz);
					_loadedData_k();
					//window[config.params.rd_sz]=null;
					window[config.params.rd_sh]=null;
				});
			});				
		};

		function _loadedData_sh(){
			var cdata=config.datas.stockHeat;
			for(var i in data_sh.result.data){
				 var ctime = data_sh.result.data[i].DT;
				 var chh=data_sh.result.data[i].REF;					 				 
				 cdata._times.unshift(ctime);
				cdata._sh.unshift(chh);
			}};
		function _loadedData_sz(){
			var cdata=config.datas.stockHeat;
			for(var i in data_sz.result.data){
				 var chh=data_sz.result.data[i].REF;					 				 
				cdata._sz.unshift(chh);
					
			};
					
		};
		var _symbol='sh000001',_day='',_dk,_sdk;
		function _loadedData_k(){
        	var url=config.url.heartURL,tmpday,tmpk;
        
            wn_varLoader(url.hqURL.replace("$symbol",_symbol).replace("$random",Math.random()),function(){
                var tmphq=window['hq_str_'+_symbol];
                
                var tmparr=tmphq.split(',');
                _day=tmparr[30];
                //window['hq_str_'+_symbol]=null;
            
                wn_varLoader(url.kURL.replace('$symbol',_symbol).replace('$day',_day),function(){
                    var tmpkSH=window['KLC_KL_'+_symbol];
                    
                    _dk=A_S_KLC_D(tmpkSH);

                    var deadLine=new Date();
                    deadLine.setFullYear(2014,5,27);
                    
                    //for(var i in _dk){
                    var rlen=_dk.length;
                    for(var ii=0;ii<rlen;ii++){
                        var xtime1=_dk[ii].date;
                        
                        if(xtime1==null||xtime1=='') alert(xtime1+"  no k datas  "+ _dk[i]);
                        var m1=xtime1.getMonth()+1;
                        var n1=xtime1.getDate();
                        
                        
                        var y1=xtime1.getFullYear();
                        
                        if(y1>"2012"){
	                        var _date=y1+"-"+m1+"-"+n1;
	                        var xopen=_dk[ii].open, xclose=_dk[ii].close,  xhigh=_dk[ii].high,  xlow=_dk[ii].low;                         
	                        config.datas.stockHeat.k_sh.push(xclose);
                            var _dtime=_date.split("-");
                            if(_dtime[1]<10){_dtime[1]="0"+_dtime[1]};
                            if(_dtime[2]<10){_dtime[2]="0"+_dtime[2]};
                            var _dtimes=_dtime[0]+"-"+_dtime[1]+"-"+_dtime[2];
	                        config.datas.stockHeat.k_time.push(_dtimes);
	                   	}
	                }
                	//深市
                    wn_varLoader(url.kURL.replace('$symbol',"sz399001").replace('$day',_day),function(){
                        tmpkSZ=window['KLC_KL_sz399001'];
                        _sdk=A_S_KLC_D(tmpkSZ);
                        //window['KLC_KL_sz399001']=null;
                        var deadLine=new Date();
                        deadLine.setFullYear(2014,5,27);
                        
                        var slen=_sdk.length;
                        
                        for(var ib=0;ib<slen;ib++){
                            var xtime=_sdk[ib].date;;
                            var y=xtime.getFullYear(),m=xtime.getMonth()+1,n=xtime.getDate();
                            if(y>"2012"){
                                var _date=y+"-"+m+"-"+n;
                                var xopen=_sdk[ib].open, xclose=_sdk[ib].close,  xhigh=_sdk[ib].high,  xlow=_sdk[ib].low;                         
                                config.datas.stockHeat.k_sz.push(xclose);
                             }
                        };
                        //过滤掉周末及假期数据
                        var stData=config.datas.stockHeat;
                        var lasti=0,lastj=0;
                        for(var j=lastj;j<stData.k_time.length;j++){
                            for(var i=lasti;i<stData._times.length;i++){
                                if(stData.k_time[j]==stData._times[i]){
                                    stData.times.push(stData._times[i]);
                                    stData.sh.push(stData._sh[i]);
                                    stData.sz.push(stData._sz[i]);
                                    lastj=j;lasti=i;
                                    break;
                                } 
                            }
                        };

						_draw();
                	});  
                });  
            })
		};

		function _draw(){
			_myChart.setOption(_option,true);
		}
	//图例点击事件
	var ecConfig;
	if(echarts)	 ecConfig=echarts.config.EVENT;
	
    function clickes(param){
            var selected = param.selected;
            var len;
            var added;
            if (selected['微博深市股票热度值']) {
                len = _option.series.length;
                added = false;
                while (len--) {
                    if (_option.series[len].name == '微博深市股票热度值') {
                        // 已经添加
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    _myChart.showLoading({
                        text : '数据获取中',
                        effect: 'whirling'
                    });
                    setTimeout(function (){
                        _option.series.splice(0,2);
                        _option.series=[
	                        { 
	                        	name:'微博深市股票热度值',
	                            type:'line',
	                            yAxisIndex:1,
	                            itemStyle: {
	                                    normal: {
	                                        color: 'red'
	                                    }
	                            },
	                            data:config.datas.stockHeat.sz
	                        },
	                        {
	                            name:'深成指数收盘价',
	                            type:'line',
	                            yAxisIndex:0,
	                            itemStyle: {
	                                normal: {
	                                    color: 'rgb(15,142,26)'
	                                }
	                            },
	                            data:config.datas.stockHeat.k_sz
	                         } 
                         ];
                        _myChart.hideLoading();
                        _myChart.setOption(_option,true);
                    }, 50)
                } 

            };
            if (selected['微博沪市股票热度值']) {
                len = _option.series.length;
                added = false;
                while (len--) {
                    if (_option.series[len].name == '微博沪市股票热度值') {
                        // 已经添加
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    _myChart.showLoading({
                        text : '数据获取中',
                        effect: 'whirling'
                    });
                    setTimeout(function (){
                        _option.series.splice(0,2);
                        _option.series.push({
                            name:'上证指数收盘价',
                            type:'line',
                            yAxisIndex: 0,
                            itemStyle: {
                                    normal: {
                                        color: 'rgb(105,105,105)'
                                    }},
                            data:config.datas.stockHeat.k_sh
                        });
                        _option.series.push({
                            name:'微博沪市股票热度值',
                            type:'line',
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                    color: 'tomato'
                                }
                            },
                            data:config.datas.stockHeat.sh
                        });

                        _myChart.hideLoading();
                        _myChart.setOption(_option,true);
                    }, 50)
                } 

            };}
    _myChart.on(ecConfig.LEGEND_SELECTED, clickes);
		
	 this.init=_init;
};
	
///


// 微博股票提及数热力图
	var boEvtUtil={
		addHandler:function(el,type,handler){
			if(!el)return;
			if(el.addEventListener)el.addEventListener(type,handler,false);
			else if(el.attachEvent)el.attachEvent('on'+type,handler);
			else el['on'+type]=handler;
		},
		removeHandler:function(el,type,handler){
			if(!el)return;
			if(el.removeEventListener)el.removeEventListener(type,handler,false);
			else if(el.detachEvent)el.detachEvent('on'+type,handler);
			else el['on'+type]=null;
		},
		getEvent:function(e){
			return e?e:window.event;
		},
		getTarget:function(e){
			!e&&(e=this.getEvent());
			return e?(e.target||e.srcElement):null;
		},
		preventDefault:function(e){
			!e&&(e=this.getEvent());
			if(!e)return false;
			e.preventDefault?e.preventDefault():(e.returnValue=false);
		},
		stopPropagation:function(e){
			!e&&(e=this.getEvent());
			if(!e)return false;
			e.stopPropagation?e.stopPropagation():(e.cancelBubble=true);
		},
		getRelatedTarget:function(e){
			!e&&(e=this.getEvent());
			if(e.relatedTarget)	return e.relatedTarget;
			if(e.toElement)		return e.toElement;
			if(e.fromElement)	return e.fromElement;
			return null;
		},
		getWheelDelta:function(e){
			!e&&(e=this.getEvent());
			if(!e)return 0;
			if(e.wheelDelta)return ((client.engine.opera && client.engine.opera<9.5)?-e.wheelDelta:e.wheelDelta);//opera made it reversed
			return -e.detail*40;//firefox is not only reversed, the value is different as well
		}
	};
	var cw=_visual_option.w,ch=_visual_option.h-15;
	var chartDiv=getDocument("chatDiv");
	
	if(chartDiv){
		cw=chartDiv.width;ch=chartDiv.height;
	}
	
	var w=cw,
		h=ch,
		x=d3.scale.linear().range([0, w]),
    	y=d3.scale.linear().range([0, h]),
		color = d3.scale.ordinal().range(config.COLOR.RANGECOLOR),
		root,node;
	
	var fcontainer=d3.select('#chart-container');
	             
	var fchartcontainer=fcontainer.append('div')
						.attr('id','fchartcontainer');
	var fbtn=fchartcontainer.append('div')
			 .attr('id','fbtn');
	var domfbtn=document.getElementById('fbtn');
		domfbtn.style.width=cw+'px';
		domfbtn.style.height='40px';
	var domfbtnlist=[],btnIndex='ahm0',btnOverC=config.COLOR.BTNCOLOR.over,btnOutC=config.COLOR.BTNCOLOR.out;
	var outBtnsvalue=['2小时','6小时','12小时','1天','1周','1月'],outBtnsNum=outBtnsvalue.length;
	for(var i=0;i<outBtnsNum;i++){
		var fbtntmp=createElement('div');
			fbtntmp.id='ahm'+i;
			fbtntmp.style.cssFloat='left';
			fbtntmp.style.styleFloat='left';
			fbtntmp.style.width='50px';
			fbtntmp.style.height='15px';
			fbtntmp.style.padding='2px 2px 2px 2px';
			fbtntmp.style._padding='2px 2px 2px 2px';
			fbtntmp.style.backgroundColor=btnOutC;
			fbtntmp.style.cursor='pointer';
			fbtntmp.style.border='1px solid '+btnOutC;
			fbtntmp.style.display='inline-block';
			
			
			boEvtUtil.addHandler(fbtntmp,'click',function(e){
				e=e||window.event;
					
				var target=(e.target||e.srcElement);
				
				var str=target.id.slice(3);root=node=null;aheatMap.loadData(Number(str));
				
				for(var i=0;i<outBtnsvalue.length;i++){
					domfbtnlist[i].style.backgroundColor=btnOutC;
				}
				btnIndex=target.id;
				target.style.backgroundColor=btnOverC;
			});
			
			//boEvtUtil.addHandler(fbtntmp,'mouseover',function(){
			//	this.style.backgroundColor=btnOverC;
			//});
			
			//boEvtUtil.addHandler(fbtntmp,'mouseout',function(){
			//	if(this.id!==btnIndex)this.style.backgroundColor=btnOutC;
			//});
			
			domfbtn.appendChild(fbtntmp);
	
			if(i==0){
				fbtntmp.style.margin='10px 0px 10px 0px';
				fbtntmp.style._margin='10px 0px 10px 0px';
				fbtntmp.style.backgroundColor=btnOverC;
			}
			else{
				fbtntmp.style.margin='10px 0px 10px 0px';
				fbtntmp.style._margin='10px 0px 10px 0px';
			}
			
			domfbtnlist.push(fbtntmp);
		
		domfbtnlist[domfbtnlist.length-1].innerHTML=outBtnsvalue[i];
		domfbtnlist[domfbtnlist.length-1].style.font='12px helvetica,arial,sans-serif'
		domfbtnlist[domfbtnlist.length-1].style.textAlign='center';
		domfbtnlist[domfbtnlist.length-1].style.lineHeight='1.2';
	}
	
	var qhlegend=['-4','-3','-2','-1','0','1 ','2','3','4'],legendNum=qhlegend.length;
			
	var legendcontainer=fcontainer.append('div');
		legendcontainer.style('float','right')
					   .style('cssFloat','right')
					   .style('styleFloat','right')
					   .style("margin",'15px 0px 0px 0px')
					   .style("width",w-30+'px')
					   .style("height",'30px')
					   .attr('id','chart-lg');
	var chart_lg=getDocument('chart-lg');
	var lglists=[];
	for(var i=0;i<legendNum;i++){
		var lgdom=createElement('div');
		lgdom.id='qhld'+i
		lgdom.style.cssFloat='right';
		lgdom.style.styleFloat='right';
		lgdom.style.width='40px';
		lgdom.style.height='10px';
		lgdom.style.backgroundColor=config.COLOR.LEDENGCOLOR[i];
		lgdom.style.cursor='pointer';
		lgdom.style.border='1px solid '+config.COLOR.LEDENGCOLOR[i];
		lgdom.style.color=config.COLOR.lfc[i];
		
		lglists.push(lgdom);
		
		chart_lg.appendChild(lgdom);
		
		lglists[lglists.length-1].innerHTML=qhlegend[i]+'%';
		lglists[lglists.length-1].style.font='12px helvetica,arial,sans-serif';
		
		lglists[lglists.length-1].style.textAlign='center';
		lglists[lglists.length-1].style.lineHeight='1';
	}
	
	var fchart=fchartcontainer.append('div')
			   .attr('id', 'fchart')
			   .style('float','left')
			   .style('styleFloat','left')
			   .style('width',w+'px')
			   .style('height',h+'px')
			   .style('position', 'relative');
	
	function stockHeatMap(){
		var _newData={},btnLists=[];
		var _ahm="AHM";
		
		function _loadData(index_){
			wn_varLoader(config.URL[index_].replace("$cb",'var '+_ahm+'=')/*+'&random='+Math.random()*/,function(){
				var _data=window[_ahm];
				_transPatter(_data);
				//window[_ahm]=null;
			})
		}
		
		function _transPatter(data_){
			var d=data_.result.data;
			var tmpd=[];
			if(!d) return;
			
			for(var i=0,len=d.length;i<len;i++){
				var od=d[i];
				var o={
					'name':od.NAME,
					'size':od.REF,
					//'url':config.NAVURL.replace("$symbol",od.SYMBOL),
                    'url':config.NAVURL+"/"+od.SYMBOL,
					'code':od.SYMBOL,

					'price':0,
					'flowp':0
				}
				
				tmpd.push(o);
			}
			_loadHQ(tmpd);
		}
		
		function _loadHQ(data_){
			var hqlist='',data=[],tmphq='';
			if(!data_)	return;
			var len=data_.length,data=data_;
			for(var i=0;i<len;i++){
				hqlist+='s_'+data_[i].code+',';
			}
			
			wn_varLoader(config.HQURL.replace('$random',Math.random())+hqlist,function(){
				for(i=0;i<len;i++){
					tmphq=window["hq_str_s_"+data_[i].code];
					var arr=tmphq.split(',');
					//data[i].name=arr[0];
					data[i].price=arr[1];
					data[i].flowp=arr[3];
					//window["hq_str_s_"+data_[i].code]=null;
				}
				
				_newData={
					'children':[]
				};
				_newData.children=data;
				_draw(_newData);
			})
		}
		function colorLegend(zdf){
			var cl;
			if(zdf>0)	cl=config.COLOR.uc[0];
			if(zdf>=1)	cl=config.COLOR.uc[1];
			if(zdf>=2)	cl=config.COLOR.uc[2];
			if(zdf>=3)	cl=config.COLOR.uc[3];
			
			if(zdf<0)	cl=config.COLOR.dc[0];
			if(zdf<=-1)	cl=config.COLOR.dc[1];
			if(zdf<=-2)	cl=config.COLOR.dc[2];
			if(zdf<=-3)	cl=config.COLOR.dc[3];
			
			if(zdf==0||zdf<0.0004999&&zdf>-0.0004999)  {
				cl=config.COLOR.zc;
			} 
			return cl;
		}

		function _draw(data_){
			var treemap=d3.layout.treemap()
				.round(false)
			    .size([w, h])
			    .sticky(true)
			    .value(function(d_){ 
			    	return d_.size;
			    });
			
			node=root=data_;
			var nodes=treemap.nodes(root),cl;
			
			fchart.selectAll("div").remove()
			
	      	var cell=fchart.selectAll("div")
	      			.data(nodes)
	      			.enter()
	      			.append("div")
			        .style("width", function(d_){ var xd=d_.dx<=1 ? d_.dx:d_.dx-1;return xd+"px"; })
			        .style("height", function(d_){ var yd=d_.dy<=1 ? d_.dy:d_.dy-1;return yd+"px"; })
			        .style("top", function(d_){ return d_.y+"px";  })
			        .style("left", function(d_){ return d_.x+"px";  })
			        .style("background",function(d_){return colorLegend(d_.flowp); })
			        .style('position', 'absolute')
			        .style("border",function(d_){return '1px solid #fff';})
			        .style("cursor","pointer")
			       // .on("mouseover",function(d_){this.childNodes[0].style.color='#000';})
			       // .on("mouseout",function(d_){this.childNodes[0].style.color='#fff';})
			        .on("click",function(d_){
			        	var href=window.location.href;
			        	var arr=href.split('#'),url;
			        	var hrefa=arr[1].split('/');
			        	if(hrefa.length>1)	url=arr[0]+'#visual-wbyq/'+d_.code;
			        	else				url=window.location.href+"/"+d_.code;
			        	
        				window.open(url);
			        })
			        
				cell.append("span")
					.style('display','inline-block')
		            .style("width", function(d_) { return d_.dx + 'px'; })
		      		.style("height", function(d_){ return d_.dy/2 + 'px'; })
		      		.style("top", function(d_){ return d_.dy/2-8+"px";  })
			        .style("left", function(d_){ return 0+"px";  })
		      		.style("text-anchor", "middle")
		      		.style("color",function(d_){var cl=fontColorLegend(d_.flowp); return cl;})
		      		.style("font-size", '12px')
					.style("fontSize", '12px')
		      		.style("overflow",'hidden')
		      		.style("text-align",'center')
					.style("textAlign",'center')
		      		.style('position', 'relative')
		      		.text(function(d) {return d.name})
		}
		
		this.loadData=_loadData;
	}
	
	function setPopupHtml(d_){
		var str=config.POPUPTEMPLATE;
		str=str.replace('$name',d_.name).replace('$price',d_.price).replace('$flow',d_.name);
		return str;
	}
	
	function setPopupposition(d_,this_,top_){
		var t=this_,x=d_.y,y=d_.x,dh=Number(this_.getAttribute("height")),dw=Number(this_.getAttribute("width")),pt,pl;
		
		pt=d_.y;
		pl=d_.x;
		
		var target=document.getElementById('chart-container'),left=target.offsetLeft,top=target.offsetTop;
		var lx=pl+left+dw,wfp=Number(fpopupt.getAttribute("width"));
		
		if(lx+wfp>w)lx-=(dw+wfp);
		
		fpopup.style("top",pt+top+'px');
		fpopup.style("left",lx+'px');
		fpopup.style('display','block');
	}
	
	
	function size(d_){
		return d.size;
	}

	function count(d_){
  		return 1;
	}
	var aheatMap=new stockHeatMap();
	
    //维维股份
    //微博个股提及
    
    if(windowCata){
    	var _ggbdChart=new ggbdChart(windowCata);
    		_ggbdChart.init();
    		
    		$('.bannerTitleTd').html('微博个股热度趋势图');
    }
    function ggbdChart(symbol_){
    	if(_myChart&&_myChart.dispose){
			_myChart.dispose();
		}
        var _myChart=echarts.init(document.getElementById(config.dom.ggbd)),windowCata=wsymbol=symbol_;
            var _option={
                tooltip:{
                    trigger: 'axis',
                    axisPointer:{
                        type:"shadow"
                    },
                    formatter:function(v){
                        return v[0][1]+'<br>'+
                               v[1][0]+':'+v[1][2]
                    }
                },
                title : {
                     },
                dataZoom:{
                        show: true,
                        realtime: true,
                        start : 85,
                        end : 100
                },
                grid:{
                        y2:80,
                        y:50

                },
                legend: {
                         x:500,
                        y:30,
                        data:['全部关注','正面关注','负面关注','中性关注']
                    },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap:false,
                        data:config.datas.ggbd.times,      
                         axisLine:{
                            show:false,
                        },
                        axisLabel : {show:true,
                        },
                        axisTick : {show:false,
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                        }
                    }
                ],
                yAxis : [
                    {
                        type:'value',
                        precision: 2,
                        name:'价格(单位：元)',
                        scale:true,
                        nameTextStyle:{
                            color: 'red'
                        },
                        axisLine:{
                            show:true,
                            lineStyle:{
                                color: '#d9e2e7'
                            }
                        },
                        splitArea : {
                            show: false
                        },
                       splitLine:{
                            show:true,
                            lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                        }
                    },
                    {
                        type:'value',
                        power: 1,
                        name:'用户情感',
                        scale:true,
                        precision:1,
                         nameTextStyle:{
                            color: 'red'
                        },
                        axisLine:{
                            show:true,
                            lineStyle:{
                                color: '#d9e2e7'
                            }
                        },
                        splitArea : {
                            show: false,
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                        }
                     }
                ],
              series : [
                    {
                        //name:'全部情感',
                        type:'k',
                        // itemStyle: {normal: {color:"rgb(61,163,238)",}},
                        data:config.datas.ggbd.k     
                    },
                    {
                    	name:'全部关注',
                        type:'line',
                        yAxisIndex:1,
                        symbolSize:1,
                        itemStyle: {
                            normal: {
                                color:'#0088cc',
                                lineStyle: {        // 系列级个性化折线样式
                                    width: 1,
                                    type: 'dashed'
                                }
                            },
                            emphasis: {
                                color: 'black'
                            }
                        },
                    	data:config.datas.ggbd.ref   
                   }
               ]
            };
            
            //个股K线
            var _ssymbol=symbol_,_sday='',_sdk;//window._cate 全局变量，指insight-wbyq/后的股票代码
            function _init(){
            	var url=config.url.heartURL;
            	document.getElementById(config.dom.ggbd).style.display='none';
            	
            	wn_varLoader(url.hqURL.replace("$symbol",_ssymbol).replace("$random",Math.random()),function(){
               		tmphq=window['hq_str_'+_ssymbol];
               		
               		var tmparr=tmphq.split(',');
	                _ssday=tmparr[30];
	                window['hq_str_'+_ssymbol]=null;
	
	                var  _ssclose=tmparr[3];
	                var _sslast=tmparr[2];
	                var _stockState=tmparr[tmparr.length-1];
	                var cha=(_ssclose-_sslast).toFixed(2);
	                var ratio=cha+"<br>"+((cha/_sslast)*100).toFixed(2)+"%";
	                
	                if(_stockState!='01'){
	                	$("#xclose").text('停牌');
	                	$("#ratio").html();
	                }else{
	                	$("#xclose").text(Number(_ssclose).toFixed(2));
	                	$("#ratio").html(ratio);
	                	
	                	if(cha>0){$("#updownCorn").addClass("closeRed");$("#ggbd_banner").addClass("red")};
	                 	if(cha<0){$("#updownCorn").addClass("closeGreen");$("#ggbd_banner").addClass("green")};
	                 	if(cha==0){$("#updownCorn").addClass("wbyqblack");$("#ggbd_banner").addClass("wbyqblack")};
	                }
	                 
	                 var ggbdcode=tmparr[0]+" ("+window._cate+")";
	                 var LINK="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                     var ggLINK=LINK.replace("$symbol",window._cate);
                     
                     $("#ggbdCode").html("<a href='"+ggLINK+"' target='_blank'>"+ggbdcode+"</a>");
                     
                     document.getElementById('wbyq_img').src='http://image.sinajs.cn/newchart/bill/pv_year/'+_ssymbol+'.png';
                     
                     wn_varLoader(config.url.ggbd.gareaURL.replace('$gCode',_ssymbol).replace('$cb','var '+config.params.area+'='),function(){
                         garea=window[config.params.area];
                         $("#introduction").text(garea.result.data.Introduction);
                         $("#area").text(garea.result.data.FareArea);
                         window[config.params.area]=null;
                     });
					
					 var chart_url='http://image.sinajs.cn/newchart/bill/',chart_img_url=['pv_year/','pos_year/','cen_year/','neg_year/'];
                     
                     $("#chart-ggbd-menu li").click(function(){
						chartmenuClick=String($(this)[0].id).substr(11);
						
						$('#chart-menu-0').removeClass("chart-ggbd-menuover");
						$('#chart-menu-1').removeClass("chart-ggbd-menuover");
						$('#chart-menu-2').removeClass("chart-ggbd-menuover");
						$('#chart-menu-3').removeClass("chart-ggbd-menuover");
						$(this).addClass("chart-ggbd-menuover");
						
						document.getElementById('wbyq_img').src=chart_url+chart_img_url[chartmenuClick]+_ssymbol+'.png';
					})
             	});
            };

            function _loadedData(){
                var cdata=config.datas.ggbd;
                for(var i in data_ggbd.result.data){
                     var ctime = data_ggbd.result.data[i].DT;
                     var cpos = data_ggbd.result.data[i].POS;
                     var cneg = data_ggbd.result.data[i].NEG;
                     var ccen = data_ggbd.result.data[i].CEN;
                     var cref = data_ggbd.result.data[i].REF;

                     cdata._times.push(ctime);
                     cdata._pos.push(cpos);
                     cdata._neg.push(cneg);
                     cdata. _cen.push(ccen);
                     cdata._ref.push(cref);
                 };
                 cdata._times.reverse();cdata._pos.reverse();cdata._neg.reverse();cdata._cen.reverse();cdata._ref.reverse();
              };

              function _loadedDataCode(){
	                var cdata=config.datas.ggbd;
                    var xname=garea.result.data.PaperName;
                    var xintro=garea.result.data.Introduction;
                    var xarea=garea.result.data.FareArea;
                    cdata.name.push(xname);
                    cdata.intro.push(xintro);
                    cdata.area.push(xarea);
	          };
           
            function _loadedData_symbol(){
            	var url=config.url.heartURL,tmpday,tmphq,tmpk;
            	
                if(_ssymbol==''){ return ;}

                wn_varLoader(url.hqURL.replace("$symbol",_ssymbol).replace("$random",Math.random()),function(){
                tmphq=window['hq_str_'+_ssymbol];
                
                var tmparr=tmphq.split(',');
                _ssday=tmparr[30];
                window['hq_str_'+_ssymbol]=null;

                var  _ssclose=tmparr[3];
                var _sslast=tmparr[2];
                
                 
                 $("#xclose").text(Number(_ssclose).toFixed(2));
                 var cha=(_ssclose-_sslast).toFixed(2);
                 var ratio=cha+"<br>"+((cha/_sslast)*100).toFixed(2)+"%";
                 
                 $("#ratio").html(ratio);
                 if(cha>=0){$("#updownCorn").addClass("closeRed");$("#ggbd_banner").addClass("red")};
                 if(cha<0){$("#updownCorn").addClass("closeGreen");$("#ggbd_banner").addClass("green")};
                
                wn_varLoader(url.kURL.replace('$symbol',_ssymbol).replace('$day',_ssday),function(){
                    tmpk=window['KLC_KL_'+_ssymbol];
                    
                    _sdk=A_S_KLC_D(tmpk);
                    //window['KLC_KL_'+_ssymbol]=null;

                    wn_varLoader(config.url.ggbd.gareaURL.replace('$gCode',_ssymbol).replace('$cb','var '+config.params.area+'='),function(){
                             garea=window[config.params.area];
                             _loadedDataCode(garea);
                            var LINK="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                            var ggLINK=LINK.replace("$symbol",window._cate);
                            window[config.params.area]=null;

                            var ggbdcode=config.datas.ggbd.name+" ("+window._cate+")";
                             $("#ggbdCode").html("<a href='"+ggLINK+"' target='_blank'>"+ggbdcode+"</a>");
                             $("#introduction").text(config.datas.ggbd.intro);
                             $("#area").text(config.datas.ggbd.area);
                        }); 
                    var sdeadLine=new Date();
                    sdeadLine.setFullYear(2014,5,27);
                    for(var i=0;i<_sdk.length;i++){
                        var ttr=[];
                        var xtime=_sdk[i].date;;
                        var y=xtime.getFullYear(),m=xtime.getMonth()+1,n=xtime.getDate();
                        var _xtime=y+"-"+m+"-"+n;
                        if(y>"2012"){
                        var _date=y+"-"+m+"-"+n;
                        var xopen=_sdk[i].open, xclose=_sdk[i].close,  xhigh=_sdk[i].high,  xlow=_sdk[i].low;                         
                       // ttr.push(xclose);
                        ttr.push(xopen);ttr.push(xclose);ttr.push(xhigh);ttr.push(xlow);
                        config.datas.ggbd.k.push(ttr);
                        var _dtime=_xtime.split("-");
                        if(_dtime[1]<10){_dtime[1]="0"+_dtime[1]};
                        if(_dtime[2]<10){_dtime[2]="0"+_dtime[2]};
                        var _dtimes=_dtime[0]+"-"+_dtime[1]+"-"+_dtime[2];
                        config.datas.ggbd.k_time.push(_dtimes);

                     }};
        			 //删除微博假期数据
                        var cdatas=config.datas.ggbd;
                        var lasti=0,lastj=0;
                        for(var j=lastj;j<cdatas.k_time.length;j++){
                            for(var i=lasti;i<cdatas._times.length;i++){
                                if(cdatas.k_time[j]==cdatas._times[i]){
                                    cdatas.times.push(cdatas._times[i]);
                                    cdatas.pos.push(cdatas._pos[i]);
                                    cdatas.neg.push(cdatas._neg[i]);
                                    cdatas.cen.push(cdatas._cen[i]);
                                    cdatas.ref.push(cdatas._ref[i]);
                                    lastj=j;lasti=i;
                                    break;
                                } 
                            }
                        };                            
                     // _draw();
                    });  
                })
             };
            //个股K线END

            function _draw(){
                _myChart.showLoading({
                                text : '数据获取中',
                                effect: 'whirling'
                            });
               
                setTimeout(function(){
                     _myChart.hideLoading();
                    _myChart.setOption(_option,true)
                },1000);
            }
            //图例点击事件
           var ecConfig;
		   if(echarts)	 ecConfig=echarts.config.EVENT;
            function clickes(param){
                var selected = param.selected;
                var len;
                var added;
                if (selected['全部关注']) {
                    len = _option.series.length;
                    added = false;
                    while (len--) {
                        if (_option.series[len].name == '全部关注') {
                            // 已经添加
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        _myChart.showLoading({
                            text : '数据获取中',
                            effect: 'whirling'
                        });
                        setTimeout(function (){
                            _option.series.splice(1,1);
                            _option.series.push({
                                name:'全部关注',
                                type:'line',
                                yAxisIndex:1,
                                symbolSize:1,
                                itemStyle: {
                                    normal: {
                                        color:'#0088cc',
                                        lineStyle: {        // 系列级个性化折线样式
                                            width: 1,
                                            //color:'#0088cc',
                                            type: 'dashed'
                                        }
                                    },
                                    emphasis: {
                                        color: 'black'
                                    }
                                },
                                data:config.datas.ggbd.ref
                            });

                            _myChart.hideLoading();
                            _myChart.setOption(_option,true);
                        }, 500)
                    } 

                };
                if (selected['正面关注']) {
                    len = _option.series.length;
                    added = false;
                    while (len--) {
                        if (_option.series[len].name == '正面关注') {
                            // 已经添加
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        _myChart.showLoading({
                            text : '数据获取中',
                            effect: 'whirling'
                        });
                        setTimeout(function (){
                            _option.series.splice(1,1);
                            _option.series.push({
                                name:'正面关注',
                                type:'line',
                                yAxisIndex:1,
                                itemStyle: {
                                    normal: {
                                        color:'red',
                                        lineStyle: {        // 系列级个性化折线样式
                                            width: 1,
                                          //  color:'#0088cc',
                                            type: 'dashed'
                                        }
                                    },
                                    emphasis: {
                                        color: 'black'
                                    }
                                },
                                data:config.datas.ggbd.pos
                            });

                            _myChart.hideLoading();
                            _myChart.setOption(_option,true);
                        }, 500)
                    } 

                };
                if (selected['负面关注']) {
                    len = _option.series.length;
                    added = false;
                    while (len--) {
                        if (_option.series[len].name == '负面关注') {
                            // 已经添加
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        _myChart.showLoading({
                            text : '数据获取中',
                            effect: 'whirling'
                        });
                        setTimeout(function (){
                            _option.series.splice(1,1);
                            _option.series.push({
                                name:'负面关注',
                                type:'line',
                                yAxisIndex:1,
                                itemStyle: {
                                    normal: {
                                        color:'green',
                                        lineStyle: {        // 系列级个性化折线样式
                                            width: 1,
                                           // color:'#0088cc',
                                            type: 'dashed'
                                        }
                                    },
                                    emphasis: {
                                        color: 'black'
                                    }
                                },
                                data:config.datas.ggbd.neg
                            });
                            _myChart.hideLoading();
                            _myChart.setOption(_option,true);
                        }, 500)
                    } 
                };
                if (selected['中性关注']) {
                    len = _option.series.length;
                    added = false;
                    while (len--) {
                        if (_option.series[len].name == '中性关注') {
                            // 已经添加
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        _myChart.showLoading({
                            text : '数据获取中',
                            effect: 'whirling'
                        });
                        setTimeout(function (){
                            _option.series.splice(1,1);
                            _option.series.push({
                                name:'中性关注',
                                type:'line',
                                yAxisIndex:1,
                                itemStyle: {
                                    normal: {
                                        color:'black',
                                        lineStyle: {        // 系列级个性化折线样式
                                            width: 1,
                                         //   color:'#0088cc',
                                            type: 'dashed'
                                        }
                                    },
                                    emphasis: {
                                        color: 'black'
                                    }
                                },
                                data:config.datas.ggbd.cen
                            });
                            _myChart.hideLoading();
                            _myChart.setOption(_option,true);
                        }, 500)
                    } 
                };
            }
            _myChart.on(ecConfig.LEGEND_SELECTED, clickes);

        this.init=_init;
    }

	//微博股票提及数变动上升&下降
	//变动上升
	function bdssChart(){
		var _option={
			tooltip:{
				trigger: 'axis',
				axisPointer:{
					type:"shadow"
				},
				formatter:function(v){
					return v[0][1]+'变动上升：'+v[0][2]+'%'
				}
			},
	        title : {
	             },
	        xAxis : [
	       	 {
	            type : 'value',
	            axisLine: {show: false},
	            axisLabel: {show: false},
	            axisTick: {show: false},
	            splitLine: {show: false},
				boundaryGap:[0,0.2]
	       	 }
	    	],
		    yAxis : [
		        {
		            type : 'category',
					boundaryGap:[0,0.1],
					data:config.datas.changeMentioned.cate

		        },
                {
                    type : 'category',
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    data:config.datas.changeMentioned.desc_symbol
                }
		      ],
		    animation: false,
	      	series : [
	        	{
	            type:'bar',
	            itemStyle : { 
	            	normal: {
		                color: 'rgb(192,80,78)',
		                borderRadius: 5,
		                label : {
		                    show: true,
		                    position: 'right',
		                    formatter: '{c}%'
		                }
		            }
		         },
                yAxisIndex:1,
	            data:config.datas.changeMentioned.desc       
	           }
	       ]
		};
		var _myChart,ecConfig;
		function _init(){
			if(_myChart&&_myChart.dispose){
				_myChart.dispose();
			}
			_myChart=echarts.init(document.getElementById(config.dom.desc));
			ecConfig=echarts.config.EVENT;
			_myChart.on(ecConfig.CLICK, clickes);
			
			var curl=config.url.changeMentioned.descURL.replace('$cb',"var "+config.params.desc+"=");
			wn_varLoader(curl,function(){
				data_bdss=window[config.params.desc];
				_loadedData(data_bdss);
				//window[config.params.desc]=null;
			});
		};
	
		function _loadedData(){
			var cdata=config.datas.changeMentioned;
			for(var i=0;i<data_bdss.result.data.length;i++){
				 var cname = data_bdss.result.data[i].NAME;
	             var csymbol = data_bdss.result.data[i].SYMBOL;
				 var change=data_bdss.result.data[i].CHG;					 				 
				 cdata.cate.unshift(cname);
				 cdata.desc.unshift(change);
	             cdata.desc_symbol.unshift(csymbol);
			};
			_myChart.setOption(_option,true);
		};
		
	    //if(echarts)	 
        function clickes(par){
             if (typeof par.seriesIndex != 'undefined') {
               insight_wbyq(par.name);
             }
        };
	        
		this.init=_init;
	};
		
	function bdxjChart(){
		var _myChart=echarts.init(document.getElementById(config.dom.asc));
			var _option={
				tooltip:{
					trigger: 'axis',
					axisPointer:{
						type:"shadow"
					},
					formatter:function(v){
						return v[0][1]+'变动下降：'+v[0][2]+'%'
					}
				},
		        title : {
		             },
		         xAxis : [
		        	{
		            type : 'value',
		            axisLine: {show: false},
		            axisLabel: {show: false},
		            axisTick: {show: false},
		            splitLine: {show: false},
					boundaryGap:[0,0.2]
		       	 } ],
			    yAxis : [
			        {
			            type : 'category',
						boundaryGap:[0,0.1],
						data:config.datas.changeMentioned.cate_asc
			        },
                    {
                        type : 'category',
                        axisLine: {show: false},
                        axisLabel: {show: false},
                        axisTick: {show: false},
                        splitLine: {show: false},
                        data:config.datas.changeMentioned.asc_symbol
                    }
			      ],
			  animation: false,
		      series : [
		        	{
			            type:'bar',
			            itemStyle : { 
			            	normal: {
				                color: 'rgb(146,208,81)',
				                borderRadius: 5,
				                label : {
				                	textStyle: {
									        color: 'black'
									    },
				                    show: true,
				                    position: 'right',
				                    formatter: '{c}%'
				                }
				            }
				       },
	                   yAxisIndex:1,
			           data:config.datas.changeMentioned.asc      
		           }
		        ]
			};
			function _init(){
				var curl=config.url.changeMentioned.ascURL.replace('$cb',"var "+config.params.asc+"=");
				wn_varLoader(curl,function(){
					data_bdxj=window[config.params.asc];
					_loadedData(data_bdxj);
					//window[config.params.asc]=null;
				});
			};
			function _loadedData(){
				var cdata=config.datas.changeMentioned;
				for(var i=0;i<data_bdxj.result.data.length;i++){
					 var cname = data_bdxj.result.data[i].NAME;
					 var change=data_bdxj.result.data[i].CHG;
                     var casymbol=data_bdxj.result.data[i].SYMBOL;					 				 
					 cdata.cate_asc.unshift(cname);
					 cdata.asc.unshift(change);
                     cdata.asc_symbol.unshift(casymbol);
				};
				_draw();
			};

			function _draw(){
				_myChart.setOption(_option,true);
			}

            var ecConfig =echarts.config.EVENT;
            function clickes(par){
                 if (typeof par.seriesIndex != 'undefined') {
                   insight_wbyq(par.name);
                 }
            };
            _myChart.on(ecConfig.CLICK, clickes);

		this.init=_init;
	}
		
	function _init(){
		var slchart=new gprdChart();
			slchart.init();
			
    		aheatMap.loadData(0);
		
		var bdsscharts=new bdssChart();
			bdsscharts.init();
		
		var bdxjcharts=new bdxjChart();
			bdxjcharts.init();
	}
	
	this.init=_init;
}

var _visual_wbyq_ex=new visual_wbyh();
	_visual_wbyq_ex.init();

function onResize(){}
