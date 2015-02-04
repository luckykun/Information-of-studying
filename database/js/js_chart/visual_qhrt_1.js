
function qhChart(param_){
	'use strict';

	function getDocument(n,c){
		c=c||document;return c.getElementById(n);
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
	var cfgT=['zdf','volume'];
	var cfg={
		params:{
			w:720,
			h:590,
			clumn:15,
			t:'cjl',
			menuh:60,
			legentTop:40,
			outBtnsNum:4
		},
		data:{
			chart_qi_data:null
		},
		color:{
			//dc:['#23ab4c','#4cbb73','#7cd29a','#d3edd4'],
			//uc:['#ffdfd6','#ff8080','#ff5656','#f54545'],
			//lc:['#d3edd4','#7cd29a','#4cbb73','#23ab4c','#F3F3F3','#f54545','#ff5656','#ff8080','#ffdfd6'],
			//zc:'#F3F3F3',
			
			//rc:['#081d58','#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0']
			rc:['#081d58','#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'],
			dc:['rgb(211,237,212)','rgb(124,210,154)','rgb(76,187,115)','rgb(35,166,76)'],
			uc:['rgb(255,223,214)','rgb(255,128,128)','rgb(255,86,86)','rgb(245,69,69)'],
			zc:'#F3F3F3',
			lfc:['#ffffff','#ffffff','#ffffff','#23a64c','#666666','#f54545','#ffffff','#ffffff','#ffffff'],
			lc:['rgb(35,166,76)','rgb(76,187,115)','rgb(124,210,154)','rgb(211,237,212)','#F3F3F3','rgb(255,223,214)','rgb(255,128,128)','rgb(255,86,86)','rgb(245,69,69)']
		},
		url:{
			volumeApi:'http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22qhhq%22,%22qbhy%22,%22volume%22,225]]&callback=$cb',
			api:"http://stock.finance.sina.com.cn/futures/api/openapi.php/ContFuturesService.getFuturesList?sort=zdf&jys=all&type=all&callback=$cb&num=300#",
			popupa:"http://finance.sina.com.cn/futures/quotes/$symbol.shtml",
			popupimg:"http://image.sinajs.cn/newchart/v5/futures/mins/$symbol.gif?"
		},
		POPUPTEMPLATE:
			'<li style="padding:15px 0px 15px 25px;list-style:none;"><span>名称：</span><span>$name</span><li style="padding:0px 0px 15px 25px;list-style:none;"><span">最新价：</span><span>$price</span></li><li style="padding:0px 0px 15px 25px;list-style:none;"><span>涨跌幅：</span><span>$flow</span></li>',
		dom:{
			//volume
			chartvolumenav:getDocument("chart-nav"),
			chartvolumelegend:getDocument("chart-volume-legend"),
			chartvolumepopup:getDocument("chart-popup"),
			chartvolumepopupName:getDocument("chart-popup-name"),
			chartvolumepopupArrowOuter:getDocument("chart-popup-outerArrow"),
			chartvolumepopupArrowInner:getDocument("chart-popup-innerArrow"),
			chartvolumepopupPrice:getDocument("chart-popup-price"),
			chartvolumepopupZdf:getDocument("chart-popup-zdf"),
			chartvolumepopupVolume:getDocument("chart-popup-volume"),
			chartvolumepopupImg:getDocument("chart-popup-img"),
			chartvolumepopupImga:getDocument("chart-popup-img-a"),
			chartvolumepopupImgimg:getDocument("chart-popup-img-img"),
			chartvolumeFly:getDocument("chart-fly"),
			chartvolume0:getDocument("chart-cjl-0"),
			chartvolume1:getDocument("chart-cjl-1"),
			chartvolume2:getDocument("chart-cjl-2"),
			chartvolume3:getDocument("chart-cjl-3"),
			//zdf
			chartzdfCon:getDocument("chart-zdf-container"),
			chartzdfPan:getDocument("chart-zdf-pan"),
			chartzdfNav:getDocument("chart-zdf-nav"),
			chartzdfLegend:getDocument("chart-zdf-legend"),
			chartzdfFly:getDocument("chart-zdf-fly"),
			chartzdfpopup:getDocument("chart-zdf-popup"),
			chartzdfpopupName:getDocument("chart-zdf-popup-name"),
			chartzdfpopupArrowOuter:getDocument("chart-zdf-popup-outerArrow"),
			chartzdfpopupArrowInner:getDocument("chart-zdf-popup-innerArrow"),
			chartzdfpopupPrice:getDocument("chart-zdf-popup-price"),
			chartzdfpopupZdf:getDocument("chart-zdf-popup-zdf"),
			chartzdfpopupVolume:getDocument("chart-zdf-popup-volume"),
			chartzdf0:getDocument("chart-zdf-0"),
			chartzdf1:getDocument("chart-zdf-1"),
			chartzdf2:getDocument("chart-zdf-2"),
			chartzdf3:getDocument("chart-zdf-3"),
			chartzdf4:getDocument("chart-zdf-4"),
			chartInput:getDocument("chart-input"),
			chartzdfpopupImg:getDocument("chart-zdf-popup-img"),
			chartzdfpopupImga:getDocument("chart-zdf-popup-img-a"),
			chartzdfpopupImgimg:getDocument("chart-zdf-popup-img-img"),
			
			chartvolumeContainer:getDocument('chart-volume-container'),
			chartContainer:getDocument('chart-container'),
			chartVolume:getDocument('chart-volume'),
			chartQhrt:getDocument('chart-qhrt')
		}
	};
	
	function cloneObject(obj){
		if(obj==null) return;
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
		var qhlegend=['-4','-3','-2','-1','0','1 ','2','3','4'],legendNum=qhlegend.length;
	    var legendcontainer=legend_;//getDocument(legend_);
	    	legendcontainer.style.cssFloat='left';
	    	legendcontainer.style.styleFloat='left';
	    	legendcontainer.style.position='relative';
	    	legendcontainer.style.width=width_+'px';
	    	legendcontainer.style.height='30px';
	    	legendcontainer.style.paddingTop='10px';
	    	legendcontainer.style.borderTop='1px solid #D2D7E0';
	    	
	    	if(legend_.id=='chart-zdf-legend')legendcontainer.style.left='-8px';
	    	else							  legendcontainer.style.left='0px';
	    	
	  	var lglists=[];
		for(var i=0;i<legendNum;i++){
			var legenddiv=createElement('div');
				legenddiv.style.styleFloat=legenddiv.style.cssFloat='right';
				legenddiv.style.width='40px';
				legenddiv.style.height='10px';
				legenddiv.style.padding='2px';
				legenddiv.style.backgroundColor=cfg.color.lc[i];
				legenddiv.style.border="1px solid "+cfg.color.lc[i];
				legenddiv.id=btn_+i;
				legenddiv.style.color=cfg.color.lfc[i];
			
			legendcontainer.appendChild(legenddiv);
			var lgdom=document.getElementById(btn_+i);
			lglists.push(lgdom);
			
			lglists[lglists.length-1].innerHTML=qhlegend[i]+'%';
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
		
		if(zdf==0||zdf<0.004999&&zdf>-0.004999)  {
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
	
	function strSplit(str_){
		var str=str_,len=str.length;
		
		str=str.substr(0,len-2);
		return  Number(str);
	}
	
	/////////// 期货涨跌幅图
	function zdfChart(){
		
		var _zdf="zdfData",_data=[],_curData=[],_isfirst=0,_divLists=[],_gclumn=cfg.params.clumn;
		var _h=cfg.params.h,_uintw=cfg.params.w/_gclumn-2,_uinth=35,_field,_len=225,_clickDiv;
		var _checkedlist=['所有','主力合约','次主力合约','非主力合约']
		
		function _loadData(){
			//_zdf=_zdf+String(Math.random());
			wn_varLoader(cfg.url.volumeApi.replace('$cb','var '+_zdf+"="),function(){
				var qh=window[_zdf];
				//window[_zdf]=null;
				
				_field=qh[0].fields;
				
				var items=qh[0].items;
				_len=items.length;
				for(var i=0;i<_len;i++){
					var o={
						"market":items[i][0],
						"symbol":items[i][1],
						"name":items[i][2],
						"trade":items[i][3],
						"prevsettlement":items[i][4],
						"zde":items[i][5],
						"zdf":items[i][6],
						"open":items[i][7],
						"high":items[i][8],
						"low":items[i][9],
						"volume":items[i][10],
						"position":items[i][11],
						"is_hot":items[i][12]
					}
					
					_data.push(o);
				}
				
				cfg.data.chart_qi_data=_data;
				_selectData();
				_dom(_data);
				_zdfAddEvent();
			});
		}
		
		function _selectData(){
			var tmplists=[0,1,2,0],chlen=tmplists.length;
			
			_curData=[];
			
			for(var i=0;i<_len;i++){
				if(curChecked[0]=='current'){
					if(cfg.dom.chartzdf4.className=='current'){
						if(Number(_data[i].volume)>=Number(cfg.dom.chartInput.value))_curData.push(_data[i]);
					}else{
						_curData.push(_data[i]);
					}
				}else{
					for(var m=1;m<chlen;m++){
						if(m==1&&curChecked[m]=='current'&&tmplists[m]==_data[i].is_hot){
							if(cfg.dom.chartzdf4.className=='current'){
								if(_data[i].volume>=Number(cfg.dom.chartInput.value))_curData.push(_data[i]);
							}else{
								_curData.push(_data[i]);
							}
						}
						if(m==2&&curChecked[m]=='current'&&tmplists[m]==_data[i].is_hot){
							if(cfg.dom.chartzdf4.className=='current'){
								if(_data[i].volume>=Number(cfg.dom.chartInput.value))_curData.push(_data[i]);
							}else{
								_curData.push(_data[i]);
							}
						}
						if(m==3&&curChecked[m]=='current'&&tmplists[m]==_data[i].is_hot){
							if(cfg.dom.chartzdf4.className=='current'){
								if(_data[i].volume>=Number(cfg.dom.chartInput.value))_curData.push(_data[i]);
							}else{
								_curData.push(_data[i]);
							}
						}
					}
				}
			}
		}
		
		function _dom(data_){
			_gclumn=cfg.params.clumn;
			_h=cfg.params.h;_uintw=cfg.params.w/_gclumn-2;
			
			var blanklen=_gclumn-_len%_gclumn,row=Math.floor(_len/_gclumn);
			
			cfg.dom.chartzdfFly.style.display='none';
			
			cfg.dom.chartzdfPan.innerHTML='';
			_divLists=[];
			
			for(var i=0;i<_len;i++){
				var curRow=Math.floor(i/_gclumn)+1,curClumn=Math.floor(i%_gclumn),
					midRow=Math.floor(row/2)+1,midClumn=Math.floor((_gclumn/2)-Number(blanklen/2)),
					midIndex;
				
				var element=createElement("span");
				
				_divLists.push(element);
				
				element.id='chartD_'+i;
				element.style.position='relative';
				element.style.styleFloat='left';
				element.style.cssFloat='left';
				element.style.width=_uintw+'px';
				element.style.height=_uinth+'px';
				element.style.borderRight=element.style.borderBottom='1px solid #fff';
				element.style.fontSize='12px';
				element.style.fontFamily='Microsoft YaHei,"微软雅黑","SimHei","宋体",helvetica,arial,sans-serif';
		        element.style.textAlign='center';
				element.innerHTML=data_[i].name;
				element.style.color=fontColorLegend(data_[i].zdf);
				element.style.cursor="pointer";
				element.style.backgroundColor=colorLegend(data_[i].zdf);
				cfg.dom.chartzdfPan.appendChild(element);
				
				if(element.innerHTML.length<=6)	element.style.lineHeight=_uinth+'px';
				
				
				boEvtUtil.addHandler(element,'mouseover',function(e){
					e=e||window.event;
					
					var target=(e.target||e.srcElement),targetXY=target.getBoundingClientRect(),
						index=String(target.id).slice(7);index=Number(index);
					
					//if(target.style.color=='#bbb'||target.style.color=='rgb(187, 187, 187)') return;
					
					//target.style.color='#555';
					
					cfg.dom.chartzdfpopupArrowOuter.style.top='16.5px';
					//popup left
					if((index%_gclumn)>_gclumn/2){
						cfg.dom.chartzdfpopup.style.left=targetXY.left-strSplit(cfg.dom.chartzdfpopup.style.width)-30+'px';
						cfg.dom.chartzdfpopupArrowOuter.style.borderWidth='6px 0px 6px 12px';
			    		cfg.dom.chartzdfpopupArrowInner.style.borderWidth='5px 0px 5px 10px';
			    		cfg.dom.chartzdfpopupArrowOuter.style.borderColor='transparent transparent transparent #D2D7E0';
			    		cfg.dom.chartzdfpopupArrowInner.style.borderColor='transparent transparent transparent white';
						cfg.dom.chartzdfpopupArrowOuter.style.left='276px';
		    			cfg.dom.chartzdfpopupArrowInner.style.left='-12px';
					}else{//popup right
						cfg.dom.chartzdfpopup.style.left=targetXY.left+_uintw+10+'px';
						cfg.dom.chartzdfpopupArrowOuter.style.borderWidth='6px 12px 6px 0px';
			    		cfg.dom.chartzdfpopupArrowInner.style.borderWidth='5px 10px 5px 0px';
			    		cfg.dom.chartzdfpopupArrowOuter.style.borderColor='transparent #D2D7E0 transparent transparent';
			    		cfg.dom.chartzdfpopupArrowInner.style.borderColor='transparent white transparent transparent';
			    		cfg.dom.chartzdfpopupArrowOuter.style.left='-13px';
		    			cfg.dom.chartzdfpopupArrowInner.style.left='4px';
					}

					var sTop=document.documentElement.scrollTop;
					if(sTop=='undefined') sTop=window.pageYOffset || document.body.scrollTop;
					if(sTop==0&&document.body.scrollTop!=0)	sTop=document.body.scrollTop;									
					
					cfg.dom.chartzdfpopup.style.top=targetXY.top+sTop-3+'px';
					
					cfg.dom.chartzdfpopupName.innerHTML=data_[index].name;
			    	cfg.dom.chartzdfpopupPrice.innerHTML=data_[index].open;
			    	cfg.dom.chartzdfpopupZdf.innerHTML=Number(data_[index].zdf).toFixed(3)+'%'
			    	cfg.dom.chartzdfpopupVolume.innerHTML=data_[index].volume;
					
					cfg.dom.chartzdfpopup.style.display='block';
				})
				
				boEvtUtil.addHandler(element,'mouseout',function(e){
					e=e||window.event;
					
					var target=(e.target||e.srcElement),index=String(target.id).slice(7);
					
					if(target.style.color=='#bbb'||target.style.color=='rgb(187, 187, 187)') return;
					
					if(!_clickDiv){
						//target.style.color='#fff';
						cfg.dom.chartzdfpopup.style.display='none';
					}
				})
				
				boEvtUtil.addHandler(element,'click',function(e){
					e=e||window.event;
					
					var target=(e.target||e.srcElement),index=String(target.id).slice(7);index=Number(index);
						
					if(target.style.color=='#bbb'||target.style.color=='rgb(187, 187, 187)') return;
						_clickDiv=target;
						
					cfg.dom.chartzdfpopupImga.href=cfg.url.popupa.replace('$symbol',data_[index].symbol);
		        	cfg.dom.chartzdfpopupImgimg.src=cfg.url.popupimg.replace('$symbol',data_[index].symbol)+Math.random();
		        	cfg.dom.chartzdfpopupImg.style.display='block';
		        	var row=Math.floor(index/_gclumn);
		        	
		        	if(row>9){
		        		cfg.dom.chartzdfpopup.style.top=strSplit(cfg.dom.chartzdfpopup.style.top)-(row-8)*_uinth+25+'px';
		        		cfg.dom.chartzdfpopupArrowOuter.style.top=(row-8)*_uinth-10+'px';
		        	}
		        	
		        	cfg.dom.chartzdfFly.style.display='block';
				})
			}
			
			_setDom();
			
			dataRightReady();
		}
		
		function _redraw(){
			var curLen=_curData.length;
			for(var i=0;i<_len;i++){
				_divLists[i].style.backgroundColor='#bbb';
				_divLists[i].style.color='#bbb';
				for(var j=0;j<curLen;j++){
					if(_data[i].symbol==_curData[j].symbol){
						_divLists[i].style.backgroundColor=colorLegend(_data[i].zdf);
						_divLists[i].style.color='#fff';
						break;
					}
				}
			}
		}

		var curSelect=0,curChecked=['current','current','current','current'],curinputtext=5000;
		function _zdfAddEvent(){
			var btn=[];btn.push(cfg.dom.chartzdf0);btn.push(cfg.dom.chartzdf1);btn.push(cfg.dom.chartzdf2);btn.push(cfg.dom.chartzdf3);
			for(var i=0;i<4;i++){
				boEvtUtil.addHandler(btn[i],'click',function(e){
					for(var i=btn.length;i--;){
						curChecked[i]=btn[i].checked;
					}
					e=e||window.event;
					
					var target=(e.target||e.srcElement),index=String(target.id).slice(7);index=Number(index);
						
					curSelect=target.id.slice(10);
					
					var j=1;
					
					for(var i=btn.length;i--;){
						curChecked[i]=btn[i].className;
					}
					
					curSelect=target.id.slice(10);
					var j=1;
					if(curSelect==0){
						if(target.className=='current'){
							for(j=0;j<4;j++){
								curChecked[j]=btn[j].className='';
								btn[j].innerHTML=_checkedlist[j];
							}
						}else{
							for(j=0;j<4;j++){
								curChecked[j]=btn[j].className='current';
								btn[j].innerHTML=_checkedlist[j];
							}
						}
					}else{
						if(target.className==''){
							var tmpchecked=0;
							curChecked[curSelect]=target.className='current';
							target.innerHTML=_checkedlist[curSelect];
							for(j=1;j<4;j++){
								if(btn[j].className=='current'){
									tmpchecked++;
								}
								if(tmpchecked>=3){
									curChecked[0]=btn[0].className='current';
									btn[0].innerHTML=_checkedlist[0];
								}
							}
						}else{
							curChecked[curSelect]=target.className='';
							curChecked[0]=btn[0].className='';
							target.innerHTML=_checkedlist[curSelect];
							btn[0].innerHTML=_checkedlist[0];
							
						}
					}
					
					_selectData();
					_redraw();
				});
			}
			
			boEvtUtil.addHandler(cfg.dom.chartzdf4,'click',function(){
				if(cfg.dom.chartzdf4.className=='current'){
					cfg.dom.chartzdf4.className='';
				}else{
					cfg.dom.chartzdf4.className='current';
				}
				
				_selectData();
				_redraw();
			});
			
			boEvtUtil.addHandler(cfg.dom.chartInput,'keyup',function(){
				_setInput(cfg.dom.chartInput);
			});
			
			boEvtUtil.addHandler(cfg.dom.chartInput,'blur',function(){
				_setInput(cfg.dom.chartInput);
			});
			
			boEvtUtil.addHandler(cfg.dom.chartzdfFly,'click',function(){
				cfg.dom.chartzdfpopupImgimg.src='';
				cfg.dom.chartzdfpopupImg.style.display='none';
				cfg.dom.chartzdfFly.style.display='none';
				cfg.dom.chartzdfpopup.style.display='none';
				
				_clickDiv.style.color='#fff';
				_clickDiv=null;
			})
			
			boEvtUtil.addHandler(document.body,'click',function(){
				if(cfg.dom.chartzdfpopupImgimg.style.display=='block')
				cfg.dom.chartzdfpopup.style.display='none';
			});
		}
		
		function _setDom(){
			cfg.dom.chartzdfCon.style.width=cfg.params.w+'px';
			cfg.dom.chartzdfpopup.style.width=260+'px';
			
			var bodyw=document.body.offsetWidth||document.documentElement.offsetWidth,
				bodyh=document.body.offsetHeight||document.documentElement.offsetHeight;
				
				
			cfg.dom.chartzdfFly.style.width=bodyw-50+'px';
			cfg.dom.chartzdfFly.style.height=bodyh-10+'px';
			cfg.dom.chartzdfFly.style.left='0px';
		    cfg.dom.chartzdfFly.style.top='0px';
		}
		
		function _setInput(target_){
			target_.value=target_.value.replace(/[^0-9]+/,'');
			if(target_.value==curinputtext){
				return;
			}else{
				curinputtext=target_.value;
				if(cfg.dom.chartzdf4.className=='current'){
					_selectData();
					_redraw();
				}
			}
		}
		this.bLegend=new function(){
			legend(cfg.dom.chartzdfLegend,cfg.params.w,'chart-zdf-btn');
		}
		function _resize(menuw_){
			if(_data&&_data.length<=0)	return;
			var _option={};
			if(!menuw_)menuw_=0;
			
			var _option={},_optionVolume={};

			var chartClientWidth=document.documentElement.clientWidth,
				chartVisualWidth=chartClientWidth-224,chartClientEdge=40;
				chartUintW=Math.floor((chartVisualWidth-2-chartClientEdge)/17)-3;
			
			_option={
				t:'zdf',
				w:dataPanelWidth,//chartVisualWidth-chartClientEdge,
				h:590,
				clumn:15
			};
			
			
			_optionVolume={
				t:'volume',
				w:dataPanelWidth,//chartVisualWidth-chartClientEdge,
				h:530,
				menuh:60,
				legentTop:60
			}
			//console.log('当前可用宽度：',chartClientWidth,'图形可用宽度：',chartClientWidth-224,'图形宽度:',chartClientWidth-224-chartClientEdge);
			//console.log('单元格宽度：',chartUintW,'左边宽度：',chartUintW*7,'右边宽度',_option.rightDivW,'右边格子宽度',10*_option.uintW+20);
			
			cfg.params.w=_option.w||cfg.params.w;
			cfg.params.h=_option.h||cfg.params.h;
			cfg.params.t=_option.t||cfg.params.t;
			cfg.params.menuh=_option.menuh||cfg.params.menuh;
			cfg.params.clumn=_option.clumn||cfg.params.clumn;
			cfg.params.legentTop=_option.legentTop||cfg.params.legentTop;
			
			cfg.dom.chartQhrt.style.width=cfg.params.w+'px';
			cfg.dom.chartzdfLegend.style.width=cfg.params.w+'px';
			
			_dom(_data);
			_redraw();
		}
		
		this.resize=_resize;
		this.loadData=_loadData;
	}
	
	var curthis,curd,clickit=0,root,x,y;
	
	/////////// 期货成交量图
	function volumeChart(){
		var _field,_len=225,_w=cfg.params.w,_h=cfg.params.h-cfg.params.legentTop,_menuh=cfg.params.menuh,_clickDiv;
		var _place=["中国期货市场","大连商品交易所","上海期货交易所","郑州商品交易所","中国金融期货交易所"],_curplace=0;
		var _checkedlist=['所有','主力合约','次主力合约','非主力合约']
		root={
			"name": _place[0],
		    "children": [
		    	{
		    		"name": _place[1],
		    		"code":"dce",
		    		"children": []
		    	},
		    	{
		    		'code':'shfe',
		    		"name":_place[2],
		    		"children": []
		    	},
		    	{
		    		'code':'czce',
		    		"name":_place[3],
		    		"children": []
		    	},
		    	{
		    		'code':'zjs',
		    		"name":_place[4],
		    		"children": []
		    	}
		    ]
		};
		
		var nodes={},nodeslen,raw=cloneObject(root),data=[]||cfg.data.chart_qi_data;
		var zldata=[],czldata=[],fzldata=[],curSelect=0,isfirst=0,curChecked=['current','current','current','current'];
		var treemap;
			x=d3.scale.linear().domain([0, _w]).range([0, _w]),
			y=d3.scale.linear().domain([0, _h]).range([0, _h]);
			
		var svg=d3.select("#chart-volume").append("div").attr("id",'chart-svg')
		    	.style("width",_w+'px').style("height",_h+'px').style("background",'#fff')
		    	.style('position', 'relative');
		
		function _init(){
			cfg.dom.chartvolumenav.innerHTML=raw.name;
			cfg.dom.chartvolumenav.style.cursor='pointer';
			//alert('d'+Math.random());
			var volumeVar='chart_volume';
			/*if(data&&data.length>0){
				nodeslen=len=qh.result.data.length;
				for(var i=0;i<len;i++){
					var obj=qh.result.data[i];
						obj.value=Number(obj.volume);
					
					for(var j=0,jlen=root.children.length;j<jlen;j++){
						if(root.children[j].code===obj.market){
							root.children[j].children.push(obj);
						}
					}
				}
				
				nodes=cloneObject(root);
			}else{*/
				
				wn_varLoader(cfg.url.volumeApi.replace('$cb','var '+volumeVar+"="),function(){
					var qh=window[volumeVar];
					//window[volumeVar]=null;
					
					
					_field=qh[0].fields;
					
					var items=qh[0].items;
					nodeslen=_len=items.length;
					for(var i=0;i<_len;i++){
						var o={
							"market":items[i][0],
							"symbol":items[i][1],
							"name":items[i][2],
							"trade":items[i][3],
							"prevsettlement":items[i][4],
							"zde":items[i][5],
							"zdf":items[i][6],
							"open":items[i][7],
							"high":items[i][8],
							"low":items[i][9],
							"volume":items[i][10],
							"position":items[i][11],
							"is_hot":items[i][12]
						}
						data.push(o);
					}
					
					cfg.data.chart_qi_data=data;
					
					for(var i=0;i<_len;i++){
						var obj=data[i];
							obj.value=Number(obj.volume);
						for(var j=0,jlen=root.children.length;j<jlen;j++){
							if(root.children[j].code===obj.market){
								root.children[j].children.push(obj);
							}
						}
					}
					nodes=cloneObject(root);
					
					_cjlAddEvent();
					
					_initData();
					
					_navHandler();
				});
			//}
		}
		
		function _navHandler(){
			boEvtUtil.addHandler(cfg.dom.chartvolumenav,'click',function(e){
				e=e||window.event;
				var target=(e.target||e.srcElement);
				
				if(target.innerHTML==_place[0])	return;
				target.innerHTML=_place[0];
				
				_curplace=0;
				_initData();
			})
		}
		
		function _initData(){
			if(isfirst==1){
				
				root={};
				root=cloneObject(raw);
				
				var len=nodes.children.length,clen=0,tmplists=[0,1,2,0],chlen=curChecked.length;
				for(var i=0;i<len;i++){
					clen=nodes.children[i].children.length;
					
					for(var j=0;j<clen;j++){
						var node=nodes.children[i].children[j];
						
						if(curChecked[0]=='current'){
							root.children[i].children.push(node);
						}else{
							for(var m=1;m<chlen;m++){
								if(m==1&&curChecked[m]=='current'&&tmplists[m]==node.is_hot){
									root.children[i].children.push(node);
								}
								if(m==2&&curChecked[m]=='current'&&tmplists[m]==node.is_hot){
									root.children[i].children.push(node);
								}
								if(m==3&&curChecked[m]=='current'&&tmplists[m]==node.is_hot){
									root.children[i].children.push(node);
								}
							}
						}
					}
				}
				
				clickit=0;
				d3.select("#chart-svg").remove();
				
				if(root==null)return;
				
				svg=d3.select("#chart-volume").append("div").attr("id",'chart-svg')
		    	.style("width",_w+'px').style("height",_h+'px').style("background",'#fff')
		    	.style('position', 'relative');
			}
			
			treemap=null;
			treemap=d3.layout.treemap()
				.round(false)
			    .size([_w, _h])
			    .sticky(true)
			    .value(function(d_){ 
			    	return d_.value;
			    })
			    .sort(function(a, b){return a.value - b.value; });
			    
			_display(root);
			
			isfirst=1;

			_placetrans();
			
			_divEvent();
			
			dataRightReady();
		}
		
		function _divEvent(){
			
			var len=nodestmp.length,cdiv;
			
			for(var i=0;i<len;i++){
				if(nodestmp[i].symbol){
					cdiv=d3.select('#'+nodestmp[i].name);
					cdiv[0][0].style.cursor='pointer';
					
					boEvtUtil.addHandler(cdiv[0][0],'mouseover',function(e){
						e=e||window.event;
						var target=(e.target||e.srcElement),targetXY,curDIV,targetP,targetPXY;
						
						if(target.id){
							
							if(target.parentNode.id!='chart-svg'){
								target=target.parentNode;
							}
							targetXY=target.getBoundingClientRect();
							targetP=target.parentNode;
							targetPXY=targetP.getBoundingClientRect();
							
							curDIV=d3.select(target).data()[0];
							
							cfg.dom.chartvolumepopupName.innerHTML=curDIV.name;
					    	cfg.dom.chartvolumepopupPrice.innerHTML=curDIV.open;
					    	cfg.dom.chartvolumepopupZdf.innerHTML=Number(curDIV.zdf).toFixed(3)+'%';
					    	cfg.dom.chartvolumepopupVolume.innerHTML=curDIV.volume;
							
							var sTop=document.documentElement.scrollTop;
							if(sTop=='undefined') sTop=window.pageYOffset || document.body.scrollTop;
							if(sTop==0&&document.body.scrollTop!=0)	sTop=document.body.scrollTop;		
					    	if((targetXY.left-targetPXY.left)>(_w-540)){
			       				cfg.dom.chartvolumepopup.style.left=targetXY.left-30-strSplit(cfg.dom.chartvolumepopup.style.width)+'px';
			       				cfg.dom.chartvolumepopup.style.top=targetXY.top+sTop+'px';
			       				
			       				cfg.dom.chartvolumepopupArrowOuter.style.borderWidth='6px 0px 6px 12px';
					    		cfg.dom.chartvolumepopupArrowInner.style.borderWidth='5px 0px 5px 10px';
					    		cfg.dom.chartvolumepopupArrowOuter.style.borderColor='transparent transparent transparent #D2D7E0';
					    		cfg.dom.chartvolumepopupArrowInner.style.borderColor='transparent transparent transparent white';
								cfg.dom.chartvolumepopupArrowOuter.style.left='276px';
				    			cfg.dom.chartvolumepopupArrowInner.style.left='-12px';
			       			}else{
			       				cfg.dom.chartvolumepopup.style.left=targetXY.left+targetXY.right-targetXY.left+10+'px';
			       				cfg.dom.chartvolumepopup.style.top=targetXY.top+sTop+'px';
			       				
								cfg.dom.chartvolumepopupArrowOuter.style.borderWidth='6px 12px 6px 0px';
					    		cfg.dom.chartvolumepopupArrowInner.style.borderWidth='5px 10px 5px 0px';
					    		cfg.dom.chartvolumepopupArrowOuter.style.borderColor='transparent #D2D7E0 transparent transparent';
					    		cfg.dom.chartvolumepopupArrowInner.style.borderColor='transparent white transparent transparent';
					    		cfg.dom.chartvolumepopupArrowOuter.style.left='-13px';
				    			cfg.dom.chartvolumepopupArrowInner.style.left='4px';
			       			}
			       			
			       			if((targetXY.right-targetXY.left)>(_w-340)){
			       				cfg.dom.chartvolumepopup.style.left=targetXY.left+200+'px';
			       			}
			       			

							if((_h+60-targetXY.top+targetPXY.top)<100){
								cfg.dom.chartvolumepopup.style.top=targetXY.top+sTop-100+targetXY.bottom-targetXY.top+'px';
								cfg.dom.chartvolumepopupArrowOuter.style.top='86px';
							}
			       			
							cfg.dom.chartvolumepopup.style.display='block';
						}
					});
					
					boEvtUtil.addHandler(cdiv[0][0],'mouseout',function(e){
						e=e||window.event;
						var target=(e.target||e.srcElement);
						
						if(!_clickDiv){
							cfg.dom.chartvolumepopupArrowOuter.style.top='16.5px';
							cfg.dom.chartvolumepopup.style.display='none';
						}
					});
					
					boEvtUtil.addHandler(cdiv[0][0],'click',function(e){
						cfg.dom.chartvolumeFly.style.display='block';
						
						e=e||window.event;
						var target=(e.target||e.srcElement),targetXY,curDIV;
						var targetP,targetPXY;
						var sTop=document.documentElement.scrollTop;
						if(sTop=='undefined') sTop=window.pageYOffset || document.body.scrollTop;
						if(sTop==0&&document.body.scrollTop!=0)	sTop=document.body.scrollTop;		
						if(target.id){
							
							if(target.parentNode.id!='chart-svg'){
								target=target.parentNode;targetP=target.parentNode;
								targetXY=target.getBoundingClientRect();targetPXY=targetP.getBoundingClientRect();
							}
							_clickDiv=target;
							
							if(target.parentNode.id=='chart-svg'){
								targetP=target.parentNode;targetXY=target.getBoundingClientRect();targetPXY=targetP.getBoundingClientRect();
							
								if((_h-targetXY.top+targetPXY.top)<230){
									cfg.dom.chartvolumepopup.style.top=targetXY.top+sTop
										-230+targetXY.bottom-targetXY.top+'px';
									cfg.dom.chartvolumepopupArrowOuter.style.top='210px';
								}else{
									cfg.dom.chartvolumepopup.style.top=targetXY.top+sTop+'px';
									cfg.dom.chartvolumepopupArrowOuter.style.top='16.5px';
								}
							}
							
							curDIV=d3.select(target).data()[0];
						}
						
						cfg.dom.chartvolumepopupImga.href=cfg.url.popupa.replace('$symbol',curDIV.symbol);
			        	cfg.dom.chartvolumepopupImgimg.src=cfg.url.popupimg.replace('$symbol',curDIV.symbol);
			        	cfg.dom.chartvolumepopupImg.style.display='block';
					});
				}
			}
		}
		
		function _placetrans(){
			if(_curplace!=0)	return;
			
			var len=raw.children.length;
			//alert(len+Math.random());
			for(var i=0;i<len;i++){
				var jys=d3.select('#'+_place[i+1]);
				//alert(len);
				jys[0][0].style.cursor='pointer';
				
				boEvtUtil.addHandler(jys[0][0],'click',function(e){
					e=e||window.event;
					var target=(e.target||e.srcElement);
					
					for(var j=1;j<(len+1);j++){
						if(_place[j]==d3.select(target).data()[0].name){
							_curplace=j;break;
						}
					}	
					
					cfg.dom.chartvolumenav.innerHTML+='>>'+_place[_curplace];
					_initData();
				})
			}
		}
		var nodestmp;
		function _display(){
			var newData={
				'children':[]
			};
			
			if(_curplace!=0){
				newData.children=root.children[_curplace-1].children;
			}else{
				newData.children=root.children;
			}
			
			nodestmp=treemap.nodes(newData);
			var alists=[],blists=[];
			var cell=svg.selectAll('div')
			   .data(nodestmp)
	      	   .enter().append('div')
	      	   .style('styleFloat','left')
			   .style('float','left')
			   .style('background',function(d_){return colorLegend(d_.zdf);})
	      	   .style("width",function(d_){ var xd=d_.dx<=1 ? d_.dx:d_.dx-1;return xd+"px";})
		       .style("height",function(d_){ var yd=d_.dy<=1 ? d_.dy:d_.dy-1;return yd+"px";})
		       .style('height',function(d_){ var yd=d_.dy<=1 ? d_.dy:d_.dy-1;return yd+"px";})
		       .style("top",function(d_){ return d_.y+"px";})
		       .style("left",function(d_){ return d_.x+"px";})
		       .style("border",function(d_){return '1px solid #fff';})
		       .style('position','absolute')
		       .attr('id',function(d_){return d_.name;})
		       .text(function(d_){
		        	if(d_.code&&d_.y==0){
		        		alists.push(d_);
		        	}
		        	if(d_.code&&d_.y!=0){
		        		blists.push(d_);
		        	}
		        	return '';
		       })
		        
			svg.selectAll('div').attr('width',function(d_){
				if(d_.name=='中国期货市场'||d_.dx==_w){
					this.style.width='0px';this.style.height='0px';
				}
				for(var i=0;i<alists.length;i++){
					if(d_.market&&d_.market==alists[i].code){
						this.style.top=strSplit(this.style.top)+_menuh/2+'px';
					}
					if(d_.code&&d_.code==alists[i].code){
						this.style.height=_menuh/2+'px';d_.dy=30;
						this.style.background='#999';
					}
				}
				for(i=0;i<blists.length;i++){
					if(d_.market&&d_.market==blists[i].code){
						this.style.top=strSplit(this.style.top)+_menuh+'px';
					}
					if(d_.code&&d_.code==blists[i].code){
						this.style.top=strSplit(this.style.top)+_menuh/2+'px';
						this.style.height=_menuh/2+'px';d_.dy=30;
						this.style.background='#999';
					}
				}
			});
			
			cell.append("span")
				.style('display','block')
	            .style("width", function(d_) { return d_.dx + 'px'; })
	      		.style("height", function(d_){ if(d_.dy<=50)	return d_.dy+'px';	return 20 + 'px'; })
	      		.style("top", function(d_){ return d_.dy/2-8+"px"; })
		        .style("left", function(d_){ return 0+"px"; })
	      		.style("color",function(d_){ if(!d_.zdf)return '#ffffff';return fontColorLegend(d_.zdf);})
	      		.style("fontSize", '12px')
	      		.style("font-size", '12px')
	      		.style("overflow",'hidden')
	      		.style("text-align",'center')
	      		.style("textAlign",'center')
	      		.style('position', 'relative')
	      		.attr('id',function(d_){return "s"+d_.name})
	      		
	      		.text(function(d_) {
	      			var name='';
		        	if(d_.dx>80&&d_.dy>15) name=d_.name;
		        	return name;
	      		}) 
			getDocument('chart-svg').style.height=strSplit(getDocument('chart-svg').style.height)+60+'px';	
			
			_setDom();
		}
		
		function _cjlAddEvent(){
			var btn=[];btn.push(cfg.dom.chartvolume0);btn.push(cfg.dom.chartvolume1);btn.push(cfg.dom.chartvolume2);btn.push(cfg.dom.chartvolume3);
			
			
			for(var i=0;i<4;i++){
				boEvtUtil.addHandler(btn[i],'mouseover',function(e){
					e=e||window.event;
					var target=(e.target||e.srcElement);
					
					//for(var i=btn.length;i--;){
					//	btn[i].className='';
					//}
					//target.className='current';
				});
				
				boEvtUtil.addHandler(btn[i],'click',function(e){
					e=e||window.event;
					var target=(e.target||e.srcElement);
					
					for(var i=btn.length;i--;){
						curChecked[i]=btn[i].className;
					}
					
					curSelect=target.id.slice(10);
					var j=1;
					if(curSelect==0){
						if(target.className=='current'){
							for(j=0;j<4;j++){
								curChecked[j]=btn[j].className='';
								btn[j].innerHTML=_checkedlist[j];
							}
						}else{
							for(j=0;j<4;j++){
								curChecked[j]=btn[j].className='current';
								btn[j].innerHTML=_checkedlist[j];
							}
						}
					}else{
						if(target.className==''){
							var tmpchecked=0;
							curChecked[curSelect]=target.className='current';
							target.innerHTML=_checkedlist[curSelect];
							for(j=1;j<4;j++){
								if(btn[j].className=='current'){
									tmpchecked++;
								}
								if(tmpchecked>=3){
									curChecked[0]=btn[0].className='current';
									_checkedlist[j];
									btn[0].innerHTML=_checkedlist[0];
								}
							}
						}else{
							curChecked[curSelect]=target.className='';
							curChecked[0]=btn[0].className='';
							target.innerHTML=_checkedlist[curSelect];
							btn[0].innerHTML=_checkedlist[0];
							
						}
					}
					_initData();
				});
			}
			
			boEvtUtil.addHandler(document.body,'click',function(){
				console.log(cfg.dom.chartvolumepopupImg.style.display);
				if(cfg.dom.chartvolumepopupImg.style.display=='none')
				cfg.dom.chartvolumepopup.style.display='none';
			});
			
			boEvtUtil.addHandler(cfg.dom.chartvolumeFly,'click',function(){
				cfg.dom.chartvolumepopupImg.style.display='none';
				cfg.dom.chartvolumeFly.style.display='none';
				
				cfg.dom.chartvolumepopupArrowOuter.style.top='16.5px';
				_clickDiv.style.color='#fff';
				_clickDiv=null;
			})
		}
		
		function _setDom(){
			//cfg.dom.chartzdfCon.style.width=cfg.params.w+'px';
			cfg.dom.chartvolumepopup.style.width=260+'px';
			
			var bodyw=document.body.offsetWidth||document.documentElement.offsetWidth,
				bodyh=document.body.offsetHeight||document.documentElement.offsetHeight;
		    
		    cfg.dom.chartvolumeFly.style.width=bodyw-30+'px';
		    cfg.dom.chartvolumeFly.style.height=bodyh-10+'px';
			cfg.dom.chartvolumeFly.style.left='0px';
		    cfg.dom.chartvolumeFly.style.top='0px';
		}
		
		this.bLegend=new function(){
			legend(cfg.dom.chartvolumelegend,cfg.params.w,'chart-volume-btn');
		}
		
		function _resize(menuw_){
			if(nodestmp&&nodestmp.length<=0)	return;
			var _option={};
			if(!menuw_)menuw_=0;
			
			var _option={},_optionVolume={};

			var chartClientWidth=document.documentElement.clientWidth,
				chartVisualWidth=chartClientWidth-224,chartClientEdge=40;
				chartUintW=Math.floor((chartVisualWidth-2-chartClientEdge)/17)-3;
			
			_option={
				t:'zdf',
				w:dataPanelWidth,//chartVisualWidth-chartClientEdge,
				h:590,
				clumn:15
			};
			
			_optionVolume={
				t:'volume',
				w:dataPanelWidth,//chartVisualWidth-chartClientEdge,
				h:dataPanelWidth*5/8,
				menuh:60,
				legentTop:60
			}
			//console.log('当前可用宽度：',chartClientWidth,'图形可用宽度：',chartClientWidth-224,'图形宽度:',chartClientWidth-224-chartClientEdge);
			//console.log('单元格宽度：',chartUintW,'左边宽度：',chartUintW*7,'右边宽度',_option.rightDivW,'右边格子宽度',10*_option.uintW+20);
			
			cfg.params.w=_optionVolume.w||cfg.params.w;
			cfg.params.h=_optionVolume.h||cfg.params.h;
			cfg.params.t=_optionVolume.t||cfg.params.t;
			cfg.params.menuh=_optionVolume.menuh||cfg.params.menuh;
			cfg.params.clumn=_optionVolume.clumn||cfg.params.clumn;
			cfg.params.legentTop=_optionVolume.legentTop||cfg.params.legentTop;
			
			_w=cfg.params.w;_h=cfg.params.h-cfg.params.legentTop;_menuh=cfg.params.menuh;
			cfg.dom.chartVolume.style.width=cfg.params.w+'px';
			cfg.dom.chartvolumelegend.style.width=cfg.params.w+'px';
			_initData();
		}
		
		this.resize=_resize;
		this.initChart=_init;
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
			cfg.params.w=_pObj.w||cfg.params.w;
			cfg.params.h=_pObj.h||cfg.params.h;
			cfg.params.t=_pObj.t||cfg.params.t;
			cfg.params.menuh=_pObj.menuh||cfg.params.menuh;
			cfg.params.clumn=_pObj.clumn||cfg.params.clumn;
			cfg.params.legentTop=_pObj.legentTop||cfg.params.legentTop;
		}
		
		//
		var _chart,_chart1;
		function _init(){
			cfg.dom.chartQhrt.style.width=cfg.params.w+'px';
			//alert("ddd"+Math.random());
			if(cfg.params.t==cfgT[0]){
				_chart=new zdfChart;
				_chart.loadData();
			}
			if(cfg.params.t==cfgT[1]){
				_chart1=new volumeChart;
				_chart1.initChart();
					//_chart1.bLegend();
			}
		}
		
		function _resize(menuw_){
			if(_chart)	_chart.resize(menuw_);
			if(_chart1)	_chart1.resize(menuw_);
		}
		this.resize=_resize;
		this.init=_init;
	}
}

var chartCopentimer,chartMapTimer;
if(chartCopentimer!=null){
	clearInterval(chartCopentimer);
	chartCopentimer=null;
}
if(chartMapTimer!=null){
	clearInterval(chartMapTimer);
	chartMapTimer=null;
}

var _optionChart_zdf={},_optionVolume={};

var chartClientWidth=document.documentElement.clientWidth,
	chartVisualWidth=chartClientWidth-224-30,chartClientEdge=40;
	chartUintW=Math.floor((chartVisualWidth-2-chartClientEdge)/17)-3;
	
	//console.log('当前可用宽度：',chartClientWidth,'图形可用宽度：',chartClientWidth-224,'图形宽度:',chartClientWidth-224-chartClientEdge);
	//console.log('单元格宽度：',chartUintW,'左边宽度：',chartUintW*7);
if(!dataPanelWidth)var dataPanelWidth=chartVisualWidth-chartClientEdge;

_optionChart_zdf={
	t:'zdf',
	w:dataPanelWidth,//dataPanelWidth//chartVisualWidth-chartClientEdge
	h:590,
	clumn:15
};


_optionVolume={
	t:'volume',
	w:dataPanelWidth,//dataPanelWidth//chartVisualWidth-chartClientEdge
	h:dataPanelWidth*5/8,
	menuh:60,
	legentTop:60
}

var _qhrtChart=new qhChart(_optionChart_zdf);
_qhrtChart.init();

var _qhrtvChart=new qhChart(_optionVolume);
_qhrtvChart.init();

function onResize(){
	_qhrtChart.resize();
	_qhrtvChart.resize();
}

function hideSidebar(){
	_qhrtChart.resize();
	_qhrtvChart.resize();
};

function openSidebar(){
	_qhrtChart.resize();
	_qhrtvChart.resize();
}


