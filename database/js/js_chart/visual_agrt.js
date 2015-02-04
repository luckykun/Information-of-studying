function visual_agrt(param_){
	'use strict';
	
	function getDocument(n,c){
		c=c||document;
		return c.getElementById(n);
	}
	
	function createElement(t){return document.createElement(t);}
	
	function strSplit(str_){
		var str=str_,len=str.length;
		
		str=str.substr(0,len-2);
		return  Number(str);
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
	
	function cloneObject(obj){
		var o = obj.constructor === Array ? [] : {};
		for(var i in obj){
			if(obj.hasOwnProperty(i)){
				o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
			}
		}
		return o;
	}
	
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
	
	function legend(legend_,width_,btn_){
    	var qhlegend=['-4','-3','-2','-1','0','1 ','2','3','4'],legendNum=qhlegend.length,width=width_;
		
	    var lgc=getDocument(legend_);
	    lgc.style.cssFloat='left';
	    lgc.style.styleFloat='left';
	    lgc.style.position='relative';
	    lgc.style.borderTop='1px solid #ccc';
	    lgc.style.margin='10px 0px 0px 0px';
	    lgc.style.padding='10px 0px 0px 0px';
	    lgc.style.width=width+'px';
	    
	  	var lglists=[];
		for(var i=0;i<legendNum;i++){
			var legenddiv=createElement('div');
	 			legenddiv.style.cssFloat='right';
	 			legenddiv.style.styleFloat='right';
				legenddiv.style.width='40px';
				legenddiv.style.height='10px';
				legenddiv.style.padding='2px 2px 2px 2px';
				legenddiv.style.backgroundColor=cfg.color.lc[i];
				legenddiv.style.border="1px solid "+cfg.color.lc[i];
				legenddiv.style.color=cfg.color.lfc[i];
				legenddiv.id=btn_+i;
						
			lgc.appendChild(legenddiv);
			var lgdom=document.getElementById(btn_+i);
			lglists.push(lgdom);
			
			lglists[lglists.length-1].innerHTML=qhlegend[i];
			lglists[lglists.length-1].style.font='12px helvetica,arial,sans-serif';
			
			lglists[lglists.length-1].style.textAlign='center';
			lglists[lglists.length-1].style.lineHeight='1';
		}
    }
    
    function colorLegend(zdf){
		var cl;
		if(zdf>0)	cl=cfg.color.uc[0];
		if(zdf>=1)	cl=cfg.color.uc[1];
		if(zdf>=2)	cl=cfg.color.uc[2];
		if(zdf>=3)	cl=cfg.color.uc[3];
		
		if(zdf<0)	cl=cfg.color.dc[0];
		if(zdf<=-1)	cl=cfg.color.dc[1];
		if(zdf<=-2)	cl=cfg.color.dc[2];
		if(zdf<=-3)	cl=cfg.color.dc[3];
		
		if(zdf==0||zdf<0.0004999&&zdf>-0.0004999)  {
			cl=cfg.color.zc;
		} 
		return cl;
	}
	
	function fontColorLegend(zdf){
		var cl;
		if(zdf>0)	cl=cfg.color.lfc[5];
		if(zdf>=1)	cl=cfg.color.lfc[0];
		if(zdf>=2)	cl=cfg.color.lfc[0];
		if(zdf>=3)	cl=cfg.color.lfc[0];
		
		if(zdf<0)	cl=cfg.color.lfc[3];
		if(zdf<=-1)	cl=cfg.color.lfc[0];
		if(zdf<=-2)	cl=cfg.color.lfc[0];
		if(zdf<=-3)	cl=cfg.color.lfc[0];
		
		if(zdf==0)  {
			cl=cfg.color.lfc[4];
		} 
		return cl;
	}
	
	var cfg={
		params:{
			w:900,
			h:590,
			clumn:15,
			uintW:53,
			uintH:53,
			childPopupw:210,
			childPopuph:278,
			leftDivW:390,
			rightDivMa:10,
			rightDivW:380,
			outBtnsNum:4
		},
		data:{
			datas:null
		},
		color:{
			rc:['#081d58','#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'],
			dc:['rgb(211,237,212)','rgb(124,210,154)','rgb(76,187,115)','rgb(35,166,76)'],
			uc:['rgb(255,223,214)','rgb(255,128,128)','rgb(255,86,86)','rgb(245,69,69)'],
			zc:'#F3F3F3',
			lfc:['#ffffff','#ffffff','#ffffff','#23a64c','#666666','#f54545','#ffffff','#ffffff','#ffffff'],
			lc:['rgb(35,166,76)','rgb(76,187,115)','rgb(124,210,154)','rgb(211,237,212)','#F3F3F3','rgb(255,223,214)','rgb(255,128,128)','rgb(255,86,86)','rgb(245,69,69)']
		},
		url:{
			api:"http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22bkshy%22,%22amount%22,1]]&callback=$cb",
			childapi:'http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22bkshy_node%22,%22$new_cmyl%22,%22amount%22,0,1,300]]&callback=$cb',
			popupa:"http://finance.sina.com.cn/futures/quotes/$symbol.shtml",
			popupimg:"http://image.sinajs.cn/newchart/v5/futures/mins/$symbol.gif?",
			popupclick:'http://vip.stock.finance.sina.com.cn/mkt/$code',
			
			popup1a1:'http://vip.stock.finance.sina.com.cn/portfolio/qjia.php?symbol=$symbol&ru=http%3A//finance.sina.com.cn/stock/hyyj/20140823/004520096109.shtml',
			popup1a2:'http://money.finance.sina.com.cn/corp/go.php/vCB_AllNewsStock/symbol/$symbol.phtml',
			popup1a3:'http://guba.sina.com.cn/?s=bar&name=$symbol',
			popup1a4:'http://money.finance.sina.com.cn/corp/go.php/vCB_AllBulletin/stockid/$code.phtml',
			
			popup6a:'http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml',
			popup6img:'http://fchart.sina.com.cn/newchart/small/b$symbol.gif',
			
			popup3a1:'http://biz.finance.sina.com.cn/qmx/stockreports.php?symbol=$code',
			popup3a2:'http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradedetail.php?symbol=$symbol',
			popup3a3:'http://vip.stock.finance.sina.com.cn/quotes_service/view/cn_bill.php?symbol=$symbol',
			popup3a4:'http://money.finance.sina.com.cn/corp/go.php/vCI_CorpInfo/stockid/$code.phtml',
			popup3a5:'http://money.finance.sina.com.cn/corp/go.php/vCI_StockStructure/stockid/$code.phtml',
			popup3a6:'http://money.finance.sina.com.cn/corp/go.php/vFD_FinanceSummary/stockid/$code/displaytype/4.phtml',
			
			popop4a:'http://comment.finance.sina.com.cn/comment/skin/default.html?channel=cj&newsid=31-1-2989739'
		},
		ml:{
			table:'<tr><td>$symbol</td><td>$name</td><td>$price</td><td>$zde</td><td>$zdf</td><td>$volume</td><td>$aumont</td></tr>'
		},
		dom:{
			chartContainer:getDocument("chart-container"),
			chartMain:getDocument("chart-main"),
			chartParent:getDocument('chart-hangye'),
			chartRight:getDocument("chart-right"),
			chartPopup:getDocument("chart-popup"),
			chartPopupName:getDocument("chart-popup-name"),
			chartPopupNum:getDocument("chart-popup-num"),
			chartPopupAvg:getDocument("chart-popup-avg"),
			chartPopupZde:getDocument("chart-popup-zde"),
			chartPopupZdf:getDocument("chart-popup-zdf"),
			chartPopupVol:getDocument("chart-popup-vol"),
			chartPopupAmo:getDocument("chart-popup-amo"),
			chartLegend:getDocument("chart-legend"),
			
			chartChild:getDocument("chart-hangyechild"),
			chartChildPopup:getDocument("chart-child-popup"),
			
			chartChild1a1:getDocument("chart-1-a1"),
			chartChild1a2:getDocument("chart-1-a2"),
			chartChild1a3:getDocument("chart-1-a3"),
			chartChild1a4:getDocument("chart-1-a4"),
			
			chartChild5d:getDocument("chart-5-d"),
			chartChild6a:getDocument("chart-6-a"),
			chartChild6img:getDocument('chart-6-img'),
			
			chartChild3a1:getDocument("chart-3-a1"),
			chartChild3a2:getDocument("chart-3-a2"),
			chartChild3a3:getDocument("chart-3-a3"),
			chartChild3a4:getDocument("chart-3-a4"),
			chartChild3a5:getDocument("chart-3-a5"),
			chartChild3a6:getDocument("chart-3-a6"),
			
			chartChild4a:getDocument("chart-4-a"),
			
			chartPOA:getDocument("chart-p-oA"),
			chartPIA:getDocument("chart-p-iA"),
			chartCPOA:getDocument("chart-cp-oA"),
			chartCPIA:getDocument("chart-cp-iA")
		}
	};
	function Chart(){
		var _hang='chartHang',_len=49,_uinth=cfg.params.uintH,_uintw=cfg.params.uintW,_clumn=7,_field,_items,_data=[];
		var _hangc='chartHangc',_lenc=100,_clumnc=10,_fieldc,_itemsc,_datac=[];
		
		function _sort(clumn_,data_,newdata_){
			/*1      2     3     4      5     6     7
			24     25    26    27     28    29    8
			23     40    41    42     43    30    9
			22     39    48    49     44    31    10
			21     38    47    46     45    32    11
			20     37    36    35     34    33    12
			19     18    17    16     15    14    13*/
			var j=0,n=clumn_,t=clumn_,m=0,i=0;
			
			for(i=0;i<clumn_;i++){
				newdata_[i]=[];
				for(j=0;j<clumn_;j++){
					newdata_[i].push(data_[m]);m++;//(i*clumn_+j);
				}
			}
		}
		
		function _hx(newdata_,data_,n_){
			var i=0;j=0;m=0,n=n_;
			while(n>0){
				//1,列向右递增;  
		        for(;j<n;j++){  
		            newdata_[i][j]=data_[m];//m;  
		            m++;  
		        }  
		        i++;        //指向下一行  
		        j--;        //j回退到合适位置   
		        //2,行向下递增;  
		        for(;i<n;i++){  
		            newdata_[i][j]=data_[m];  
		            m++;  
		        }  
		        j--;        //指向前一列   
		        i--;        //i回退到合适位置   
		        //3,列向左递减;  
		        for(;j>=t-n;j--){  
		            newdata_[i][j]=data_[m];  
		            m++; 
		             
		        }  
		        i--;        //指向上一行   
		        j++;        //j回退到合适位置   
		        //4,行向上递减;  
		        for(;i>t-n;i--){  
		            newdata_[i][j]=data_[m];
		            m++;  
		        }  
		        j++;        //开始下一个循环   
		        i++;        //i回退到合适位置   
		        n--;  
			}
		}
		
		function _loadData(){
			
			wn_varLoader(cfg.url.api.replace('$cb','var '+_hang+'='),function(){
				var qh=window[_hang];
				//window[_hang]=null;
				
				var raw=qh[0],tmpdata=[];
				
				_len=raw.count;
				_field=raw.fields;
				_items=raw.items;
				
				for(var i=0;i<_len;i++){
					var ohe=_items[i]
					var o={
						'name':ohe[0],
						'code':ohe[1],
						'num':ohe[2],
						'count':ohe[3],
						'volume':ohe[4],
						'amount':ohe[5],
						'trade':ohe[6],
						'changeprice':ohe[7],
						'changepercent':ohe[8],
						'symbol':ohe[9],
						'sname':ohe[10],
						'strade':ohe[11],
						'schangeprice':ohe[12],
						'schangepercent':ohe[13]
					}
					tmpdata.push(o);
				}
				tmpdata.reverse();				
				
				_sort(_clumn,tmpdata,_data);
				_dom(0);
				
				_loadChild(tmpdata[0].code);
			})
			
			legend('chart-legend',cfg.params.w-20,'chart-legend');
		}
		
		function _loadChild(code_){
			wn_varLoader(cfg.url.childapi.replace('$cb','var '+_hangc+'=').replace('$new_cmyl',code_),function(){
				var qhc=window[_hangc];
				//window[_hangc]=null;
				
				var rawc=qhc[0],tmpdatac=[];
			
				_lenc=rawc.count;
				_fieldc=rawc.fields;
				_itemsc=rawc.items;
				
				if(_lenc>100)	_lenc=100;
				if(_lenc<100)	_lenc=100;
				//"symbol","code","name","trade","pricechange","changepercent","buy","sell","settlement","open","high","low","
				//volume","amount","ticktime","per","per_d","nta","pb","mktcap","nmc","turnoverratio","favor","guba"
				for(var i=0;i<_lenc;i++){
					var ohec,o;
					if(_itemsc[i]){
						ohec=_itemsc[i];
						
						o={
							'symbol':ohec[0],
							'code':ohec[1],
							'name':ohec[2],
							'trade':ohec[3],
							'pricechange':ohec[4],
							'changepercent':ohec[5],
							
							'volume':ohec[12],
							'amount':ohec[13]
						}
					}else{
						o={
							'symbol':-1,
							'code':-1,
							'name':-1,
							'trade':-1,
							'pricechange':-1,
							'changepercent':-1,
							
							'volume':-1,
							'amount':-1
						}
					}
					
					tmpdatac.push(o);
				}
				//tmpdatac.reverse();
				_sort(_clumnc,tmpdatac,_datac);
				_dom(1);
			});
		}
		
		function _dom(c_){
			
			cfg.dom.chartContainer.style.width=cfg.params.w+'px';	
			cfg.dom.chartContainer.style.height=cfg.params.h+'px';			
			
			cfg.dom.chartMain.style.width=cfg.dom.chartParent.style.width=cfg.params.leftDivW+'px';
			cfg.dom.chartRight.style.marginLeft=cfg.params.leftDivW+cfg.params.rightDivMa+'px';
			cfg.dom.chartRight.style.width=cfg.params.rightDivW+'px';
			cfg.dom.chartLegend.style.width=cfg.params.w+'px';
			_uinth=cfg.params.uintH,_uintw=cfg.params.uintW;
			
			var len=49;
			if(c_==1){
				len=100;
				cfg.dom.chartChild.innerHTML='';
			}else{
				cfg.dom.chartParent.innerHTML='';
			}	
			
			var lists=[];
			for(var i=0;i<len;i++){
				var item=createElement("div");
				var span=createElement("span");
				var row,clumn;
				
				item.style.display='block';
				item.style.width=_uintw+'px';
				item.style.height=_uinth+'px';
				item.style.borderBottom='1px solid #fff';
				item.style.borderRight='1px solid #fff';
				item.style.fontSize='12px';
				item.style.textAlign='center';
				item.style.fontFamily='Microsoft YaHei,"微软雅黑","SimHei","宋体",helvetica,arial,sans-serif'
				span.style.display='inline-block';
				item.style.cssFloat='left';
				item.style.styleFloat='left';
				
				if(c_==0){
					item.style.cursor="pointer";
					row=Math.floor(i/_clumn),clumn=i%_clumn;
					item.id='chart_hang_'+i;
					item.style.backgroundColor=colorLegend(_data[row][clumn].changepercent);
					span.id='chart_span_'+i;
					span.style.color=fontColorLegend(_data[row][clumn].changepercent);
					
					span.innerHTML=_data[row][clumn].name;
					
					if(i<7)	item.style.borderTop='1px solid #fff';
					if((i)%7==0)	item.style.borderLeft='1px solid #fff';
					
					cfg.dom.chartParent.appendChild(item);
					//cfg.dom.chartPannel.appendChild(item);
				}else{
					row=Math.floor(i/_clumnc),clumn=i%_clumnc;
					item.id='chart_hangc_'+i;
					
					//console.log(_datac);
					
					if(_datac&&_datac[row][clumn]){
						if(_datac[row][clumn].name!=-1){
							item.style.backgroundColor=colorLegend(_datac[row][clumn].changepercent);
							span.style.color=fontColorLegend(_datac[row][clumn].changepercent);
							item.style.cursor="pointer";
						}
						span.id='chart_spanc_'+i;
						span.innerHTML=_datac[row][clumn].name;
						if(_datac[row][clumn].name==-1)span.innerHTML='';
						
						if(i<10)	item.style.borderTop='1px solid #fff';
						if((i)%10==0)	item.style.borderLeft='1px solid #fff';
						
						//cfg.dom.chartRight.appendChild(item);
						cfg.dom.chartChild.appendChild(item);
					}
				}
				var zhtext=9;
				if(_uintw<50)zhtext=18;
				span.style.marginTop=_uinth/2-zhtext+'px';
				lists.push(item);
				
				if(c_==0){
					boEvtUtil.addHandler(item,'mouseover',function(e){
						e=e||window.event;
						var target=(e.target||e.srcElement),targetXY=target.getBoundingClientRect();
							target.style.borderColor='#ccc';
						
						var index=String(target.id).slice(11),tp=String(target.id).substr(6,4);
							index=Number(index);
							//getDocument('chart_span_'+index).style.color='#000';
						var row=Math.floor(index/_clumn),clumn=index%_clumn;
						
						if(tp=='span')	targetXY=target.parentNode.getBoundingClientRect();
							
						cfg.dom.chartPopupName.innerHTML=_data[row][clumn].name;
						cfg.dom.chartPopupNum.innerHTML=_data[row][clumn].num;
						cfg.dom.chartPopupAvg.innerHTML=Number(_data[row][clumn].trade).toFixed(2);
						cfg.dom.chartPopupZde.innerHTML=Number(_data[row][clumn].changeprice).toFixed(2);
						cfg.dom.chartPopupZdf.innerHTML=Number(_data[row][clumn].changepercent).toFixed(2)+'%';
						cfg.dom.chartPopupVol.innerHTML=_data[row][clumn].volume/100;
						cfg.dom.chartPopupAmo.innerHTML=_data[row][clumn].amount;
						
						if(_data[row][clumn].changepercent>0){
							cfg.dom.chartPopupAvg.style.color=cfg.dom.chartPopupZde.style.color=cfg.dom.chartPopupZdf.style.color=cfg.color.lfc[5];
						}else{
							cfg.dom.chartPopupAvg.style.color=cfg.dom.chartPopupZde.style.color=cfg.dom.chartPopupZdf.style.color=cfg.color.lfc[3];
						}
						
						
						var sTop=document.documentElement.scrollTop;
						if(sTop=='undefined') sTop=window.pageYOffset || document.body.scrollTop;
						if(sTop==0&&document.body.scrollTop!=0)	sTop=document.body.scrollTop;
						
						var sLeft=document.documentElement.scrollLeft;
						if(sLeft=='undefined') sLeft=window.pageXOffset || document.body.scrollLeft;
						if(sLeft==0&&document.body.scrollLeft!=0)	sLeft=document.body.scrollLeft;	
						
						cfg.dom.chartPopup.style.left=targetXY.left+_uintw+12+sLeft+'px';
						cfg.dom.chartPopup.style.top=targetXY.top+sTop+'px';
						cfg.dom.chartPOA.style.top='16.5px';
						
						if((index/_clumn)>=_clumn/2){
							var offsety=Math.floor(index/_clumn-_clumn/2);
							if(clumn>=4 && offsety!=0)	offsety--;
							cfg.dom.chartPopup.style.top=targetXY.top+sTop-offsety*_uinth+'px';
							
							cfg.dom.chartPOA.style.top=16.5+offsety*_uinth+'px';
							
						}else{
							cfg.dom.chartPopup.style.top=targetXY.top+sTop+'px';
						}
						
						cfg.dom.chartPopup.style.display='block';
						cfg.dom.chartChildPopup.style.display='none';
					});
					
					boEvtUtil.addHandler(item,'mouseout',function(e){
						e=e||window.event;
						var target=(e.target||e.srcElement);
						var index=String(target.id).slice(11),offsetX=0;
							index=Number(index);
						//getDocument('chart_span_'+index).style.color='#fff';
						target.style.borderColor='#fff';
						
						cfg.dom.chartPopup.style.display='none';
					});
					
					boEvtUtil.addHandler(item,'click',function(e){
						e=e||window.event;
						var target=(e.target||e.srcElement);
						
						var index=String(target.id).slice(11);
							index=Number(index);
						var row=Math.floor(index/_clumn),clumn=index%_clumn;
						_loadChild(_data[row][clumn].code);
					});
				}else{
					var overchild=0;
					boEvtUtil.addHandler(item,'mouseover',function(e){
						e=e||window.event;
						var target=(e.target||e.srcElement),targetXY=target.getBoundingClientRect();
							//target.style.color='#666';
						
						var index=String(target.id).slice(12),tp=String(target.id).substr(6,4);
							index=Number(index);
							//getDocument('chart_spanc_'+index).style.color='#000';
						var row=Math.floor(index/_clumnc),clumn=index%_clumnc;
						
						if(tp=='span')	targetXY=target.parentNode.getBoundingClientRect();
						
						var sTop=document.documentElement.scrollTop;
						if(sTop=='undefined') sTop=window.pageYOffset || document.body.scrollTop;
						if(sTop==0&&document.body.scrollTop!=0)	sTop=document.body.scrollTop;
						
						var sLeft=document.documentElement.scrollLeft;
						if(sLeft=='undefined') sLeft=window.pageXOffset || document.body.scrollLeft;
						if(sLeft==0&&document.body.scrollLeft!=0)	sLeft=document.body.scrollLeft;	
						
						if(_datac[row][clumn].symbol!=-1){
							cfg.dom.chartChild1a1.href=cfg.url.popup1a1.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild1a2.href=cfg.url.popup1a2.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild1a3.href=cfg.url.popup1a3.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild1a4.href=cfg.url.popup1a4.replace('$symbol',_datac[row][clumn].symbol);
							
							cfg.dom.chartChild6a.href=cfg.url.popup6a.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild6img.src=cfg.url.popup6img.replace('$symbol',_datac[row][clumn].symbol);
							
							cfg.dom.chartChild3a1.href=cfg.url.popup3a1.replace('$symbol',_datac[row][clumn].code);
							cfg.dom.chartChild3a2.href=cfg.url.popup3a2.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild3a3.href=cfg.url.popup3a3.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild3a4.href=cfg.url.popup3a4.replace('$symbol',_datac[row][clumn].code);
							cfg.dom.chartChild3a5.href=cfg.url.popup3a5.replace('$symbol',_datac[row][clumn].code);
							cfg.dom.chartChild3a6.href=cfg.url.popup3a6.replace('$symbol',_datac[row][clumn].code);
							
							if((index%_clumn)>_clumn/2,_clumn){
								cfg.dom.chartChildPopup.style.left=targetXY.left-cfg.params.childPopupw-12+sLeft+'px';
							}else{
								cfg.dom.chartChildPopup.style.left=targetXY.left+_uintw+sLeft+'px';
							}
							
							cfg.dom.chartCPOA.style.top='16.5px'
							if((index/_clumnc)>=(_clumnc/2+2)){
								var offsety=Math.floor(index/_clumnc-_clumnc/2)-1;
								cfg.dom.chartChildPopup.style.top=targetXY.top+sTop-offsety*_uinth+'px';
								cfg.dom.chartCPOA.style.top=16.5+offsety*_uinth+'px';
							}else{
								cfg.dom.chartChildPopup.style.top=targetXY.top+sTop+'px';
							}
							
							//cfg.dom.chartChildPopup.style.top=targetXY.top+sTop+'px';
							
							cfg.dom.chartChildPopup.style.display='block';
						}else{
							cfg.dom.chartChildPopup.style.display='none';
						}
						
						overchild=1;
					});
					
					boEvtUtil.addHandler(item,'mouseout',function(e){
						e=e||window.event;
						var target=(e.target||e.srcElement);
						
						var index=String(target.id).slice(12);
							index=Number(index);
							//getDocument('chart_spanc_'+index).style.color='#fff';
						
						setTimeout(function(){
							if(overchild==0){
								cfg.dom.chartChildPopup.style.display='none';
							}
						},500);
						overchild=0;
					});
					
					boEvtUtil.addHandler(cfg.dom.chartChildPopup,'mouseover',function(){
						overchild=1;
					})
					
					boEvtUtil.addHandler(document.body,'click',function(e){
						if(cfg.dom.chartChildPopup.style.display=='block')cfg.dom.chartChildPopup.style.display='none';
					})
				}
				item.appendChild(span);
			}
			
			dataRightReady();
		}
		
		function _addEvent(){
			
		}
		
		function _resize(menuw_){
			if(_data&&_data.length<=0)	return;
			if(_datac&&_datac.length<=0)	return;
			var _option={};
			if(!menuw_)menuw_=0;
			
			var chartClientWidth=document.documentElement.clientWidth,chartClientEdge=20,chartLFWidth=20,
				chartVisualWidth=dataPanelWidth+3;//chartClientWidth-menuw_-30;
				chartUintW=Math.floor((chartVisualWidth-2-chartClientEdge)/17)-3;
				
			_option={
				w:dataPanelWidth,
				h:chartUintW*10+20,
				childPopupw:370,
				childPopuph:210,
				rightDivMa:20,
				uintW:chartUintW,
				uintH:chartUintW-10,
				leftDivW:chartUintW*7+14,
				rightDivW:dataPanelWidth+-2-chartUintW*7-14-chartLFWidth
			}
			//console.log('当前可用宽度：',chartClientWidth,'图形可用宽度：',chartClientWidth-224,'图形宽度:',chartClientWidth-224-chartClientEdge);
			//console.log('单元格宽度：',chartUintW,'左边宽度：',chartUintW*7,'右边宽度',_option.rightDivW,'右边格子宽度',10*_option.uintW+20);
			
			cfg.params.w=_option.w;
			cfg.params.h=_option.h;
			cfg.params.clumn=7||_option.clumn;
			cfg.params.clumnc=10||_option.clumnc;
			cfg.params.uintW=_option.uintW;
			cfg.params.uintH=_option.uintH;
			cfg.params.childPopupw=_option.childPopupw;
			cfg.params.childPopuph=_option.childPopuph;
			cfg.params.leftDivW=_option.leftDivW;
			cfg.params.rightDivMa=_option.rightDivMa;
			cfg.params.rightDivW=_option.rightDivW;
			
			$.dataRightWidth();
			_dom(0);
			_dom(1);
		}
		
		this.resize=_resize;
		this.loadData=_loadData;
	}
	
	return new function(){
		'use strict';
		var _self=this;
		
		/**
		 * 参数信息：
		 * 
		 * 图类型
		 * 宽/高
		 **/
		var _pObj=param_||{};
		
		if(_pObj){
			cfg.params.w=_pObj.w;
			cfg.params.h=_pObj.h;
			cfg.params.clumn=7||_pObj.clumn;
			cfg.params.clumnc=10||_pObj.clumnc;
			cfg.params.uintW=_pObj.uintW;
			cfg.params.uintH=_pObj.uintH;
			cfg.params.childPopupw=_pObj.childPopupw;
			cfg.params.childPopuph=_pObj.childPopuph;
			cfg.params.leftDivW=_pObj.leftDivW;
			cfg.params.rightDivMa=_pObj.rightDivMa;
			cfg.params.rightDivW=_pObj.rightDivW;
		}
		var _chart;
		function _init(){
			_chart=new Chart();
			_chart.loadData();
			cfg.dom.chartChildPopup.style.display='none';
		}
		function _resize(menuw_){
			_chart.resize(menuw_);
		}
		this.chart=_chart;
		this.resize=_resize;
		this.init=_init;
	}
	
}

var _option={};

var chartClientWidth=document.documentElement.clientWidth,chartClientEdge=20,chartLFWidth=20;

if(!dataPanelWidth)var dataPanelWidth=chartClientWidth-224-30;
	var chartVisualWidth=dataPanelWidth+1;//chartClientWidth-224-30;
	var chartUintW=Math.floor((chartVisualWidth-2-chartClientEdge)/17)-3;
	
	//console.log('当前可用宽度：',chartClientWidth,'图形可用宽度：',chartClientWidth-224,'图形宽度:',chartClientWidth-224-chartClientEdge);
	//console.log('单元格宽度：',chartUintW,'左边宽度：',chartUintW*7);

	
_option={
	w:dataPanelWidth,//chartVisualWidth-chartClientEdge,//dataPanelWidth
	h:chartUintW*10+20,
	childPopupw:370,
	childPopuph:210,
	rightDivMa:20,
	uintW:chartUintW,
	uintH:chartUintW-10,
	leftDivW:chartUintW*7+14,
	rightDivW:dataPanelWidth+-2-chartUintW*7-14-chartLFWidth
}
//console.log('单元格宽度：',chartUintW,'左边宽度：',chartUintW*7,'右边宽度',_option.rightDivW);

var _visual_chart=null;
	_visual_chart=new visual_agrt(_option);
	_visual_chart.init();

function onResize(){
	if(_visual_chart)_visual_chart.resize(224);
}

function hideSidebar(){
	_visual_chart.resize(0);
};

function openSidebar(){
	_visual_chart.resize(224);
}


