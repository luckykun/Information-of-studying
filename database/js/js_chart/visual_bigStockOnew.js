function visual_bigStock(param_){
	'use strict';
	
	function getDocument(n,c){
		c=c||document;
		return c.getElementById(n);
	}
	
	function createDOM(t){
		return document.createElement(t);
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
	
	var myChart;
	var cfg={
		params:{
			w:700,
			h:500
		},
		DOM:{
			domGraphic:getDocument('graphic'),
			domMain:getDocument('obmain'),
			domBtn:getDocument('obbtn'),
			domAllFloat:getDocument('oballfloat'),
			domNewFloat:getDocument('obnewfloat'),
			domGRbtn:getDocument('obchartue')
		},
		sNum:0,
		curTime:'15:00',
		timeIndex:0,
		cClick:'n',
		newDate:[]
	}
	
	function boRefresh(obj_){
		obj_.showLoading();
	}
	
	function popCSS(a){
		var html;
		if(!a[0]){
			html = a[1];
			return html;
		}
		
		var sName = a[0],pName=a[1],obj=a[3],color='#16a748';//'green';
		
		if(obj.flow>0)	color='#f94340';//'red';
		else 			color='#16a748';
		
		html = '<div style="padding:5px;"><span style="font-family: 宋体;font-size: 14px; color: white; font-weight: 2;">'+pName+'</span><br/>'
				  
				  +'</div>'
				  
				  +'<div style="border-top: 1px solid #DDD; padding:5px;">'
				  +'<span style="font-family: 宋体;font-size: 12px; color: white; font-weight: 2; padding: 5px;">最新价：</span>'
				  +'<span style="font-family: 宋体;font-size: 12px; color: '+color+'; font-weight: 2; padding: 5px;">'+obj.price+'</span>'
				  +'<span style="font-family: 宋体;font-size: 12px; color: white; font-weight: 2; padding: 5px;">涨跌幅：</span>'
				  +'<span style="font-family: 宋体;font-size: 12px; color: '+color+'; font-weight: 2; padding: 5px;">'+obj.flow+'</span><br/>'
				  +'<span style="font-family: 宋体;font-size: 12px; color: white; font-weight: 2; padding: 5px;">成交量：</span>'
				  +'<span style="font-family: 宋体;font-size: 12px; color: '+color+'; font-weight: 2; padding: 5px;">'+obj.volume/100+'手'+'</span><br/>'
				  +'<span style="font-family: 宋体;font-size: 12px; color: white; font-weight: 2; padding: 5px;">行情时间：</span>'
				  +'<span style="font-family: 宋体;font-size: 12px; color: '+color+'; font-weight: 2; padding: 5px;">'+obj.ticktime+'</span><br/>'
	
				  +'</div>'	;
		
		return html;
	}
	
	function focusGraphic() {
	    if(needRefresh){
	        myChart[0].showLoading();
	    }
	}
	
	var nameLists=['>3千手','>5千手','>6千手','>1万手'];
	var option = {
			color :['#999999'],
			title : {
				text: ''
			},
		     tooltip : {
		        trigger: 'item',
		         formatter: function(a){
		        	var html=popCSS(a);
		        	return html;
		        }
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: false},
		            dataView : {show: false, readOnly: false},
		            restore : {show: false},
		            saveAsImage : {show: true}
		        }
		    },
		    legend: {
		    	itemSamesize:false,
		    	itemWidth:5,
		    	data:nameLists
		    },
		    dataZoom : {
		        show : true,
		        start : 80,
		        end : 100
		    },
		    xAxis : [
		        {
		            type : 'category',
		            name : '时间',
		            data:[],
		            axisLabel : {
		            	formatter:function(value){
		            		var vh=Math.floor((value+cfg.sNum)/3600),vm=Math.floor(((value+cfg.sNum)%3600)/60),vs=Math.floor(((value+cfg.sNum)%3600)%60);
		            		var h=Number(vh)<10?String('0'+vh):vh;
		            		var m=Number(vm)<10?String('0'+vm):vm;
		            		var s=Number(vs)<10?String('0'+vs):vs;
		            		return h+':'+m+':'+s;
		            	}
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name: '涨跌幅',
		            nameLocation: 'end',
		            min: -10,
		            max: 10,
		            power: 1,
		            scale: true,
		            splitNumber: 10,
		            splitLine : {
		            	lineStyle:{
		            		type:'dashed',
		            		color:'#c5c5c5',
		            		width:0.5
		            	}
		            },
		            axisLine : {
		            	show:true,
		            	lineStyle:{
		            		width:1
		            	}
		            },
		            splitArea : {
		            	show : false
		            },
		            axisLabel : { 
		            	formatter: function(value) {
			                var str = value+'%';
			                if (value == 0) str = '0';
			                return str;
		                }
		            }
		        }
		    ],
		    animation: false,
		    series : function(){
		    	var dataobj=[];
				for(var i=0,len=nameLists.length;i<len;i++){
					var obj={
						name:nameLists[i],
						type:'scatter',
				        symbol: 'circle', 
				        symbolSize: function(value){
			                return Math.round(value[2]);
			            },
			            data:[]
					}
					dataobj.push(obj);
				}
				return dataobj;
		    }()
		};
	
	
	function bigOptions(){
		var _BOxAxis=[];
		
		function _loadChart(){
			myChart=echarts.init(cfg.DOM.domMain);
			if(!bigSO)	bigSO=new bigStockOrder;
						bigSO.updata();
		}
		
		this.loadChart=_loadChart;
	}
	
	
	//实时大单操作
	function bigStockOrder(){
		var _num=500,_type=0,_page=1,_sort='ticktime',_vo1=150000,_vo2=200000,_vo3=300000,_vo4=500000,_vo5=600000,_vo6=1000000,
			_cb='BO',_cbu='bsototalNum',_hour=-1,_min=-1;
		var _url='http://money.finance.sina.com.cn/d/api/openapi.php/CN_Bill.getBillTopListByTime?callback=$cb&hour=$hour&min=$min&volume=$vol';
		var _alldayUrl='http://money.finance.sina.com.cn/d/api/openapi.php/CN_Bill.getBillTopListByDay?callback=$cb'
		var _totalUrl='http://vip.stock.finance.sina.com.cn/quotes_service/api/openapi.php/CN_Bill.GetBillListCount?callback=$cb&num=500&page=1&sort=ticktime&asc=0&volume=40000&type=0';
		var _self=this;
		var _data=[];
		var _axisLabels=[];
		var _totalNum=0;
		var _domTotalID,totalNum=0,fields=[];
		
		function _getDocument(n,c){
			c=c||document;
			return c.getElementById(n);
		}
		
		//页码
		function _controlPages(){
			var tp=_getDocument('totalPage'),curp=_getDocument('curPage'),up=_getDocument('uppage'),dp=_getDocument('downpage');
			var tmptotalNum=0;
			wn_varLoader(_totalUrl.replace('$cb','var '+_cbu+'='),function(){
				tmptotalNum=window[_cbu];
				
				_totalNum=Math.floor(Number(tmptotalNum.result.data)/_num)+1;
				tp.innerHTML=_totalNum;
				curp.innerHTML=_page;
			});
			
			boEvtUtil.addHandler(up,'click',function(e){
				if(_page>1){
					_page--;
					curp.innerHTML=_page;
					_updata();
				}
			});
			
			boEvtUtil.addHandler(dp,'click',function(e){
				if(_page<_totalNum){
					_page++;
					curp.innerHTML=_page;
					_updata();
				}
			})
			//刷新
			var rb=_getDocument('borefresh');
			boEvtUtil.addHandler(rb,'click',function(e){
				_updata();
			});
		}
		
		//获得数据
		function _updata(all_){
			var tmpdata,url='';
			
			if(all_){
				url=_alldayUrl.replace('$cb','var '+_cb+'=')+'&random'+Math.random();
			}else{
				url=_url.replace('$cb','var '+_cb+'=').replace('$hour',this.hour).replace('$min',this.min).replace('$vol',_vo2)+'&random'+Math.random();
			}
			
			wn_varLoader(url,function(){
				tmpdata=window[_cb];
				_parse(tmpdata,0);
			});
		}
		//改变界面高宽调整气泡大小
		function _setPopSize(w_,h_,size_){
			
		}
		
		//解析数据
		function _parse(obj_,volume_){
			/**
			 * symbol,name,ticktime,price,volume,prev_price,kind
			 */
			var tmpdata,raw;
			if(obj_){
				raw=obj_.result.data;
				
				totalNum=raw.count;
				fields=raw.fields;
				tmpdata=raw.items;
				
				_data=[];
				
				var len=tmpdata.length;
				var data1=[],data2=[],data3=[],data4=[],data5=[],data6=[];
				var rNum,cNum;
				for(var i=0;i<len;i++){
					var obc=tmpdata[i];
					
					var o={
						'code':obc[0],
						'name':obc[1],
						'ticktime':obc[2],
						'price':obc[3],
						'volume':obc[4],
						'prev_price':obc[5],
						'kind':obc[6],
						'close_price':obc[7],
						'avgvolume_20':obc[8],
						'flow':Math.floor(100*(obc[3]-obc[7])/obc[7]).toFixed(2)
					}
					
					var cstyle={
						itemStyle:{
							normal:{
								color:'rgba(100,100,100,0.6)', 
								label: { 
									//show: true, 
									position: 'inside', 
									formatter: function(title,name,value) {  
										return name; 
									}, 
								textStyle: {
									color:'#555555'
									}
								}
							}
						}
					}
					
					var htime=o.ticktime.split(':');
					var tNum=Number(htime[0]*3600)+Number(htime[1]*60+Number(htime[2]));
					
					cNum=tmpdata[len-1][2].split(':');
					rNum=Number(cNum[0]*3600)+Number(cNum[1]*60+Number(cNum[2]));
					
					tNum=tNum-rNum+1;
					
					o.value=[tNum,o.flow,Math.sqrt(o.volume/8000),o.kind,o.volume];
					
					_data.push(o);
					
					if(Math.sqrt(o.volume/4000)>20)	cstyle.itemStyle.normal.label.show=true;
					if(o.kind=="D") cstyle.itemStyle.normal.color='rgba(22,167,72,0.8)';//"#A32C10";
					if(o.kind=="U") cstyle.itemStyle.normal.color='rgba(245,69,69,0.8)'//'#f94340'//'rgba(00,255,00,0.6)'//"#00E717";
					
					o.itemStyle=cstyle.itemStyle;
					
					if(o.volume>_vo6){
						data6.push(o); 
						continue;
					}else if(o.volume>_vo5){
						data5.push(o); 
						continue;
					}else if(o.volume>_vo4){
						data4.push(o); 
						continue;
					}else if(o.volume>_vo3){
						data3.push(o); 
						continue;
					}else if(o.volume>_vo2){
						data2.push(o);
						continue;
					}else if(o.volume>_vo1){
						data1.push(o);
						continue;
					}
				}
				
				if(_data.length<=0){
					BOxAxis=['09:30','09:31'];
					_createBtn();
				
					//refresh();
					return;
				}
				BOxAxis=[_data[0].ticktime,_data[len-1].ticktime];
				
				if(cfg.cClick=='n'){
		    		cfg.newDate=[];
		    		cfg.newDate=BOxAxis;
		    	}
				
				option.xAxis[0].data=_obData();
				
				option.series[0].data=data3;
				option.series[1].data=data4;
				option.series[2].data=data5;
				option.series[3].data=data6;
				
				_createBtn();
				
				refresh();
			}
		}
		
		var _curclicktg,_first=1;
		function _createBtn(){
			var eTime=cfg.newDate[0];
			var self=this;
			
			var timeList=['10:00','10:30','11:00','11:30','13:30','14:00','14:30','15:00'],
			    timeLabel=['09:25-10:00','10:00-10:30','10:30-11:00','11:00-11:30','13:00-13:30','13:30-14:00','14:00-14:30','14:30-15:00'],
			    allday='全天数据',curTime,
			    timePre='最新数据';
				for(var i=0,len=timeList.length;i<len;i++){
					//console.log(i,len-1,timeList[i]);
					if(eTime<timeList[i]) {
						if(i!=(len-1))	{
							curTime=timeList[i];
						}
						timeLabel[i]=timePre;
						cfg.timeIndex=i+1;
						break;
					}
				}
				if(eTime>='14:59')	timeLabel[timeLabel.length-1]='14:30-15:00';
				
				timeLabel.push(allday);
				cfg.timeIndex++;
			
			while(cfg.DOM.domBtn.childNodes.length){
				cfg.DOM.domBtn.innerHTML='';
			}
			for(i=0;i<cfg.timeIndex;i++){
				var tmp=createDOM('div');
					tmp.innerHTML=timeLabel[i];
					tmp.id=timeList[i];
					
					if(_first==1&&i==(cfg.timeIndex-2)){
						_curclicktg=tmp;
						tmp.style.background='#EEF6FF';
						tmp.style.color='#1e3c85';
					}_first=0;
					
					
					if(i==(cfg.timeIndex-1)){
						tmp.innerHTML=allday;
						tmp.id=allday;
						
						boEvtUtil.addHandler(tmp,'mouseover',function(e){
							e=e||window.event;
							var target=(e.target||e.srcElement),targetP=target.parentNode;
							var targetXY=target.getBoundingClientRect(),targetPXY=target.getBoundingClientRect();

							cfg.DOM.domAllFloat.style.left=targetXY.left-(targetXY.right-targetXY.left)/2+'px';
							
							var sTop=document.documentElement.scrollTop;
							if(sTop=='undefined') sTop=window.pageYOffset || document.body.scrollTop;
							if(sTop==0&&document.body.scrollTop!=0)	sTop=document.body.scrollTop;
							
							cfg.DOM.domAllFloat.style.top=targetXY.top+sTop+targetXY.bottom-targetXY.top+10+'px';
							cfg.DOM.domAllFloat.style.display='block';
						});
						
						boEvtUtil.addHandler(tmp,'mouseout',function(e){
							cfg.DOM.domAllFloat.style.display='none';
						});
					}
					
					if(tmp.innerHTML==timePre){
						boEvtUtil.addHandler(tmp,'mouseover',function(e){
							e=e||window.event;
							var target=(e.target||e.srcElement),targetP=target.parentNode;
							var targetXY=target.getBoundingClientRect(),targetPXY=target.getBoundingClientRect();
							
							var sTop=document.documentElement.scrollTop;
							if(sTop=='undefined') sTop=window.pageYOffset || document.body.scrollTop;
							if(sTop==0&&document.body.scrollTop!=0)	sTop=document.body.scrollTop;
							
							cfg.DOM.domNewFloat.style.left=targetXY.left-(targetXY.right-targetXY.left)/2+'px';
							cfg.DOM.domNewFloat.style.top=targetXY.top+sTop+targetXY.bottom-targetXY.top+10+'px';
							cfg.DOM.domNewFloat.style.display='block';
						});
						
						boEvtUtil.addHandler(tmp,'mouseout',function(e){
							cfg.DOM.domNewFloat.style.display='none';
						});
					}
				
				boEvtUtil.addHandler(tmp,'click',function(e){
					e=e||window.event;
					var target=(e.target||e.srcElement);
					
					target.style.background='#EEF6FF';
					target.style.color='#1e3c85';
					
					_curclicktg=null;
					_curclicktg=target;
					
					if(this.innerHTML==timePre){
						cfg.cClick='n';
						bigSO.hour=-1,bigSO.min=-1;
						bigSO.updata(false);
					}else if(this.innerHTML==allday){
						cfg.cClick='y';
						bigSO.updata(true);
					}else{
						cfg.cClick='y';
						bigSO.hour=this.id.split(':')[0],bigSO.min=this.id.split(':')[1];
						bigSO.updata(false);
					}
				});
				
				boEvtUtil.addHandler(tmp,'mouseout',function(e){
					e=e||window.event;
					var target=(e.target||e.srcElement);
					
					if(_curclicktg&&target.id==_curclicktg.id){
						target.style.background='#EEF6FF';
						target.style.color='#1e3c85';
					}
				});
				
				cfg.DOM.domBtn.appendChild(tmp);
			}
		}
		
		//将时间转化为字符串
		var BOxAxis=[];
		function _obData(){
	    	if(BOxAxis.length<=0) return [];
	    	var e=new Date,s=new Date;
	    	var earr=BOxAxis[0].split(':'),sarr=BOxAxis[1].split(':');
	    	e.setHours(earr[0],earr[1],earr[2]);
	    	s.setHours(sarr[0],sarr[1],sarr[2]);
	    	
	    	_axisLabels=[];
	    	var sNum=Number(sarr[0]*3600)+Number(sarr[1]*60)+Number(sarr[2]),eNum=Number(earr[0]*3600)+Number(earr[1]*60)+Number(earr[2]);
	    	var ele=41400,twl=46800,timeNum=sNum;//46800
	    	
	    	for(var j=sNum;j<eNum;j++){
	    		if(j>=ele&&j<=twl){
	    			//console.log("ddd",j);
	    			_axisLabels.push(j-sNum+1);
	    		}else{
	    			timeNum=j;
	    			_axisLabels.push(j-sNum+1);
	    		}
	    	}
	    	
	    	cfg.sNum=sNum;
	    	
	    	//while(_axisLabels[_axisLabels.length-1]>)
	    	//console.log(_axisLabels);
		   
		    return _axisLabels;
	    }
		//加载
		function _wn_varLoader(url_,cb_,errCb_,charset_){
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
			s.parentNode.insertBefore(n,s);
		}
		
		this.updata=_updata;
		this.data=_data;
		this.totalNum=_totalNum;
		this.controlPages=_controlPages;
		this.hour=_hour;
		this.min=_min;
	}
	var bigSO;
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
		}
		var _chart;
		function _init(){
			bigSO=new bigStockOrder;
			var bigOp=new bigOptions();
			bigOp.loadChart();
			
			cfg.DOM.domMain.style.width=cfg.params.w+'px';
			cfg.DOM.domMain.style.height=cfg.params.h+'px';
			var sNXY=cfg.DOM.domMain.getBoundingClientRect();
			var nNXY=cfg.DOM.domGraphic.getBoundingClientRect();
			
			cfg.DOM.domGRbtn.style.top=sNXY.top-nNXY.top-cfg.params.h-50+'px';
			cfg.DOM.domGRbtn.style.left=sNXY.left-nNXY.left+cfg.params.w-160+'px';
		}
		
		this.init=_init;
	}

	function refresh(){
		if(myChart&&myChart.dispose){
			myChart.dispose();
		}
		myChart=echarts.init(cfg.DOM.domMain);
		myChart.setOption(option,true);
	}	
}

var _option={};

var chartClientWidth=document.documentElement.clientWidth,chartClientEdge=20,chartLFWidth=20,
	chartVisualWidth=chartClientWidth-224;
	
//console.log('当前可用宽度：',chartClientWidth,'图形可用宽度：',chartClientWidth-224,'图形宽度:',chartClientWidth-224-chartClientEdge);
	
_option={
	w:chartVisualWidth-chartClientEdge-40,
	h:400,
	margin:40
}

var _visual_bigStock=new visual_bigStock(_option);
	_visual_bigStock.init();


