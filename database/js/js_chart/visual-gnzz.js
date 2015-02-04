$(function(){
	$("#gnzz_navID li").mouseover(function(){
		$(this).addClass("gnzz_navHover");
	}).mouseout(function(){
		$(this).removeClass("gnzz_navHover");
	});
})

var _visual_option={};

var chartClientWidth=document.documentElement.clientWidth,chartClientEdge=20,chartLFWidth=20,
	chartVisualWidth=chartClientWidth-224-30;
	
	if(!dataPanelWidth) var dataPanelWidth=chartVisualWidth-chartClientEdge;
	
_visual_option={
	w:dataPanelWidth,//chartVisualWidth-chartClientEdge,
	h:400
}

function setVisualDOM(){
	document.getElementById('jys').style.width=document.getElementById('sccc').style.width=document.getElementById('schy').style.width=_visual_option.w+'px';
	document.getElementById('scgn').style.width=document.getElementById('scgn_sub').style.width=document.getElementById('scgl').style.width=_visual_option.w+'px';
	document.getElementById('chart-container').style.height=_visual_option.h+60+'px';
}
setVisualDOM();

//公共函数
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
};
	
function createElement(t){return document.createElement(t);}

//
var navA=navB=navC=navD=navE=0;//number count
//第一tab 
// 全市场概览
$(document).ready(function(){
        function nav_scgl(){    
              //window.scglCODE;window.scglNAME;
            var config={
        		URLPV:[
					"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbol?code=CNHOUR2&type=CN&callback=$cb",
					"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbol?code=CNHOUR6&type=CN&callback=$cb",
					"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbol?code=CNHOUR12&type=CN&callback=$cb",
					"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbol?code=CNHOUR24&type=CN&callback=$cb",
					"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbol?code=CNDAY7&type=CN&callback=$cb",
					"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListSymbol?code=CNDAY30&type=CN&callback=$cb"
					],
        		NAVURL:window.location.href,
        		HQURL:"http://hq.sinajs.cn/?_=$random&list=",
        		COLOR:{
        			RANGECOLOR:['#00E717','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'],

					DAREACOLOR:['#23ab4c','#4cbb73','#7cd29a','#d3edd4'],
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
        	var cw=_visual_option.w,ch=_visual_option.h;
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
					
					
					boEvtUtil.addHandler(fbtntmp,'click',function(){
						var str=this.id.slice(3);root=node=null;aheatMap.loadData(Number(str));
						
						for(var i=0;i<outBtnsvalue.length;i++){
							domfbtnlist[i].style.backgroundColor=btnOutC;
						}
						btnIndex=this.id;
						this.style.backgroundColor=btnOverC;
					});
					
					boEvtUtil.addHandler(fbtntmp,'mouseover',function(){
						this.style.backgroundColor=btnOverC;
					});
					
					boEvtUtil.addHandler(fbtntmp,'mouseout',function(){
						if(this.id!==btnIndex)this.style.backgroundColor=btnOutC;
					});
					
					domfbtn.appendChild(fbtntmp);
			
					if(i==0){
						fbtntmp.style.margin='10px 0px 10px 0px';
						fbtntmp.style._margin='10px 0px 10px 10px';
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
        			      //  .on("mouseout",function(d_){this.childNodes[0].style.color='#fff';})
        			        .on("click",function(d_){
        			        	window.scglCODE=d_.code;
        			        	window.scglNAME=d_.name;
        			        	scgl_sub();
        			        })
        			        
        				cell.append("span")
        					.style('display','inline-block')
        		            .style("width", function(d_) { return d_.dx + 'px'; })
        		      		.style("height", function(d_){return d_.dy/2 + 'px'; })
        		      		.style("top", function(d_){ return d_.dy/2-8+"px"; })
        			        .style("left", function(d_){ return 0+"px"; })
        		      		.style("font-size", '12px')
							.style("fontSize", '12px')
        		      		.style("overflow",'hidden')
        		      		.style("text-align",'center')
							.style("textAlign",'center')
        		      		.style('position', 'relative')
        		      		.style("color",function(d_){var cl=fontColorLegend(d_.flowp); if(cl=='undefined') cl='#fff'; return cl;})
        		      		.text(function(d) {return d.name})
        		}
        		
        		this.loadData=_loadData;
        	}
        	
        	var aheatMap=new stockHeatMap();
            aheatMap.loadData(0);
        	
        	
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
            
            //ge gu yonghu guanzhu 
        function scgl_sub(){ 
                var IMG="http://image.sinajs.cn/newchart/bill/pv_year/$symbol.png",
                    IMGsrc=IMG.replace("$symbol",window.scglCODE)

                $("#scgl_sub").html("<img src='"+IMGsrc+"' />");
        }

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

                    symbolAll:[[],[],[],[]]
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
                    nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=CNH&callback=$cb',
                    weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=CNW&callback=$cb',
                    oneURL: 'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=CN1&callback=$cb',
                    fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=CN5&callback=$cb',
                    ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=CNA&callback=$cb',
                    descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=CND&callback=$cb",
                    
                    kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                    hqURL:"http://hq.sinajs.cn/?_=$random&list="
                },

            };
            
        var _qurl=config.url.hqURL;   
        
        //全市场用户关注排名连续上升排行
        function _qscyhgzss(){
        	var cdata=config.datas;
        	var urlASC=config.url.ascURL.replace("$cb","var "+config.params.asc+"=");
        	wn_varLoader(urlASC,function(){ 
				var data_asc=window[config.params.asc];
				if(!data_asc.result)return;
				var len=data_asc.result.data.length;
				for(var i=0;i<len;i++){
					var _symbol=data_asc.result.data[i].SYMBOL,
						_name=data_asc.result.data[i].NAME,
						_days=data_asc.result.data[i].DAYS,
						_chg=data_asc.result.data[i].CHG,
						_rank=data_asc.result.data[i].RANK;
					var attAsc=[];
						attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
						cdata.asc.push(attAsc);
				}
				_drawup();
			})
        }
        function _drawup(){
        	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
            var cdata=config.datas.now;
            $("#scglASC h4").text("全市场用户关注排名连续上升排行");
            var cdataAsc=config.datas.asc;
            $("#scglAscTable table tr").text("");
            $("#scglAscTable table thead").html("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>");
            for(var i=0;i<cdataAsc.length;i++){
                var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                $("#scglAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                if(Number(cdataAsc[i][3])>0){$("#scglAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                if(Number(cdataAsc[i][3])<0){$("#scglAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
            }
        }
        
        //全市场用户关注排名连续下降排行
        function _qscyhgzxj(){
        	var cdata=config.datas;
        	var urlDESC=config.url.descURL.replace("$cb","var "+config.params.desc+"=");
        	wn_varLoader(urlDESC,function(){    
				var data_desc=window[config.params.desc];
				if(!data_desc.result.data)return;
				var len=data_desc.result.data.length;
				for(var i=0;i<len;i++){
					var _symbol=data_desc.result.data[i].SYMBOL,
						_name=data_desc.result.data[i].NAME,
						_days=Number(data_desc.result.data[i].DAYS),
						_chg=Number(data_desc.result.data[i].CHG),
						_rank=Number(data_desc.result.data[i].RANK);
					var attDesc=[];
						attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
						
					cdata.desc.push(attDesc);
				}
				_drawdown();
			});
        }
        function _drawdown(){
        	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
            var cdata=config.datas.now;
        	 //下降加入表格
            $("#scglDESC h4").text("全市场用户关注排名连续下降排行");
            var cdataDesc=config.datas.desc;
            $("#scglDescTable table tr").text("");
            $("#scglDescTable table thead").html("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
            for(var i=0;i<cdataDesc.length;i++){
                var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                $("#scglDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                if(Number(cdataDesc[i][3])>0){$("#scglDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                if(Number(cdataDesc[i][3])<0){$("#scglDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
            }
        }
            
        function _loaded(){
        	var cdata=config.datas;
        	var urlASC=config.url.ascURL.replace("$cb","var "+config.params.asc+"="),
             	urlDESC=config.url.descURL.replace("$cb","var "+config.params.desc+"=");
        	
        	//
        	_qscyhgzss();
        	_qscyhgzxj();
        	_qscssgzph();
        	_qscbzgzph();
        	_qscyhgz1rph();
        	_qscyhgz5rph();
        }
        //全市场实时关注排行
        function _qscssgzph(){
        	var cdata=config.datas;
        	var urlNOW=config.url.nowURL.replace("$cb","var "+config.params.ab+"="),len,symbolUrl=config.url.hqURL;
        	wn_varLoader(urlNOW,function(){ 
                var data_now=window[config.params.ab];
                len=data_now.result.data.length;
                for(var i=0;i<len;i++){
                        var symbol=data_now.result.data[i].SYMBOL,
                            name=data_now.result.data[i].NAME,
                            pv=(Number(i)+1);
                            var attr=[];
                        attr.push(symbol);attr.push(name);attr.push(pv);
                        cdata.now.push(attr);
                        cdata.symbolAll[0].push(symbol);
                        if(i<(len-1))	symbolUrl+=symbol+',';
                        else 			symbolUrl+=symbol;
                }; 
                _qscyhSymbol(symbolUrl,len,0);
            })
        }
        //全市场本周关注排行
        function _qscbzgzph(){
        	var cdata=config.datas;
        	var urlWEEK=config.url.weekURL.replace("$cb","var "+config.params.week+"="),len,symbolUrl=config.url.hqURL;
        	wn_varLoader(urlWEEK,function(){  
                var data_week=window[config.params.week];
                len=data_week.result.data.length;
                for(var i=0;i<len;i++){
                     var symbolweek=data_week.result.data[i].SYMBOL,
                     nameweek=data_week.result.data[i].NAME,
                     pvweek=(Number(i)+1);
                     var attOne=[];
                     attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
                        
                     cdata.week.push(attOne);
                     cdata.symbolAll[1].push(symbolweek);
                     if(i<(len-1))	symbolUrl+=symbolweek+',';
                     else			symbolUrl+=symbolweek;
                }
                _qscyhSymbol(symbolUrl,len,1);
            })
        }
        //全市场用户关注1日变化幅度排行
        function _qscyhgz1rph(){
        	var cdata=config.datas;
        	var urlONE=config.url.oneURL.replace("$cb","var "+config.params.bb+"="),len,symbolUrl=config.url.hqURL;
        	wn_varLoader(urlONE,function(){ 
                var data_one=window[config.params.bb];
                len=data_one.result.data.length;
                for(var i=0;i<len;i++){
                    var symbolOne=data_one.result.data[i].SYMBOL,
                        nameOne=data_one.result.data[i].NAME,
                        pvOne=(Number(i)+1);
                        chanegOne=Number(data_one.result.data[i].CHG);
                    var attOne=[];
                        attOne.push(symbolOne);attOne.push(nameOne);attOne.push(pvOne);attOne.push(chanegOne);
                        
                        cdata.one.push(attOne);
                        cdata.symbolAll[2].push(symbolOne);
                    if(i<(len-1))	symbolUrl+=symbolOne+',';
                    else			symbolUrl+=symbolOne;
                }
                _qscyhSymbol(symbolUrl,len,2);
            })
        }
        
        //全市场用户关注5日变化幅度排行
        function _qscyhgz5rph(){
        	var cdata=config.datas;
        	var urlFIVE=config.url.fiveURL.replace("$cb","var "+config.params.cb+"="),len,symbolUrl=config.url.hqURL;
        	wn_varLoader(urlFIVE,function(){    
				var data_five=window[config.params.cb];
				len=data_five.result.data.length;
				for(var i=0;i<len;i++){
					var symbolFive=data_five.result.data[i].SYMBOL,
						nameFive=data_five.result.data[i].NAME,
						pvFive=(Number(i)+1);
						chanegFive=Number(data_five.result.data[i].CHG);
					var attFive=[];
						attFive.push(symbolFive);attFive.push(nameFive);attFive.push(pvFive);attFive.push(chanegFive);
						
						cdata.five.push(attFive);
						cdata.symbolAll[3].push(symbolFive);
					if(i<(len-1))	symbolUrl+=symbolFive+',';
					else			symbolUrl+=symbolFive;
				}
				_qscyhSymbol(symbolUrl,len,3);
			});
        }
        
        function _qscyhSymbol(url_,len_,i_){
        	var cdata=config.datas,len=len_;
            wn_varLoader(url_.replace("$random",Math.random()),function(){
            	len=cdata.symbolAll[i_].length;
            	for(var i=0;i<len;i++){
            		var symbol=cdata.symbolAll[i_][i];
            		var tmphq=window['hq_str_'+symbol];
            		
            		var tmparr=[],newp=0,rose=0;
            		if(tmphq!=''){
            			tmparr=tmphq.split(',');
            			if(Number(tmparr[1])==0&&Number(tmparr[4])==0&&Number(tmparr[3])==0&&Number(tmparr[5])==0){
            				newp='停牌';rose=0;
            			}else{
            				newp=parseFloat(tmparr[3]).toFixed(2);
            				rose=(((newp-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
            			}
            		}else{
            			newp='停牌';
            		}
            		if(i_==0){
            			cdata.now[i].push(newp);cdata.now[i].push(rose);
            		}else if(i_==1){
            			cdata.week[i].push(newp);cdata.week[i].push(rose);
            		}else if(i_==2){
            			cdata.one[i].push(newp);cdata.one[i].push(rose);
            		}else if(i_==3){
            			cdata.five[i].push(newp);cdata.five[i].push(rose);
            		}
            	}
            	_qscyhdraw(i_);
            })  
        }
        function _init(){
            _loaded();
        };

        function _qscyhdraw(i_){
            var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
            
            // 实时数据
            var cdata=config.datas.now;
            if(i_==0){
	            $("#scglNOW h4").text("全市场实时关注排行");
	            $("#scglNowTable table tr").text("");
	            $("#scglNowTable table thead").html("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>");
            	for(var i=0;i<cdata.length;i++){
	                var curl=syURL.replace("$symbol",cdata[i][0]);
	                $("#scglNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
	                if(parseFloat(cdata[i][4])>0){$("#scglNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                if(parseFloat(cdata[i][4])<0){$("#scglNowTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	            };
            }
            //周数据
            if(i_==1){
	            $("#scglWEEK h4").text("全市场本周关注排行");
	            var cdataWeek=config.datas.week;
	            $("#scglWeekTable table tr").text("");
	            $("#scglWeekTable table thead").html("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>");
            	 for(var i=0;i<cdataWeek.length;i++){
	                var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
	                $("#scglWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
	                if(parseFloat(cdataWeek[i][4])>0){$("#scglWeekTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                if(parseFloat(cdataWeek[i][4])<0){$("#scglWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	               // if(parseFloat(cdataWeek[i][4])=0){$("#scglWeekTable table tr").eq(i).find("td").eq(3).css("color","black")   }
	            }
            }
           
            //1日加入表格
            if(i_==2){
	            $("#scglONE h4").text("全市场用户关注1日变化幅度排行");
	            var cdataOne=config.datas.one;
	            $("#scglOneTable table tr").text("");
	            $("#scglOneTable table thead").html("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
            	for(var i=0;i<cdataOne.length;i++){
	                var curlone=syURL.replace("$symbol",cdataOne[i][0]);
	                $("#scglOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][3]+'</td><td>'+cdataOne[i][2]+'</td></tr>')
	                if(parseFloat(cdataOne[i][3])>0){$("#scglOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                if(parseFloat(cdataOne[i][3])<0){$("#scglOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	            }
            }
            
            //5日加入表格
            if(i_==3){
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
                                _pricetime:[]
                            },
                        },
                        params:[
                            "SHA",
                            "SZA",
                            "ZXB",
                            "CYB"
                        ],
                        dom:{
                            jys:"jys"
                        },
                        url:{
                            shURL:'http://data.finance.sina.com.cn/api/openapi.php/StockPVService.getMktPV?type=CN&kind=$a&mkt=$sh&callback=$cb',
                            szURL:'http://data.finance.sina.com.cn/api/openapi.php/StockPVService.getBlockPV?type=CN&block=$bk&callback=$cb',

                            kURL:'http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day',
                            hqURL:'http://hq.sinajs.cn/?_=$random&list=$symbol'
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
            			        color: 'white'
            			            
            			  },
            			   formatter:function(v){
            			   	return v[0][1]+
            			   			'<br>'+v[0][0]+':'+v[0][2]+'<br>'
            			   			+v[1][0]+':'+v[1][2];
            				 }
            			},
            			grid:{
            				x:100,
            				y:20,
            				y2:60
            			},
            			legend:{
            				data:[symbolNAME,"用户关注"]
            			},
            			dataZoom : {
            			        show : true,
            			        start : 90,
            			        end : 100,
                                handleColor:'#555'
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
                                power: 2,
                                name:'用户关注（百万）',
                                scale:true,
                                precision:1,
                                boundaryGap:[0.01,0.05],
                                nameTextStyle:{
                                    color: 'red'
                                },
                                axisLine:{
                                    show:true,
                                    lineStyle:{
                                        color: '#d9e2e7'
                                    }
                                },
                                axisLabel:{
                                    show:false
                                },
                                splitArea : {
                                    show: false
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
            				data:config.datas.jys.shaPrice
            			},
            			{
            				type:'line',
            				name:'用户关注',
            				yAxisIndex:1,
            				data:config.datas.jys.shaPV
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
            			var len=data_sha.result.data.length;
            			for(var i=0;i<len;i++){
	            			var _PV=data_sha.result.data[i].PV;
	            			var _time=data_sha.result.data[i].DT;
	            			cdata.jys._shaPV.push((_PV/1000000).toFixed(2));
	            			cdata.jys._pvtime.push(_time);
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
        	                    for(var i=0;i<_sha.length;i++){
        	                        var xtime=_sha[i].date;
        	                        var y=xtime.getFullYear(),m=xtime.getMonth()+1,n=xtime.getDate();
        	                        if(y>"2011"){
            	                        var _date=y+"-"+m+"-"+n;
            	                        var xclose=_sha[i].close;                         
            	                        config.datas.jys._shaPrice.push(xclose);
                                        var _dtime=_date.split("-");
                                        if(_dtime[1]<10){_dtime[1]="0"+_dtime[1]};
                                        if(_dtime[2]<10){_dtime[2]="0"+_dtime[2]};
                                        var _dtimes=_dtime[0]+"-"+_dtime[1]+"-"+_dtime[2];
            	                        config.datas.jys._pricetime.push(_dtimes);
        	                   		}
        	                    };

                                    //过滤掉周末及假期数据
                                var stData=config.datas.jys;
                                var lasti=0,lastj=0;
                                for(var j=lastj;j<stData._pricetime.length;j++){
                                    for(var i=lasti;i<stData._pvtime.length;i++){
                                        if(stData._pricetime[j]==stData._pvtime[i]){
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
            			_myChart.setOption(_option);
            		};
            		this.init=_init;
            	};

            	var jyschart=new jysSHAChart("sh000002","上证A股指数",0);
            		jyschart.init();

                //下面表格显示
                function jysTable(jysNAME,g){
                	var index=g;
                    var jysURL=[
                            {
	                            nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=shAH&callback=$cb',
	                            weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=shAW&callback=$cb',
	                            oneURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=shA1&callback=$cb',
	                            fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=shA5&callback=$cb',
	                            ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=shAA&callback=$cb',
	                            descURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=shAD&callback=$cb'
                            },
                            {
	                            nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=szAH&callback=$cb',
	                            weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=szAW&callback=$cb',
	                            oneURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=szA1&callback=$cb',
	                            fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=szA5&callback=$cb',
	                            ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=szAA&callback=$cb',
	                            descURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=szAD&callback=$cb'
                            },
                            {
                                nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=zxbH&callback=$cb',
	                            weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=zxbW&callback=$cb',
	                            oneURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=zxb1&callback=$cb',
	                            fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=zxb5&callback=$cb',
	                            ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=zxbA&callback=$cb',
	                            descURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=zxbD&callback=$cb'
                            },
                            {
	                            nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=cybH&callback=$cb',
	                            weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=cybW&callback=$cb',
	                            oneURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=cyb1&callback=$cb',
	                            fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=cyb5&callback=$cb',
	                            ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=cybA&callback=$cb',
	                            descURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=cybD&callback=$cb'
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
                            symbolAll:[[],[],[],[]]
                        },
                        params:{
                            ab:'NOW',
                            week:'WEEK',
                            bb:'ONE',
                            cb:'FIVE',
                            asc:'ASC',
                            desc:'DESC'
                        },
                        url:{
                            kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                            hqURL:"http://hq.sinajs.cn/?_=$random&list="
                        }
                    };
                    //沪A用户关注排名连续上升排行
                    function _asc(){
                    	var cdata=config.datas,qurl=config.url.hqURL;
                        var urlASC=jysURL[index].ascURL.replace("$cb","var "+config.params.asc+"=");
                    	wn_varLoader(urlASC,function(){ 
                            data_asc=window[config.params.asc];
                            var len=data_asc.result.data.length;
                            for(var k=0;k<len;k++){
                                var _symbol=data_asc.result.data[k].SYMBOL,
                                    _name=data_asc.result.data[k].NAME,
                                    _days=data_asc.result.data[k].DAYS,
                                    _chg=data_asc.result.data[k].CHG,
                                    _rank=data_asc.result.data[k].RANK;
                                var attAsc=[];
                                    attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
                                    cdata.asc.push(attAsc);
                        	}
                        	_drawASC();
                        });
                    }
                    function _drawASC(){
                    	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                        $("#jysASC h4").text(jysNAME+"用户关注排名连续上升排行");
                        var cdataAsc=config.datas.asc;
                        $("#jysAscTable table").text("");
                        $("#jysAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>")
                        for(var i=0;i<cdataAsc.length;i++){
                            var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                            $("#jysAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                            if(Number(cdataAsc[i][3])>0){$("#jysAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                            if(Number(cdataAsc[i][3])<0){$("#jysAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                        }
                    }
                    //沪A用户关注排名连续下降排行
                    function _dec(){
                    	var cdata=config.datas,qurl=config.url.hqURL;
                        var urlDESC=jysURL[index].descURL.replace("$cb","var "+config.params.desc+"=");
                    	wn_varLoader(urlDESC,function(){    
                            data_desc=window[config.params.desc];
                            var len=data_desc.result.data.length;
                            for(var k=0;k<len;k++){
                                var _symbol=data_desc.result.data[k].SYMBOL,
                                    _name=data_desc.result.data[k].NAME,
                                    _days=data_desc.result.data[k].DAYS,
                                    _chg=Number(data_desc.result.data[k].CHG),
                                    _rank=Number(data_desc.result.data[k].RANK);
                                var attDesc=[];
                                    attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
                                    cdata.desc.push(attDesc);
                            }
                            _drawDEC();
                        })
                    }
                    function _drawDEC(){
                    	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    	//下降加入表格
                        $("#jysDESC h4").text(jysNAME+"用户关注排名连续下降排行");
                        var cdataDesc=config.datas.desc;
                        $("#jysDescTable table").text("");
                        $("#jysDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
                        for(var i=0;i<cdataDesc.length;i++){
                            var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                            $("#jysDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                            if(Number(cdataDesc[i][3])>0){$("#jysDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                            if(Number(cdataDesc[i][3])<0){$("#jysDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                        }
                    }
                    //沪A实时关注排行
                    function _sssj(){
                    	var cdata=config.datas,qurl=config.url.hqURL;
                    	var urlNOW=jysURL[index].nowURL.replace("$cb","var "+config.params.ab+"=");
                    	wn_varLoader(urlNOW,function(){ 
                            var data_now=window[config.params.ab];
                            var len=data_now.result.data.length;
                            for(var i=0;i<len;i++){
                                var symbol=data_now.result.data[i].SYMBOL,
                                    name=data_now.result.data[i].NAME,
                                    pv=Number(i)+1;
                                var attr=[];
                                attr.push(symbol);attr.push(name);attr.push(pv);
                                cdata.now.push(attr);
                                cdata.symbolAll[0].push(symbol);
                                if(i<(len-1))	qurl+=symbol+',';
								else			qurl+=symbol;
                            };
                            _qscyhSymbol(qurl,len,0);
                        });
                    }
                    //周
                    function _zsj(){
                    	var cdata=config.datas,qurl=config.url.hqURL;
                    	var urlWEEK=jysURL[index].weekURL.replace("$cb","var "+config.params.week+"=");
                    	wn_varLoader(urlWEEK,function(){  
                            var data_week=window[config.params.week];
                            var len=data_week.result.data.length;
                            for(var j=0;j<len;j++){
	                            var symbolweek=data_week.result.data[j].SYMBOL,
	                                nameweek=data_week.result.data[j].NAME,
	                                pvweek=Number(j)+1;
	                            var attOne=[];
	                                attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
	                                    
	                                cdata.week.push(attOne);
	                                cdata.symbolAll[1].push(symbolweek);
	                                if(j<(len-1))	qurl+=symbolweek+',';
									else			qurl+=symbolweek;
                            }
                            _qscyhSymbol(qurl,len,1);
                        });
                    }
                    //1日
                    function _onesj(){
                    	var cdata=config.datas,qurl=config.url.hqURL;
                    	var urlONE=jysURL[index].oneURL.replace("$cb","var "+config.params.bb+"=");
                    	wn_varLoader(urlONE,function(){ 
                            var data_one=window[config.params.bb];
                            var len=data_one.result.data.length;
                            for(var j=0;j<len;j++){
                                var symbolOne=data_one.result.data[j].SYMBOL,
                                    nameOne=data_one.result.data[j].NAME,
                                    pvOne=Number(j)+1;
                                    changeOne=data_one.result.data[j].CHG+"%";
                                var attOne=[];
                                    attOne.push(symbolOne);attOne.push(nameOne);attOne.push(changeOne);attOne.push(pvOne);
                                    
                                    cdata.one.push(attOne);
                                    cdata.symbolAll[2].push(symbolOne);
                                    if(j<(len-1))	qurl+=symbolOne+',';
									else			qurl+=symbolOne;
                            }
                            _qscyhSymbol(qurl,len,2);
                        })
                    }
                    //5日
                    function _fivesj(){
                    	var cdata=config.datas,qurl=config.url.hqURL;
                    	var urlFIVE=jysURL[index].fiveURL.replace("$cb","var "+config.params.cb+"=");
                    	wn_varLoader(urlFIVE,function(){    
                            var data_five=window[config.params.cb];
                            var len=data_five.result.data.length;
                            for(var k=0;k<len;k++){
                                var symbolFive=data_five.result.data[k].SYMBOL,
                                    nameFive=data_five.result.data[k].NAME,
                                    pvFive=Number(k)+1;
                                    changeFive=data_five.result.data[k].CHG+"%";
                                    var attFive=[];
                                    attFive.push(symbolFive);attFive.push(nameFive);attFive.push(changeFive);attFive.push(pvFive);
                                    cdata.five.push(attFive);
                                    cdata.symbolAll[3].push(symbolFive);
                                    if(k<(len-1))	qurl+=symbolFive+',';
									else			qurl+=symbolFive;
                            }
                            _qscyhSymbol(qurl,len,3);
                        })
                    }
                    function _qscyhSymbol(url_,len_,i_){
			        	var cdata=config.datas,len=len_;
			            wn_varLoader(url_.replace("$random",Math.random()),function(){
			            	len=cdata.symbolAll[i_].length;
			            	
			            	for(var i=0;i<len;i++){
			            		var symbol=cdata.symbolAll[i_][i];
			            		var tmphq=window['hq_str_'+symbol];
			            		var tmparr=[],newp=0,rose=0;
			            		if(tmphq!==''){
			            			tmparr=tmphq.split(',');
			            			if(Number(tmparr[1])==0&&Number(tmparr[4])==0&&Number(tmparr[3])==0&&Number(tmparr[5])==0){
			            				newp='停牌';rose=0;
			            			}else{
			            				newp=parseFloat(tmparr[3]).toFixed(2);
			            				rose=(((newp-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
			            			}
			            		}else{
			            			rose=0;
			            			newp='停牌';
			            		}
			            		if(i_==0){
			            			cdata.now[i].push(newp);cdata.now[i].push(rose);
			            		}else if(i_==1){
			            			cdata.week[i].push(newp);cdata.week[i].push(rose);
			            		}else if(i_==2){
			            			cdata.one[i].push(newp);cdata.one[i].push(rose);
			            		}else if(i_==3){
			            			cdata.five[i].push(newp);cdata.five[i].push(rose);
			            		}
			            	}
			            	_draw(i_);
			            })  
			        }           
                    
                    function _init(){
						_sssj();
						_zsj();
						_onesj();
						_fivesj();
						_dec();
						_asc();
                    };

                        function _draw(i_){
                                var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                                if(i_==0){// 实时数据
	                                var cdata=config.datas.now;
	                                
	                                $("#jysNOW h4").text(jysNAME+"实时关注排行");
	                                $("#jysNowTable table").text("");
	                                $("#jysNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>")
	                                for(var i=0;i<cdata.length;i++){
	                                    var curl=syURL.replace("$symbol",cdata[i][0]);
	                                    $("#jysNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
	                                   if(parseFloat(cdata[i][4])<0){$("#jysNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
	                                   if(parseFloat(cdata[i][4])>0){$("#jysNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                                };
                                }
								if(i_==1){//周数据
	                                $("#jysWEEK h4").text(jysNAME+"本周关注排行");
	                                var cdataWeek=config.datas.week;
	                                $("#jysWeekTable table").text("");
	                                $("#jysWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排名</td>")
	                                for(var i=0;i<cdataWeek.length;i++){
	                                    var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
	                                    $("#jysWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
	                                    if(parseFloat(cdataWeek[i][4])>0){$("#jysWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
	                                    if(parseFloat(cdataWeek[i][4])<0){$("#jysWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	                                }
                                }
                                if(i_==2){//1日加入表格
	                                $("#jysONE h4").text(jysNAME+"用户关注1日变化幅度排行");
	                                var cdataOne=config.datas.one;
	                                $("#jysOneTable table").text("");
	                                $("#jysOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
	                                for(var i=0;i<cdataOne.length;i++){
	                                    var curlone=syURL.replace("$symbol",cdataOne[i][0]);
	                                    $("#jysOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][2]+'</td><td>'+cdataOne[i][3]+'</td></tr>')
	                                    if(parseFloat(cdataOne[i][2])>0){$("#jysOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                                    if(parseFloat(cdataOne[i][2])<0){$("#jysOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	                                }
                                }
                                if(i_==3){//5日加入表格
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
$(document).ready(function(){
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
                            _dPV:[]
                        },
                        dxp:{//大盘股 中盘股 小盘股
                            dPV:[],
                            zPV:[],
                            xPV:[],
                            time:[],
                            _dPV:[],
                            _zPV:[],
                            _xPV:[]
                        },
                        jyc:{//绩优股 绩差股
                        }
                    },
                    params:{
                        gjg:"gjg"
                    },
                    dom:"sccc",
                    url:{
                        gdjURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPVService.getPricePV?type=CN&level=$symbol&callback=$cb",
                        dxpURL:"http://data.finance.sina.com.cn/api/openapi.php/StockPVService.getCRCLPV?type=CN&level=$symbol&callback=$cb"
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
                                color: 'white'
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
                            y:130
                        },
                        dataZoom : {
                            show : true,
                            start : 95,
                            end : 100,
                            handleColor:'#555'
                        },
                        xAxis:[
                            {
                                type:'category',
                                boundaryGap:false,
                                data:config.datas.time,        
                                axisLine:{show:false},
                                axisLabel:{show:true},
                                axisTick:{show:false},
                                splitLine:{
                                	show:true,
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
                            }
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
	                            data:config.datas.gdj.zPV
                            },
                            {
	                            type:'line',
	                            name:"低价股",
	                            data:config.datas.gdj.dPV
                            },
                            {
	                            type:'line',
	                            name:"大盘股",
	                            data:config.datas.dxp.dPV
                            },
                            {
	                            type:'line',
	                            name:"中盘股",
	                            data:config.datas.dxp.zPV
                            },
                            {
	                            type:'line',
	                            name:"小盘股",
	                            data:config.datas.dxp.xPV
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
                                                    var lasti=0,lastj=0;
                                                    for(var j=lastj;j<cdata.gdj.time.length;j++){
                                                        for(var i=lasti;i<cdata.dxp.time.length;i++){
                                                            if(cdata.gdj.time[j]==cdata.dxp.time[i]){
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
                                               _myChart.setOption(_option);
                                            });   
                                        });   
                                    });   
                                });   
                            });         
                        });         
                    };
                    function _loadedData(cdiv,data,ctime){
                        for(var i in data.result.data){
	                        var _PV=data.result.data[i].PV;
	                        var _time=data.result.data[i].DT;
	                        cdiv.push((_PV/1000000).toFixed(2));
	                        ctime.push(_time);
                        };
                        cdiv.reverse();ctime.reverse();
                    };
                    this.init=_init;

                    // 表格显示
                    function scccTables(scccNAME,g,sccc_symbol){
                        var scccURL=[
                            {
                        	    nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=PRICE$symbolH&callback=$cb',
			                    weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=PRICE$symbolW&callback=$cb',
			                    oneURL: 'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=PRICE$symbol1&callback=$cb',
			                    fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=PRICE$symbol5&callback=$cb',
			                    ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=PRICE$symbolA&callback=$cb',
			                    descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=PRICE$symbolD&callback=$cb"
                            },
                            {
                                 nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=CRCL$symbolH&callback=$cb',
			                    weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=CRCL$symbolW&callback=$cb',
			                    oneURL: 'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=CRCL$symbol1&callback=$cb',
			                    fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=CRCL$symbol5&callback=$cb',
			                    ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=CRCL$symbolA&callback=$cb',
			                    descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=CRCL$symbolD&callback=$cb"
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
                                symbolAll:[[],[],[],[]]
                            },
                            params:{
                                cb:"TO"
                            },
                            url:{
                                kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                                hqURL:"http://hq.sinajs.cn/?_=$random&list="
                            }
                        };
                        
                        //大盘股流量实时关注排行
                        function _dpgllss(){
                        	var cdata=config.datas,qurl=config.url.hqURL,
                        	    urlNOW=scccURL[g].nowURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"=");
                        	 wn_varLoader(urlNOW,function(){ 
                                var data_now=window[config.params.cb],len=data_now.result.data.length;
                                //
                                for(var i=0;i<len;i++){
                                    var symbol=data_now.result.data[i].SYMBOL,
                                        name=data_now.result.data[i].NAME,
                                        pv=Number(i)+1;
                                    var attr=[];
                                    attr.push(symbol);attr.push(name);attr.push(pv);
                                    cdata.now.push(attr);
                                    cdata.symbolAll[0].push(symbol);
			                        if(i<(len-1))	qurl+=symbol+',';
			                        else 			qurl+=symbol;
				                }; 
				                _qscyhSymbol(qurl,len,0);
                             })
                        }
	                    //大盘股流量本周关注排行
	                    function _dpgllbz(){
	                    	var cdata=config.datas,qurl=config.url.hqURL,
	                    		urlWEEK=scccURL[g].weekURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"=");
                            wn_varLoader(urlWEEK,function(){  
                                var data_week=window[config.params.cb],len=data_week.result.data.length;
                                for(var j=0;j<len;j++){
                                     var symbolweek=data_week.result.data[j].SYMBOL,
                                         nameweek=data_week.result.data[j].NAME,
                                         pvweek=Number(j)+1;
                                     var attOne=[];
                                         attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
                                            
                                         cdata.week.push(attOne);
                                 		 cdata.symbolAll[1].push(symbolweek);
			                        if(j<(len-1))	qurl+=symbolweek+',';
			                        else 			qurl+=symbolweek;
				                }; 
				                _qscyhSymbol(qurl,len,1);
                            });
	                    }
	                    //大盘股用户关注1日变化幅度排行
	                    function _dpgyhgz1r(){
	                    	var cdata=config.datas,qurl=config.url.hqURL,
	                    		urlONE=scccURL[g].oneURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"=");
                            wn_varLoader(urlONE,function(){ 
                                var data_one=window[config.params.cb],len=data_one.result.data.length;
                                for(var j=0;j<len;j++){
                                    var symbolOne=data_one.result.data[j].SYMBOL,
                                        nameOne=data_one.result.data[j].NAME,
                                        pvOne=Number(j)+1;
                                        
                                        changeOne=Number(data_one.result.data[j].CHG)+"%";
                                    var attOne=[];
                                        attOne.push(symbolOne);attOne.push(nameOne);attOne.push(changeOne);attOne.push(pvOne);
                                        
                                        cdata.one.push(attOne);
                                        cdata.symbolAll[2].push(symbolOne);
			                        if(j<(len-1))	qurl+=symbolOne+',';
			                        else 			qurl+=symbolOne;
				                }; 
				                _qscyhSymbol(qurl,len,2);
                            });
	                    }
	                    //大盘股用户关注5日变化幅度排行
	                    function _dpgyhgz5r(){
	                    	var cdata=config.datas,qurl=config.url.hqURL,
	                    		urlFIVE=scccURL[g].fiveURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"=");
                            wn_varLoader(urlFIVE,function(){    
                                var data_five=window[config.params.cb],len=data_five.result.data.length;
                                for(var k=0;k<len;k++){
                                    var symbolFive=data_five.result.data[k].SYMBOL,
                                        nameFive=data_five.result.data[k].NAME,
                                        pvFive=Number(k)+1;
                                        changeFive=Number(data_five.result.data[k].CHG)+"%";
                                    var attFive=[];
                                        attFive.push(symbolFive);attFive.push(nameFive);attFive.push(changeFive);attFive.push(pvFive);
                                        
                                        cdata.five.push(attFive);
                                        cdata.symbolAll[3].push(symbolFive);
			                        if(k<(len-1))	qurl+=symbolFive+',';
			                        else 			qurl+=symbolFive;
				                }; 
				                _qscyhSymbol(qurl,len,3);
                            })
	                    }
	                    //大盘股用户关注排名连续上升排行
	                    function _dpgyhgzss(){
	                    	var cdata=config.datas,qurl=config.url.hqURL,
	                    		urlASC=scccURL[g].ascURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"=");
                            wn_varLoader(urlASC,function(){ 
                                var data_asc=window[config.params.cb],len=data_asc.result.data.length;
                                for(var k=0;k<len;k++){
                                    var _symbol=data_asc.result.data[k].SYMBOL,
                                        _name=data_asc.result.data[k].NAME,
                                        _days=data_asc.result.data[k].DAYS,
                                        _chg=data_asc.result.data[k].CHG,
                                        _rank=data_asc.result.data[k].RANK;
                                    var attAsc=[];
                                        attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
                                        cdata.asc.push(attAsc);
                                 }   
                                 _drawgzss();      
                            })
	                    }
	                    function _drawgzss(){
	                    	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                            $("#scccASC h4").text(scccNAME+"用户关注排名连续上升排行");
                            var cdataAsc=config.datas.asc;
                            $("#scccAscTable table").text("");
                            $("#scccAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>流量排名</td>")
                            for(var i=0;i<cdataAsc.length;i++){
                                var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                                $("#scccAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                                if(Number(cdataAsc[i][3])>0){$("#scccAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                if(Number(cdataAsc[i][3])<0){$("#scccAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                            }
                        }
	                    //大盘股用户关注排名连续下降排行
	                    function _dpgyhgzxj(){
	                    	var cdata=config.datas,qurl=config.url.hqURL,
	                    		urlDESC=scccURL[g].descURL.replace("$symbol",sccc_symbol).replace("$cb","var "+config.params.cb+"=");
                            wn_varLoader(urlDESC,function(){    
                                var data_desc=window[config.params.cb],len=data_desc.result.data.length;
                                for(var k=0;k<len;k++){
                                    var _symbol=data_desc.result.data[k].SYMBOL,
                                        _name=data_desc.result.data[k].NAME,
                                        _days=data_desc.result.data[k].DAYS,
                                        _chg=Number(data_desc.result.data[k].CHG),
                                        _rank=Number(data_desc.result.data[k].RANK);
                                    var attDesc=[];
                                        attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
                                        cdata.desc.push(attDesc);
                                }
                                _drawgzxj();
                            })
	                    }
	                    function _drawgzxj(){
	                    	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                            $("#scccDESC h4").text(scccNAME+"用户关注排名连续下降排行");
                            var cdataDesc=config.datas.desc;
                            $("#scccDescTable table").text("");
                            $("#scccDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>流量排名</td>")
                            for(var i=0;i<cdataDesc.length;i++){
                                var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                                $("#scccDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                                if(Number(cdataDesc[i][3])>0){$("#scccDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                if(Number(cdataDesc[i][3])<0){$("#scccDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                            }
	                    }
	                    function _qscyhSymbol(url_,len_,i_){
				        	var cdata=config.datas,len=len_;
				            wn_varLoader(url_.replace("$random",Math.random()),function(){
				            	len=cdata.symbolAll[i_].length;
				            	
				            	for(var i=0;i<len;i++){
				            		var symbol=cdata.symbolAll[i_][i];
				            		var tmphq=window['hq_str_'+symbol];
				            		var tmparr=[],newp=0,rose=0;
				            		if(tmphq!==''){
				            			tmparr=tmphq.split(',');
				            			if(Number(tmparr[1])==0&&Number(tmparr[4])==0&&Number(tmparr[3])==0&&Number(tmparr[5])==0){
				            				newp='停牌';rose=0;
				            			}else{
				            				newp=parseFloat(tmparr[3]).toFixed(2);
				            				rose=(((newp-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
				            			}
				            		}else{
				            			newp='停牌';
				            		}
				            		if(i_==0){
				            			cdata.now[i].push(newp);cdata.now[i].push(rose);
				            		}else if(i_==1){
				            			cdata.week[i].push(newp);cdata.week[i].push(rose);
				            		}else if(i_==2){
				            			cdata.one[i].push(newp);cdata.one[i].push(rose);
				            		}else if(i_==3){
				            			cdata.five[i].push(newp);cdata.five[i].push(rose);
				            		}
				            	}
				            	_draw(i_);
				            })  
				        }
                        function _init(){
                        	_dpgllss();
                        	_dpgllbz();
                        	_dpgyhgz1r();
                        	_dpgyhgz5r();
                        	_dpgyhgzss();
                            _dpgyhgzxj();
                        };

                        function _draw(i_){
                            var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                            
                            if(i_==0){
                                var cdata=config.datas.now;
                                $("#scccNOW h4").text(scccNAME+"流量实时关注排行");
                                $("#scccNowTable table").text("");
                                $("#scccNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>流量排行</td>")
                                for(var i=0;i<cdata.length;i++){
                                    var curl=syURL.replace("$symbol",cdata[i][0]);
                                    $("#scccNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
                                   if(parseFloat(cdata[i][4])<0){$("#scccNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
                                   if(parseFloat(cdata[i][4])>0){$("#scccNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                };
                            }
							if(i_==1){
                            	$("#scccWEEK h4").text(scccNAME+"流量本周关注排行");
                                var cdataWeek=config.datas.week;
                                $("#scccWeekTable table").text("");
                                $("#scccWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>流量排行</td>")
                                for(var i=0;i<cdataWeek.length;i++){
                                    var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
                                    $("#scccWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
                                    if(parseFloat(cdataWeek[i][4])>0){$("#scccWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
                                    if(parseFloat(cdataWeek[i][4])<0){$("#scccWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }
                            }
                            if(i_==2){
                                $("#scccONE h4").text(scccNAME+"用户关注1日变化幅度排行");
                                var cdataOne=config.datas.one;
                                $("#scccOneTable table").text("");
                                $("#scccOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
                                for(var i=0;i<cdataOne.length;i++){
                                    var curlone=syURL.replace("$symbol",cdataOne[i][0]);
                                    $("#scccOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][2]+'</td><td>'+cdataOne[i][3]+'</td></tr>')
                                    if(parseFloat(cdataOne[i][2])>0){$("#scccOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                                    if(parseFloat(cdataOne[i][2])<0){$("#scccOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                                }
                            }
                            if(i_==3){
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
                }
                var scc=new scccChart();
                    scc.init();
            }
            sccc();
        };
        navC++;
    })
});

//第四ab 市场行业分析
// 行业图表及领涨概念
//schyTable显示表格数据

$(document).ready(function(){
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
            				schy_symbol:[]
            			}
            		},
            		params:{
            			schy_cb:"schy",
            			schySymbol_cb:"schySYMBOL"
            		},
            		dom:{
            			schy:"schy"
            		},
            		url:{
            			schyURL:"http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/MoneyFlow.ssl_bkzj_bk?page=1&num=100&sort=netamount&asc=0&fenlei=0&callback=$cb",
            			schySymbolURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListHY?type=CN&callback=$cb',
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
        			            color: 'white'
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
            				y:40,
            				y2:60
            			},
            			xAxis:[
            			{
            				type:"value",
            				power: 1,
            				precision: 2,
            				name:'行业涨跌幅',
                            nameTextStyle:{
                                color: 'red'
                            },
            				splitNumber:3,
            				scale:true,
                            boundaryGap:[0.05, 0.05],
            				axisLine:{
                                show:true,
                                lineStyle:{
                                color:'rgba(215,215,215,0.5)',
                                type:'dotted'
                            }
                            },
                            axisLabel : {
                                show:true,
                                formatter:function(value){return (value)+'%'}
                            },
                            axisTick : {show:false
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
                                 color: 'red'
                            },
            				scale:true,
            				boundaryGap: [0.05, 0.05],
            				splitNumber:4,
            				axisLine:{
                                show:true,
                                lineStyle:{
                                    color: 'rgba(215,215,215,0.5)',
                                    type:'dotted'
                                }
                            },
                            splitArea : {
                                show: false
                            },
                           splitLine:{
                                show:true,
                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                            },
            				axisLabel:{
            					formatter:function(value){return (Number(value)+10)+'元'}
            					       }
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
            			var cdata=config.datas.schy,len=data_schySymbol.result.data.length;
            			for(var i=0;i<len;i++){
	            			var _symbol=data_schySymbol.result.data[i].PV;
	            			var _code=data_schySymbol.result.data[i].CODE;
	            			var tt=[];
	                        if(_code!="new_stock"){
	                            tt.push(_code);tt.push(_symbol);
	                             cdata.schy_symbol.push(tt)
	                        }
            			};
            		}

            		function _loadedData(){
            			var color=['rgba(245,69,69,0.9)','rgba(255,128,128,0.8)','rgba(124,210,154,0.8)','rgba(35,166,76,1)',];
            			var cdata=config.datas.schy,len=data.result.data.length;
            				for(var i=0;i<len;i++){
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

                            for(var j=0;j<cdata.schy_symbol.length;j++){
            				    for(var i=0;i<cdata.schy.length;i++){
            					    	if(cdata.schy_symbol[j][0]==cdata.schy[i][3]){
            					      		 cdata.schy_end[j]={
            					       			 name:cdata.schy[i][2], 
            					                 value:[cdata.schy[i][0],(cdata.schy[i][1]-10)],
            					                 cate:[cdata.schy[i][3]],
            					                 symbolSize:Math.sqrt(cdata.schy_symbol[j][1])/50/10,
            					                 itemStyle:{
    					                       		 normal:{
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
            			            	}
            			          } 
            	             };
            	             _draw();
            		
            		//初始领涨行业走势
            			(function(){
            				var max=cdata.schy_end[0].value[0];
            				var k,max_cate,max_name;
            				for(var i=0;i<cdata.schy_end.length;i++){
            					if(max<=cdata.schy_end[i].value[0]){
            						k=i;
            						max=cdata.schy_end[i].value[0];
            						max_cate=cdata.schy_end[i].cate;
            						max_name=cdata.schy_end[i].name}
            				};
            				window.schyNAME=max_name;
            				window.schyCATE=max_cate;
            				var slchart_pri=new schy_sub();
            				 	slchart_pri.schy_subChart.init();
            				var schytable=new schyTable();
            				 	schytable.init();
            			})();
            		};
            		function _draw(){
            			_myChart.setOption(_option);
            		};
            		var ecConfig =echarts.config.EVENT;
            			function clickes(par){
            				 if (typeof par.seriesIndex != 'undefined') {
            				 	window.schyCATE=par.data.cate;
            				 	window.schyNAME=par.data.name;
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
            			bk:window.schyCATE
            		},
            		dom:{
            			main:"schy_sub"
            		},
            		url:{
            			urlPrice: "http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/MoneyFlow.ssl_bkzj_zjlrqs?page=1&num=500&sort=opendate&asc=0&bankuai=$bk&callback=$cb",
            			urlPV:'http://data.finance.sina.com.cn/api/openapi.php/StockPVService.getHYPV?type=CN&hy=$bk&callback=$cb'
            		}
            	};
        		function schy_subChart(){
        			var _myChart=echarts.init(document.getElementById(config.dom.main));
                    var ncURL="http://vip.stock.finance.sina.com.cn/moneyflow/#!bk!0/$bk";
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
                            y:30
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
                            y:5
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
					                show:true
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
                                axisTick : {show:false
                            },
					            splitArea : {
					                show: true,
					                areaStyle:{
					                    color:['#F7F7F7','#F0F0F0']
					                }
					            }
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
					            }
					        }
					      ],
				      series : [
				        	{
				        		name:'均价',
				            	type:'line',
								itemStyle: {normal: {color:"rgb(61,163,238)"}},
				            	data:config.datas.schy.price         
				            },
				            {
				            	name:'用户关注',
				           		type:'line',
				            	yAxisIndex:1,
				            	data:config.datas.schy.PV    
				           }
				           
				        ]
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

        			function _loadedPriceData(){
        				var cdata=config.datas,len=data_schySUB.result.data.length;
        				for(var i=0;i<len;i++){
        					var xdate = data_schySUB.result.data[i].opendate;
        					var avg_price= data_schySUB.result.data[i].avg_price;
        					cdata.dates.push(xdate);
        					cdata.avg_prices.push(avg_price);
        				}
        				cdata.dates.reverse();
        				cdata.avg_prices.reverse();
        			};
        			function _loadedPVData(){
        				var cdata=config.datas,len=data_schyPV.result.data.length;
        				for(var i=0;i<len;i++){
        					 var xdate = data_schyPV.result.data[i].DT;
        					 var xpv= data_schyPV.result.data[i].PV;
        					 cdata.PV.push(((xpv)/10000).toFixed(2));
        					 cdata.PV_time.push(xdate);
        				}
        				cdata.PV.reverse();
        				cdata.PV_time.reverse();
        				// 删除PV假期及周末数据
        				
                        var lasti=0,lastj=0;
                        for(var j=lastj;j<cdata.dates.length;j++){
                            for(var i=lasti;i<cdata.PV_time.length;i++){
                                if(cdata.dates[j]==cdata.PV_time[i]){
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
        				_myChart.setOption(_option);
        			}
        			 this.init=_init;
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
            			symbolAll:[[],[],[],[]]
            		},
            		params:{
            			hy:window.schyCATE,
            			ab:'hyNOW',
            			week:'hyWEEK',
            			bb:'hyONE',
            			cb:'hyFIVE',
            			asc:'hyASC',
            			desc:'hyDESC'
            		},
            		url:{
            			nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=$hyH&callback=$cb',
	                    weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=$hyW&callback=$cb',
	                    oneURL: 'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=$hy1&callback=$cb',
	                    fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=$hy5&callback=$cb',
	                    ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=$hyA&callback=$cb',
	                    descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=$hyD&callback=$cb",
            			kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                        hqURL:"http://hq.sinajs.cn/?_=$random&list="
            		}
            	};
            	
            	//实时关注排行
            	function _ssgz(){
            		var cdata=config.datas,qurl=config.url.hqURL;
            		var urlNOW=config.url.nowURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.ab+"=");
            		wn_varLoader(urlNOW,function(){
        				var data_now=window[config.params.ab],len=data_now.result.data.length;
        				for(var i=0;i<len;i++){
    						var symbol=data_now.result.data[i].SYMBOL,
    							name=data_now.result.data[i].NAME,
    							pv=Number(i)+1;
    						var attr=[];
    						attr.push(symbol);attr.push(name);attr.push(pv);
    						cdata.now.push(attr);
    						cdata.symbolAll[0].push(symbol);
		                        if(i<(len-1))	qurl+=symbol+',';
		                        else 			qurl+=symbol;
		                }; 
		                _qscyhSymbol(qurl,len,0);
            		});
            	}
            	//本周关注排行
            	function _bzgz(){
            		var cdata=config.datas,qurl=config.url.hqURL;
            		var urlWEEK=config.url.weekURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.week+"=");
            		wn_varLoader(urlWEEK,function(){	
    					var data_week=window[config.params.week],len=data_week.result.data.length;
    					for(var j=0;j<len;j++){
    						var symbolweek=data_week.result.data[j].SYMBOL,
    							nameweek=data_week.result.data[j].NAME,
    							pvweek=Number(j)+1;
    							var attOne=[];
    							attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
    							cdata.week.push(attOne);
                                cdata.symbolAll[1].push(symbolweek);
		                        if(j<(len-1))	qurl+=symbolweek+',';
		                        else 			qurl+=symbolweek;
		                }; 
		                _qscyhSymbol(qurl,len,1);
        			})
            	}
            	//用户关注1日变化幅度排行
            	function _orgz(){
            		var cdata=config.datas,qurl=config.url.hqURL;
            		var urlONE=config.url.oneURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.bb+"=");
            		wn_varLoader(urlONE,function(){	
    					var data_one=window[config.params.bb],len=data_one.result.data.length;
    					for(var j=0;j<len;j++){
    						var symbolOne=data_one.result.data[j].SYMBOL,
    							nameOne=data_one.result.data[j].NAME,
    							pvOne=Number(j)+1;
                                chanegOne=data_one.result.data[j].CHG+"%";
    							var attOne=[];
    							attOne.push(symbolOne);attOne.push(nameOne);attOne.push(pvOne);attOne.push(chanegOne);
    							cdata.one.push(attOne);
    							cdata.symbolAll[2].push(symbolOne);
		                        if(j<(len-1))	qurl+=symbolOne+',';
		                        else 			qurl+=symbolOne;
		                }; 
		                _qscyhSymbol(qurl,len,2);
            		});
            	}
            	//用户关注5日变化幅度排行
            	function _frgz(){
            		var cdata=config.datas,qurl=config.url.hqURL;
            		var urlFIVE=config.url.fiveURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.cb+"=");
            		wn_varLoader(urlFIVE,function(){	
						var data_five=window[config.params.cb],len=data_five.result.data.length;
						for(var k=0;k<len;k++){
							var symbolFive=data_five.result.data[k].SYMBOL,
								nameFive=data_five.result.data[k].NAME,
								pvFive=Number(k)+1;
                                chanegFive=data_five.result.data[k].CHG+"%";
								var attFive=[];
								attFive.push(symbolFive);attFive.push(nameFive);attFive.push(pvFive);attFive.push(chanegFive);
								
								cdata.five.push(attFive);
								cdata.symbolAll[3].push(symbolFive);
		                        if(k<(len-1))	qurl+=symbolFive+',';
		                        else 			qurl+=symbolFive;
		                }; 
		                _qscyhSymbol(qurl,len,3);
    				})
            	}
            	//用户关注排名连续上升排行
            	function _asc(){
            		var cdata=config.datas,qurl=config.url.hqURL;
            		var urlASC=config.url.ascURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.asc+"=");
            		wn_varLoader(urlASC,function(){	
						var data_asc=window[config.params.asc],len=data_asc.result.data.length;
						for(var k=0;k<len;k++){
							var _symbol=data_asc.result.data[k].SYMBOL,
								_name=data_asc.result.data[k].NAME,
								_days=data_asc.result.data[k].DAYS,
								_chg=data_asc.result.data[k].CHG,
								_rank=data_asc.result.data[k].RANK;
							var attAsc=[];
								attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
								cdata.asc.push(attAsc);
						}
						_drawasc();
					});
            	}
            	function _drawasc(){
            		var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    $("#schyASC h4").text(schyNAME+"用户关注排名连续上升排行");
                    var cdataAsc=config.datas.asc;
                    $("#schyAscTable table").text("");
                    $("#schyAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>")
                    for(var i=0;i<cdataAsc.length;i++){
                        var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                        $("#schyAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                        if(Number(cdataAsc[i][3])>0){$("#schyAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(Number(cdataAsc[i][3])<0){$("#schyAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }

            	}
            	//用户关注排名连续下降排行
            	function _desc(){
            		var cdata=config.datas,qurl=config.url.hqURL;
            		var urlDESC=config.url.descURL.replace("$hy",config.params.hy).replace("$cb","var "+config.params.desc+"=");
            		wn_varLoader(urlDESC,function(){	
						var data_desc=window[config.params.desc],len=data_desc.result.data.length;
						for(var k=0;k<len;k++){
							var _symbol=data_desc.result.data[k].SYMBOL,
								_name=data_desc.result.data[k].NAME,
								_days=data_desc.result.data[k].DAYS,
								_chg=data_desc.result.data[k].CHG,
								_rank=data_desc.result.data[k].RANK;
							var attDesc=[];
								attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
								
								cdata.desc.push(attDesc);
						}
						_drawdesc();
					});
            	}
            	function _drawdesc(){
            		var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    $("#schyDESC h4").text(schyNAME+"用户关注排名连续下降排行");
                    var cdataDesc=config.datas.desc;
                    $("#schyDescTable table").text("");
                    $("#schyDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
                    for(var i=0;i<cdataDesc.length;i++){
                        var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                        $("#schyDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                        if(Number(cdataDesc[i][3])>0){$("#schyDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(Number(cdataDesc[i][3])<0){$("#schyDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }
            	}
            	
            	
            	function _qscyhSymbol(url_,len_,i_){
		        	var cdata=config.datas,len=len_;
		            wn_varLoader(url_.replace("$random",Math.random()),function(){
		            	len=cdata.symbolAll[i_].length;
		            	
		            	for(var i=0;i<len;i++){
		            		var symbol=cdata.symbolAll[i_][i];
		            		var tmphq=window['hq_str_'+symbol];
		            		var tmparr=[],newp=0,rose=0;
		            		if(tmphq!==''){
		            			tmparr=tmphq.split(',');
		            			if(Number(tmparr[1])==0&&Number(tmparr[4])==0&&Number(tmparr[3])==0&&Number(tmparr[5])==0){
		            				newp='停牌';rose=0;
		            			}else{
		            				newp=parseFloat(tmparr[3]).toFixed(2);
		            				rose=(((newp-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
		            			}
		            		}else{
		            			newp='停牌';
		            		}
		            		if(i_==0){
		            			cdata.now[i].push(newp);cdata.now[i].push(rose);
		            		}else if(i_==1){
		            			cdata.week[i].push(newp);cdata.week[i].push(rose);
		            		}else if(i_==2){
		            			cdata.one[i].push(newp);cdata.one[i].push(rose);
		            		}else if(i_==3){
		            			cdata.five[i].push(newp);cdata.five[i].push(rose);
		            		}
		            	}
		            	_draw(i_);
		            })  
		        }
            	function _init(){
            		_ssgz();
            		_bzgz();
            		_orgz();
            		_frgz();
            		_asc();	
            		_desc();
            	};

            	function _draw(i_){
            		var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
            		
            		if(i_==0){
	                    var cdata=config.datas.now;
	                    $("#schyNOW h4").text(schyNAME+"实时关注排行");
	                    $("#schyNowTable table").text("");
	                    $("#schyNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
	                    for(var i=0;i<cdata.length;i++){
	                        var curl=syURL.replace("$symbol",cdata[i][0]);
	                        $("#schyNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
	                       if(parseFloat(cdata[i][4])<0){$("#schyNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
	                       if(parseFloat(cdata[i][4])>0){$("#schyNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                    };
	                }
					if(i_==1){
	                    $("#schyWEEK h4").text(schyNAME+"本周关注排行");
	                    var cdataWeek=config.datas.week;
	                    $("#schyWeekTable table").text("");
	                    $("#schyWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
	                    for(var i=0;i<cdataWeek.length;i++){
	                        var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
	                        $("#schyWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
	                        if(parseFloat(cdataWeek[i][4])>0){$("#schyWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
	                        if(parseFloat(cdataWeek[i][4])<0){$("#schyWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	                    }
                    }
                    if(i_==2){
	                    $("#schyONE h4").text(schyNAME+"用户关注1日变化幅度排行");
	                    var cdataOne=config.datas.one;
	                    $("#schyOneTable table").text("");
	                    $("#schyOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
	                    for(var i=0;i<cdataOne.length;i++){
	                        var curlone=syURL.replace("$symbol",cdataOne[i][0]);
	                        $("#schyOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][3]+'</td><td>'+cdataOne[i][2]+'</td></tr>')
	                        if(parseFloat(cdataOne[i][3])>0){$("#schyOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                        if(parseFloat(cdataOne[i][3])<0){$("#schyOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	                    }
                    }
                    if(i_==3){
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
                    }
            	};
            	this.init=_init;
            };
        };navD++;
    })
});


//第五tab 市场概念分析
// 概念图表及领涨概念
//scgnTable显示表格数据
$(document).ready(function(){
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
            			scgnSymbolURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getListGN?type=CN&callback=$cb",
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
            				y:30,
            				y2:60
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
                            name:'行业涨跌幅',
                            nameTextStyle:{
                                color: 'red'
                            },
                            splitNumber:3,
                            scale:true,
                            boundaryGap:[0.05, 0.05],
                            axisLine:{
                                show:true,
	                                lineStyle:{
	                                color:'rgba(215,215,215,0.5)',
	                                type:'dotted'
                            	}
                            },
                            axisLabel : {
                                show:true,
                                formatter:function(value){return (value)+'%'}
                            },
                            axisTick : {show:false },
                            splitLine:{
                                show:true,
                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                            }
                        }],
                        yAxis:[
                        {
                            type:"value",
                            name:'行业均价',
                            nameTextStyle:{color: 'red'},
                            scale:true,
                            boundaryGap: [0.05, 0.05],
                            splitNumber:4,
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color: 'rgba(215,215,215,0.5)',
                                    type:'dotted'
                                }
                            },
                            splitArea : {
                                show: false
                            },
                           splitLine:{
                                show:true,
                                lineStyle:{color: ['#ccc'], width: 1, type: 'dashed'}
                            },
                            axisLabel:{
                                formatter:function(value){return (Number(value)+10)+'元'}
                            }
                        }],
            			series:[{
            				type:'scatter',
            				data:config.datas.scgn.scgn_end
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
        							//console.log(data_scgnSymbol,data);
        							_loadedData(data);			
        						})
            				});			
            		};
            		function _loadedDataSymbol(){
            			var cdata=config.datas.scgn,len=data_scgnSymbol.result.data.length;
            			for(var i=0;i<len;i++){
	            			var _symbol=data_scgnSymbol.result.data[i].PV;
	            			var _code=data_scgnSymbol.result.data[i].CODE;
	            			var tt=[];
	            			tt.push(_code);tt.push(_symbol);
	            			cdata.scgn_symbol.push(tt);
            			};
            		}

            		function _loadedData(){
            			var color=['rgba(245,69,69,0.9)','rgba(255,128,128,0.8)','rgba(124,210,154,0.8)','rgba(35,166,76,1)',];
            			var cdata=config.datas.scgn,len=data.result.data.length;
        				for(var i=0;i<len;i++){
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
        				var f=0,lg;
        				for(i=0;i<cdata.scgn.length;i++){
        					for(var j=0;j<cdata.scgn_symbol.length;j++){
    					    	if(cdata.scgn[i][3]==cdata.scgn_symbol[j][0]){
    					    		var size;
    					    		if(f==0){
    					    			lg=Math.sqrt(cdata.scgn_symbol[j][1])/150;
    					    			f=1;
    					    			size=100;
    					    		}else{
    					    			size=Math.sqrt(cdata.scgn_symbol[j][1])/lg;
    					    		}
    					    		size=size/2;
    					    		
    					    		var obj={
    					       			 name:cdata.scgn[i][2], 
    					                 value:[cdata.scgn[i][0],(cdata.scgn[i][1]-10)],
    					                 cate:[cdata.scgn[i][3]],
    					                 symbolSize:size,
    					                 itemStyle:{
				                       		 normal:{	                            
		                            			color:function(){
		                               				if(cdata.scgn[i][0]>=0.2) {return color[0]}
		                                      	    else if(cdata.scgn[i][0]>0&&cdata.scgn[i][0]<0.2) { return color[1]}
		                                    	    else if(cdata.scgn[i][0]>-0.8&&cdata.scgn[i][0]<=0) {return color[2]}
		                                            else if(cdata.scgn[i][0]<=-0.8) {return color[3]}
		                                        }()
		                                     }
    			                         }
    			               		};
    			               		
    			               		cdata.scgn_end.push(obj);
    			               		break;
    			            	}
        			        } 
        	            };
            	        _draw();
            		
            		    //初始领涨行业走势

            			(function(){
            				var max=cdata.scgn_end[0].symbolSize;//.value[0];
            				var k,max_cate=cdata.scgn_end[0].cate,max_name=cdata.scgn_end[0].name;
            				//for(var i=0;i<cdata.scgn_end.length;i++){
            				//	if(max<=cdata.scgn_end[i].symbolSize){//.value[0]){
            				//		k=i;
            				//		max=cdata.scgn_end[i].symbolSize;//value[0];
            				//		max_cate=cdata.scgn_end[i].cate;
            				//		max_name=cdata.scgn_end[i].name;
            				//	}
            				//};
            				window.scgnNAME=max_name;
            				window.scgnCATE=max_cate[0];
            				var slchart_pri=new scgn_sub();
            				 	slchart_pri.scgn_subChart.init();
            				var scgntable=new scgnTable();
            				 	scgntable.init();
            			})();
            		};
            		function _draw(){
            			_myChart.setOption(_option);
            		};
            		var ecConfig =echarts.config.EVENT;
            			function clickes(par){
            				 if (typeof par.seriesIndex != 'undefined') {
            				 	window.scgnCATE=par.data.cate[0];
            				 	window.scgnNAME=par.data.name;
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
            			bk:window.scgnCATE
            		},
            		dom:{
            			main:"scgn_sub"
            		},
            		url:{
            			urlPrice: "http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/MoneyFlow.ssl_bkzj_zjlrqs?page=1&num=629&sort=opendate&asc=0&bankuai=1%2F$bk&callback=$cb",
            			urlPV:'http://data.finance.sina.com.cn/api/openapi.php/StockPVService.getGNPV?type=CN&gn=$bk&callback=$cb'
            		}
            		
            	};
            		function scgn_subChart(){
            			 var ncURL="http://vip.stock.finance.sina.com.cn/moneyflow/#!bk!1/$bk";
            			var _myChart=echarts.init(document.getElementById(config.dom.main));
            			var _option={
            					        tooltip : {
            					        trigger: 'item',
            					        formatter: function(value){
            					            return '日期：'+value[1]+'<br>'+
            					                    '均价:'+value[2]+'元';
            					            }
            					        },
        					            grid:{
        									x:100,
                                            y:20
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
                                            y:5
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
	        						                lineStyle:{color: '#48b', width: 2}                
	
	        						            },
	        						            axisLabel : {
	        						                show:true
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
        							                lineStyle:{color: '#ccc', width: 2}              

        							            },
        							            splitArea : {
        							                show: true,
        							                areaStyle:{
        							                    color:['#F7F7F7','#F0F0F0']
        							                }
        							            }
        							        },
        							        {
        							        	type : 'value',
        							            power: 1,
        							            precision: 2,
        							            name:'用户关注',
        							            scale:true,
        							            axisLine:{
        							                show:true,
        							                lineStyle:{color: '#ccc', width: 2}             
        							            },
        							            splitArea : {
        							                show: true,
        							                areaStyle:{
        							                    color:['#F7F7F7','#F0F0F0']
        							                }
        							            }
        							        }
        							      ],
        						      series : [
        						           {	name:'均价',
        						            	type:'line',
        										itemStyle: {normal: {color:"rgb(61,163,238)"}},
        						            	data:config.datas.scgn.price       
        						           },
        						           {	name:'用户关注',
        						            	type:'line',
        						            	yAxisIndex:1,
        						            	data:config.datas.scgn.PV        
        						           }
        						        ]
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

            			function _loadedPriceData(){
            				var cdata=config.datas,len=data_scgnSUB.result.data.length;
            				for(var i=0;i<len;i++){
            					var xdate = data_scgnSUB.result.data[i].opendate;
            					var avg_price= data_scgnSUB.result.data[i].avg_price;
            					cdata.dates.push(xdate);
            					cdata.avg_prices.push(avg_price);

            				}
            				cdata.dates.reverse();
            				cdata.avg_prices.reverse();
            			};
            			function _loadedPVData(){
            				var cdata=config.datas,len=data_scgnPV.result.data.length;
            				for(var i=0;i<len;i++){
            					 var xdate = data_scgnPV.result.data[i].DT;
            					 var xpv= (data_scgnPV.result.data[i].PV/10000).toFixed(0);
            					 cdata.PV.push(xpv);
            					 cdata.PV_time.push(xdate);
            				}
            				cdata.PV.reverse();
            				cdata.PV_time.reverse();
            				// 删除PV假期及周末数据
            				
                             var lasti=0,lastj=0;
                             for(var j=lastj;j<cdata.dates.length;j++){
                                for(var i=lasti;i<cdata.PV_time.length;i++){
                                    if(cdata.dates[j]==cdata.PV_time[i]){
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
                            $("#scgnTEXT").html("<a target='_blank' href='"+ncURL.replace("$bk",window.scgnCATE)+"'>"+window.scgnNAME+"</a>"+" 逐日均价变化趋势");
            				_myChart.setOption(_option);
            			}

            			 this.init=_init;
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

            			symbolAll:[[],[],[],[]]
            		},
            		params:{
            			gn:window.scgnCATE,
            			ab:'NOW',
            			week:'WEEK',
            			bb:'ONE',
            			cb:'FIVE',
            			asc:'ASC',
            			desc:'DESC'
            		},
            		url:{
            			nowURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=$gnH&callback=$cb',
	                    weekURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getGZD?code=$gnW&callback=$cb',
	                    oneURL: 'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=$gn1&callback=$cb',
	                    fiveURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCMP?code=$gn5&callback=$cb',
	                    ascURL:'http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=$gnA&callback=$cb',
	                    descURL:"http://data.finance.sina.com.cn/api/openapi.php/StockListService.getCHG?code=$gnD&callback=$cb",
            			kURL:"http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$day",
                        hqURL:"http://hq.sinajs.cn/?_=$random&list="
            		}
            	};
            	
            	function _qscyhSymbol(url_,len_,i_){
		        	var cdata=config.datas,len=len_;
		            wn_varLoader(url_.replace("$random",Math.random()),function(){
		            	len=cdata.symbolAll[i_].length;
		            	
		            	for(var i=0;i<len;i++){
		            		var symbol=cdata.symbolAll[i_][i];
		            		var tmphq=window['hq_str_'+symbol];
		            		var tmparr=[],newp=0,rose=0;
		            		if(tmphq!==''){
		            			tmparr=tmphq.split(',');
		            			if(Number(tmparr[1])==0&&Number(tmparr[4])==0&&Number(tmparr[3])==0&&Number(tmparr[5])==0){
		            				newp='停牌';rose=0;
		            			}else{
		            				newp=parseFloat(tmparr[3]).toFixed(2);
		            				rose=(((newp-tmparr[2])/tmparr[2])*100).toFixed(2)+"%";
		            			}
		            		}else{
		            			newp='停牌';
		            		}
		            		if(i_==0){
		            			cdata.now[i].push(newp);cdata.now[i].push(rose);
		            		}else if(i_==1){
		            			cdata.week[i].push(newp);cdata.week[i].push(rose);
		            		}else if(i_==2){
		            			cdata.one[i].push(newp);cdata.one[i].push(rose);
		            		}else if(i_==3){
		            			cdata.five[i].push(newp);cdata.five[i].push(rose);
		            		}
		            	}
		            	_draw(i_);
		            })  
		        }
		        
		        //实时关注排行
		        function _ss(){
		        	var cdata=config.datas,qurl=config.url.hqURL;
            		var urlNOW=config.url.nowURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.ab+"=");
		        	wn_varLoader(urlNOW,function(){	
            			var data_now=window[config.params.ab],len=data_now.result.data.length;
        				for(var i=0;i<len;i++){
    						var symbol=data_now.result.data[i].SYMBOL,
    							name=data_now.result.data[i].NAME,
    							pv=Number(i)+1;
    						var attr=[];
    						attr.push(symbol);attr.push(name);attr.push(pv);
    						cdata.now.push(attr);
    						cdata.symbolAll[0].push(symbol);
                                if(i<(len-1))	qurl+=symbol+',';
								else			qurl+=symbol;
                        };
                        _qscyhSymbol(qurl,len,0);
            		})
		        }
		        //本周关注排行
		        function _bz(){
		        	var cdata=config.datas,qurl=config.url.hqURL;
		        	var urlWEEK=config.url.weekURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.week+"=");
		        	wn_varLoader(urlWEEK,function(){	
    					var data_week=window[config.params.week],len=data_week.result.data.length;
    					for(var j=0;j<len;j++){
    						var symbolweek=data_week.result.data[j].SYMBOL,
    							nameweek=data_week.result.data[j].NAME,
    							pvweek=Number(j)+1;
    							var attOne=[];
    							attOne.push(symbolweek);attOne.push(nameweek);attOne.push(pvweek);
    							
    							cdata.week.push(attOne);
                                cdata.symbolAll[1].push(symbolweek);
                                if(j<(len-1))	qurl+=symbolweek+',';
								else			qurl+=symbolweek;
                        };
                        _qscyhSymbol(qurl,len,1);
    				})
		        }
		        //1日
		        function _or(){
		        	var cdata=config.datas,qurl=config.url.hqURL;
		        	var urlONE=config.url.oneURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.bb+"=");
		        	wn_varLoader(urlONE,function(){ 
                        var data_one=window[config.params.bb],len=data_one.result.data.length;
                        for(var j=0;j<len;j++){
                            var symbolOne=data_one.result.data[j].SYMBOL,
                                nameOne=data_one.result.data[j].NAME,
                                pvOne=Number(j)+1;
                                chanegOne=data_one.result.data[j].CHG+"%";
                            var attOne=[];
                                attOne.push(symbolOne);attOne.push(nameOne);attOne.push(pvOne);attOne.push(chanegOne);
                                
                                cdata.one.push(attOne);
                                cdata.symbolAll[2].push(symbolOne);
                                if(j<(len-1))	qurl+=symbolOne+',';
								else			qurl+=symbolOne;
                        };
                        _qscyhSymbol(qurl,len,2);
                    })
		        }
		        //5日
				function _fr(){
					var cdata=config.datas,qurl=config.url.hqURL;
					var urlFIVE=config.url.fiveURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.cb+"=");
					wn_varLoader(urlFIVE,function(){    
                        var data_five=window[config.params.cb],len=data_five.result.data.length;
                        for(var k=0;k<len;k++){
                            var symbolFive=data_five.result.data[k].SYMBOL,
                                nameFive=data_five.result.data[k].NAME,
                                pvFive=Number(k)+1;
                                chanegFive=data_five.result.data[k].CHG+"%";
                            var attFive=[];
                                attFive.push(symbolFive);attFive.push(nameFive);attFive.push(pvFive);attFive.push(chanegFive);
                                
                                cdata.five.push(attFive);
                                cdata.symbolAll[3].push(symbolFive);
                                if(k<(len-1))	qurl+=symbolFive+',';
								else			qurl+=symbolFive;
                        };
                        _qscyhSymbol(qurl,len,3);
                    })
				}
		        //上升
		        function _sshy(){
		        	var cdata=config.datas,qurl=config.url.hqURL;
		        	var urlASC=config.url.ascURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.asc+"=");
		        	wn_varLoader(urlASC,function(){	
						var data_asc=window[config.params.asc],len=data_asc.result.data.length;
						for(var k=0;k<len;k++){
							var _symbol=data_asc.result.data[k].SYMBOL,
								_name=data_asc.result.data[k].NAME,
								_days=data_asc.result.data[k].DAYS,
								_chg=data_asc.result.data[k].CHG,
								_rank=data_asc.result.data[k].RANK;
							var attAsc=[];
								attAsc.push(_symbol);attAsc.push(_name);attAsc.push(_days);attAsc.push(_chg);attAsc.push(_rank);
								cdata.asc.push(attAsc);
            			}
            			_sshyDraw();							
            		})
		        }
		        function _sshyDraw(){
		        	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    $("#scgnASC h4").text(scgnNAME+"用户关注排名连续上升排行");
                    var cdataAsc=config.datas.asc;
                    $("#scgnAscTable table").text("");
                    $("#scgnAscTable table").append("<td>代码</td><td>名称</td><td>上升天数</td><td>排名上升</td><td>关注排名</td>")
                    for(var i=0;i<cdataAsc.length;i++){
                        var curlasc=syURL.replace("$symbol",cdataAsc[i][0]);
                        $("#scgnAscTable table").append('<tr><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][0]+'</a></td><td><a target="_blank" href="'+curlasc+'">'+cdataAsc[i][1]+'</a></td><td>'+cdataAsc[i][2]+'</td><td>'+cdataAsc[i][3]+'</td><td>'+cdataAsc[i][4]+'</td></tr>')
                        if(Number(cdataAsc[i][3])>0){$("#scgnAscTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(Number(cdataAsc[i][3])<0){$("#scgnAscTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }
		        }
		        //下降
		        function _xjhy(){
		        	var cdata=config.datas,qurl=config.url.hqURL;
		        	var urlDESC=config.url.descURL.replace("$gn",config.params.gn).replace("$cb","var "+config.params.desc+"=");
		        	wn_varLoader(urlDESC,function(){	
						var data_desc=window[config.params.desc],len=data_desc.result.data.length;
						for(var k=0;k<len;k++){
							var _symbol=data_desc.result.data[k].SYMBOL,
								_name=data_desc.result.data[k].NAME,
								_days=data_desc.result.data[k].DAYS,
								_chg=data_desc.result.data[k].CHG,
								_rank=data_desc.result.data[k].RANK;
							var attDesc=[];
								attDesc.push(_symbol);attDesc.push(_name);attDesc.push(_days);attDesc.push(_chg);attDesc.push(_rank);
								
								cdata.desc.push(attDesc);
						}
						_xjhyDraw();
					})
		        }
		        function _xjhyDraw(){
		        	var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    $("#scgnDESC h4").text(scgnNAME+"用户关注排名连续下降排行");
                    var cdataDesc=config.datas.desc;
                    $("#scgnDescTable table").text("");
                    $("#scgnDescTable table").append("<td>代码</td><td>名称</td><td>下降天数</td><td>排名下降</td><td>关注排名</td>")
                    for(var i=0;i<cdataDesc.length;i++){
                        var curldesc=syURL.replace("$symbol",cdataDesc[i][0]);cdataDesc
                        $("#scgnDescTable table").append('<tr><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][0]+'</a></td><td><a target="_blank" href="'+curldesc+'">'+cdataDesc[i][1]+'</a></td><td>'+cdataDesc[i][2]+'</td><td>'+cdataDesc[i][3]+'</td><td>'+cdataDesc[i][4]+'</td></tr>')
                        if(Number(cdataDesc[i][3])>0){$("#scgnDescTable table tr").eq(i).find("td").eq(3).css("color","red")   }
                        if(Number(cdataDesc[i][3])<0){$("#scgnDescTable table tr").eq(i).find("td").eq(3).css("color","green")   }
                    }
		        }
            	function _init(){
            		_ss();_bz();_or();_fr();_sshy();_xjhy();
            	};

            	 function _draw(i_){
                    var syURL="http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml";
                    
                    if(i_==0){
	                    var cdata=config.datas.now;
	                    $("#scgnNOW h4").text(scgnNAME+"实时关注排行");
	                    $("#scgnNowTable table").text("");
	                    $("#scgnNowTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
	                    for(var i=0;i<cdata.length;i++){
	                        var curl=syURL.replace("$symbol",cdata[i][0]);
	                        $("#scgnNowTable table").append('<tr><td><a target="_blank" href="'+curl+'">'+cdata[i][0]+'</a></td><td><a target="_blank" href="'+curl+'">'+cdata[i][1]+'</a></td><td>'+cdata[i][3]+'</td><td>'+cdata[i][4]+'</td><td>'+cdata[i][2]+'</td></tr>')
	                       if(parseFloat(cdata[i][4])<0){$("#scgnNowTable table tr").eq(i).find("td").eq(3).css("color","green")   };
	                       if(parseFloat(cdata[i][4])>0){$("#scgnNowTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                    };
	                }
					if(i_==1){
	                    $("#scgnWEEK h4").text(scgnNAME+"本周关注排行");
	                    var cdataWeek=config.datas.week;
	                    $("#scgnWeekTable table").text("");
	                    $("#scgnWeekTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>涨跌幅%</td><td>关注排行</td>")
	                    for(var i=0;i<cdataWeek.length;i++){
	                        var curlweek=syURL.replace("$symbol",cdataWeek[i][0]);
	                        $("#scgnWeekTable table").append('<tr><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][0]+'</a></td><td><a target="_blank" href="'+curlweek+'">'+cdataWeek[i][1]+'</a></td><td>'+cdataWeek[i][3]+'</td><td>'+cdataWeek[i][4]+'</td><td>'+cdataWeek[i][2]+'</td></tr>')
	                        if(parseFloat(cdataWeek[i][4])>0){$("#scgnWeekTable table tr").eq(i).find("td").eq(3).css("color","red") }
	                        if(parseFloat(cdataWeek[i][4])<0){$("#scgnWeekTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	                    }
                    }
                    if(i_==2){
	                    $("#scgnONE h4").text(scgnNAME+"用户关注1日变化幅度排行");
	                    var cdataOne=config.datas.one;
	                    $("#scgnOneTable table").text("");
	                    $("#scgnOneTable table").append("<td>代码</td><td>名称</td><td>最新</td><td>变化幅度%</td><td>变化排行</td>")
	                    for(var i=0;i<cdataOne.length;i++){
	                        var curlone=syURL.replace("$symbol",cdataOne[i][0]);
	                        $("#scgnOneTable table").append('<tr><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][0]+'</a></td><td><a target="_blank" href="'+curlone+'">'+cdataOne[i][1]+'</a></td><td>'+cdataOne[i][4]+'</td><td>'+cdataOne[i][3]+'</td><td>'+cdataOne[i][2]+'</td></tr>')
	                        if(parseFloat(cdataOne[i][3])>0){$("#scgnOneTable table tr").eq(i).find("td").eq(3).css("color","red")   }
	                        if(parseFloat(cdataOne[i][3])<0){$("#scgnOneTable table tr").eq(i).find("td").eq(3).css("color","green")   }
	                    }
	                }
                    if(i_==3){
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
	                }
                };
                this.init=_init;
            };
         };navE++;
    })
})


	
