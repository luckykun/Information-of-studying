(function(){
	'use strict';
	
	function getDocument(n,c){
		c=c||document;
		return c.getElementById(n);
	}
	
	function createElement(t){return document.createElement(t);}
	
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
		var isLoaded=false,s=document.getElementsByTagName('script')[0],n=document.createElement('script');
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
		s.parentNode.insertBefore(n,s);
	}
	
	function legend(legend_,width_,btn_){
    	var qhlegend=['-4','-3','-2','-1','0','1 ','2','3','4'],legendNum=qhlegend.length;
		
	    var lgc=getDocument(legend_);
	    lgc.style.cssFloat='left';
	    lgc.style.styleFloat='left';
	    lgc.style.position='relative';
	    lgc.style.borderTop='1px solid #ccc';
	    lgc.style.margin='20px 0px 0px 10px';
	    lgc.style.padding='20px 0px 0px 0px';
	    lgc.style.width=width+'px';
	    lgc.style.top='-120px';
	    lgc.style.height='30px;'
	    
	  	var lglists=[];
		for(var i=0;i<legendNum;i++){
			var legenddiv=lgc.appendChild('div')
			 			.style('float','left')
						.style("width",'40px')
						.style("height",'10px')
						.style("padding",'2px 2px 2px 2px')
						.style("background-color",cfg.color.lc[i])
						//.style("cursor","pointer")
						.style("border","1px solid "+cfg.color.lc[i])
						.attr('id',btn_+i)
						
			
			var lgdom=document.getElementById(btn_+i);
			lglists.push(lgdom);
			
			
			lglists[lglists.length-1].innerHTML=qhlegend[i];
			lglists[lglists.length-1].style.font='12px helvetica,arial,sans-serif';
			
			if(i<4)	lglists[lglists.length-1].style.textAlign='left';
			else if(i===4)lglists[lglists.length-1].style.textAlign='center';
			else		lglists[lglists.length-1].style.textAlign='right';
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
	
	var cfg={
		data:{
			datas:null
		},
		color:{
			dc:['#d3edd4','#23ab4c','#4cbb73','#7cd29a'],
			uc:['#ffdfd6','#ff8080','#ff5656','#f54545'],
			lc:['#d3edd4','#7cd29a','#4cbb73','#23ab4c','#F3F3F3','#f54545','#ff5656','#ff8080','#ffdfd6'],
			zc:'#F3F3F3',
			
			rc:['#081d58','#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0']
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
			table:'<tr><td>$symbol</td><td>$name</td><td>$price</td><td>$zde</td><td>$zdf</td><td>$volume</td><td>$aumont</td></tr>',
		},
		params:
			{
				outBtnsNum:4
			},
		dom:{
			chartMain:getDocument("chart-main"),
			chartPannel:getDocument("chart-hangye"),
			chartPopup:getDocument("chart-popup"),
			chartPopupName:getDocument("chart-popup-name"),
			chartPopupNum:getDocument("chart-popup-num"),
			chartPopupAvg:getDocument("chart-popup-avg"),
			chartPopupZde:getDocument("chart-popup-zde"),
			chartPopupZdf:getDocument("chart-popup-zdf"),
			chartPopupVol:getDocument("chart-popup-vol"),
			chartPopupAmo:getDocument("chart-popup-amo"),
			
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
			
			chartChild4a:getDocument("chart-4-a")
		}
	};
	
	function chartHang(){
		var _hang='chartHang',_len=49,_uinth=54,_uintw=53,_clumn=7,_field,_items,_data=[];
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
					newdata_[i].push(i*clumn_+j);
				}
			}
			
			i=0;j=0;m=0;
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
		            newdata_[i][j]=data_[m];;  
		            m++;  
		        }  
		        j--;        //指向前一列   
		        i--;        //i回退到合适位置   
		        //3,列向左递减;  
		        for(;j>=t-n;j--){  
		            newdata_[i][j]=data_[m];;  
		            m++; 
		             
		        }  
		        i--;        //指向上一行   
		        j++;        //j回退到合适位置   
		        //4,行向上递减;  
		        for(;i>t-n;i--){  
		            newdata_[i][j]=data_[m];;  
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
				
				_sort(_clumn,tmpdata,_data);
				_dom(0);
				
				_loadChild(tmpdata[0].code);
			})
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
				
				tmpdatac.reverse();
				
				_sort(_clumnc,tmpdatac,_datac);
				
				_dom(1);
			});
		}
		
		function _dom(c_){
			var len=49;
			if(c_==1){
				len=100;
				cfg.dom.chartChild.innerHTML='';
			}	 	
			
			var lists=[];
			for(var i=0;i<len;i++){
				var item=createElement("div");
				var span=createElement("span");
				var row,clumn;
				
				item.style.display='inline-block';
				item.style.cssFloat='left';
				item.style.styleFloat='left';
				item.style.width=_uintw+'px';
				item.style.height=_uinth+'px';
				item.style.borderBottom='1px solid #fff';
				item.style.borderRight='1px solid #fff';
				item.style.fontSize='12px';
				item.style.textAlign='center';
				item.style.fontFamily='Microsoft YaHei,"微软雅黑","SimHei","宋体",helvetica,arial,sans-serif'
				span.style.lineHeight=4;
				
				if(c_==0){
					item.style.cursor="pointer";
					row=Math.floor(i/_clumn),clumn=i%_clumn;
					item.id='chart_hang_'+i;
					item.style.backgroundColor=colorLegend(_data[row][clumn].changepercent);
					span.id='chart_hang_span_'+i;
					span.innerHTML=_data[row][clumn].name;
					
					if(i<7)	item.style.borderTop='1px solid #fff';
					if((i)%7==0)	item.style.borderLeft='1px solid #fff';
					
					cfg.dom.chartPannel.appendChild(item);
				}else{
					row=Math.floor(i/_clumnc),clumn=i%_clumnc;
					item.id='chart_hangc_'+i;
					
					if(_datac[row][clumn].name!=-1){
						item.style.backgroundColor=colorLegend(_datac[row][clumn].changepercent);
						item.style.cursor="pointer";
					}
					span.id='chart_hang_span_c_'+i;
					span.innerHTML=_datac[row][clumn].name;
					if(_datac[row][clumn].name==-1)span.innerHTML='';
					
					if(i<10)	item.style.borderTop='1px solid #fff';
					if((i)%10==0)	item.style.borderLeft='1px solid #fff';
					
					cfg.dom.chartChild.appendChild(item);
				}
				
				
				lists.push(item);
				
				if(c_==0){
					boEvtUtil.addHandler(item,'mouseover',function(e){
						
						this.children[0].style.color='#666';
						this.style.borderColor='#ccc';
						
						var index=String(this.id).slice(11),offsetX=0;
							index=Number(index);
						var row=Math.floor(index/_clumn),clumn=index%_clumn;
							
						cfg.dom.chartPopupName.innerHTML=_data[row][clumn].name;
						cfg.dom.chartPopupNum.innerHTML=_data[row][clumn].num;
						cfg.dom.chartPopupAvg.innerHTML=Number(_data[row][clumn].trade).toFixed(2);
						cfg.dom.chartPopupZde.innerHTML=Number(_data[row][clumn].changeprice).toFixed(2);
						cfg.dom.chartPopupZdf.innerHTML=Number(_data[row][clumn].changepercent).toFixed(2)+'%';
						cfg.dom.chartPopupVol.innerHTML=_data[row][clumn].volume/100;
						
						cfg.dom.chartPopup.style.top=-385+Math.floor(index/_clumn)*_uinth+'px';
						cfg.dom.chartPopup.style.left=Math.floor(index%_clumn+1)*_uinth+'px';
						
						if(Math.floor(index%_clumn+1)*_uinth>250) cfg.dom.chartPopup.style.left=Math.floor(index%_clumn)*_uinth-178+'px';
						cfg.dom.chartPopup.style.display='block';
					});
					
					boEvtUtil.addHandler(item,'mouseout',function(e){
						
						this.children[0].style.color='#000';
						this.style.borderColor='#fff';
						
						cfg.dom.chartPopup.style.display='none';
					});
					
					boEvtUtil.addHandler(item,'click',function(e){
						
						var index=String(this.id).slice(11);
							index=Number(index);
						var row=Math.floor(index/_clumn),clumn=index%_clumn;
							
						//window.open(cfg.url.popupclick.replace('$code','#'+_data[row][clumn].code),'_blank');
						chart_hangye=_data[row][clumn].code;
						
						_loadChild(_data[row][clumn].code);
						//changeChartTableData();
					});
				}else{
					var overchild=0;
					boEvtUtil.addHandler(item,'mouseover',function(e){
						//if(this.id)
						this.children[0].style.color='#666';
						
						var index=String(this.id).slice(12),offsetX=0;
							index=Number(index);
						var row=Math.floor(index/_clumnc),clumn=index%_clumnc;
						
						cfg.dom.chartChildPopup.style.top=140+Math.floor(index/_clumnc)*_uinth+'px';
						cfg.dom.chartChildPopup.style.left=400+224+Math.floor(index%_clumnc+1)*_uinth+'px';
						
						if(_datac[row][clumn].symbol!=-1){
							cfg.dom.chartChild1a1.href=cfg.url.popup1a1.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild1a2.href=cfg.url.popup1a2.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild1a3.href=cfg.url.popup1a3.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild1a4.href=cfg.url.popup1a4.replace('$symbol',_datac[row][clumn].symbol);
							
							//cfg.dom.chartChild5d.href=cfg.url.popup6a.replace('$symbol',_datac[index].symbol);
							cfg.dom.chartChild6a.href=cfg.url.popup6a.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild6img.src=cfg.url.popup6img.replace('$symbol',_datac[row][clumn].symbol);
							
							cfg.dom.chartChild3a1.href=cfg.url.popup3a1.replace('$symbol',_datac[row][clumn].code);
							cfg.dom.chartChild3a2.href=cfg.url.popup3a2.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild3a3.href=cfg.url.popup3a3.replace('$symbol',_datac[row][clumn].symbol);
							cfg.dom.chartChild3a4.href=cfg.url.popup3a4.replace('$symbol',_datac[row][clumn].code);
							cfg.dom.chartChild3a5.href=cfg.url.popup3a5.replace('$symbol',_datac[row][clumn].code);
							cfg.dom.chartChild3a6.href=cfg.url.popup3a6.replace('$symbol',_datac[row][clumn].code);
							
							//cfg.dom.chartChild4a.href=cfg.url.popop4a.replace('$symbol',_datac[index].symbol);
						
							cfg.dom.chartChildPopup.style.display='block';
						}else{
							cfg.dom.chartChildPopup.style.display='none';
						}
						
						overchild=1;
					});
					
					boEvtUtil.addHandler(item,'mouseout',function(e){
						this.children[0].style.color='#000';
						
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
				}
				
				item.appendChild(span);
				
			}
		}
		
		function _addEvent(){
			
		}
		
		this.loadData=_loadData;
	}
	
	var _chartHang=new chartHang();
		_chartHang.loadData();
	

	
})();

var chart_hangye='new_cmyl';

function changeChartTableData(){
	FDC_DC.blocks[0].param='[%22bkshy_node%22,%22'+chart_hangye+'%22,%22{sort}%22,{asc},{page},15]';

	//这里将升降序变量置为0，否则点击确定按钮，排序会一直升序和降序交叉出现
	asc=0;

	//这里必须把当前页数span的值置为1
	$('#pageDiv_0 .currentPageSpan').text('1');
	FDC_DC.dealBlocks(0,'');
}
