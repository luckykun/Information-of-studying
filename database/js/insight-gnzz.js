	$(function(){
		$("#gnzz_navID li").mouseover(function(){
			$(this).addClass("gnzz_navHover")
		}).mouseout(function(){
			$(this).removeClass("gnzz_navHover");
		});
       
	})
    $(document).ready(function(){
        // $(".scTABLE a").attr("target","_blank")
    })
//公共函数
	function wn_varLoader(url_,cb_,errCb_,charset_){
				var isLoaded=false,s=document.getElementsByTagName('script')[0],n=document.createElement('script');
				n.type='text/javascript';	n.charset=charset_||'utf-8';	n.src=url_;	n.async=true;
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
					//console.log(s.parentNode);
				s.parentNode.insertBefore(n,s);
			};
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
	function getDocument(n,c){
		c=c||document;
		return c.getElementById(n);
	}

//
var navA=navB=navC=navD=navE=0;//number count
//第一tab 
// 全市场概览
$(document).ready(function(){
            function nav_scgl(){    
                          //window.scglCODE;window.scglNAME;
                        var config={
                    		URLPV:[
                    			"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getList2H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getList6H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getList12H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getList24H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListWeek?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListMonth?type=CN&num=50&callback=$cb",
                    			],
                    		URL:[
                    			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRef2H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRef6H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRef12H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRef24H?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRefWeek?type=CN&num=50&callback=$cb",
                    			"http://data.finance.sina.com.cn/api/openapi.php/WeiboReferService.getRefMonth?type=CN&num=50&callback=$cb"],
                    		NAVURL:window.location.href,
                    		HQURL:"http://hq.sinajs.cn/?_=$random&list=",
                    		COLOR:{
                    			RANGECOLOR:['#00E717','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'],
                    			DAREACOLOR:['rgba(211,237,212,1)','rgba(124,210,154,1)','rgba(76,187,115,1)','rgba(35,166,76,1)'],
                    			UAREACOLOR:['rgba(255,223,214,1)','rgba(255,128,128,1)','rgba(255,86,86,1)','rgba(245,69,69,1)'],
                    			BTNCOLOR:{over:"#D9D9D9",out:"#F5F5F5"},
                    			LEDENGCOLOR:['rgba(35,166,76,1)','rgba(76,187,115,1)','rgba(124,210,154,1)','rgba(211,237,212,1)','#F3F3F3','rgba(255,223,214,1)','rgba(255,128,128,1)','rgba(255,86,86,1)','rgba(245,69,69,1)']
                    		},
                    		POPUPTEMPLATE:
                    			'<li><span>名称：</span><span>$name</span><li><span">最新价：</span><span>$price</span></li><li><span>涨跌幅：</span><span>$flow</span></li>'
                    	};

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
                    	var cw=799,ch=400;
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
                    	var domfbtnlist=[],btnIndex='ahm0',btnOverC=config.COLOR.BTNCOLOR.over,btnOutC=config.COLOR.BTNCOLOR.out;
                    	var outBtnsvalue=['2小时','6小时','12小时','1天','1周','1月'],outBtnsNum=outBtnsvalue.length;
                    	for(var i=0;i<outBtnsNum;i++){
                    		var fbtntmp=fbtn.append('div')
                    		 			.style('float','left')
                    					.style("width",'50px')
                    					.style("height",'15px')
                    					.style("padding",'2px 2px 2px 2px')
                    					.style("background-color",btnOutC)
                    					.style("cursor","pointer")
                    					.style("border","1px solid "+btnOutC)
                    					.attr('id','ahm'+i).on('click',function(){
                    						var str=this.id.slice(3);root=node=null;aheatMap.loadData(Number(str));
                    						for(var i=0;i<outBtnsvalue.length;i++){
                    							domfbtnlist[i].style.backgroundColor=btnOutC;
                    						}
                    						btnIndex=this.id;
                    						this.style.backgroundColor=btnOverC;
                    					})
                    					.on('mouseover',function(){this.style.backgroundColor=btnOverC;})
                    					.on('mouseout',function(){
                    						if(this.id!==btnIndex)this.style.backgroundColor=btnOutC;
                    					})
                    			
                    		if(i==0){
                    			fbtntmp.style("margin",'10px 0px 10px 10px')
                    				   .style("background-color",btnOverC)
                    		}
                    		else		fbtntmp.style("margin",'10px 0px 10px 0px')
                    		var fbtndom=document.getElementById('ahm'+i);
                    		domfbtnlist.push(fbtndom);
                    		
                    		domfbtnlist[domfbtnlist.length-1].innerHTML=outBtnsvalue[i];
                    		domfbtnlist[domfbtnlist.length-1].style.font='12px helvetica,arial,sans-serif'
                    		domfbtnlist[domfbtnlist.length-1].style.textAlign='center';
                    		domfbtnlist[domfbtnlist.length-1].style.lineHeight='1.2';
                    	}
                    	
                    	var qhlegend=['-4%','-3%','-2%','-1%','0','1%','2%','3%','4%'],legendNum=qhlegend.length;
                        
                        var legendcontainer=fcontainer.append('div');
                       		legendcontainer.style('float','left')
                        				   .style("margin",'15px 0px 0px 0px')
                        	               .style("width",w-30+'px')
                        	               .style("height",'30px');
                      	var lglists=[];
                    	for(var i=0;i<legendNum;i++){
                    		var legenddiv=legendcontainer.append('div')
                    		 			.style('float','left')
                    					.style("width",'40px')
                    					.style("height",'10px')
                    					.style("padding",'2px 2px 2px 2px')
                    					.style("background-color",config.COLOR.LEDENGCOLOR[i])
                    					//.style("cursor","pointer")
                    					.style("border","1px solid "+config.COLOR.LEDENGCOLOR[i])
                    					.attr('id','qhld'+i)
                    					
                    		
                    		var lgdom=document.getElementById('qhld'+i);
                    		lglists.push(lgdom);
                    		
                    		lglists[lglists.length-1].innerHTML=qhlegend[i];
                    		lglists[lglists.length-1].style.font='12px helvetica,arial,sans-serif';
                    		
                    		if(i<4)	lglists[lglists.length-1].style.textAlign='left';
                    		else if(i===4)lglists[lglists.length-1].style.textAlign='center';
                    		else		lglists[lglists.length-1].style.textAlign='right';
                    		lglists[lglists.length-1].style.lineHeight='1';
                    	}
                    	
                    	var fchart=fchartcontainer.append('div')
                    			   .attr('id', 'fchart')
                    			   .style('float','left')
                    			   .style('width',w+'px')
                    			   .style('height',h+'px')
                    			   .style('position', 'relative');
                    	
                    	function stockHeatMap(){
                    		var _data={},_newData={},btnLists=[];
                    		var _ahm="AHM";
                    		
                    		function _loadData(index_){
                    			_data={};
                    			wn_varLoader(config.URLPV[index_].replace("$cb",'var '+_ahm+'=')+'&random='+Math.random(),function(){
                    				_data=window[_ahm];
                    				window[_ahm]=null;
                    				_transPatter(_data);
                    			})
                    		}
                    		
                    		function _transPatter(data_){
                    			var d=data_.result.data;
                    			var tmpd=[];
                    			if(!d) return;
                    			
                    			for(var i=0,len=d.length;i<len;i++){
                    				var od=d[i];
                    				var o={
                    					'name':'',
                    					'size':od.PV,//od.REF,
                    					//'url':config.NAVURL.replace("$symbol",od.SYMBOL),
                                        'url':config.NAVURL+"/"+od.SYMBOL,
                    					'code':od.SYMBOL,
                    					'price':0,
                    					'flowp':0,

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
                    			var max_size=0;
                    			wn_varLoader(config.HQURL.replace('$random',Math.random())+hqlist,function(){
                    				for(i=0;i<len;i++){
                    					tmphq=window["hq_str_s_"+data_[i].code];
                    					var arr=tmphq.split(',');
                    					data[i].name=arr[0];
                    					data[i].price=arr[1];
                    					data[i].flowp=arr[3];


                                        if(data_[i].code=="sh000001"){
                                            data[i].name="";
                                            data[i].price=0;
                                            data[i].flowp=0;
                                             data[i].size=0;
                                        }
                                        if(max_size<=data_[i].size){
                                            window.scglCODE=data_[i].code;
                                            window.scglNAME=data_[i].name;
                                            max_size=data_[i].size;
                                        }
                    				}
                                    //var slchart=new scgl_sub();
                                    // slchart.scgl_subChart.init();
                    				scgl_sub();
                    				_newData={
                    					'children':[]
                    				};
                    				_newData.children=data;
                    				_draw(_newData);
                    			})
                    		}
                    		function _divColor(d_){
                    			var bcd='';
                    			if(d_.flowp<0)		bcd=config.COLOR.DAREACOLOR[0];
                    			if(d_.flowp<=-1)	bcd=config.COLOR.DAREACOLOR[1];
                          		if(d_.flowp<=-3)	bcd=config.COLOR.DAREACOLOR[2];
                          		if(d_.flowp>0)		bcd=config.COLOR.UAREACOLOR[0];
                          		if(d_.flowp>=1)		bcd=config.COLOR.UAREACOLOR[1];
                          		if(d_.flowp>=3)		bcd=config.COLOR.UAREACOLOR[2];
                          		if(d_.flowp==0)		bcd='#F3F3F3';
                          		return bcd;
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
                    			        .style("width", function(d_){ 
                    			    		var xd=d_.dx<=1 ? d_.dx:d_.dx-1;
                    			      		return xd+"px"; 
                    			        })
                    			        .style("height", function(d_){ 
                    			    		var yd=d_.dy<=1 ? d_.dy:d_.dy-1;
                    			      		return yd+"px"; 
                    			        })
                    			        .style("top", function(d_){ 
                    			      		return d_.y+"px"; 
                    			        })
                    			        .style("left", function(d_){ 
                    			      		return d_.x+"px"; 
                    			        })
                    			        .style("background",function(d_){
                    			      		return _divColor(d_);
                    			        })
                    			        .style('position', 'absolute')
                    		      		//.style("filter",function(d_){
                    			        //	return "progid:DXImageTransform.Microsoft.gradient(startColorstr='#99ffffff', endColorstr='#99000000',GradientType=0 )";
                    			       // })
                    			       // .style("box-shadow",function(d_){
                    			       // 	return 'inset 2px 2px 2px rgba(255,255,255,0.25),inset -2px -2px 5px rgba(0,0,0,0.5)';
                    			       // })
                    			        .style("border",function(d_){
                    			        	return '1px solid #757575';
                    			        })
                    			        .style("cursor","pointer")
                    			        .on("mouseover",function(d_){
                    			        	this.style.boxShadow='inset 2px 2px 2px rgba(255,255,255,.25),inset -2px -2px 5px rgba(0,0,0,.3)';
                    			        })
                    			        .on("mouseout",function(d_){
                    			        	this.style.boxShadow='';
                    			        	//this.style.boxShadow='inset 2px 2px 2px rgba(255,255,255,0.25),inset -2px -2px 5px rgba(0,0,0,0.5)';
                    			      		
                    			      		//fpopup.style('display', 'none');
                    			        })
                    			        .on("click",function(d_){
                    			        	window.scglCODE=d_.code;
                    			        	window.scglNAME=d_.name;
                    			        	

                    			        	scgl_sub();
                    				 		   
                    			        	//
                    			        })
                    			        
                    				cell.append("div")
                    		            .style("width", function(d_) { return d_.dx + 'px'; })
                    		      		.style("height", function(d_){ 
                    		      			if(d_.dy<=50)	return d_.dy+'px';	
                    		      			return d_.dy/2 + 'px'; 
                    		      		})
                    		      		.style("top", function(d_){ 
                    			      		return d_.dy/2-8+"px"; 
                    			        })
                    			        .style("left", function(d_){ 
                    			      		return 0+"px"; 
                    			        })
                    		      		.style("text-anchor", "middle")
                    		      		.style("color",'#5b5b5b')
                    		      		//.style("color",'#EDEDED')
                    		      		.style("font-size", '12px')
                    		      		.style("overflow",'hidden')
                    		      		.style("text-align",'center')
                    		      		.style('position', 'relative')
                    		      		.text(function(d) {return d.name})
                    		      		.style("opacity", function(d) { 
                    		      			var ap;
                    		      			d.w = this.offsetWidth;
                    		      			d.h = this.offsetHeight;
                    		      			
                    		      			if(d.w>50)	ap=1;
                    		      			else		ap=0;
                    		      			
                    		      			if(ap==1&&d.h<20){
                    		      				ap=0;
                    		      			} 
                    		      			return ap; 
                    		      		})
                    		}
                    		
                    		this.loadData=_loadData;
                    		//this.addEvent=_addEvent;
                    	}
                    	
                    	var aheatMap=new stockHeatMap();
                        aheatMap.loadData(0);
                       // aheatMap.addEvent();
                    	
                    	
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
            };
            
            nav_scgl();
            /*function scgl_sub(){
            	var config={
            		datas:	{
            			close:[],
            			closeDate:[],//日期
            			name:[],
            			PV:[],
            			PVDate:[],
            			scgl:{
            				time:[],
            				price:[],
            				PV:[]
            				}			
            			},

            		params:{
            			cb:'BO',
            			cbpv:'TO',
            			bk:window.scglCODE,
            		},
            		dom:{
            			main:"scgl_sub",
            		},
            		url:{
            			urlPV:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListHQ?symbol=$bk&callback=$cb",

            			kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                        hqURL:"http://hq.sinajs.cn/?_=$random&list=$symbol",			
            		},
            		
            	};
        		function scgl_subChart(){
        			var _myChart=echarts.init(document.getElementById(config.dom.main));
                    var ncURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    
        			var _option={
                                    tooltip : {
                                        trigger: 'axis',
                                        axisPointer:{
                                            type : 'cross',
                                            crossStyle : {
                                                color:'black',
                                                width:0.5
                                            }
                                        }
                                    },
        					        grid:{
        								x:67,
                                        y:50,
        								},
        					        dataZoom : {
        						        show : true,
        						       //realtime : true,
        						        start : 90,
        						        end : 100,
                                        handleColor:'#555'
        							},
        							legend:{
        								 	data:["收盘价","用户关注趋势"],
                                            x:600,
                                            y:35
        							},
        					        xAxis : [
        						        {
        						            type : 'category',
                                            boundaryGap:false,
        						            data:config.datas.scgl.time,     	 
        						             axisLine:{
        						                show:false,
        						            },
        						            axisLabel : {show:true,
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
                                            boundaryGap:[0.01,0.01],
                                            nameTextStyle:{
                                                color: 'red',
                                            },
            					            axisLine:{
            					                show:true,
                                                lineStyle:{
                                                    color: '#d9e2e7',
                                                }
            					            },
            					            splitArea : {
            					                show: false,
            					            },
                                           splitLine:{
                                                show:true,
                                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                                            }

        							    },
        							    {
        						        	type:'value',
        						            power: 1,
        						            name:'用户关注',
        						            scale:true,
                                             boundaryGap:[0.01,0.01],
                                            precision:1,
                                             nameTextStyle:{
                                                color: 'red',
                                            },
                                            axisLabel:{
                                                show:false

                                            },
        						            axisLine:{
        						                show:true,
                                                lineStyle:{
                                                    color: '#d9e2e7',
                                                }
        						            },
                                            axisTick:{
                                                show:false

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
                                            name:'收盘价',
        						            type:'line',
        									itemStyle: {normal: {color:"rgb(61,163,238)",}},
        						            data:config.datas.scgl.price,         
        						        },
        						        {   
                                            name:'用户关注趋势',
        						            type:'line',
        						            yAxisIndex:1,
        									//itemStyle: {normal: {color:"rgb(61,163,238)",}},
        						            data:config.datas.scgl.PV,         
        						        },
        						           
        						    ]
        						};
        			function _init(){
        				var curlPV=config.url.urlPV.replace('$bk',config.params.bk).replace('$cb',"var "+config.params.cbpv+"=");
        					wn_varLoader(curlPV,function(){
        						data_scglPV=window[config.params.cbpv];
        						_loadedPVData(data_scglPV);

        						_loadedData_k();
        					})

        				
        			};
        			function _loadedPVData(){
        				var cdata=config.datas;
        				//console.log(data_scglPV.result.data);
        				for(var i in data_scglPV.result.data){
        					 var xdate = data_scglPV.result.data[i].DT;
        					 var xpv=((data_scglPV.result.data[i].PV)/10000).toFixed(1);

        					 cdata.PV.push(xpv);
        					  cdata.PVDate.push(xdate);
        				}
        				cdata.PV.reverse();
        				cdata.PVDate.reverse();
        	
        			};
        			//console.log(scglCODE)
        			var _symbol=window.scglCODE,_day='',_dk;
        			function _loadedData_k(){
        				 if(_symbol==''){ return ;}
        	            var url=config.url,tmpday,tmphq,tmpk;
        	           		 wn_varLoader(url.hqURL.replace("$symbol",_symbol).replace("$random",Math.random()),function(){
        	                tmphq=window['hq_str_'+_symbol];
        	                window['hq_str_'+_symbol]=null;
        	                
        	                var tmparr=tmphq.split(',');
        	                _day=tmparr[30];
        	                
        	                wn_varLoader(url.kURL.replace('$symbol',_symbol).replace('$day',_day),function(){
        	                    tmpk=window['KLC_KL_'+_symbol];
        	                    window['KLC_KL_'+_symbol]=null;
        	                    
        	                    _dk=A_S_KLC_D(tmpk);
        	                    //console.log(_dk)
        	                    var deadLine=new Date();
        	                    deadLine.setFullYear(2014,6,28);
        	                    for(var i in _dk){
        	                        var ttr=[];
        	                        var xtime=_dk[i].date;;
        	                        var y=xtime.getFullYear(),m=xtime.getMonth()+1,n=xtime.getDate();
        	                        if(y>"2011"){
        	                        var _date=y+"-"+m+"-"+n;
        	                        var xclose=_dk[i].close;                         
        	                        //ttr.push(xclose);
        	                       // ttr.push(xopen);ttr.push(xclose);ttr.push(xhigh);ttr.push(xlow);
        	                        config.datas.close.push(xclose);
        	                        ///config.datas.closeDate.push(xtime);
                                    var _dtime=_date.split("-");
                                    if(_dtime[1]<10){_dtime[1]="0"+_dtime[1]};
                                    if(_dtime[2]<10){_dtime[2]="0"+_dtime[2]};
                                    var _dtimes=_dtime[0]+"-"+_dtime[1]+"-"+_dtime[2];
        	                        config.datas.closeDate.push(_dtimes);
        	                   	}};
        	                   	//console.log(config.datas.close)
                                //过滤掉周末及假期数据
                                var stData=config.datas;
                                var lasti=0,lastj=0;
                               // console.log(stData.closeDate)
                               // console.log(stData.PVDate)
                                for(var j=lastj;j<stData.closeDate.length;j++){
                                        for(var i=lasti;i<stData.PVDate.length;i++){
                                            if(stData.closeDate[j]==stData.PVDate[i]){
                                                stData.scgl.time.push(stData.PVDate[i]);
                                                stData.scgl.price.push(stData.close[j]);
                                                 stData.scgl.PV.push(stData.PV[i]);
                                                lastj=j;lasti=i;
                                                break;
                                            } 
                                        }
                                };
                                // console.log(config.datas.scgl)
                                //  console.log(_option)
                                 // console.log(_myChart)
                                 $("#scglTEXT").html("<a target='_blank' href='"+ncURL.replace("$symbol",window.scglCODE)+"'>"+window.scglNAME+"</a>"+" 用户关注及价格变化趋势");
        						_myChart.setOption(_option,true); 
                            
        	                }); 

                        })
        			};

        			function _draw(){
        				//console.log(_option);
        				
        			}

        			 this.init=_init;
        			// this.updata=_updata;
        		};
            	this.scgl_subChart=new scgl_subChart();
            };
            */
            
            //ge gu yonghu guanzhu 

            function scgl_sub(){ 
                    var IMG="http://image.sinajs.cn/newchart/bill/pv_year/$symbol.png",
                        IMGsrc=IMG.replace("$symbol",window.scglCODE)

                    $("#scgl_sub").html("<img src='"+IMGsrc+"' />");
            }
            //var scglt=new scglTable();
             //   scglt.init();

            //全市场表格
            //包括实时、周、1日、5日、排名上升、排名下降
            function scglTable(){

                var config={
                    datas:{
                        now:[],
                        week:[],
                        one:[],
                        five:[],
                        asc:[],
                        desc:[],

                        symbolAll:[],
                    },
                    params:{
                        gn:window.scglCATE,
                        ab:'NOW',
                        week:'WEEK',
                        bb:'ONE',
                        cb:'FIVE',
                        asc:'ASC',
                        desc:'DESC',
                    },
                    url:{

                        nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbolNow?num=10&type=CN&callback=$cb",
                        weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbolWeek?num=10&type=CN&callback=$cb",
                        oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbolChangeNday?type=CN&num=10&count=1&order=DESC&callback=$cb",
                        fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbolChangeNday?type=CN&num=10&count=5&order=DESC&callback=$cb",
                        ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListContinueChange?num=10&type=CN&order=ASC&callback=$cb",
                        descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListContinueChange?num=10&type=CN&order=DESC&callback=$cb",
                        
                        kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                        hqURL:"http://hq.sinajs.cn/?_=$random&list=",
                    },

                };
                function _init(){
                    var cdata=config.datas,qurl=config.url.hqURL
                    var urlNOW=config.url.nowURL.replace("$cb","var "+config.params.ab+"="),
                        urlWEEK=config.url.weekURL.replace("$cb","var "+config.params.week+"="),
                        urlONE=config.url.oneURL.replace("$cb","var "+config.params.bb+"="),
                        urlFIVE=config.url.fiveURL.replace("$cb","var "+config.params.cb+"="),
                        urlASC=config.url.ascURL.replace("$cb","var "+config.params.asc+"="),
                        urlDESC=config.url.descURL.replace("$cb","var "+config.params.desc+"=");

                    wn_varLoader(urlNOW,function(){ 
                        //实时数据
                            data_now=window[config.params.ab];
                            //
                        
                            for(var i in data_now.result.data){
                                    var symbol=data_now.result.data[i].SYMBOL,
                                        name=data_now.result.data[i].NAME,
                                        pv=(parseInt(i)+1);
                                        var attr=[];
                                    attr.push(symbol);attr.push(name);attr.push(pv);
                                    //console.log(attr);
                                    cdata.now.push(attr);
                                    cdata.symbolAll.push(symbol);
                                    qurl+=symbol+',';
                            };
                        // 周数据
                        wn_varLoader(urlWEEK,function(){  
                                data_week=window[config.params.week];
                                for(var j in data_week.result.data){
                                 var symbolweek=data_week.result.data[j].SYMBOL,
                                     nameweek=data_week.result.data[j].NAME,
                                     pvweek=(parseInt(j)+1);
                                     var attOne=[];
                                     attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
                                        
                                     cdata.week.push(attOne);
                                      cdata.symbolAll.push(symbolweek);
                                     //console.log(cdata.one);
                                     qurl+=symbolweek+',';
                                }

                        // 一日数据
                        //console.log(urlONE);
                        //console.log(urlFIVE);
                            wn_varLoader(urlONE,function(){ 
                                data_one=window[config.params.bb];
                                for(var j in data_one.result.data){
                                    var symbolOne=data_one.result.data[j].SYMBOL,
                                        nameOne=data_one.result.data[j].NAME,
                                        pvOne=(parseInt(j)+1);
                                        chanegOne=data_one.result.data[j].CHANEG
                                        var attOne=[];
                                        attOne.push(symbolOne);attOne.push(nameOne);attOne.push(pvOne);attOne.push(chanegOne);
                                        
                                        cdata.one.push(attOne);
                                        //console.log(cdata.one);
                                        cdata.symbolAll.push(symbolOne);
                                        qurl+=symbolOne+',';
                                }
                        // 5日数据
                                    wn_varLoader(urlFIVE,function(){    
                                    data_five=window[config.params.cb];
                                    //console.log(data_five);
                                    for(var k in data_five.result.data){
                                        var symbolFive=data_five.result.data[k].SYMBOL,
                                            nameFive=data_five.result.data[k].NAME,
                                            pvFive=(parseInt(k)+1);
                                            chanegFive=data_five.result.data[k].CHANEG
                                            var attFive=[];
                                            attFive.push(symbolFive);attFive.push(nameFive);attFive.push(pvFive);attFive.push(chanegFive);
                                            
                                            cdata.five.push(attFive);
                                            //console.log(cdata.one);
                                            cdata.symbolAll.push(symbolFive);
                                            qurl+=symbolFive+',';
                                    }

                                    // 上升

                                        wn_varLoader(urlASC,function(){ 
                                            data_asc=window[config.params.asc];
                                            //console.log(data_asc);
                                            for(var k in data_asc.result.data){
                                                var _symbol=data_asc.result.data[k].SYMBOL,
                                                    _name=data_asc.result.data[k].NAME,
                                                    _days=data_asc.result.data[k].DAYS,
                                                    _chg=data_asc.result.data[k].CHG,
                                                    _rank=data_asc.result.data[k].RANK;
                                                    var attAsc=[];
                                                    attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
                                                    cdata.asc.push(attAsc);
                                                    
                                                    
                                    }

                                    // 下降
                                                    wn_varLoader(urlDESC,function(){    
                                                        data_desc=window[config.params.desc];
                                                        //console.log(data_desc);
                                                        for(var k in data_desc.result.data){
                                                            var _symbol=data_desc.result.data[k].SYMBOL,
                                                                _name=data_desc.result.data[k].NAME,
                                                                _days=data_desc.result.data[k].DAYS,
                                                                _chg=data_desc.result.data[k].CHG,
                                                                _rank=data_desc.result.data[k].RANK;
                                                                var attDesc=[];
                                                                attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
                                                                
                                                                cdata.desc.push(attDesc);
                                                                
                                                        }
                                    
                                //console.log(cdata.symbolAll)
                                var tmphq,tmphq;
                                        wn_varLoader(qurl.replace("$random",Math.random()),function(){

                                                for(var m in cdata.symbolAll){
                                                    var _symbol=cdata.symbolAll[m];
                                                    //if(_symbol==''){ return ;}
                                                    tmphq=window['hq_str_'+_symbol];
                                                //  console.log(tmphq)
                                                    //window['hq_str_'+_symbol]=null;
                                                    //console.log(cdata.five)
                                                    var tmparr=tmphq.split(',');
                                                    var _new=parseFloat(tmparr[3]).toFixed(2);
                                                    var n=cdata.now.length,w=cdata.week.length,o=cdata.one.length,f=cdata.five.length,a=cdata.asc.length,d=cdata.desc.length;
                                                    var _rose=(((_new-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
                                                    if(m<n){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.now[m].push(_new);cdata.now[m].push(_rose);
                                                    }
                                                    else if(m>=n&&m<(n+w)){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.week[m-n].push(_new);cdata.week[m-n].push(_rose);
                                                    }
                                                    else if(m>=(w+n)&&m<(n+w+o)){
                                                        if(parseFloat(_new)==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.one[m-n-w].push(_new);
                                                    }
                                                    else if(m>=(n+w+o)&&m<(n+w+o+f)){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.five[m-(w+n+o)].push(_new);
                                                    }
                                                        //console.log(cdata.one);
                                                }
                                                
                                                _draw();
                                        })
                                        
                                        
                                        })
                                    })
                                })
                })
                            })

                            
                        })

                };

                function _draw(){
                    var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    var cdata=config.datas.now;
                    //console.log(cdata);
                    // 实时数据
                    $("#scglNOW h4").text("全市场实时关注排行");
                    
                    
                    $("#scglNowTable table tr").text("");
                    $("#scglNowTable table thead").html("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>")
                     

                    for(var i=0;i<cdata.length;i++){
                        var curl=syURL.replace("$symbol",cdata[i][0]);
                        $("#scglNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
                        if(parseFloat(cdata[i][4])>0){$("#scglNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdata[i][4])<0){$("#scglNowTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    };

                    //周数据
                    $("#scglWEEK h4").text("全市场本周关注排行");
                    var cdataWeek=config.datas.week;

                    $("#scglWeekTable table tr").text("");
                    $("#scglWeekTable table thead").html("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>")
                    for(var i=0;i<cdataWeek.length;i++){
                        var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
                        $("#scglWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
                        if(parseFloat(cdataWeek[i][4])>0){$("#scglWeekTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdataWeek[i][4])<0){$("#scglWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                       // if(parseFloat(cdataWeek[i][4])=0){$("#scglWeekTable table tr").eq(i).find("td").eq(3).css("color","black")   }
                    }
                    //1日加入表格
                    $("#scglONE h4").text("全市场用户关注1日变化幅度排行");
                    var cdataOne=config.datas.one;
                    $("#scglOneTable table tr").text("");
                    $("#scglOneTable table thead").html("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                    //console.log(cdataOne)
                    for(var i=0;i<cdataOne.length;i++){
                        var curlone=syURL.replace("$symbol",cdataOne[i][0]);
                        $("#scglOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][3]+'</td><td>'+cdataOne[i][2]+'</td></tr>')
                        if(parseFloat(cdataOne[i][3])>0){$("#scglOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdataOne[i][3])<0){$("#scglOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }
                    //5日加入表格
                    $("#scglFIVE h4").text("全市场用户关注5日变化幅度排行");
                    var cdataFive=config.datas.five;
                    $("#scglFiveTable table tr").text("");
                    $("#scglFiveTable table thead").html("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                    for(var i=0;i<cdataFive.length;i++){
                         var curlfive=syURL.replace("$symbol",cdataFive[i][0]);http://finance.sina.com.cn/realstock/company/sh600010/nc.shtml
                        $("#scglFiveTable table").append('<tr><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][0]+'</a></td><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][1]+'</a></td><td>'+cdataFive[i][4]+'</td><td>'+cdataFive[i][3]+'</td><td>'+cdataFive[i][2]+'</td></tr>')
                        if(parseFloat(cdataFive[i][3])>0){$("#scglFiveTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdataFive[i][3])<0){$("#scglFiveTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }

                    //上升加入表格
                    $("#scglASC h4").text("全市场用户关注排名连续上升排行");
                    var cdataAsc=config.datas.asc;
                    $("#scglAscTable table tr").text("");
                    $("#scglAscTable table thead").html("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>")
                    for(var i=0;i<cdataAsc.length;i++){
                        var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                        $("#scglAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                        if(parseInt(cdataAsc[i][3])>0){$("#scglAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseInt(cdataAsc[i][3])<0){$("#scglAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }


                    //下降加入表格
                    $("#scglDESC h4").text("全市场用户关注排名连续下降排行");
                    var cdataDesc=config.datas.desc;
                    $("#scglDescTable table tr").text("");
                    $("#scglDescTable table thead").html("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
                    for(var i=0;i<cdataDesc.length;i++){
                        var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                        $("#scglDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                        if(parseInt(cdataDesc[i][3])>0){$("#scglDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseInt(cdataDesc[i][3])<0){$("#scglDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }


                };
                this.init=_init;
            };
            var scglTable= new scglTable();
                scglTable.init();
});
$("#nav_scgl").click(function(){
        if($(this).attr("class")=="gnzz_navClick gnzz_navHover") {return ;}
        else{
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
        }
    });




//第二Tab jys分析
// jys图表及领涨概念
//jysTable显示表格数据

    $("#nav_jys").click(function(){
        if($(this).attr("class")=="gnzz_navClick gnzz_navHover") {return ;}
        else if(navB!=0){
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
        }
        else{
            
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
            function jys(){
                var jys=["沪A","深A","中小板","创业板"];
                var symbol=["sh000002","sz399002","sz399101","sz399006"];
                var symbolNAME=["上证A股指数","成份A股指数","中小板指数","创业板指数"];
                 var ss=new jysTable("沪A",0);
                     ss.init();

                    $("#jys_pro li").removeClass("jys_pro_checked").addClass("jys_pro_nochecked").eq(0).addClass("jys_pro_checked");
                    $("#jys_pro li").click(function(){
                    $(this).addClass('jys_pro_checked').siblings().removeClass("jys_pro_checked");

                    var n =$(this).index();

                    var ssjys=new jysTable(jys[n],n);
                    ssjys.init();
                    var ss=new jysSHAChart(symbol[n],symbolNAME[n],n);
                    ss.init();
                });


            	function jysSHAChart(symbol,symbolNAME,g){
                    var config={
                        datas:{
                            jys:{
                                shaPV:[],
                                shaPrice:[],
                                time:[],
                                _shaPV:[],
                                _shaPrice:[],
                                _pvtime:[],
                                _pricetime:[],
                            },

                        },
                        params:[
                            "SHA",
                            "SZA",
                            "ZXB",
                            "CYB",

                        ],
                        dom:{
                            jys:"jys",

                        },
                        url:{
                            shURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getMktHQ?type=CN&mkt=$sh&kind=$a&callback=$cb",
                            szURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getBlockHQ?type=CN&block=$bk&callback=$cb",

                            //nowURL:"http://data.finance.sina.com.cn/api/xml.php/StockMktService.getListSymbolNow?type=CN&mkt=$bk&kind=A&num=10",


                            //changeURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListContinueChange?num=10&mkt=$bk&kind=A&type=CN&order=$change",
                            kURL:'http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day',
                            hqURL:'http://hq.sinajs.cn/?_=$random&list=$symbol',
                        }
                    };

            		var _myChart=echarts.init(document.getElementById(config.dom.jys));
            		var _option={
            			tooltip:{
            				trigger: 'axis',
                            axisPointer:{
                                type : 'cross',
                                crossStyle : {
                                    color:'black',
                                    width:0.5
                                }
                            },
            				backgroundColor:"rgba(0,0,0,0.7)",
            				borderWidth:2,
            				borderColor:"#0088cc",
            				padding:8,
            				textStyle : {
            			            color: 'white',
            			            
            			        },
            				// formatter:function(v){
            				// 	return "<p style='border-bottom:1px solid #ccc;padding-right:50px;margin-bottom:10px'>"+v[1]+" 行业"+"</p>"+
            				// 			"今日涨跌幅:"+v[2][0]+"%<br>"+
            				// 			"均价:"+(v[2][1]+10)+"元";
            				// 			//"微博关注度："+config.datas.jys;
            				// }

            			},
            			grid:{
            				x:100,
            				y:20,
            				y2:60,

            			},
            			legend:{
            				data:[symbolNAME,"用户关注"]
                            

            			},
            			dataZoom : {
            			        show : true,
            			        start : 90,
            			        end : 100,
                                handleColor:'#555',
            			    },
            			xAxis:[
            			     {
                                type:'category',
                                boundaryGap:false,
                                data:config.datas.jys.time,        
                               axisLine:{show:false},
                               axisLabel:{show:true},
                                axisTick:{show:false},
                                splitLine:{show:true,
                                            lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                                }
                            }
                        ],
            			yAxis:[
            			{
                                type:'value',
                                precision: 2,
                                name:'指数',
                                scale:true,
                                boundaryGap:[0.01,0.05],
                                nameTextStyle:{
                                    color: 'red',
                                },
                                axisLine:{
                                    show:true,
                                    lineStyle:{
                                        color: '#d9e2e7',
                                    }
                                },
                                splitArea : {
                                    show: false,
                                },
                               splitLine:{
                                    show:true,
                                    lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                                }

                            },
                            {
                                type:'value',
                                power: 2,
                                name:'用户关注',
                                scale:true,
                                precision:1,
                                boundaryGap:[0.01,0.05],
                                 nameTextStyle:{
                                    color: 'red',
                                },
                                axisLine:{
                                    show:true,
                                    lineStyle:{
                                        color: '#d9e2e7',
                                    }
                                },
                                axisLabel:{
                                    show:false,

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
            			series:[{
            				type:'line',
            				name:symbolNAME,
            				data:config.datas.jys.shaPrice,
            			},
            			{
            				type:'line',
            				name:'用户关注',
            				yAxisIndex:1,
            				data:config.datas.jys.shaPV,
            			}]

            		};
            		var cdata=config.datas;
            		function _init(){
            			var shaURL=config.url.shURL.replace('$sh','sh').replace('$a','A').replace('$cb',"var "+config.params[g]+"="),
            				szaURL=config.url.shURL.replace('$sh','sz').replace('$a','A').replace('$cb',"var "+config.params[g]+"="),

            				zxbURL=config.url.szURL.replace('$bk','zxb').replace('$cb',"var "+config.params[g]+"="),
            				cybURL=config.url.szURL.replace('$bk','cyb').replace('$cb',"var "+config.params[g]+"=");
            			var urlArray=[shaURL,szaURL,zxbURL,cybURL]
            				wn_varLoader(urlArray[g],function(){
            					data_sha=window[config.params[g]];
            					_loadedDataSHA(data_sha);
            					_loadedData_k();
            						
            				});			
            		};
            		function _loadedDataSHA(){
            			//console.log(data_jysSymbol.result.data);
            			for(var i in data_sha.result.data){
            			var _PV=data_sha.result.data[i].PV;
            			var _time=data_sha.result.data[i].DT;
            			cdata.jys._shaPV.push((_PV/1000000).toFixed(2));
            			cdata.jys._pvtime.push(_time);
            			//console.log(config.datas.jys._shaPV)
            			};
            			cdata.jys._pvtime.reverse();cdata.jys._shaPV.reverse();
            		};
            		var _symbol=symbol,_day='',_dk;
            		function _loadedData_k(){
            	            var url=config.url,tmpday,tmphq,tmpkSHA;
            	           		 wn_varLoader(url.hqURL.replace("$symbol",_symbol).replace("$random",Math.random()),function(){
            	                tmphq=window['hq_str_'+_symbol];
            	                var tmparr=tmphq.split(',');
            	                _day=tmparr[30];
            	                _symbol
            	                wn_varLoader(url.kURL.replace('$symbol',_symbol).replace('$day',_day),function(){
            	                    tmpkSHA=window['KLC_KL_'+_symbol];
            	                    _sha=A_S_KLC_D(tmpkSHA);

            	                    var deadLine=new Date();
            	                    deadLine.setFullYear(2014,6,28);
            	                    for(var i in _sha){
            	                       // var ttr=[];
            	                        var xtime=_sha[i].date;
            	                        var y=xtime.getFullYear(),m=xtime.getMonth()+1,n=xtime.getDate();
            	                        if(y>"2011"){
            	                        var _date=y+"-"+m+"-"+n;
            	                        var xclose=_sha[i].close;                         
            	                        //ttr.push(xclose);
            	                       // ttr.push(xopen);ttr.push(xclose);ttr.push(xhigh);ttr.push(xlow);
            	                        config.datas.jys._shaPrice.push(xclose);
            	                        // config.datas.stockHeat.k_time.push(xtime);
                                        var _dtime=_date.split("-");
                                        if(_dtime[1]<10){_dtime[1]="0"+_dtime[1]};
                                        if(_dtime[2]<10){_dtime[2]="0"+_dtime[2]};
                                        var _dtimes=_dtime[0]+"-"+_dtime[1]+"-"+_dtime[2];
            	                        config.datas.jys._pricetime.push(_dtimes);
            	                   		 }};

                                        //过滤掉周末及假期数据
                                        var stData=config.datas.jys;
                                        //console.log(stData._pricetime),
                                        //console.log(stData._shaPrive)
                                        var lasti=0,lastj=0;
                                        for(var j=lastj;j<stData._pricetime.length;j++){
                                                for(var i=lasti;i<stData._pvtime.length;i++){
                                                    if(stData._pricetime[j]==stData._pvtime[i]){
                                                      //console.log(stData._shaPrive[j]);
                                                        stData.time.push(stData._pvtime[i]);
                                                        stData.shaPV.push(stData._shaPV[i]);
                                                        stData.shaPrice.push(stData._shaPrice[j]);
                                                        lastj=j;lasti=i;
                                                        break;
                                                    } 
                                                }
                                        };
                                       
            						_draw();
            		                });  
            		                })
            				 };

            		
            		function _draw(){
                      //  console.log(_option)
            			_myChart.setOption(_option,true);
            		};
            		this.init=_init;
            	};



            	var jyschart=new jysSHAChart("sh000002","上证A股指数",0);
            		jyschart.init();


                  

                //下面表格显示
                function jysTable(jysNAME,g){
                    var jysURL=[
                            {
                            nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolNow?type=CN&mkt=sh&kind=A&num=10&callback=$cb",
                            weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolWeek?type=CN&mkt=sh&kind=A&num=10&callback=$cb",
                            oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolChangeNday?type=CN&mkt=sh&kind=A&num=10&count=1&order=DESC&callback=$cb",
                            fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolChangeNday?type=CN&mkt=sh&kind=A&num=10&count=5&order=DESC&callback=$cb",
                            ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListContinueChange?num=10&mkt=sh&kind=A&type=CN&order=ASC&callback=$cb",
                            descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListContinueChange?num=10&mkt=sh&kind=A&type=CN&order=DESC&callback=$cb",
                            },
                            {
                            nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolNow?type=CN&mkt=sz&kind=A&num=10&callback=$cb",
                            weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolWeek?type=CN&mkt=sz&kind=A&num=10&callback=$cb",
                            oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolChangeNday?type=CN&mkt=sz&kind=A&num=10&count=1&order=DESC&callback=$cb",
                            fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListSymbolChangeNday?type=CN&mkt=sz&kind=A&num=10&count=5&order=DESC&callback=$cb",
                            ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListContinueChange?num=10&mkt=sz&kind=A&type=CN&order=ASC&callback=$cb",
                            descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockMktService.getListContinueChange?num=10&mkt=sz&kind=A&type=CN&order=DESC&callback=$cb",

                            },
                            {
                             nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolNow?type=CN&block=zxb&num=10&callback=$cb",
                             weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolWeek?type=CN&block=zxb&num=10&callback=$cb",
                             oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolChangeNday?type=CN&block=zxb&num=10&count=1&order=DESC&callback=$cb",
                             fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolChangeNday?type=CN&block=zxb&num=10&count=5&order=DESC&callback=$cb",
                             ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListContinueChange?num=10&block=zxb&type=CN&order=ASC&callback=$cb",
                             descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListContinueChange?num=10&block=zxb&type=CN&order=DESC&callback=$cb",
                            },
                            {
                            nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolNow?type=CN&block=cyb&num=10&callback=$cb",
                            weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolWeek?type=CN&block=cyb&num=10&callback=$cb",
                            oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolChangeNday?type=CN&block=cyb&num=10&count=1&order=DESC&callback=$cb",
                            fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListSymbolChangeNday?type=CN&block=cyb&num=10&count=5&order=DESC&callback=$cb",
                            ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListContinueChange?num=10&block=cyb&type=CN&order=ASC&callback=$cb",
                            descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockBlockService.getListContinueChange?num=10&block=cyb&type=CN&order=DESC&callback=$cb",
                            }

                    ];

                    var config={
                        datas:{
                            now:[],
                            week:[],
                            one:[],
                            five:[],
                            asc:[],
                            desc:[],

                            symbolAll:[],
                        },
                        params:{
                            ab:'NOW',
                            week:'WEEK',
                            bb:'ONE',
                            cb:'FIVE',
                            asc:'ASC',
                            desc:'DESC',
                        },
                        url:{
                            kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                            hqURL:"http://hq.sinajs.cn/?_=$random&list=",
                        },

                    };
                    function _init(){
                        var cdata=config.datas,qurl=config.url.hqURL
                        var urlNOW=jysURL[g].nowURL.replace("$cb","var "+config.params.ab+"="),
                            urlWEEK=jysURL[g].weekURL.replace("$cb","var "+config.params.week+"="),
                            urlONE=jysURL[g].oneURL.replace("$cb","var "+config.params.bb+"="),
                            urlFIVE=jysURL[g].fiveURL.replace("$cb","var "+config.params.cb+"="),
                            urlASC=jysURL[g].ascURL.replace("$cb","var "+config.params.asc+"="),
                            urlDESC=jysURL[g].descURL.replace("$cb","var "+config.params.desc+"=");

                        wn_varLoader(urlNOW,function(){ 
                            //实时数据
                                data_now=window[config.params.ab];
                                //
                            
                                for(var i in data_now.result.data){
                                        var symbol=data_now.result.data[i].SYMBOL,
                                            name=data_now.result.data[i].NAME,
                                            pv=parseInt(i)+1;
                                            var attr=[];
                                        attr.push(symbol);attr.push(name);attr.push(pv);
                                        //console.log(attr);
                                        cdata.now.push(attr);
                                        cdata.symbolAll.push(symbol);
                                        qurl+=symbol+',';
                                };
                            // 周数据
                            wn_varLoader(urlWEEK,function(){  
                                    data_week=window[config.params.week];
                                    for(var j in data_week.result.data){
                                     var symbolweek=data_week.result.data[j].SYMBOL,
                                         nameweek=data_week.result.data[j].NAME,
                                         pvweek=parseInt(j)+1;
                                         var attOne=[];
                                         attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
                                            
                                         cdata.week.push(attOne);
                                         cdata.symbolAll.push(symbolweek);
                                         //console.log(cdata.one);
                                         qurl+=symbolweek+',';
                                    }

                            // 一日数据
                           // console.log(urlONE);
                           // console.log(urlFIVE);
                                wn_varLoader(urlONE,function(){ 
                                    data_one=window[config.params.bb];
                                    for(var j in data_one.result.data){
                                        var symbolOne=data_one.result.data[j].SYMBOL,
                                            nameOne=data_one.result.data[j].NAME,
                                            pvOne=parseInt(j)+1;
                                            changeOne=data_one.result.data[j].CHANEG+"%";
                                            var attOne=[];
                                            attOne.push(symbolOne);attOne.push(nameOne);attOne.push(changeOne);attOne.push(pvOne);
                                            
                                            cdata.one.push(attOne);
                                            //console.log(cdata.one);
                                            cdata.symbolAll.push(symbolOne);
                                            qurl+=symbolOne+',';
                                    }
                            // 5日数据
                                        wn_varLoader(urlFIVE,function(){    
                                        data_five=window[config.params.cb];
                                        //console.log(data_five);
                                        for(var k in data_five.result.data){
                                            var symbolFive=data_five.result.data[k].SYMBOL,
                                                nameFive=data_five.result.data[k].NAME,
                                                pvFive=parseInt(k)+1;
                                                changeFive=data_five.result.data[k].CHANEG+"%";
                                                var attFive=[];
                                                attFive.push(symbolFive);attFive.push(nameFive);attFive.push(changeFive);attFive.push(pvFive);
                                                
                                                cdata.five.push(attFive);
                                                //console.log(cdata.one);
                                                cdata.symbolAll.push(symbolFive);
                                                qurl+=symbolFive+',';
                                        }

                                        // 上升

                                            wn_varLoader(urlASC,function(){ 
                                                data_asc=window[config.params.asc];
                                                //console.log(data_asc);
                                                for(var k in data_asc.result.data){
                                                    var _symbol=data_asc.result.data[k].SYMBOL,
                                                        _name=data_asc.result.data[k].NAME,
                                                        _days=data_asc.result.data[k].DAYS,
                                                        _chg=data_asc.result.data[k].CHG,
                                                        _rank=data_asc.result.data[k].RANK;
                                                        var attAsc=[];
                                                        attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
                                                        cdata.asc.push(attAsc);
                                                        
                                                        
                                        }

                                        // 下降
                                                        wn_varLoader(urlDESC,function(){    
                                                            data_desc=window[config.params.desc];
                                                            //console.log(data_desc);
                                                            for(var k in data_desc.result.data){
                                                                var _symbol=data_desc.result.data[k].SYMBOL,
                                                                    _name=data_desc.result.data[k].NAME,
                                                                    _days=data_desc.result.data[k].DAYS,
                                                                    _chg=data_desc.result.data[k].CHG,
                                                                    _rank=data_desc.result.data[k].RANK;
                                                                    var attDesc=[];
                                                                    attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
                                                                    
                                                                    cdata.desc.push(attDesc);
                                                                    
                                                            }
                                        
                                    //console.log(cdata.symbolAll)
                                    var tmphq,tmphq;
                                            wn_varLoader(qurl.replace("$random",Math.random()),function(){

                                                    for(var m in cdata.symbolAll){
                                                        var _symbol=cdata.symbolAll[m];
                                                        //if(_symbol==''){ return ;}
                                                        tmphq=window['hq_str_'+_symbol];
                                                    //  console.log(tmphq)
                                                        //window['hq_str_'+_symbol]=null;
                                                        //console.log(cdata.five)
                                                        var tmparr=tmphq.split(',');
                                                        var _new=tmparr[3];
                                                        var n=cdata.now.length,w=cdata.week.length,o=cdata.one.length,f=cdata.five.length,a=cdata.asc.length,d=cdata.desc.length;
                                                        var _rose=(((_new-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
                                                        if(m<n){
                                                            if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                            cdata.now[m].push(_new);cdata.now[m].push(_rose);
                                                        }
                                                        else if(m>=n&&m<(n+w)){
                                                            if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                            cdata.week[m-w].push(_new);cdata.week[m-w].push(_rose);
                                                        }
                                                        else if(m>=n&&m<(n+w+o)){
                                                            if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                            cdata.one[m-n-w].push(_new);
                                                        }
                                                        else if(m>=(n+w+o)&&m<(n+w+o+f)){
                                                            if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                            cdata.five[m-(w+n+o)].push(_new);
                                                        }
                                                            //console.log(cdata.one);
                                                    }
                                                    
                                                    _draw();
                                            })
                                            
                                            
                                            })
                                        })
                                    })
                                })
                            })
                                
                            })

                    };

                        function _draw(){
                                var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                                var cdata=config.datas.now;
                                //console.log(cdata);
                                // 实时数据
                                $("#jysNOW h4").text(jysNAME+"实时关注排行");
                                
                                
                                $("#jysNowTable table").text("");
                                $("#jysNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>")
                                 
                                //console.log(cdata.length)
                                for(var i=0;i<cdata.length;i++){
                                    var curl=syURL.replace("$symbol",cdata[i][0]);
                                    $("#jysNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
                                   if(parseFloat(cdata[i][4])<0){$("#jysNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
                                   if(parseFloat(cdata[i][4])>0){$("#jysNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                };

                                //周数据
                                $("#jysWEEK h4").text(jysNAME+"本周关注排行");
                                var cdataWeek=config.datas.week;

                                $("#jysWeekTable table").text("");
                                $("#jysWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>")
                                for(var i=0;i<cdataWeek.length;i++){
                                    var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
                                    $("#jysWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
                                    if(parseFloat(cdataWeek[i][4])>0){$("#jysWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
                                    if(parseFloat(cdataWeek[i][4])<0){$("#jysWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                   // if(parseFloat(cdataWeek[i][4])=0){$("#jysWeekTable table tr").eq(i).find("td").eq(3).css("color","black")   }
                                }
                                //1日加入表格
                                $("#jysONE h4").text(jysNAME+"用户关注1日变化幅度排行");
                                var cdataOne=config.datas.one;
                                $("#jysOneTable table").text("");
                                $("#jysOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                                //console.log(cdataOne)
                                for(var i=0;i<cdataOne.length;i++){
                                    var curlone=syURL.replace("$symbol",cdataOne[i][0]);
                                    $("#jysOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][2]+'</td><td>'+cdataOne[i][3]+'</td></tr>')
                                    if(parseFloat(cdataOne[i][2])>0){$("#jysOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseFloat(cdataOne[i][2])<0){$("#jysOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }
                                //5日加入表格
                                $("#jysFIVE h4").text(jysNAME+"用户关注5日变化幅度排行");
                                var cdataFive=config.datas.five;
                                $("#jysFiveTable table").text("");
                                $("#jysFiveTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                                for(var i=0;i<cdataFive.length;i++){
                                     var curlfive=syURL.replace("$symbol",cdataFive[i][0]);
                                     //http://finance.sina.com.cn/realstock/company/sh600010/nc.shtml
                                    $("#jysFiveTable table").append('<tr><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][0]+'</a></td><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][1]+'</a></td><td>'+cdataFive[i][4]+'</td><td>'+cdataFive[i][2]+'</td><td>'+cdataFive[i][3]+'</td></tr>')
                                    if(parseFloat(cdataFive[i][2])>0){$("#jysFiveTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseFloat(cdataFive[i][2])<0){$("#jysFiveTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }

                                //上升加入表格
                                $("#jysASC h4").text(jysNAME+"用户关注排名连续上升排行");
                                var cdataAsc=config.datas.asc;
                                $("#jysAscTable table").text("");
                                $("#jysAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>")
                                for(var i=0;i<cdataAsc.length;i++){
                                    var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                                    $("#jysAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                                    if(parseInt(cdataAsc[i][3])>0){$("#jysAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseInt(cdataAsc[i][3])<0){$("#jysAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }


                                //下降加入表格
                                $("#jysDESC h4").text(jysNAME+"用户关注排名连续下降排行");
                                var cdataDesc=config.datas.desc;
                                $("#jysDescTable table").text("");
                                $("#jysDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
                                for(var i=0;i<cdataDesc.length;i++){
                                    var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                                    $("#jysDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                                    if(parseInt(cdataDesc[i][3])>0){$("#jysDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseInt(cdataDesc[i][3])<0){$("#jysDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }


                            };
                    this.init=_init;
                }
            }
            jys();
        };navB++;
    })

//第三Tab 市场层次分析
// 市场层次图表及领涨概念
//scccTable显示表格数据

    $("#nav_sccc").click(function(){
        if($(this).attr("class")=="gnzz_navClick gnzz_navHover") {return ;}
        else if(navC!=0){
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
        }
        else{
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
            function sccc(){
                var config={
                    datas:{
                        time:[],
                        gdj:{//高价股、中价股 低价股
                            gPV:[],
                            zPV:[],
                            dPV:[],
                            time:[],
                            _gPV:[],
                            _zPV:[],
                            _dPV:[],

                        },
                        dxp:{//大盘股 中盘股 小盘股
                            dPV:[],
                            zPV:[],
                            xPV:[],
                            time:[],
                            _dPV:[],
                            _zPV:[],
                            _xPV:[],

                        },
                        jyc:{//绩优股 绩差股

                        }
                    },
                    params:{
                        gjg:"gjg",
                        // zjg:"zjg",
                        // djg:"djg",
                        // dpg:"dpg",
                        // zpg:"zpg",
                        // xpg:"xpg",

                    },
                    dom:"sccc",
                    url:{
                        gdjURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPriceService.getPriceLVHQ?type=CN&level=$symbol&callback=$cb",
                        dxpURL:"http://data.finance.sina.com.cn/api/openapi.php/StockCRCLService.getCRCLLVHQ?type=CN&level=$symbol&callback=$cb",
                      

                    }

                };
                function scccChart(){
                    var _myChart=echarts.init(document.getElementById(config.dom));
                    var _option={
                        tooltip:{
                            trigger: 'axis',
                            axisPointer:{
                                type : 'cross',
                                crossStyle : {
                                    color:'black',
                                    width:0.5
                                }
                            },
                            backgroundColor:"rgba(0,0,0,0.7)",
                            borderWidth:2,
                            borderColor:"#0088cc",
                            padding:8,
                            textStyle : {
                                    color: 'white',
                                    
                                },
                            // formatter:function(v){
                            //  return "<p style='border-bottom:1px solid #ccc;padding-right:50px;margin-bottom:10px'>"+v[1]+" 行业"+"</p>"+
                            //          "今日涨跌幅:"+v[2][0]+"%<br>"+
                            //          "均价:"+(v[2][1]+10)+"元";
                            //          //"微博关注度："+config.datas.jys;
                            // }

                        },
                        grid:{
                            x:70,
                            y:50,
                            y2:60,
                            itemGap:80

                        },
                        legend:{
                            data:["大盘股","中盘股","小盘股","高价股","中价股","低价股"],
                            orient:"vertical",
                            x:"right",
                            y:130,

                        },
                        dataZoom : {
                                show : true,
                                start : 95,
                                end : 100,
                                handleColor:'#555',
                            },
                        xAxis:[
                             {
                                type:'category',
                                boundaryGap:false,
                                data:config.datas.time,        
                               axisLine:{show:false},
                               axisLabel:{show:true},
                                axisTick:{show:false},
                                splitLine:{show:true,
                                            lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                                }
                            }
                        ],
                        yAxis:[
                        {
                                type:'value',
                                precision: 2,
                                name:'用户关注(百万)',
                                scale:true,
                                boundaryGap:[0.01,0.05],
                                nameTextStyle:{
                                    color: 'red',
                                },
                                axisLine:{
                                    show:true,
                                    lineStyle:{
                                        color: '#d9e2e7',
                                    }
                                },
                                splitArea : {
                                    show: false,
                                },
                               splitLine:{
                                    show:true,
                                    lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                                }

                            },
                            
                        ],
                        series:[
                            {
                            type:'line',
                            name:"高价股",
                            data:config.datas.gdj.gPV,
                            itemStyle:{
                                emphasis: {
                                    lineStyle:{
                                        color:"black"
                                    }
                                }

                            }
                            },
                            {
                            type:'line',
                            name:"中价股",
                            data:config.datas.gdj.zPV,
                            },
                            {
                            type:'line',
                            name:"低价股",
                            data:config.datas.gdj.dPV,
                            },
                            {
                            type:'line',
                            name:"大盘股",
                            data:config.datas.dxp.dPV,
                            },
                            {
                            type:'line',
                            name:"中盘股",
                            data:config.datas.dxp.zPV,
                            },
                            {
                            type:'line',
                            name:"小盘股",
                            data:config.datas.dxp.xPV,
                            }
                        
                        ]

                    };
                    var cdata=config.datas;
                    function _init(){
                        var gjgURL=config.url.gdjURL.replace('$symbol',"A").replace('$cb',"var "+config.params.gjg+"="),
                            zjgURL=config.url.gdjURL.replace('$symbol',"B").replace('$cb',"var "+config.params.gjg+"="),
                            djgURL=config.url.gdjURL.replace('$symbol',"C").replace('$cb',"var "+config.params.gjg+"="),

                            dpgURL=config.url.dxpURL.replace('$symbol',"A").replace('$cb',"var "+config.params.gjg+"="),
                            zpgURL=config.url.dxpURL.replace('$symbol',"B").replace('$cb',"var "+config.params.gjg+"="),
                            xpgURL=config.url.dxpURL.replace('$symbol',"C").replace('$cb',"var "+config.params.gjg+"=");
                           
                        
                            wn_varLoader(gjgURL,function(){
                                data_gjg=window[config.params.gjg];
                                _loadedData(cdata.gdj._gPV,data_gjg,[]);
                                   
                                    wn_varLoader(zjgURL,function(){
                                    data_zjg=window[config.params.gjg];
                                    _loadedData(cdata.gdj._zPV,data_zjg,[]);
                                       
                                        wn_varLoader(djgURL,function(){
                                        data_djg=window[config.params.gjg];
                                        _loadedData(cdata.gdj._dPV,data_djg,cdata.gdj.time);

                                            wn_varLoader(dpgURL,function(){
                                            data_dpg=window[config.params.gjg];
                                            _loadedData(cdata.dxp._dPV,data_dpg,[]);

                                                wn_varLoader(zpgURL,function(){
                                                data_zpg=window[config.params.gjg];
                                                _loadedData(cdata.dxp._zPV,data_zpg,[]);

                                                    wn_varLoader(xpgURL,function(){
                                                    data_xpg=window[config.params.gjg];
                                                    _loadedData(cdata.dxp._xPV,data_xpg,cdata.dxp.time);
                                                    //console.log(cdata.gdj.time)
                                                        var lasti=0,lastj=0;
                                                         for(var j=lastj;j<cdata.gdj.time.length;j++){
                                                                       // console.log(cdatas._times.length);
                                                                for(var i=lasti;i<cdata.dxp.time.length;i++){
                                                                                
                                                                        if(cdata.gdj.time[j]==cdata.dxp.time[i]){
                                                                                  //console.log(cdatas.k_time[i]);
                                                                                    cdata.gdj.gPV.push(cdata.gdj._gPV[j]);
                                                                                    cdata.gdj.zPV.push(cdata.gdj._zPV[j]);
                                                                                    cdata.gdj.dPV.push(cdata.gdj._dPV[j]);

                                                                                    cdata.dxp.dPV.push(cdata.dxp._dPV[i]);
                                                                                    cdata.dxp.zPV.push(cdata.dxp._zPV[i]);
                                                                                    cdata.dxp.xPV.push(cdata.dxp._xPV[i]);
                                                                                    cdata.time.push(cdata.dxp.time[i]);
                                                                                    lastj=j;lasti=i;
                                                                                    break;
                                                                         } 
                                                                }
                                                            };
                                                          //  console.log(_option)
                                                   _myChart.setOption(_option,true);
                                                });   
                                            });   
                                        });   
                                    });   
                                });         
                            });         
                    };
                    function _loadedData(cdiv,data,ctime){
                        //console.log(data_jysSymbol.result.data);
                       // var ctime=[];
                        for(var i in data.result.data){
                        var _PV=data.result.data[i].PV;
                        var _time=data.result.data[i].DT;
                        cdiv.push((_PV/1000000).toFixed(2));
                        //pgtime+=_time+",";
                        ctime.push(_time);
                        //console.log(config.datas.jys._shaPV)
                        };
                        cdiv.reverse();ctime.reverse();
                    };

                    this.init=_init;


                    // 表格显示
                    function scccTables(scccNAME,g,sccc_symbol){
                        var scccURL=[
                                {
                                nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPriceService.getListSymbolNow?type=CN&level=$symbol&num=10&callback=$cb",
                                weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPriceService.getListSymbolWeek?type=CN&level=$symbol&num=10&callback=$cb",
                                oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPriceService.getListSymbolChangeNday?num=10&count=1&order=DESC&type=CN&level=$symbol&callback=$cb",
                                fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPriceService.getListSymbolChangeNday?num=10&count=5&order=DESC&type=CN&level=$symbol&callback=$cb",
                                ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPriceService.getListContinueChange?num=10&order=ASC&type=CN&level=$symbol&callback=$cb",
                                descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPriceService.getListContinueChange?num=10&order=DESC&type=CN&level=$symbol&callback=$cb",
                                },
                                {
                                nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockCRCLService.getListSymbolNow?type=CN&level=$symbol&num=10&callback=$cb",
                                weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockCRCLService.getListSymbolWeek?type=CN&level=$symbol&num=10&callback=$cb",
                                oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockCRCLService.getListSymbolChangeNday?num=10&count=1&order=DESC&type=CN&level=$symbol&callback=$cb",
                                fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockCRCLService.getListSymbolChangeNday?num=10&count=5&order=DESC&type=CN&level=$symbol&callback=$cb",
                                ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockCRCLService.getListContinueChange?num=10&order=ASC&type=CN&level=$symbol&callback=$cb",
                                descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockCRCLService.getListContinueChange?num=10&order=DESC&type=CN&level=$symbol&callback=$cb",
                                },
                        ];

                        var config={
                            datas:{
                                now:[],
                                week:[],
                                one:[],
                                five:[],
                                asc:[],
                                desc:[],

                                symbolAll:[],
                            },
                            params:{
                                cb:"TO"
                                // ab:'NOW',
                                // week:'WEEK',
                                // bb:'ONE',
                                // cb:'FIVE',
                                // asc:'ASC',
                                // desc:'DESC',
                            },
                            url:{
                                kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                                hqURL:"http://hq.sinajs.cn/?_=$random&list=",
                            },

                        };
                        function _init(){
                            var cdata=config.datas,qurl=config.url.hqURL
                            var urlNOW=scccURL[g].nowURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"="),
                                urlWEEK=scccURL[g].weekURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"="),
                                urlONE=scccURL[g].oneURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"="),
                                urlFIVE=scccURL[g].fiveURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"="),
                                urlASC=scccURL[g].ascURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"="),
                                urlDESC=scccURL[g].descURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"=");

                            wn_varLoader(urlNOW,function(){ 
                                //实时数据
                                    data_now=window[config.params.cb];
                                    //
                                
                                    for(var i in data_now.result.data){
                                            var symbol=data_now.result.data[i].SYMBOL,
                                                name=data_now.result.data[i].NAME,
                                                pv=parseInt(i)+1;
                                                var attr=[];
                                            attr.push(symbol);attr.push(name);attr.push(pv);
                                            //console.log(attr);
                                            cdata.now.push(attr);
                                            cdata.symbolAll.push(symbol);
                                            qurl+=symbol+',';
                                    };
                                // 周数据
                                wn_varLoader(urlWEEK,function(){  
                                        data_week=window[config.params.cb];
                                        for(var j in data_week.result.data){
                                         var symbolweek=data_week.result.data[j].SYMBOL,
                                             nameweek=data_week.result.data[j].NAME,
                                             pvweek=parseInt(j)+1;
                                             var attOne=[];
                                             attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
                                                
                                             cdata.week.push(attOne);
                                             cdata.symbolAll.push(symbolweek);
                                             //console.log(cdata.one);
                                             qurl+=symbolweek+',';
                                        }

                                // 一日数据
                               // console.log(urlONE);
                               // console.log(urlFIVE);
                                    wn_varLoader(urlONE,function(){ 
                                        data_one=window[config.params.cb];
                                        for(var j in data_one.result.data){
                                            var symbolOne=data_one.result.data[j].SYMBOL,
                                                nameOne=data_one.result.data[j].NAME,
                                                pvOne=parseInt(j)+1;
                                                changeOne=data_one.result.data[j].CHANEG+"%";
                                                var attOne=[];
                                                attOne.push(symbolOne);attOne.push(nameOne);attOne.push(changeOne);attOne.push(pvOne);
                                                
                                                cdata.one.push(attOne);
                                                //console.log(cdata.one);
                                                cdata.symbolAll.push(symbolOne);
                                                qurl+=symbolOne+',';
                                        }
                                // 5日数据
                                            wn_varLoader(urlFIVE,function(){    
                                            data_five=window[config.params.cb];
                                            //console.log(data_five);
                                            for(var k in data_five.result.data){
                                                var symbolFive=data_five.result.data[k].SYMBOL,
                                                    nameFive=data_five.result.data[k].NAME,
                                                    pvFive=parseInt(k)+1;
                                                    changeFive=data_five.result.data[k].CHANEG+"%";
                                                    var attFive=[];
                                                    attFive.push(symbolFive);attFive.push(nameFive);attFive.push(changeFive);attFive.push(pvFive);
                                                    
                                                    cdata.five.push(attFive);
                                                    //console.log(cdata.one);
                                                    cdata.symbolAll.push(symbolFive);
                                                    qurl+=symbolFive+',';
                                            }

                                            // 上升

                                                wn_varLoader(urlASC,function(){ 
                                                    data_asc=window[config.params.cb];
                                                    //console.log(data_asc);
                                                    for(var k in data_asc.result.data){
                                                        var _symbol=data_asc.result.data[k].SYMBOL,
                                                            _name=data_asc.result.data[k].NAME,
                                                            _days=data_asc.result.data[k].DAYS,
                                                            _chg=data_asc.result.data[k].CHG,
                                                            _rank=data_asc.result.data[k].RANK;
                                                            var attAsc=[];
                                                            attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
                                                            cdata.asc.push(attAsc);
                                                            
                                                            
                                            }

                                            // 下降
                                                            wn_varLoader(urlDESC,function(){    
                                                                data_desc=window[config.params.cb];
                                                                //console.log(data_desc);
                                                                for(var k in data_desc.result.data){
                                                                    var _symbol=data_desc.result.data[k].SYMBOL,
                                                                        _name=data_desc.result.data[k].NAME,
                                                                        _days=data_desc.result.data[k].DAYS,
                                                                        _chg=data_desc.result.data[k].CHG,
                                                                        _rank=data_desc.result.data[k].RANK;
                                                                        var attDesc=[];
                                                                        attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
                                                                        
                                                                        cdata.desc.push(attDesc);
                                                                        
                                                                }
                                            
                                        //console.log(cdata.symbolAll)
                                        var tmphq,tmphq;
                                                wn_varLoader(qurl.replace("$random",Math.random()),function(){

                                                        for(var m in cdata.symbolAll){
                                                            var _symbol=cdata.symbolAll[m];
                                                            //if(_symbol==''){ return ;}
                                                            tmphq=window['hq_str_'+_symbol];
                                                        //  console.log(tmphq)
                                                            //window['hq_str_'+_symbol]=null;
                                                            //console.log(cdata.five)
                                                            var tmparr=tmphq.split(',');
                                                            var _new=tmparr[3];
                                                            var n=cdata.now.length,w=cdata.week.length,o=cdata.one.length,f=cdata.five.length,a=cdata.asc.length,d=cdata.desc.length;
                                                            var _rose=(((_new-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
                                                            if(m<n){
                                                                if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                                cdata.now[m].push(_new);cdata.now[m].push(_rose);
                                                            }
                                                            else if(m>=n&&m<(n+w)){
                                                                if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                                cdata.week[m-w].push(_new);cdata.week[m-w].push(_rose);
                                                            }
                                                            else if(m>=n&&m<(n+w+o)){
                                                                if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                                cdata.one[m-n-w].push(_new);
                                                            }
                                                            else if(m>=(n+w+o)&&m<(n+w+o+f)){
                                                                if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                                cdata.five[m-(w+n+o)].push(_new);
                                                            }
                                                                //console.log(cdata.one);
                                                        }
                                                        
                                                        _draw();
                                                })
                                                
                                                
                                                })
                                            })
                                        })
                                    })
                                })
                                    
                                })

                        };

                        function _draw(){
                                var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                                var cdata=config.datas.now;
                                //console.log(cdata);
                                // 实时数据
                                $("#scccNOW h4").text(scccNAME+"流量实时关注排行");
                                
                                
                                $("#scccNowTable table").text("");
                                $("#scccNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>流量排行</td>")
                                 
                                 //console.log(cdata.length)
                                for(var i=0;i<cdata.length;i++){
                                    var curl=syURL.replace("$symbol",cdata[i][0]);
                                    $("#scccNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
                                   if(parseFloat(cdata[i][4])<0){$("#scccNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
                                   if(parseFloat(cdata[i][4])>0){$("#scccNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                };

                                //周数据
                                $("#scccWEEK h4").text(scccNAME+"流量本周关注排行");
                                var cdataWeek=config.datas.week;

                                $("#scccWeekTable table").text("");
                                $("#scccWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>流量排行</td>")
                                for(var i=0;i<cdataWeek.length;i++){
                                    var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
                                    $("#scccWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
                                    if(parseFloat(cdataWeek[i][4])>0){$("#scccWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
                                    if(parseFloat(cdataWeek[i][4])<0){$("#scccWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                   // if(parseFloat(cdataWeek[i][4])=0){$("#scccWeekTable table tr").eq(i).find("td").eq(3).css("color","black")   }
                                }
                                //1日加入表格
                                $("#scccONE h4").text(scccNAME+"用户关注1日变化幅度排行");
                                var cdataOne=config.datas.one;
                                $("#scccOneTable table").text("");
                                $("#scccOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                                //console.log(cdataOne)
                                for(var i=0;i<cdataOne.length;i++){
                                    var curlone=syURL.replace("$symbol",cdataOne[i][0]);
                                    $("#scccOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][2]+'</td><td>'+cdataOne[i][3]+'</td></tr>')
                                    if(parseFloat(cdataOne[i][2])>0){$("#scccOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseFloat(cdataOne[i][2])<0){$("#scccOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }
                                //5日加入表格
                                $("#scccFIVE h4").text(scccNAME+"用户关注5日变化幅度排行");
                                var cdataFive=config.datas.five;
                                $("#scccFiveTable table").text("");
                                $("#scccFiveTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                               for(var i=0;i<cdataFive.length;i++){
                                     var curlfive=syURL.replace("$symbol",cdataFive[i][0]);http://finance.sina.com.cn/realstock/company/sh600010/nc.shtml
                                    $("#scccFiveTable table").append('<tr><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][0]+'</a></td><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][1]+'</a></td><td>'+cdataFive[i][4]+'</td><td>'+cdataFive[i][2]+'</td><td>'+cdataFive[i][3]+'</td></tr>')
                                    if(parseFloat(cdataFive[i][2])>0){$("#scccFiveTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseFloat(cdataFive[i][2])<0){$("#scccFiveTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }

                                //上升加入表格
                                $("#scccASC h4").text(scccNAME+"用户关注排名连续上升排行");
                                var cdataAsc=config.datas.asc;
                                $("#scccAscTable table").text("");
                                $("#scccAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>流量排名</td>")
                                for(var i=0;i<cdataAsc.length;i++){
                                    var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                                    $("#scccAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                                    if(parseInt(cdataAsc[i][3])>0){$("#scccAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseInt(cdataAsc[i][3])<0){$("#scccAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }


                                //下降加入表格
                                $("#scccDESC h4").text(scccNAME+"用户关注排名连续下降排行");
                                var cdataDesc=config.datas.desc;
                                $("#scccDescTable table").text("");
                                $("#scccDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>流量排名</td>")
                                for(var i=0;i<cdataDesc.length;i++){
                                    var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                                    $("#scccDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                                    if(parseInt(cdataDesc[i][3])>0){$("#scccDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseInt(cdataDesc[i][3])<0){$("#scccDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }
                        };
                        this.inits=_init;
                    };
                    //表格END
                    var scccTable=new scccTables("大盘股",1,"A");
                        scccTable.inits();
                    
                    //市场层次点击事件
                    

                    var pan=["大盘股","中盘股","小盘股","高价股","中价股","低价股"];
                    var ssym=["A","B","C","A","B","C"];
                    var g=["1","1","1","0","0","0"]

                    $("#sccc_sub li").removeClass("jys_pro_checked").addClass("jys_pro_nochecked").eq(0).addClass("jys_pro_checked");
                    $("#sccc_sub li").click(function(){
                    $(this).addClass('jys_pro_checked').siblings().removeClass("jys_pro_checked");
                    var n =$(this).index();

                    var scccTableZPG=new scccTables(pan[n],g[n],ssym[n]);
                        scccTableZPG.inits();
                });
                    
                    
                    /*var ecConfig =echarts.config.EVENT;
                        function clickes(par){
                            var i=par.seriesIndex;
                            var pan=["高价股","中价股","低价股","大盘股","中盘股","小盘股"];
                            var ssym=["A","B","C","A","B","C"];
                            switch(i){
                                case 0:
                                    var scccTableZPG=new scccTables(pan[i],0,ssym[i]);
                                    scccTableZPG.inits();
                                break;
                                case 1:
                                    var scccTableZPG1=new scccTables(pan[i],0,ssym[i]);
                                    scccTableZPG1.inits();
                                break;
                                case 2:
                                    var scccTableZPG2=new scccTables(pan[i],0,ssym[i]);
                                    scccTableZPG2.inits();
                                break;
                                case 3:
                                    var scccTableZPG3=new scccTables(pan[i],1,ssym[i]);
                                    scccTableZPG3.inits();
                                break;
                                case 4:
                                    var scccTableZPG4=new scccTables(pan[i],1,ssym[i]);
                                    scccTableZPG4.inits();
                                break;
                                case 5:
                                    var scccTableZPG5=new scccTables(pan[i],1,ssym[i]);
                                    scccTableZPG5.inits();
                                break;


                            }

                        };
                        _myChart.on(ecConfig.CLICK, clickes);

                       var ecConfig =echarts.config.EVENT;
                        function clickLegend(param){
                                var selected = param.selected;
                                
                                 if (selected['大盘股']){
                                             var scccTableDD=new scccTables("大盘股",1,"A");
                                             scccTableDD.inits();
                                        
                                    
                                };
                                if (selected['中盘股']){
                                             var scccTableDD1=new scccTables("中盘股",1,"B");
                                             scccTableDD1.inits();
                                };
                                if (selected['小盘股']){
                                             var scccTableDD1=new scccTables("小盘股",1,"C");
                                             scccTableDD1.inits();
                                };
                                if (selected['高价股']){
                                             var scccTableDD1=new scccTables("高价股",0,"A");
                                             scccTableDD1.inits();
                                };
                                if (selected['中价股']){
                                             var scccTableDD1=new scccTables("中价股",0,"B");
                                             scccTableDD1.inits();
                                };
                                if (selected['低价股']){
                                             var scccTableDD1=new scccTables("低价股",0,"C");
                                             scccTableDD1.inits();
                                };
                                
                              
                                
                              
                            }
                        _myChart.on(ecConfig.LEGEND_SELECTED, clickLegend);
                        */


                    
                }




                var scc=new scccChart();
                    scc.init();
            }
            sccc();
        };navC++;

    })


//第四ab 市场行业分析
// 行业图表及领涨概念
//schyTable显示表格数据


    $("#nav_schy").click(function(){
        if($(this).attr("class")=="gnzz_navClick gnzz_navHover") {return ;}
        else if(navD!=0){
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
        }
        else{
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
            function schy(){
            	var config={
            		datas:{
            			schy:{
            				schy:[],
            				schy_end:[],
            				schy_symbol:[],

            			}
            		},
            		params:{
            			schy_cb:"schy",
            			schySymbol_cb:"schySYMBOL",
            		},
            		dom:{
            			schy:"schy",

            		},
            		url:{
            			schyURL:"http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/MoneyFlow.ssl_bkzj_bk?page=1&num=100&sort=netamount&asc=0&fenlei=0&callback=$cb",
            			schySymbolURL:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getListHY?type=CN&callback=$cb",
            		}
            	};
            	function schyChart(){
            		var _myChart=echarts.init(document.getElementById(config.dom.schy));
            		var _option={
            			tooltip:{
            				trigger: "item",
            				backgroundColor:"rgba(0,0,0,0.7)",
            				borderWidth:2,
            				borderColor:"#0088cc",
            				padding:8,
            				textStyle : {
            			            color: 'white',
            			            
            			        },
            				formatter:function(v){
            					return "<p style='border-bottom:1px solid #ccc;padding-right:50px;margin-bottom:10px'>"+v[1]+" 行业"+"</p>"+
            							"今日涨跌幅:"+v[2][0]+"%<br>"+
            							"均价:"+((v[2][1])+10)+"元";
            							//"微博关注度："+config.datas.schy;
            				}

            			},
            			grid:{
            				x:90,
            				y:20,
            				y2:30,

            			},
            			xAxis:[
            			{
            				type:"value",
            				power: 1,
            				precision: 2,
            				name:'行业涨跌幅',
                            nameTextStyle:{
                                color: 'red',
                            },
            				splitNumber:3,
            				scale:true,
                            boundaryGap:[0.05, 0.05],
            				axisLine:{
                                show:true,
                                lineStyle:{
                                color:'rgba(215,215,215,0.5)',
                                type:'dotted',
                            }
                            },
                            axisLabel : {
                                show:true,
                                formatter:function(value){return (value)+'%'}
                            },
                            axisTick : {show:false,
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                            }
            			}],
            			yAxis:[
            			{
            				type:"value",
            				name:'行业均价',
                            nameTextStyle:{
                                 color: 'red',
                            },
            				scale:true,
            				boundaryGap: [0.05, 0.05],
            				splitNumber:4,
            				axisLine:{
                                show:true,
                                lineStyle:{
                                    color: 'rgba(215,215,215,0.5)',
                                    type:'dotted',
                                }
                            },
                            splitArea : {
                                show: false,
                            },
                           splitLine:{
                                show:true,
                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                            },
            				axisLabel:{
            					formatter:function(value){return (parseInt(value)+10)+'元'}
            					       },
            			}],
            			series:[{
            				type:'scatter',
            				data:config.datas.schy.schy_end
                            
            			}]

            		};

            		function _init(){

            			var curl=config.url.schyURL.replace('$cb',"var "+config.params.schy_cb+"="),
            				curl_symbol=config.url.schySymbolURL.replace('$cb',"var "+config.params.schySymbol_cb+"=");
            				wn_varLoader(curl_symbol,function(){
            					data_schySymbol=window[config.params.schySymbol_cb];
            					_loadedDataSymbol(data_schySymbol);
            						wn_varLoader(curl,function(){			
            						data=window[config.params.schy_cb];
            						_loadedData(data);			
            					})
            				});			
            		};
            		function _loadedDataSymbol(){
            			var cdata=config.datas.schy;
            			//console.log(data_schySymbol.result.data);
            			for(var i in data_schySymbol.result.data){
            			var _symbol=data_schySymbol.result.data[i].PV;
            			var _code=data_schySymbol.result.data[i].CODE;
            			var tt=[];
                        if(_code!="new_stock"){
                            tt.push(_code);tt.push(_symbol);
                             cdata.schy_symbol.push(tt)

                        }
            			
            			//console.log(config.datas.schy.schy_symbol)
            			};
            			
            		}

            		function _loadedData(){
            			var color=['rgba(245,69,69,0.9)','rgba(255,128,128,0.8)','rgba(124,210,154,0.9)','rgba(35,166,76,1)',];
            			var cdata=config.datas.schy;
            			//console.log(data.result);
            				for(var i in data.result.data){
            					 var cname = data.result.data[i].name;
            					 var avg_changeratio =(data.result.data[i].avg_changeratio*100).toFixed(2);
            					 var avg_price = parseFloat(data.result.data[i].avg_price).toFixed(2);
            					 var cate=data.result.data[i].category;
            					 var arr=[];
            					 arr.push(avg_changeratio);
            					 arr.push(avg_price);
            					 arr.push(cname);
            					 arr.push(cate);
            					cdata.schy.push(arr);
            				};

            				//console.log(cdata.schy);
            				//console.log(cdata.schy_symbol);
                             for(var j=cdata.schy_symbol.length-1;j>=0;j--){
            				    for(var i=0;i<cdata.schy.length;i++){
            					    	//console.log(cdata.schy_symbol[j][0]);
            					    	if(cdata.schy_symbol[j][0]==cdata.schy[i][3]){

            					      		 cdata.schy_end[cdata.schy_symbol.length-j-1]={
            					       			 name:cdata.schy[i][2], 
            					                 value:[cdata.schy[i][0],(cdata.schy[i][1]-10)],
            					                 cate:[cdata.schy[i][3]],
            					                 symbolSize:Math.sqrt(cdata.schy_symbol[j][1])/50,
            					                 itemStyle:{
            					                       		normal:{

                                                                label:function(){
                                                                    if(j<10){return {show:true,position:'inside',formatter:cdata.schy[i][2],textStyle:{color:'#333',fontSize:'10',fontWeight:'bold',fontFamily:'Microsoft YaHei'}}}
                                                                    else {
                                                                        return {show:false}
                                                                    }                                                                   

                                                                }(),                            
            			                            			color:function(){
            			                               				 if(cdata.schy[i][0]>=0.2) {return color[0]}
            			                                      	     else if(cdata.schy[i][0]>0&&cdata.schy[i][0]<0.2) { return color[1]}
            			                                    	     else if(cdata.schy[i][0]>-0.8&&cdata.schy[i][0]<=0) {return color[2]}
            			                                            else if(cdata.schy[i][0]<=-0.8) {return color[3]}
            			                                            }()
            			                                    }
                                                 }
            			               		 };
            			                break;
            			            }} 
            	                   };
            	                 //console.log(_option);
            	             _draw();
            		
            		//初始领涨行业走势

            			(function(){
            			
            				var max=cdata.schy_end[0].value[0];
            				//console.log(max);
            				var k,max_cate,max_name;
            				for(var i=0;i<cdata.schy_end.length;i++){
            					//console.log(cdata.schy_end[i].value[0])
            					if(max<=cdata.schy_end[i].value[0]){
            						k=i;
            						max=cdata.schy_end[i].value[0];
            						max_cate=cdata.schy_end[i].cate;
            						max_name=cdata.schy_end[i].name}
            				};
            				window.schyNAME=max_name;
            				window.schyCATE=max_cate;
            				//console.log(max_name);
            				var slchart_pri=new schy_sub();
            				 	slchart_pri.schy_subChart.init();
            				var schytable=new schyTable();
            				 	schytable.init();
            				})();
            		};
            		function _draw(){

            				_myChart.setOption(_option,true);
            				
            			};
            		var ecConfig =echarts.config.EVENT;
            			function clickes(par){
            				 if (typeof par.seriesIndex != 'undefined') {
            				 	window.schyCATE=par.data.cate;
            				 	window.schyNAME=par.data.name;
            				 	//console.log(window.schyCATE);
            				 	var slchart=new schy_sub();
            				 	slchart.schy_subChart.init();

            				 	var schytable=new schyTable();
            				 	schytable.init();

            				 }

            			};
            			_myChart.on(ecConfig.CLICK, clickes);

            		this.init=_init;
            	};
            	var schychart=new schyChart();
            		schychart.init();
            };
            schy();
            //领涨行业
            //逐个行业板块画图 包括时间，PV，均价数据
            function schy_sub(){
            	var config={
            		datas:	{
            			dates:[],//日期
            			avg_changeratios:[],//涨跌幅
            			avg_prices:[],//收盘价
            			names:[],
            			PV:[],
            			PV_time:[],
            			schy:{
            				time:[],
            				price:[],
            				PV:[]
            			}			
            			},

            		params:{
            			cb:'BO',
            			cbpv:'TO',
            			bk:window.schyCATE,
            		},
            		dom:{
            			main:"schy_sub",
            		},
            		url:{
            			urlPrice: "http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/MoneyFlow.ssl_bkzj_zjlrqs?page=1&num=500&sort=opendate&asc=0&bankuai=$bk&callback=$cb",
            			urlPV:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getHYHQ?hy=$bk&type=CN&callback=$cb",
            			
            		},
            		
            	};
            	//console.log(window.category);
            		function schy_subChart(){
            			var _myChart=echarts.init(document.getElementById(config.dom.main));
                        var ncURL="http://vip.stock.finance.sina.com.cn/moneyflow/#!bk!0/$bk";
                        //console.log(window.schyCATE)
            			var _option={
            					        tooltip : {
                                            trigger: 'axis',
                                            axisPointer:{
                                                type : 'cross',
                                                crossStyle : {
                                                    color:'black',
                                                    width:0.5
                                                }
                                            }
                                        },
            					            grid:{
            									x:90,
                                                y:30,
            								},
            					            dataZoom : {
            								        show : true,
            								        realtime : true,
            								        start : 90,
            								        end : 100,
                                                    handleColor:'#555'
            								    },
            								 legend:{
            								 	data:["均价","用户关注"],
                                                x:700,
                                                y:5,
            								 },

            					            xAxis : [
            						        {  
            						            type : 'category',
            						            scale:true,

            						            data:config.datas.schy.time,     	 
            						             axisLine:{
            						                show:true,
            						                lineStyle:{color:'#ccc', width: 1}                

            						            },
            						            axisLabel : {
            						                show:true,

            						            }
            						        }
            					    		],
            							    yAxis : [
            							        {
            							            type : 'value',
            							            power: 1,
                                                    boundaryGap:[0.05,0.05],
            							            precision: 2,
            							            name:'均价(元)',
            							            scale:true,
            							            axisLine:{
            							                show:true,
            							                lineStyle:{color:'#ccc', width: 1}             

            							            },
                                                    axisTick : {show:false,
                                                },

            							            splitArea : {
            							                show: true,
            							                areaStyle:{
            							                    color:['#F7F7F7','#F0F0F0']
            							                }
            							            },

            							        },
            							        {
            							        	type : 'value',
            							            name:'用户关注（万）',
                                                    boundaryGap:[0.05,0.05],
            							            scale:true,
            							            axisLine:{
            							                show:true,
            							               lineStyle:{color:'#ccc', width: 1}            

            							            },

            							            splitArea : {
            							                show: true,
            							                areaStyle:{
            							                    color:['#F7F7F7','#F0F0F0']
            							                }
            							            },


            							        }

            							      ],
            						      series : [
            						        	{name:'均价',
            						            type:'line',
            									itemStyle: {normal: {color:"rgb(61,163,238)",}},
            						            data:config.datas.schy.price,         
            						           },
            						           {name:'用户关注',
            						            type:'line',
            						            yAxisIndex:1,
            									//itemStyle: {normal: {color:"rgb(61,163,238)",}},
            						            data:config.datas.schy.PV,         
            						           },
            						           
            						        ],
            						};
            			function _init(){

            				var curl=config.url.urlPrice.replace('$bk',config.params.bk).replace('$cb',"var "+config.params.cb+"="),
            					curlPV=config.url.urlPV.replace('$bk',config.params.bk).replace('$cb',"var "+config.params.cbpv+"=");
            				wn_varLoader(curl,function(){				
            					data_schySUB=window[config.params.cb];
            					_loadedPriceData(data_schySUB);

            					wn_varLoader(curlPV,function(){
            						data_schyPV=window[config.params.cbpv];
            						_loadedPVData(data_schyPV);
            					})

            				});
            			};

            			function _updata(){
            				_init();
            			}

            			function _loadedPriceData(){
            				var cdata=config.datas;
            				//console.log(data.result.data);
            				for(var i in data_schySUB.result.data){

            					 var xdate = data_schySUB.result.data[i].opendate;
            					 var avg_price= data_schySUB.result.data[i].avg_price;
            					 cdata.dates.push(xdate);
            					cdata.avg_prices.push(avg_price);

            				}
            				cdata.dates.reverse();
            				cdata.avg_prices.reverse();
            				
            				
            			};
            			function _loadedPVData(){
            				var cdata=config.datas;
            				//console.log(data_schyPV.result.data);
            				for(var i in data_schyPV.result.data){

            					 var xdate = data_schyPV.result.data[i].DT;
            					 var xpv= data_schyPV.result.data[i].PV;

            					 cdata.PV.push(((xpv)/10000).toFixed(2));
            					  cdata.PV_time.push(xdate);
            				}
            				cdata.PV.reverse();
            				cdata.PV_time.reverse();
            				// 删除PV假期及周末数据
            				
                                         // console.log(cdatas.k_time);
                                         // console.log(cdatas._times);
                             var lasti=0,lastj=0;
                             for(var j=lastj;j<cdata.dates.length;j++){
                                           // console.log(cdatas._times.length);
                                    for(var i=lasti;i<cdata.PV_time.length;i++){
                                                    
                                            if(cdata.dates[j]==cdata.PV_time[i]){
                                                      //console.log(cdatas.k_time[i]);
                                                        cdata.schy.time.push(cdata.PV_time[i]);
                                                        cdata.schy.price.push(cdata.avg_prices[j]);
                                                        cdata.schy.PV.push(cdata.PV[i]);
                                                        
                                                        lastj=j;lasti=i;
                                                        break;
                                             } 
                                    }
                             	};

            				_draw();
            			};

            			function _draw(){
            				 $("#schyTEXT").html("<a target='_blank' href='"+ncURL.replace("$bk",window.schyCATE)+"'>"+window.schyNAME+"</a>"+" 逐日均价变化趋势");
            				_myChart.setOption(_option,true);
            			}

            			 this.init=_init;
            			// this.updata=_updata;
            		};
            	this.schy_subChart=new schy_subChart();
            }

            //表格 
            //实时,本周,1日，5日，持续上升
            function schyTable(){

            	var config={
            		datas:{
            			now:[],
            			week:[],
            			one:[],
            			five:[],
            			asc:[],
            			desc:[],

            			symbolAll:[],
            		},
            		params:{
            			hy:window.schyCATE,
            			ab:'hyNOW',
            			week:'hyWEEK',
            			bb:'hyONE',
            			cb:'hyFIVE',
            			asc:'hyASC',
            			desc:'hyDESC',
            		},
            		url:{

            			nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getListSymbolNow?num=10&hy=$hy&type=CN&callback=$cb",
            			weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getListSymbolWeek?num=10&hy=$hy&type=CN&callback=$cb",
            			oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getListSymbolChangeNday?num=10&hy=$hy&count=1&order=DESC&type=CN&callback=$cb",
            			fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getListSymbolChangeNday?num=10&hy=$hy&count=5&order=DESC&type=CN&callback=$cb",
            			ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getListContinueChange?num=10&hy=$hy&type=CN&order=ASC&callback=$cb",
            			descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockHYService.getListContinueChange?num=10&hy=$hy&type=CN&order=DESC&callback=$cb",
            			
            			kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                        hqURL:"http://hq.sinajs.cn/?_=$random&list=",
            		},

            	};
            	function _init(){
            		var cdata=config.datas,qurl=config.url.hqURL
            		var urlNOW=config.url.nowURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.ab+"="),
            			urlWEEK=config.url.weekURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.week+"="),
            			urlONE=config.url.oneURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.bb+"="),
            			urlFIVE=config.url.fiveURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.cb+"="),
            			urlASC=config.url.ascURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.asc+"="),
            			urlDESC=config.url.descURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.desc+"=");

            		wn_varLoader(urlNOW,function(){	
            			//实时数据
            				data_now=window[config.params.ab];
            				//
            			
            				for(var i in data_now.result.data){
            						var symbol=data_now.result.data[i].SYMBOL,
            							name=data_now.result.data[i].NAME,
            							pv=parseInt(i)+1;
            							var attr=[];
            						attr.push(symbol);attr.push(name);attr.push(pv);
            						//console.log(attr);
            						cdata.now.push(attr);
            						cdata.symbolAll.push(symbol);
            						qurl+=symbol+',';
            				};
            			// 周数据
            			wn_varLoader(urlWEEK,function(){	
            					data_week=window[config.params.week];
            					for(var j in data_week.result.data){
            						var symbolweek=data_week.result.data[j].SYMBOL,
            							nameweek=data_week.result.data[j].NAME,
            							pvweek=parseInt(j)+1;
            							var attOne=[];
            							attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
            							
            							cdata.week.push(attOne);
                                        cdata.symbolAll.push(symbolweek);
            							//console.log(cdata.one);
            							qurl+=symbolweek+',';
            					}

            			// 一日数据
            				wn_varLoader(urlONE,function(){	
            					data_one=window[config.params.bb];
            					///console.log(data_one);
            					for(var j in data_one.result.data){
            						var symbolOne=data_one.result.data[j].SYMBOL,
            							nameOne=data_one.result.data[j].NAME,
            							pvOne=parseInt(j)+1;
                                        chanegOne=data_one.result.data[j].CHANEG+"%";
            							var attOne=[];
            							attOne.push(symbolOne);attOne.push(nameOne);attOne.push(pvOne);attOne.push(chanegOne);
            							
            							cdata.one.push(attOne);
            							//console.log(cdata.one);
            							cdata.symbolAll.push(symbolOne);
            							qurl+=symbolOne+',';
            					}
            			// 5日数据

            						wn_varLoader(urlFIVE,function(){	
            						data_five=window[config.params.cb];
            						//console.log(data_five);
            						for(var k in data_five.result.data){
            							var symbolFive=data_five.result.data[k].SYMBOL,
            								nameFive=data_five.result.data[k].NAME,
            								pvFive=parseInt(k)+1;
                                            chanegFive=data_five.result.data[k].CHANEG+"%";
            								var attFive=[];
            								attFive.push(symbolFive);attFive.push(nameFive);attFive.push(pvFive);attFive.push(chanegFive);
            								
            								cdata.five.push(attFive);
            								//console.log(cdata.one);
            								cdata.symbolAll.push(symbolFive);
            								qurl+=symbolFive+',';
            						}

            						// 上升

            							wn_varLoader(urlASC,function(){	
            								data_asc=window[config.params.asc];
            								//console.log(data_asc);
            								for(var k in data_asc.result.data){
            									var _symbol=data_asc.result.data[k].SYMBOL,
            										_name=data_asc.result.data[k].NAME,
            										_days=data_asc.result.data[k].DAYS,
            										_chg=data_asc.result.data[k].CHG,
            										_rank=data_asc.result.data[k].RANK;
            										var attAsc=[];
            										attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
            										cdata.asc.push(attAsc);
            										
            										
            						}

            						// 下降
            										wn_varLoader(urlDESC,function(){	
            											data_desc=window[config.params.desc];
            											//console.log(data_desc);
            											for(var k in data_desc.result.data){
            												var _symbol=data_desc.result.data[k].SYMBOL,
            													_name=data_desc.result.data[k].NAME,
            													_days=data_desc.result.data[k].DAYS,
            													_chg=data_desc.result.data[k].CHG,
            													_rank=data_desc.result.data[k].RANK;
            													var attDesc=[];
            													attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
            													
            													cdata.desc.push(attDesc);
            													
            											}
            						
            					//console.log(cdata.symbolAll)
            					var tmphq,tmphq;
            							wn_varLoader(qurl.replace("$random",Math.random()),function(){

            									for(var m in cdata.symbolAll){
            										var _symbol=cdata.symbolAll[m];
            										//if(_symbol==''){ return ;}
            										tmphq=window['hq_str_'+_symbol];
            									//	console.log(tmphq)
            										//window['hq_str_'+_symbol]=null;
            										//console.log(cdata.five)
            										var tmparr=tmphq.split(',');
            										var _new=tmparr[3];
            										var n=cdata.now.length,w=cdata.week.length,o=cdata.one.length,f=cdata.five.length,a=cdata.asc.length,d=cdata.desc.length;
            										var _rose=(((_new-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
            										if(m<n){
            											if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
            											cdata.now[m].push(_new);cdata.now[m].push(_rose);
            										}
                                                    else if(m>=n&&m<(n+w)){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.week[m-n].push(_new);cdata.week[m-n].push(_rose);
                                                    }
            										else if(m>=(n+w)&&m<(n+o+w)){
            											if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
            											cdata.one[m-n-w].push(_new);
            										}
            										else if(m>=(n+o+w)&&m<(n+o+w+f)){
            											if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
            											cdata.five[m-(n+w+o)].push(_new);
            										}
            											//console.log(cdata.one);
            									}
            									
            									_draw();
            							})
            							})
            						})
            					})
            				})
                            })
            				
            			})

            	};

            	function _draw(){
            		var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    var cdata=config.datas.now;
                    //console.log(cdata);
                    // 实时数据
                    $("#schyNOW h4").text(schyNAME+"实时关注排行");
                    
                    
                    $("#schyNowTable table").text("");
                    $("#schyNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
                     
                //console.log(cdata.length)
                    for(var i=0;i<cdata.length;i++){
                        var curl=syURL.replace("$symbol",cdata[i][0]);
                        $("#schyNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
                       if(parseFloat(cdata[i][4])<0){$("#schyNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
                       if(parseFloat(cdata[i][4])>0){$("#schyNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                    };

                    //周数据
                    $("#schyWEEK h4").text(schyNAME+"本周关注排行");
                    var cdataWeek=config.datas.week;

                    $("#schyWeekTable table").text("");
                    $("#schyWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
                    for(var i=0;i<cdataWeek.length;i++){
                        var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
                        $("#schyWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
                        if(parseFloat(cdataWeek[i][4])>0){$("#schyWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
                        if(parseFloat(cdataWeek[i][4])<0){$("#schyWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                       // if(parseFloat(cdataWeek[i][4])=0){$("#schyWeekTable table tr").eq(i).find("td").eq(3).css("color","black")   }
                    }
                    //1日加入表格
                    $("#schyONE h4").text(schyNAME+"用户关注1日变化幅度排行");
                    var cdataOne=config.datas.one;
                    $("#schyOneTable table").text("");
                    $("#schyOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                    //console.log(cdataOne)
                    for(var i=0;i<cdataOne.length;i++){
                        var curlone=syURL.replace("$symbol",cdataOne[i][0]);
                        $("#schyOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][3]+'</td><td>'+cdataOne[i][2]+'</td></tr>')
                        if(parseFloat(cdataOne[i][3])>0){$("#schyOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdataOne[i][3])<0){$("#schyOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }
                    //5日加入表格
                    $("#schyFIVE h4").text(schyNAME+"用户关注5日变化幅度排行");
                    var cdataFive=config.datas.five;
                    $("#schyFiveTable table").text("");
                    $("#schyFiveTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                    for(var i=0;i<cdataFive.length;i++){
                         var curlfive=syURL.replace("$symbol",cdataFive[i][0]);http://finance.sina.com.cn/realstock/company/sh600010/nc.shtml
                        $("#schyFiveTable table").append('<tr><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][0]+'</a></td><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][1]+'</a></td><td>'+cdataFive[i][4]+'</td><td>'+cdataFive[i][3]+'</td><td>'+cdataFive[i][2]+'</td></tr>')
                        if(parseFloat(cdataFive[i][3])>0){$("#schyFiveTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdataFive[i][3])<0){$("#schyFiveTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }

                    //上升加入表格
                    $("#schyASC h4").text(schyNAME+"用户关注排名连续上升排行");
                    var cdataAsc=config.datas.asc;
                    $("#schyAscTable table").text("");
                    $("#schyAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>")
                    for(var i=0;i<cdataAsc.length;i++){
                        var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                        $("#schyAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                        if(parseInt(cdataAsc[i][3])>0){$("#schyAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseInt(cdataAsc[i][3])<0){$("#schyAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }


                    //下降加入表格
                    $("#schyDESC h4").text(schyNAME+"用户关注排名连续下降排行");
                    var cdataDesc=config.datas.desc;
                    $("#schyDescTable table").text("");
                    $("#schyDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
                    for(var i=0;i<cdataDesc.length;i++){
                        var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                        $("#schyDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                        if(parseInt(cdataDesc[i][3])>0){$("#schyDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseInt(cdataDesc[i][3])<0){$("#schyDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }


            	};
            	this.init=_init;
            };
        };navD++;
    })



//第五tab 市场概念分析
// 概念图表及领涨概念
//scgnTable显示表格数据

    $("#nav_scgn").click(function(){
        if($(this).attr("class")=="gnzz_navClick gnzz_navHover") {return ;}
        else if(navE!=0){
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
        }
        else{
            $(this).addClass("gnzz_navClick").siblings().removeClass("gnzz_navClick");
            $(".gnzz_sub").eq($(this).index()).addClass("gnzz_sub_checked").siblings().removeClass("gnzz_sub_checked");
            function scgn(){
            	var config={
            		datas:{
            			scgn:{
            				scgn:[],
            				scgn_end:[],
            				scgn_symbol:[],

            			}
            		},
            		params:{
            			scgn_cb:"scgn",
            			scgnSymbol_cb:"scgnSYMBOL",
            		},
            		dom:{
            			scgn:"scgn",

            		},
            		url:{
            			scgnURL:"http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/MoneyFlow.ssl_bkzj_bk?page=1&num=200&sort=netamount&asc=0&fenlei=1&callback=$cb",
            			scgnSymbolURL:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getListGN?type=CN&callback=$cb",
            		}
            	};
            	function scgnChart(){
            		var _myChart=echarts.init(document.getElementById(config.dom.scgn));
            		var _option={
            			tooltip:{
            				trigger: "item",
            				backgroundColor:"rgba(0,0,0,0.7)",
            				borderWidth:2,
            				borderColor:"#0088cc",
            				padding:8,
            				textStyle : {
            			            color: 'white',
            			            
            			        },
            				formatter:function(v){
            					return "<p style='border-bottom:1px solid #ccc;padding-right:50px;margin-bottom:10px'>"+v[1]+" 概念"+"</p>"+
            							"今日涨跌幅:"+v[2][0]+"%<br>"+
            							"均价:"+(v[2][1]+10)+"元";
            							//"微博关注度："+config.datas.scgn;
            				}

            			},
            			grid:{
            				x:100,
            				y:20,
            				y2:60,

            			},
            			dataZoom : {
            				show : true,
            				realtime : true,
            				start : 30,
            				end : 50
            			 },
            			xAxis:[
                        {
                            type:"value",
                            power: 1,
                            precision: 2,
                            name:'概念涨跌幅',
                            nameTextStyle:{
                                color: 'red',
                            },
                            splitNumber:3,
                            scale:true,
                            boundaryGap:[0.05, 0.05],
                            axisLine:{
                                show:true,
                                lineStyle:{
                                color:'rgba(215,215,215,0.5)',
                                type:'dotted',
                            }
                            },
                            axisLabel : {
                                show:true,
                                formatter:function(value){return (value)+'%'}
                            },
                            axisTick : {show:false,
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                            }
                        }],
                        yAxis:[
                        {
                            type:"value",
                            name:'行业均价',
                            nameTextStyle:{
                                 color: 'red',
                            },
                            scale:true,
                            boundaryGap: [0.05, 0.05],
                            splitNumber:4,
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color: 'rgba(215,215,215,0.5)',
                                    type:'dotted',
                                }
                            },
                            splitArea : {
                                show: false,
                            },
                           splitLine:{
                                show:true,
                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                            },
                            axisLabel:{
                                formatter:function(value){return (parseInt(value)+10)+'元'}
                                       },
                        }],

            			series:[{
            				type:'scatter',
            				data:config.datas.scgn.scgn_end,
            			}]

            		};

            		function _init(){

            			var curl=config.url.scgnURL.replace('$cb',"var "+config.params.scgn_cb+"="),
            				curl_symbol=config.url.scgnSymbolURL.replace('$cb',"var "+config.params.scgnSymbol_cb+"=");
            				wn_varLoader(curl_symbol,function(){
            					data_scgnSymbol=window[config.params.scgnSymbol_cb];
            					_loadedDataSymbol(data_scgnSymbol);
            						wn_varLoader(curl,function(){			
            						data=window[config.params.scgn_cb];
            						_loadedData(data);			
            					})
            				});			
            		};
            		function _loadedDataSymbol(){
            			var cdata=config.datas.scgn;
            			//console.log(data_scgnSymbol.result.data);
            			for(var i in data_scgnSymbol.result.data){
            			var _symbol=data_scgnSymbol.result.data[i].PV;
            			var _code=data_scgnSymbol.result.data[i].CODE;
            			var tt=[];
                        if(_code!="gn_jxzs"&&_code!="gn_qzl" ){
            			tt.push(_code);tt.push(_symbol);
            			cdata.scgn_symbol.push(tt);
            			//console.log(config.datas.scgn.scgn_symbol)
            			}};
            			
            		}

            		function _loadedData(){
            			var color=['rgba(245,69,69,0.9)','rgba(255,128,128,0.8)','rgba(124,210,154,0.8)','rgba(35,166,76,1)',];
            			var cdata=config.datas.scgn;
            			//console.log(data.result);
            				for(var i in data.result.data){
            					 var cname = data.result.data[i].name;
            					 var avg_changeratio =(data.result.data[i].avg_changeratio*100).toFixed(2);
            					 var avg_price = (data.result.data[i].avg_price-0).toFixed(2);
            					 var cate=data.result.data[i].category;
            					 var arr=[];
            					 arr.push(avg_changeratio);
            					 arr.push(avg_price);
            					 arr.push(cname);
            					 arr.push(cate);
            					cdata.scgn.push(arr);
            				};
            				console.log(cdata.scgn);
            				console.log(cdata.scgn_symbol)
                           for(var j=cdata.scgn_symbol.length-1;j>=0;j--){
                                for(var i=0;i<cdata.scgn.length;i++){
                                        if(cdata.scgn[i][3]==cdata.scgn_symbol[j][0]){
                                            //console.log(cdata.scgn[i][3])
                                            //console.log(cdata.scgn[i][3])
                                             cdata.scgn_end[cdata.scgn_symbol.length-j-1]={
                                                 name:cdata.scgn[i][2], 
                                                 value:[cdata.scgn[i][0],(cdata.scgn[i][1]-10)],
                                                 cate:[cdata.scgn[i][3]],
                                                 symbolSize:Math.sqrt(cdata.scgn_symbol[j][1])/120,
                                                 itemStyle:{
                                                            normal:{

                                                                label:function(){
                                                                    if(j<10){return {show:true,position:'inside',formatter:cdata.scgn[i][2],textStyle:{color:'#333',fontSize:'10',fontWeight:'bold',fontFamily:'Microsoft YaHei'}}}
                                                                    else {
                                                                        return {show:false}
                                                                    }                                                                   

                                                                }(),                            
                                                                color:function(){
                                                                     if(cdata.scgn[i][0]>=0.2) {return color[0]}
                                                                     else if(cdata.scgn[i][0]>0&&cdata.scgn[i][0]<0.2) { return color[1]}
                                                                     else if(cdata.scgn[i][0]>-0.8&&cdata.scgn[i][0]<=0) {return color[2]}
                                                                    else if(cdata.scgn[i][0]<=-0.8) {return color[3]}
                                                                    }()
                                                            }
                                                 }
                                             };
                                        break;
                                        }
                                    
                                  
                                } 
                                   };
            	                // console.log(config.datas.scgn.scgn_end);
            	             _draw();
            		
            		//初始领涨行业走势

            			(function(){
            			
            				var max=cdata.scgn_end[0].value[0];
            				//console.log(max);
            				var k,max_cate,max_name;
            				for(var i=0;i<cdata.scgn_end.length;i++){
            					//console.log(cdata.scgn_end[i].value[0]);
            					if(max<=cdata.scgn_end[i].value[0]){
            						k=i;
            						max=cdata.scgn_end[i].value[0];
            						max_cate=cdata.scgn_end[i].cate;
            						max_name=cdata.scgn_end[i].name}
            				};
            				window.scgnNAME=max_name;
            				window.scgnCATE=max_cate;
            				//console.log(max_name);
            				var slchart_pri=new scgn_sub();
            				 	slchart_pri.scgn_subChart.init();
            				var scgntable=new scgnTable();
            				 	scgntable.init();
            				})();
            		};
            		function _draw(){

            				_myChart.setOption(_option,true);
            				
            			};
            		var ecConfig =echarts.config.EVENT;
            			function clickes(par){
            				 if (typeof par.seriesIndex != 'undefined') {
            				 	window.scgnCATE=par.data.cate;
            				 	window.scgnNAME=par.data.name;
            				 	//console.log(window.scgnCATE);
            				 	var slchart=new scgn_sub();
            				 	slchart.scgn_subChart.init();

            				 	var scgntable=new scgnTable();
            				 	scgntable.init();

            				 }

            			};
            			_myChart.on(ecConfig.CLICK, clickes);

            		this.init=_init;
            	};
            	var scgnchart=new scgnChart();
            		scgnchart.init();
            };
            scgn();
            //领涨概念
            //逐个概念板块画图 包括时间，PV，均价数据
            function scgn_sub(){
            	var config={
            		datas:	{
            			dates:[],//日期
            			avg_changeratios:[],//涨跌幅
            			avg_prices:[],//收盘价
            			names:[],
            			PV:[],
            			PV_time:[],
            			scgn:{
            				time:[],
            				price:[],
            				PV:[]
            			}			
            			},

            		params:{
            			cb:'BO',
            			cbpv:'TO',
            			bk:window.scgnCATE,
            		},
            		dom:{
            			main:"scgn_sub",
            		},
            		url:{
            			urlPrice: "http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/MoneyFlow.ssl_bkzj_zjlrqs?page=1&num=629&sort=opendate&asc=0&bankuai=1%2F$bk&callback=$cb",
            			urlPV:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getGNHQ?gn=$bk&type=CN&callback=$cb",
            		},
            		
            	};
            	//console.log(window.category);
            		function scgn_subChart(){
            			 var ncURL="http://vip.stock.finance.sina.com.cn/moneyflow/#!bk!0/$bk";
            			var _myChart=echarts.init(document.getElementById(config.dom.main));
            			var _option={
            					        tooltip : {
            					        trigger: 'item',
            					        formatter: function(value){
            					            return '日期：'+value[1]+'<br>'+
            					                    '均价:'+value[2]+'元';
            					                    //x=value[2][0];
            					                 }
            					            },
            					            grid:{
            									x:100,
                                                y:20,
            									
            									

            								},
            					            dataZoom : {
            								        show : true,
            								        realtime : true,
            								        start : 90,
            								        end : 100
            								    },
            								 legend:{
            								 	data:["均价","用户关注"],
                                                x:700,
                                                y:5,
            								 },

            					            xAxis : [
            						        {
            						            type : 'category',
            						            power: 1,
            						            precision: 2,
            						          //  name:'日期',
            						            scale:true,
            						          //  nameLocation:'start',

            						            data:config.datas.scgn.time,     	 

            						             axisLine:{
            						                show:true,
            						                lineStyle:{color: '#48b', width: 2,},                

            						            },
            						            axisLabel : {
            						                show:true,

            						            }
            						        }
            					    		],
            							    yAxis : [
            							        {
            							            type : 'value',
            							            power: 1,
            							            precision: 2,
            							            name:'均价(元)',
            							            scale:true,
            							            axisLine:{
            							                show:true,
            							                lineStyle:{color: '#ccc', width: 2},                

            							            },

            							            splitArea : {
            							                show: true,
            							                areaStyle:{
            							                    color:['#F7F7F7','#F0F0F0']
            							                }
            							            },

            							        },
            							        {
            							        	type : 'value',
            							            power: 1,
            							            precision: 2,
            							            name:'用户关注',
            							            scale:true,
            							            axisLine:{
            							                show:true,
            							                lineStyle:{color: '#ccc', width: 2},                

            							            },

            							            splitArea : {
            							                show: true,
            							                areaStyle:{
            							                    color:['#F7F7F7','#F0F0F0']
            							                }
            							            },


            							        }

            							      ],
            						      series : [
            						        	{name:'均价',
            						            type:'line',
            									itemStyle: {normal: {color:"rgb(61,163,238)",}},
            						            data:config.datas.scgn.price,         
            						           },
            						           {name:'用户关注',
            						            type:'line',
            						            yAxisIndex:1,
            									//itemStyle: {normal: {color:"rgb(61,163,238)",}},
            						            data:config.datas.scgn.PV,         
            						           },
            						           
            						        ],
            						};
            			function _init(){

            				var curl=config.url.urlPrice.replace('$bk',config.params.bk).replace('$cb',"var "+config.params.cb+"="),
            					curlPV=config.url.urlPV.replace('$bk',config.params.bk).replace('$cb',"var "+config.params.cbpv+"=");
            				wn_varLoader(curl,function(){				
            					data_scgnSUB=window[config.params.cb];
            					_loadedPriceData(data_scgnSUB);

            					wn_varLoader(curlPV,function(){
            						data_scgnPV=window[config.params.cbpv];
            						_loadedPVData(data_scgnPV);
            					})

            				});
            			};

            			function _updata(){
            				_init();
            			}

            			function _loadedPriceData(){
            				var cdata=config.datas;
            				//console.log(data.result.data);
            				for(var i in data_scgnSUB.result.data){

            					 var xdate = data_scgnSUB.result.data[i].opendate;
            					 var avg_price= data_scgnSUB.result.data[i].avg_price;
            					 cdata.dates.push(xdate);
            					cdata.avg_prices.push(avg_price);

            				}
            				cdata.dates.reverse();
            				cdata.avg_prices.reverse();
            				
            				
            			};
            			function _loadedPVData(){
            				var cdata=config.datas;
            				//console.log(data_scgnPV.result.data);
            				for(var i in data_scgnPV.result.data){

            					 var xdate = data_scgnPV.result.data[i].DT;
            					 var xpv= (data_scgnPV.result.data[i].PV/10000).toFixed(0);

            					 cdata.PV.push(xpv);
            					  cdata.PV_time.push(xdate);
            				}
            				cdata.PV.reverse();
            				cdata.PV_time.reverse();
            				// 删除PV假期及周末数据
            				
                                         // console.log(cdatas.k_time);
                                         // console.log(cdatas._times);
                             var lasti=0,lastj=0;
                             for(var j=lastj;j<cdata.dates.length;j++){
                                           // console.log(cdatas._times.length);
                                    for(var i=lasti;i<cdata.PV_time.length;i++){
                                                    
                                            if(cdata.dates[j]==cdata.PV_time[i]){
                                                      //console.log(cdatas.k_time[i]);
                                                        cdata.scgn.time.push(cdata.PV_time[i]);
                                                        cdata.scgn.price.push(cdata.avg_prices[j]);
                                                        cdata.scgn.PV.push(cdata.PV[i]);
                                                        
                                                        lastj=j;lasti=i;
                                                        break;
                                             } 
                                    }
                             	};


            				_draw();
            			};

            			function _draw(){
                            $("#scgnTEXT").html("<a target='_blank' href='"+ncURL.replace("$symbol",window.schyCODE)+"'>"+window.scgnNAME+"</a>"+" 逐日均价变化趋势");
            				_myChart.setOption(_option,true);
            			}

            			 this.init=_init;
            			// this.updata=_updata;
            		};
            	this.scgn_subChart=new scgn_subChart();
            }
            //表格 
            //实时,本周,1日，5日，持续上升
            function scgnTable(){

            	var config={
            		datas:{
            			now:[],
            			week:[],
            			one:[],
            			five:[],
            			asc:[],
            			desc:[],

            			symbolAll:[],
            		},
            		params:{
            			gn:window.scgnCATE,
            			ab:'NOW',
            			week:'WEEK',
            			bb:'ONE',
            			cb:'FIVE',
            			asc:'ASC',
            			desc:'DESC',
            		},
            		url:{

            			nowURL:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getListSymbolNow?num=10&gn=$gn&type=CN&callback=$cb",
            			weekURL:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getListSymbolWeek?num=10&gn=$gn&type=CN&callback=$cb",
            			oneURL:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getListSymbolChangeNday?num=10&gn=$gn&count=1&order=DESC&type=CN&callback=$cb",
            			fiveURL:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getListSymbolChangeNday?num=10&gn=$gn&count=5&order=DESC&type=CN&callback=$cb",
            			ascURL:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getListContinueChange?num=10&gn=$gn&type=CN&order=ASC&callback=$cb",
            			descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockGNService.getListContinueChange?num=10&gn=$gn&type=CN&order=DESC&callback=$cb",
            			
            			kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                        hqURL:"http://hq.sinajs.cn/?_=$random&list=",
            		},

            	};
            	function _init(){
            		var cdata=config.datas,qurl=config.url.hqURL
            		var urlNOW=config.url.nowURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.ab+"="),
            			urlWEEK=config.url.weekURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.week+"="),
            			urlONE=config.url.oneURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.bb+"="),
            			urlFIVE=config.url.fiveURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.cb+"="),
            			urlASC=config.url.ascURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.asc+"="),
            			urlDESC=config.url.descURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.desc+"=");

            		wn_varLoader(urlNOW,function(){	
            			//实时数据
            				data_now=window[config.params.ab];
            				//
            			
            				for(var i in data_now.result.data){
            						var symbol=data_now.result.data[i].SYMBOL,
            							name=data_now.result.data[i].NAME,
            							pv=parseInt(i)+1;
            							var attr=[];
            						attr.push(symbol);attr.push(name);attr.push(pv);
            						//console.log(attr);
            						cdata.now.push(attr);
            						cdata.symbolAll.push(symbol);
            						qurl+=symbol+',';
            				};
            			// 周数据
            			wn_varLoader(urlWEEK,function(){	
            					data_week=window[config.params.week];
            					for(var j in data_week.result.data){
            						var symbolweek=data_week.result.data[j].SYMBOL,
            							nameweek=data_week.result.data[j].NAME,
            							pvweek=parseInt(j)+1;
            							var attOne=[];
            							attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
            							
            							cdata.week.push(attOne);
                                        cdata.symbolAll.push(symbolweek);
                                        //console.log(cdata.one);
                                        qurl+=symbolweek+',';
            					}

            			// 一日数据
            			 wn_varLoader(urlONE,function(){ 
                                data_one=window[config.params.bb];
                                ///console.log(data_one);
                                for(var j in data_one.result.data){
                                    var symbolOne=data_one.result.data[j].SYMBOL,
                                        nameOne=data_one.result.data[j].NAME,
                                        pvOne=parseInt(j)+1;
                                        chanegOne=data_one.result.data[j].CHANEG+"%";
                                        var attOne=[];
                                        attOne.push(symbolOne);attOne.push(nameOne);attOne.push(pvOne);attOne.push(chanegOne);
                                        
                                        cdata.one.push(attOne);
                                        //console.log(cdata.one);
                                        cdata.symbolAll.push(symbolOne);
                                        qurl+=symbolOne+',';
                                }
                        // 5日数据

                                    wn_varLoader(urlFIVE,function(){    
                                    data_five=window[config.params.cb];
                                    //console.log(data_five);
                                    for(var k in data_five.result.data){
                                        var symbolFive=data_five.result.data[k].SYMBOL,
                                            nameFive=data_five.result.data[k].NAME,
                                            pvFive=parseInt(k)+1;
                                            chanegFive=data_five.result.data[k].CHANEG+"%";
                                            var attFive=[];
                                            attFive.push(symbolFive);attFive.push(nameFive);attFive.push(pvFive);attFive.push(chanegFive);
                                            
                                            cdata.five.push(attFive);
                                            //console.log(cdata.one);
                                            cdata.symbolAll.push(symbolFive);
                                            qurl+=symbolFive+',';
                                    }

            						// 上升

            							wn_varLoader(urlASC,function(){	
            								data_asc=window[config.params.asc];
            								//console.log(data_asc);
            								for(var k in data_asc.result.data){
            									var _symbol=data_asc.result.data[k].SYMBOL,
            										_name=data_asc.result.data[k].NAME,
            										_days=data_asc.result.data[k].DAYS,
            										_chg=data_asc.result.data[k].CHG,
            										_rank=data_asc.result.data[k].RANK;
            										var attAsc=[];
            										attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
            										cdata.asc.push(attAsc);
            										
            										
            						}

            						// 下降
            										wn_varLoader(urlDESC,function(){	
            											data_desc=window[config.params.desc];
            											//console.log(data_desc);
            											for(var k in data_desc.result.data){
            												var _symbol=data_desc.result.data[k].SYMBOL,
            													_name=data_desc.result.data[k].NAME,
            													_days=data_desc.result.data[k].DAYS,
            													_chg=data_desc.result.data[k].CHG,
            													_rank=data_desc.result.data[k].RANK;
            													var attDesc=[];
            													attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
            													
            													cdata.desc.push(attDesc);
            													
            											}
            						
            					//console.log(cdata.symbolAll)
            					var tmphq,tmphq;
            							wn_varLoader(qurl.replace("$random",Math.random()),function(){

            									for(var m in cdata.symbolAll){
            										var _symbol=cdata.symbolAll[m];
            										//if(_symbol==''){ return ;}
            										tmphq=window['hq_str_'+_symbol];
            									//	console.log(tmphq)
            										//window['hq_str_'+_symbol]=null;
            										//console.log(cdata.five)
            										var tmparr=tmphq.split(',');
            										var _new=tmparr[3];
            										var n=cdata.now.length,w=cdata.week.length,o=cdata.one.length,f=cdata.five.length,a=cdata.asc.length,d=cdata.desc.length;
            										var _rose=(((_new-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
            										if(m<n){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.now[m].push(_new);cdata.now[m].push(_rose);
                                                    }
                                                    else if(m>=n&&m<(n+w)){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.week[m-n].push(_new);cdata.week[m-n].push(_rose);
                                                    }
                                                    else if(m>=(n+w)&&m<(n+o+w)){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.one[m-n-w].push(_new);
                                                    }
                                                    else if(m>=(n+o+w)&&m<(n+o+w+f)){
                                                        if(_new==0.00||_new==undefined){_new="停牌";_rose=0}
                                                        cdata.five[m-(n+o+w)].push(_new);
                                                    }
            											//console.log(cdata.one);
            									}
            									
            									_draw();
            							})
            							
            							
            							})
            						})
            					})
            				})
                        })
            				
            			})

            	};

            	 function _draw(){
                    var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    var cdata=config.datas.now;
                    //console.log(cdata);
                    // 实时数据
                    $("#scgnNOW h4").text(scgnNAME+"实时关注排行");
                    
                    
                    $("#scgnNowTable table").text("");
                    $("#scgnNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
                     
                //console.log(cdata.length)
                    for(var i=0;i<cdata.length;i++){
                        var curl=syURL.replace("$symbol",cdata[i][0]);
                        $("#scgnNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
                       if(parseFloat(cdata[i][4])<0){$("#scgnNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
                       if(parseFloat(cdata[i][4])>0){$("#scgnNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                    };

                    //周数据
                    $("#scgnWEEK h4").text(scgnNAME+"本周关注排行");
                    var cdataWeek=config.datas.week;

                    $("#scgnWeekTable table").text("");
                    $("#scgnWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
                    for(var i=0;i<cdataWeek.length;i++){
                        var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
                        $("#scgnWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
                        if(parseFloat(cdataWeek[i][4])>0){$("#scgnWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
                        if(parseFloat(cdataWeek[i][4])<0){$("#scgnWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                       // if(parseFloat(cdataWeek[i][4])=0){$("#scgnWeekTable table tr").eq(i).find("td").eq(3).css("color","black")   }
                    }
                    //1日加入表格
                    $("#scgnONE h4").text(scgnNAME+"用户关注1日变化幅度排行");
                    var cdataOne=config.datas.one;
                    $("#scgnOneTable table").text("");
                    $("#scgnOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                    //console.log(cdataOne)
                    for(var i=0;i<cdataOne.length;i++){
                        var curlone=syURL.replace("$symbol",cdataOne[i][0]);
                        $("#scgnOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][3]+'</td><td>'+cdataOne[i][2]+'</td></tr>')
                        if(parseFloat(cdataOne[i][3])>0){$("#scgnOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdataOne[i][3])<0){$("#scgnOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }
                    //5日加入表格
                    $("#scgnFIVE h4").text(scgnNAME+"用户关注5日变化幅度排行");
                    var cdataFive=config.datas.five;
                    $("#scgnFiveTable table").text("");
                    $("#scgnFiveTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                    for(var i=0;i<cdataFive.length;i++){
                         var curlfive=syURL.replace("$symbol",cdataFive[i][0]);//http://finance.sina.com.cn/realstock/company/sh600010/nc.shtml
                        $("#scgnFiveTable table").append('<tr><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][0]+'</a></td><td><a target="_blank" href="'+curlfive+'">'+cdataFive[i][1]+'</a></td><td>'+cdataFive[i][4]+'</td><td>'+cdataFive[i][3]+'</td><td>'+cdataFive[i][2]+'</td></tr>')
                        if(parseFloat(cdataFive[i][3])>0){$("#scgnFiveTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseFloat(cdataFive[i][3])<0){$("#scgnFiveTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }

                    //上升加入表格
                    $("#scgnASC h4").text(scgnNAME+"用户关注排名连续上升排行");
                    var cdataAsc=config.datas.asc;
                    $("#scgnAscTable table").text("");
                    $("#scgnAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>")
                    for(var i=0;i<cdataAsc.length;i++){
                        var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                        $("#scgnAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                        if(parseInt(cdataAsc[i][3])>0){$("#scgnAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseInt(cdataAsc[i][3])<0){$("#scgnAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }


                    //下降加入表格
                    $("#scgnDESC h4").text(scgnNAME+"用户关注排名连续下降排行");
                    var cdataDesc=config.datas.desc;
                    $("#scgnDescTable table").text("");
                    $("#scgnDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
                    for(var i=0;i<cdataDesc.length;i++){
                        var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                        $("#scgnDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                        if(parseInt(cdataDesc[i][3])>0){$("#scgnDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(parseInt(cdataDesc[i][3])<0){$("#scgnDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }


                };
                this.init=_init;
            };
         };navE++;
    })



	
