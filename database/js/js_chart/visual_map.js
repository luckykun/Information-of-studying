
var chartCopentimer,chartMapTimer;
if(chartCopentimer!=null){
	clearInterval(chartCopentimer);
	chartCopentimer=null;
}
if(chartMapTimer!=null){
	clearInterval(chartMapTimer);
	chartMapTimer=null;
}

function visual_hqgszs(param_){
	function getDocument(n,c){
		c=c||document;
		return c.getElementById(n);
	}
	
	function createElement(t){return document.createElement(t);}
	
	var dateUtils={
		dtos:function(d_,joinStr){
			!joinStr&&(joinStr='/');
			var arr=[d_.getFullYear()];
			var month=d_.getMonth()+1;
			arr[arr.length]=month<10?('0'+month):month;
			var date=d_.getDate();
			arr[arr.length]=date<10?('0'+date):date;
			return arr.join(joinStr)
		},
		dtohm:function(d_){
			var h=d_.getHours()<10?('0'+d_.getHours()):d_.getHours();
			var m=d_.getMinutes()<10?('0'+d_.getMinutes()):d_.getMinutes();
			var s=d_.getSeconds()<10?('0'+d_.getSeconds()):d_.getSeconds();
			
			return h+':'+m+':'+s;
		}
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
	
	var _url1='http://hq.sinajs.cn/?r='+Math.random()+'$list=sh000001,r_HSI,znb_UKX,znb_DAX,znb_INDEXCF,znb_CAC,znb_SMI,znb_FTSEMIB,znb_MADX,znb_OMX,znb_SPX,';
	var _url2='znb_HEX,znb_OSEAX,znb_ISEQ,znb_AEX,znb_ICEXI,znb_NKY,znb_TWSE,znb_FSSTI,znb_KOSPI,znb_FBMKLCI,znb_SET,znb_JCI,znb_PCOMP,znb_KSE100,znb_SENSEX,znb_VNINDEX,';///*b_IBEX,*/
	var _url3='znb_CSEALL,znb_SASEIDX,znb_SPTSX,znb_MEXBOL,znb_IBOV,znb_MERVAL,znb_AS51,znb_NZSE50FG,znb_CASE,znb_JALSH,sz399001,znb_INDU,znb_CCMP';
	var cfg={
		hqurl:_url1+_url2+_url3,
		downColor:['#d3edd4','#7cd29a','#4cbb73','#23a64c'],
		lfc:['#ffffff','#ffffff','#ffffff','#23a64c','#666666','#f54545','#ffffff','#ffffff','#ffffff'],
		upColor:['#ffdfd6','#ff8080','#ff5656','#f54545'],
		LEDENGCOLOR:['rgba(35,166,76,1)','rgba(76,187,115,1)','rgba(124,210,154,1)','rgba(211,237,212,1)','#F3F3F3','rgba(255,223,214,1)','rgba(255,128,128,1)','rgba(255,86,86,1)','rgba(245,69,69,1)'],
		fdownColor:'#23a64c',
		fupColor:'#f54545',
		fstyle:"padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; $width",
		logopicurl:'http://i2.sinaimg.cn/home/deco/2009/0330/con_logo_fin.gif',
		
		jjsj:{
			CAN:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%BC%D3%C4%C3%B4%F3&event=%D0%C2%CE%DD%BF%AA%B9%A4',
			DEU:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%B5%C2%B9%FA&event=Ifo%C9%CC%D2%B5%BE%B0%C6%F8%D6%B8%CA%FD',
			USA:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%C3%C0%B9%FA&event=ISM%D6%C6%D4%EC%D2%B5%D6%B8%CA%FD',
			SWE:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%C8%F0%CA%BF&event=SVME%B2%C9%B9%BA%BE%AD%C0%ED%C8%CB%D6%B8%CA%FD',
			JPN:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%C8%D5%B1%BE&event=%C3%B3%D2%D7%D5%CA%A3%A8%B2%C6%CE%F1%CA%A1%A3%A9',
			AUS:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%B0%C4%B4%F3%C0%FB%D1%C7&event=%C1%E3%CA%DB%CF%FA%CA%DB%D4%C2%C2%CA',
			GBR:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%D3%A2%B9%FA&event=Halifax%B7%BF%BC%DB%D6%B8%CA%FD%D4%C2%C2%CA'
		},
		
		params:{
			w:780,h:520
		},
		
		dom:{
			basicMap:getDocument('basicMap')
		}
	}
	
	function sMap(){
		
		var _hqLists=[
			{ ct:'GBR',hq:'znb_UKX',name:"英国",img:"",lname:'英国富时100指数',hqname:'富时100指数',status: {range:[[1600, 2400],[0,0030]],open:'e',holiday:0}},
			{ ct:'CHN',hq:'sh000001',name:"中国",img:"http://image.sinajs.cn/newchart/small/nsh000001.gif?"+Math.random(),lname:'中国上证指数',hqname:'上证指数',status: {range: [[930, 1130], [1300, 1500]],open:'e',holiday:0}},
			{ ct:'DEU',hq:'znb_DAX',name:"德国",img:"",lname:'德国DAX 30种股价指数',hqname:'德国DAX指数',status: {range: [[1600, 2400],[0,0030]],open:'e',holiday:0}},
			{ ct:'RUS',hq:'znb_INDEXCF',name:"俄罗斯",img:"",lname:'俄罗斯MICEX指数',hqname:'俄罗斯MICEX指数',status: {range: [[1430, 2445]],open:'e',holiday:0}},
			{ ct:'FRA',hq:'znb_CAC',name:"法国",img:"",lname:'法国CAC40指数',hqname:'法国CAC40指数',status: {range: [[1600, 2400],[0,0030]],open:'e',holiday:0}},
			{ ct:'CHE',hq:'znb_SMI',name:"瑞士",img:"",lname:'瑞士股票指数',hqname:'瑞士市场指数',status: {range: [[1500, 2330]],open:'e',holiday:0}},
			{ ct:'ITA',hq:'znb_FTSEMIB',name:"意大利",img:"",lname:'富时意大利MIB指数',hqname:'富时意大利MIB指数',status: {range:[[1505, 2335]],open:'e' ,holiday:0}},
			{ ct:'ESP',hq:'znb_MADX',name:"西班牙",img:"",lname:'西班牙马德里综合指数',hqname:'西班牙MA马德里指数',status: {range:[[1500, 2330]],open:'e',holiday:0}},
			{ ct:'SWE',hq:'znb_OMX',name:"瑞典",img:"",lname:'OMX斯德哥尔摩30指数',hqname:'OMX斯德哥尔摩30指数',status: {range:[[1500, 2330]],open:'e' ,holiday:0}},
			{ ct:'DNK',hq:'znb_HEX',name:"丹麦",img:"",lname:'丹麦OMXPHI指数',hqname:'OMX赫尔辛基指数',status: {range: [[1500, 2330]],open:'e' ,holiday:0}},
			{ ct:'NOR',hq:'znb_OSEAX',name:"挪威",img:"",lname:'挪威OSEAX指数',hqname:'挪威OSE全股指数',status: {range: [[1500, 2330]],open:'e' ,holiday:0}},
			{ ct:'IRL',hq:'znb_ISEQ',name:"爱尔兰",img:"",lname:'爱尔兰总指数',hqname:'爱尔兰综合指数',status: {range:[[1500, 2330]],open:'e' ,holiday:0}},
			{ ct:'NLD',hq:'znb_AEX',name:"荷兰",img:"",lname:'荷兰AEX综合指数',hqname:'荷兰AEX指数',status: {range:[[1500, 2330]],open:'e' ,holiday:0}},
			{ ct:'ISL',hq:'znb_ICEXI',name:"冰岛",img:"",lname:'冰岛15指数',hqname:'OMX冰岛全股指数',status: {range:[[1800, 2330]],open:'e' ,holiday:0}},
			{ ct:'USA',hq:'znb_SPX',name:"美国",img:"http://image.sinajs.cn/newchart/v5/usstock/min_idx_s/.inx.gif?"+Math.random(),lname:'标准普尔500指数',hqname:'标准普尔500指数',status: {range:[[2130, 2400], [0, 400]],open:'e' ,holiday:0}},
			{ ct:'CAN',hq:'znb_SPTSX',name:"加拿大",img:"",lname:'加拿大S&P/TSX综合指数',hqname:'S&P/TSX综合指数',status: {range: [[2130, 2400], [0, 400]],open:'e',holiday:0 }},
			{ ct:'MEX',hq:'znb_MEXBOL',name:"墨西哥",img:"",lname:'墨西哥BOLSA指数',hqname:'墨西哥BOLSA指数',status: {range:[[2130, 2400], [0, 400]],open:'e',holiday:0 }},
			{ ct:'BRA',hq:'znb_IBOV',name:"巴西",img:"",lname:'巴西BOVESPA股票指数',hqname:'巴西BOVESPA股票指数',status: {range: [[2000, 2400], [0, 245]],open:'e' ,holiday:0}},
			{ ct:'ARG',hq:'znb_MERVAL',name:"阿根廷",img:"",lname:'阿根廷梅尔瓦指数',hqname:'阿根廷MERVAL指数',status: {range: [[2000, 2400], [0, 300]],open:'e',holiday:0 }},
			{ ct:'TWN',hq:'znb_TWSE',name:"台湾",img:"",lname:'中国台湾加权指数',hqname:'台湾台北指数',status: {range: [[900, 1330]],open:'e',holiday:0 }},
			{ ct:'JPN',hq:'znb_NKY',name:"日本",img:"",lname:'日经225指数',hqname:'日经225指数',status: {range: [[800, 1000], [1100, 1430]],open:'e',holiday:0 }},
			{ ct:'SGP',hq:'znb_FSSTI',name:"新加坡",img:"",lname:'富时新加坡海峡时报指数',hqname:'富时新加坡海峡时报指数',status: {range:[[900, 1230], [1400, 1700]],open:'e',holiday:0}},
			{ ct:'KOR',hq:'znb_KOSPI',name:"韩国",img:"",lname:'韩国成份指数',hqname:'韩国KOSPI指数',status: {range:[[700, 900], [1000, 1300]],open:'e',holiday:0 }},
			{ ct:'MYS',hq:'znb_FBMKLCI',name:"马来西亚",img:"",lname:'富时马来西亚KLCI综合指数',hqname:'吉隆坡综合股价指数',status: {range:[[900, 1230], [1400, 1700]],open:'e',holiday:0}},
			{ ct:'THA',hq:'znb_SET',name:"泰国",img:"",lname:'泰国SET指数',hqname:'S泰国股票交易指数',status: {range:[[1130, 1430], [1600, 1900]],open:'e',holiday:0 }},
			{ ct:'IDN',hq:'znb_JCI',name:"印度尼西亚",img:"",lname:'印度尼西亚雅加达综合指数',hqname:'印尼雅加达综合指数',status: {range:[[1130, 1400], [1530, 1800]],open:'e',holiday:0 }},
			{ ct:'PHL',hq:'znb_PCOMP',name:"菲律宾",img:"",lname:'菲律宾PSE综合股价指数',hqname:'菲律宾综合股价指数',status: {range:[[930, 1200]],open:'e' ,holiday:0}},
			{ ct:'PAK',hq:'znb_KSE100',name:"巴基斯坦",img:"",lname:'巴基斯坦 Karachi 100指数',hqname:'巴基斯坦卡拉奇100指数',status: {range:[[1245, 1715]],open:'e' ,holiday:0}},
			{ ct:'IND',hq:'znb_SENSEX',name:"印度",img:"",lname:'印度孟买SENSEX指数',hqname:'印度孟买30指数',status: {range:[[1225, 1800]],open:'e',holiday:0 }},
			{ ct:'VNM',hq:'znb_VNINDEX',name:"越南",img:"",lname:'越南胡志明市股票指数',hqname:'越南胡志明市股票指数',status: {range:[[1000, 1200]],open:'e' ,holiday:0}},
			{ ct:'LKA',hq:'znb_CSEALL',name:"斯里兰卡",img:"",lname:'斯里兰卡股票指数',hqname:'斯里兰卡科伦坡指数',status: {range:[[1200, 1700]],open:'e' ,holiday:0}},
			{ ct:'SAU',hq:'znb_SASEIDX',name:"沙特阿拉伯",img:"",lname:'沙特阿拉伯TADAWUL股票综合指数',hqname:'沙特阿拉伯TADAWUL股票综合指数',status: {range:[[1600, 2034]],open:'e' ,holiday:0}},
			{ ct:'AUS',hq:'znb_AS51',name:"澳大利亚",img:"",lname:'澳大利亚标准普尔200指数',hqname:'澳大利亚标准普尔200指数',status: {range:[[800, 1400]],open:'e',holiday:0 }},
			{ ct:'NZL',hq:'znb_NZSE50FG',name:"新西兰",img:"",lname:'新西兰50指数',hqname:'新西兰50指数',status: {range:[[600, 1245]],open:'e',holiday:0 }},
			{ ct:'EGY',hq:'znb_CASE',name:"埃及",img:"",lname:'埃及CASE 30指数',hqname:'埃及CASE 30指数',status: {range:[[430, 830]],open:'e' ,holiday:0}},
			{ ct:'ZAF',hq:'znb_JALSH',name:"南非",img:"",lname:'南非综合指数',hqname:'FTSE/JSE 南非综合指数',status: {range: [[0, 2400]],open:'e' ,holiday:0}},
			{ ct:'UDJI',hq:'znb_INDU',name:"道琼斯",img:"http://image.sinajs.cn/newchart/v5/usstock/min_idx_s/.dji.gif?"+Math.random(),lname:'道琼斯指数',hqname:'道琼斯30种工业股票平均价格指数',status: {range:[[2130, 2400], [0, 400]],open:'e' ,holiday:0}},
			{ ct:'UNAS',hq:'znb_CCMP',name:"纳斯达克",img:"http://image.sinajs.cn/newchart/v5/usstock/min_idx_s/.ixic.gif?"+Math.random(),lname:'纳斯达克综合指数',hqname:'纳斯达克综合指数',status: {range:[[2130, 2400], [0, 400]],open:'e',holiday:0 }},
			{ ct:'SZ',hq:'sz399001',name:"深圳",img:"http://image.sinajs.cn/newchart/small/nsz399001.gif?"+Math.random(),lname:'中国深证成指',hqname:'深证成指',status: {range: [[930, 1130], [1300, 1500]],open:'e',holiday:0}},
			{ ct:'HKG',hq:'r_HSI',name:"香港",img:"http://image.sinajs.cn/newchart/hk_stock/realtime_min_small/HSI.gif?"+Math.random(),lname:'中国香港恒生指数',hqname:"恒生指数",status: {range: [[0930, 1200], [1330, 1600]],open:'e' ,holiday:0}}
		];
		
		
		var _hqData=[];
		
		var _basicMap=cfg.dom.basicMap,_clickLayer=createElement('div'),_wmt_mapworld=getDocument('wmt_mapworld'),
		    _popup_wm0=getDocument('popup_wm0'),_popup_wm1=getDocument('popup_wm1'),_popup_wm2=getDocument('popup_wm2'),
		    _popup_wm3=getDocument('popup_wm3'),_popup_wm4=getDocument('popup_wm4'),_popup_wmdd0=getDocument('popup_wmdd0'),
		    _popup_wm5=getDocument('popup_wm5'),_popup_wm6=getDocument('popup_wm6'),
		    _popup_wm7=getDocument('popup_wm7'),_popup_wm8=getDocument('popup_wm8'),_popup_wt_euro=getDocument('popup-wt-euro'),
		    _popup_wm9=getDocument('popup_wm9'),_popup_jjsj_a=getDocument('popup_jjsj_a');
		      
		var _w=cfg.params.w,//_basicMap.offsetWidth,//1016,
			_h=cfg.params.h,_map_origin={x:_w/2, y:_h/2};
		var _projection=d3.geo.equirectangular().translate([_w/2,_h/2]);
		
		d3.select('.dataDisplayDiv').style('height',_h);
		
		var _xoffset=230,_yoffset=150;
		var _path=d3.geo.path().projection(_projection);
		var _centered='init';
		
		var _curThis,_curData;
		var _map=new Datamap({
			element:getDocument('basicMap'),
			scope:'world',
			width:_w,
			height:_h,
			projection:'mercator',//
			fills:{
				defaultFill:'#CCCCCC',
				overFill:'#ff0000'
			},
			geographyConfig: {
	            dataUrl: null, 
	            hideAntarctica: true,
	            borderWidth: 1,
	            borderColor: '#FDFDFD',
	            popupTemplate: function(geography, data) { 
	            	var index=0,color=0;
	            	for(var i=0,len=_hqLists.length;i<len;i++){
	            		if(geography.id==_hqLists[i].ct){
	            			index=i;
	            			break;
	            		}
	            		index=len;
	            	}
	            	//console.log('dd:',geography.properties.name,geography);
	            	if(index===len)	return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
	            	if(!_hqData[index]) return;
	            	
	            	var html='';
	            		html=_htmlTemplate(index,geography.id);
	            	return html;
	            },
	            popupOnHover: true, 
	            highlightOnHover: true,
	            highlightFillColor: '#CCCCCC',
	            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
	            highlightBorderWidth: 2
	        },
			done: function(datamap_) {
	        }
		});
		
		var oWmtdata = {mapworld: {
			id: "mapworld",
			set: [
					["DINIW","美元指数","http://image.sinajs.cn/newchart/v5/forex/min_m/DINIW.gif","forex","greenup","money/forex/hq/DINIW.shtml"],
					["hf_CL","原油","http://image.sinajs.cn/newchart/v5/futures/global/mins/CL.gif","fu","greenup","money/future/CL/quote.shtml"],
					["hf_GC","黄金","http://image.sinajs.cn/newchart/v5/futures/global/mins/GC.gif","fu","greenup","money/future/GC/quote.shtml"]
				]
			}
		};
		
		function _htmlTemplate(index_,id_){
			var index=index_,id=id_,obj=_hqData[index],color,html,lists=_hqLists,len=lists.length,data=_hqData;
			
			if(obj.pricef<0){
				color=cfg.fdownColor;
			}else{
				color=cfg.fupColor;
			}
			var style;
				html='<div class="hoverinfo">';
				
				if(isClickct){
				}else{
					html+=liTemplate([index]);
				}
			//}
			
			html+='</div>';	
			
			function liTemplate(arr_){
				var len=arr_.length,htmllis='',arr=arr_,style='';
				if(arr_.length>1)	style='float:left;width:110px;';
				for(var j=0;j<len;j++){
				var htmlli=
					'<li style="list-style:none;padding:3px;"><span style="font-size: 14px; color: black;font-weight:bold;">'+lists[arr[j]].lname +'</span></li>'
	        		+'<li style="list-style:none;padding: 3px;'+style+'"><span style="font-size: 12px; color: black;">最新价：</span>'
		 			+'<span style="font-size: 12px; color: '+color+';">'+data[arr[j]].price+'</span></li>'
					+'<li style="list-style:none;padding: 3px;"><span style="font-size: 12px; color: black;">涨跌幅：</span>'
					+'<span style="font-size: 12px; color: '+color+';">'+data[arr[j]].pricef+'%</span></li>';
					
					//if(_hqLists[index].img===''){
						htmlli+='<li style="list-style:none;padding: 3px;"><span style="font-family: Microsoft Yahei,微软雅黑,宋体;font-size: 12px; color: black;">行情时间：</span>'
							+'<span style="font-family: Microsoft Yahei,微软雅黑,宋体;font-size: 12px; color: black;">'+data[arr[j]].time+'</span></li>';
					//}else{
						//htmlli+='<li style="list-style:none;padding: 3px;"><img src="'+ _hqLists[arr[j]].img +'"></li>';
					//}
					htmllis+=htmlli;
				}
				return htmllis;
			}
			return html;
		}
		
		var _allPath=d3.selectAll('path'),_allCountry=d3.selectAll('.datamaps-subunit'),_allg=d3.select("g"),_allCountrylen=_allCountry[0].length,_allText;
		var _zoom = d3.behavior.zoom(),_zoom_level=1;
		
		
		function _zoomMap(){
		   _zoom.translate([_map_origin.x,_map_origin.y])
				.scale(_zoom_level)
				.scaleExtent([1, 3])
				.size([_w, _h])
				.on("zoom", function() {
					var zoomed = (d3.event.scale != _zoom_level);
					_zoom_level = d3.event.scale;
					var t = d3.event.translate;
                	_allCountry.attr('transform','scale('+_zoom_level+')')
					_setMapOrigin({x: t[0], y: t[1]});
					if (zoomed) {
						//_allg.attr("transform", "scale(" + _zoom_level + ")")
						// .style("stroke-width", 1 / _zoom_level);
						//updateCities(0);
						//updateLegend();
					}
				});
				
			var c = _getMapCentre(),
			    s = Math.max(1, 1),
			    t = _mapCentreToTranslate(c, 1);
			_zoom.scale(s).translate(t).event(_map.svg.transition().duration(1000));
			_map.svg.call(_zoom);
		}
		_addEvent();
		function _addEvent(){
			boEvtUtil.addHandler(_clickLayer,"click",function(e){
				_clickLayer.style.display='none';
				isClickct=!isClickct;
				
				var $this = _curThis;
				if(_map.options.geographyConfig.highlightOnHover) {
					//reapply previous attributes
					var previousAttributes = JSON.parse( $this.attr('data-previousAttributes') );
					for( var attr in previousAttributes ) {
					   $this.style(attr, previousAttributes[attr]);
					}
				}
				d3.selectAll('.pupop_mkt').style('display', 'none');
			    d3.selectAll('.datamaps-hoverover').style('display', 'none');
			})
			var cindex=1000;
			for(var i=0;i<_allCountrylen;i++){
				boEvtUtil.addHandler(_allCountry[0][i],'click',function(e){
					isClickct=!isClickct;
					
	            	if(isClickct){
	            		_curThis=null;
	            		_curThis=d3.select(this);
	            		_curData=null;
	            		_curData=_curThis.data()[0];
	            		
	            		for(var j=0;j<_hqLists.length;j++){
	            			if(_hqLists[j].ct===_curData.id){
	            				cindex=j;
	            				break;
	            			}
	            		}
	            		_showPopup(e,cindex);
	            	}
				})
			}
		}
		
		function _showPopup(e_,cindex_){
			var len=_hqLists.length,spcl=0,jjsj=0;
			for(var i=0;i<len;i++){
				if(_curData){
					if(_curData.id===_hqLists[i].ct){
						spcl=1;
						break;
					}
				}
			}
			if(_curData.id=="CHN"||_curData.id=="SZ")	jjsj=1;
			for(var o in cfg.jjsj){
				if(o==_curData.id){
					jjsj=1;
					_popup_jjsj_a.href=cfg.jjsj[_curData.id]; 
				}
			}
			if(jjsj==0){
				isClickct=!isClickct;return;
			}
			
			if(spcl===0){
				isClickct=!isClickct;
				return;
			}
			
			_clickLayer.style.display='block';
    		//d3.selectAll('.datamaps-hoverover').style('display', 'none');
    		_popup_wmdd0.style.display='block';
    		_popup_wm0.style.display=_popup_wm1.style.display=_popup_wm2.style.display=_popup_wm3.style.display=_popup_wm4.style.display='none';
    		_popup_wm5.style.display=_popup_wm6.style.display=_popup_wm7.style.display=_popup_wm8.style.display=_popup_wm9.style.display='none';
    		
    		if(_curData.id==="USA"){//redup greenup
    			_popup_wm0.style.display=_popup_wm1.style.display=_popup_wm2.style.display=_popup_wm4.style.display='block';
    			
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list=gb_dji,gb_ixic,gb_inx"
    			oWmtdata.mapworld.set=[
    				["gb_dji","道琼斯","http://image.sinajs.cn/newchart/usstock/min_idx_py/dji.gif","us","redup","stock/usstock/US100_DJI.shtml"],
					["gb_ixic","纳斯达克","http://image.sinajs.cn/newchart/usstock/min_idx_py/ixic.gif","us","redup","stock/usstock/US100_IXIC.shtml"],
					["gb_inx","标普500","http://image.sinajs.cn/newchart/usstock/min_idx_py/inx.gif","us","redup","stock/usstock/US100_INX.shtml"]
    			]
    		}else if(_curData.id==="CHN"){
    			_popup_wm0.style.display=_popup_wm1.style.display=_popup_wm3.style.display='block';
    			
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list=s_sh000001,s_sz399001"
    			oWmtdata.mapworld.set=[
    				["s_sh000001","上证综指","http://image.sinajs.cn/newchart/hollow/small/nsh000001.gif","cn","redup","realstock/company/sh000001/nc.shtml"],
					["s_sz399001","深证成指","http://image.sinajs.cn/newchart/hollow/small/nsz399001.gif","cn","redup","realstock/company/sz399001/nc.shtml"]
    			]
    		}else if(_curData.id==="GBR"){
    			_popup_wm0.style.display=_popup_wm7.style.display='block';
    			_popup_wt_euro.href=cfg.jjsj.GBR;
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list=znb_UKX"
    			oWmtdata.mapworld.set=[
    				["znb_UKX","英国富时100指数","http://image.sinajs.cn/newchart/futures/forex/min5_m_hollow/FT100.gif","bb","redup",""]
    			]
    		}else if(_curData.id==="JPN"){
    			_popup_wm0.style.display=_popup_wm6.style.display='block';
    			
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list=znb_NKY"
    			oWmtdata.mapworld.set=[
    				["znb_NKY","日经指数","http://image.sinajs.cn/newchart/futures/forex/min5_m_hollow/NIXI.gif","bb","redup",""],
    			]
    		}else if(_curData.id=='CAN'){
    			_popup_wmdd0.style.display='none';
    			_popup_wm0.style.display=_popup_wm8.style.display='block';
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list="+_hqLists[cindex_].hq;
    			oWmtdata.mapworld.set=[
        				[_hqLists[cindex_].hq,_hqLists[cindex_].lname.slice(0,9),"","bb","redup",""],
        			]
    		}else if(_curData.id=='AUS'){
    			_popup_wmdd0.style.display='none';
    			_popup_wm0.style.display=_popup_wm9.style.display='block';
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list="+_hqLists[cindex_].hq;
    			oWmtdata.mapworld.set=[
        				[_hqLists[cindex_].hq,_hqLists[cindex_].lname.slice(0,9),"","bb","redup",""],
        			]
        	}else if(_curData.id=='DEU'){
    			_popup_wmdd0.style.display='none';
    			_popup_wt_euro.href=cfg.jjsj.DEU;
    			_popup_wm0.style.display=_popup_wm7.style.display='block';
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list="+_hqLists[cindex_].hq;
    			oWmtdata.mapworld.set=[
        				[_hqLists[cindex_].hq,_hqLists[cindex_].lname.slice(0,9),"","bb","redup",""],
        			]
        	}else if(_curData.id=='SWE'){
        		_popup_wt_euro.href=cfg.jjsj.SWE;
    			_popup_wmdd0.style.display='none';
    			_popup_wm0.style.display=_popup_wm7.style.display='block';
    			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list="+_hqLists[cindex_].hq;
    			oWmtdata.mapworld.set=[
        				[_hqLists[cindex_].hq,_hqLists[cindex_].lname.slice(0,9),"","bb","redup",""],
        			]
    		}else{
    			//CAN:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%BC%D3%C4%C3%B4%F3&event=%D0%C2%CE%DD%BF%AA%B9%A4',
			//DEU:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%B5%C2%B9%FA&event=Ifo%C9%CC%D2%B5%BE%B0%C6%F8%D6%B8%CA%FD',
			//USA:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%C3%C0%B9%FA&event=ISM%D6%C6%D4%EC%D2%B5%D6%B8%CA%FD',
			//SWE:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%C8%F0%CA%BF&event=SVME%B2%C9%B9%BA%BE%AD%C0%ED%C8%CB%D6%B8%CA%FD',
			//JPN:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%C8%D5%B1%BE&event=%C3%B3%D2%D7%D5%CA%A3%A8%B2%C6%CE%F1%CA%A1%A3%A9',
			//AUS:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%B0%C4%B4%F3%C0%FB%D1%C7&event=%C1%E3%CA%DB%CF%FA%CA%DB%D4%C2%C2%CA',
			//GBR:'http://money.finance.sina.com.cn/forex/view/vDailyFX_Detail.php?country=%D3%A2%B9%FA&event=Halifax%B7%BF%BC%DB%D6%B8%CA%FD%D4%C2%C2%CA'
    			//if(cindex_!==1000){
    				
    				//_popup_wm0.style.display='block';
    				/*if(_curData.id=='DEU'){
    					_popup_wm7.style.display='block';
    				}
    				if(_curData.id='CAN'){
    					_popup_wm8.style.display='block';
    				}
    				if(_curData.id='AUS'){
    					_popup_wm9.style.display='block';
    				}*/
    				
        			//_popup_wmdd0.style.display='none';
        			//oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list="+_hqLists[cindex_].hq;
        			//oWmtdata.mapworld.set=[
        			//	[_hqLists[cindex_].hq,_hqLists[cindex_].lname.slice(0,9),"","bb","redup",""],
        			//]
    			//}else{
    				d3.selectAll('.pupop_mkt').style('display', 'none');
    				return;
    			//}
    		}
    		//var mx=e_.offsetX||e_.layerX,my=e_.offsetY||e_.layerY;mx+=345;my+=220;
			//var mx=e_.clientX,my=e_.clientY;
			var ml=document.getElementsByClassName('datamaps-hoverover')[0].offsetLeft;
			var mt=document.getElementsByClassName('datamaps-hoverover')[0].offsetTop;
			
    		wmm.Init(oWmtdata,{ wmt_tabs: 'wmt_tabs1',wmt_contents: 'wmt_contents1' });
    		
    		if((document.documentElement.clientWidth-ml)<=360){
    			ml-=360;
    		}
			
			getDocument('morepupop').style.display='block';
			getDocument('morepupop').style.left=ml+'px';
			getDocument('morepupop').style.top=mt+'px';
			document.getElementsByClassName('datamaps-hoverover')[0].style.display='none';
		}
		
		var wmm=new WmtHq_Ctrl_Multi(oWmtdata,{ wmt_tabs: 'wmt_tabs1',wmt_contents: 'wmt_contents1' });
		
		var p = _map.svg.node().createSVGPoint();
		function _screenToMap(x, y) {
			// Convert screen coords to map coords
			var ctm = _map.svg.node().getTransformToElement(_allCountry.node());
			p.x = x;
			p.y = y;
			return p.matrixTransform(ctm);
		}

		function _getMapCentre() {
			var top_left = _screenToMap(0, 0),
			    bot_right = _screenToMap(_w, _h);

			return [
				(top_left.x + bot_right.x) / 2,
				(top_left.y + bot_right.y) / 2
			];
		}
		
		function _zoomIn(scale_factor_) {
			if (typeof scale_factor_=="undefined"){
				if(_zoom_level>=3)	return;
				else				scale_factor_=1.5;
			}
			var c = _getMapCentre(),
			    s = Math.max(1, _zoom_level * scale_factor_),
			    t = _mapCentreToTranslate(c, s);

			_zoom.event(_map.svg);
			_zoom.scale(s).translate(t).event(_map.svg.transition().duration(1000));
		}
		
		function _mapCentreToTranslate(c_, scale_) {
			return [
				_w / 2  - c_[0] * scale_,
				_h / 2 - c_[1] * scale_
			];
		}

		function _zoomOut() {
			if(_zoom_level<=1){
				_zoom_level=1;
				_zoomIn(1);
				_textRecovery();
				return;
			}
			_zoomIn(1/1.5);
		}
		
		function _setMapOrigin(new_origin) {
			var g_bbox = _allg.node().getBBox(),
			    min_x = _w - g_bbox.x - g_bbox.width,
			    max_x = -g_bbox.x,
			    min_y = _h - g_bbox.y - g_bbox.height,
			    max_y = -g_bbox.y;

			if (min_x > max_x) min_x = max_x = (min_x + max_x) / 2;
			if (min_y > max_y) min_y = max_y = (min_y + max_y) / 2;

			_map_origin.x = Math.max(min_x, Math.min(max_x, new_origin.x));
			_map_origin.y = Math.max(min_y, Math.min(max_y, new_origin.y));
			
			d3.select('.labels').attr("transform", "translate(" + _map_origin.x + "," + _map_origin.y + ")" +'scale('+_zoom_level+')');
			d3.select('.bubbles').attr("transform", "translate(" + _map_origin.x + "," + _map_origin.y + ")" +'scale('+_zoom_level+')');
			_textRecovery();
			_allg.attr("transform", "translate(" + _map_origin.x + "," + _map_origin.y + ")");
			_zoom.translate([_map_origin.x, _map_origin.y]);
		}
		
		function _textRecovery(){
			d3.selectAll("text").style("font-size", 12/_zoom_level+'px')
	          					.text(function(){
						          	var name,len=_hqLists.length;
						          	for(var i=0;i<len;i++){
						          		if(this.id===_hqLists[i].ct){
						          			name=_hqLists[i].name;break;
						          		}
						          	}
						          	if(_zoom_level>1.2){
						          		if(this.id==='IRL') name='爱尔兰'; 
						          		if(this.id==='NLD') name='荷兰';
						          		if(this.id==='CHE') name='瑞士';
						          	}else{
						          		if(this.id==='IRL'||this.id==='NLD'||this.id==='CHE') name='';
						          	}
						          	if(this.id==='wdhk')	name='香港';
						          	return name;
						        })
		}
		
		function _handleText(){
			var cindex=1000,path,$path,len=_hqLists.length,stop=0,stop2=0;
			for(var i=0;i<_allCountrylen;i++){
				boEvtUtil.addHandler(_allText[0][i],'click',function(e){
					isClickct=!isClickct;
	            	if(isClickct){
	            		
	            		for(var j=0;j<len;j++){
	            			if(_hqLists[j].ct===this.id){
	            				cindex=j;
	            				stop=1;
	            				break;
	            			}
	            		}
	            		
	            		for(var n=0;n<_allCountrylen;n++){
	            			if(this.id===d3.select(_allCountry[0][n]).data()[0].id){
	            				
	            				path=_allCountry[0][n];
		            			$path=d3.select(path);
	            				
	            				_curThis=$path;
	            				_curData=null;
	            				_curData=$path.data()[0];
	            				stop2=1;
	            				break;
	            			}
		            	}
	            		_showPopup(e,cindex);
	            	}
				})
			}
		}
		
		function _update(){
			var raw=[];
			wn_varLoader(cfg.hqurl,function(){
				for(var i=0,len=_hqLists.length;i<len;i++){
					raw.push(window['hq_str_'+_hqLists[i].hq]);
				}
				
				if(!raw) return;
				_hqData=[];
				for(i=0;i<len;i++){
					var rawD=String(raw[i]).split(',');
					var labelData='',ct='',cl='#aaaaaa';
					var curdate=new Date(Number(rawD[5])*1000);
					for(var j=0;j<len;j++){
						if(rawD[0]==_hqLists[j].hqname){
							labelData=_hqLists[j].lname;
							ct=_hqLists[j].ct;
							break;
						}
					}
					var pf='';
					if(ct==="CHN"||ct==="SZ"){
						pf=Number(100*(rawD[3]-rawD[2])/rawD[2]).toFixed(2)
					}else{
						pf=rawD[3];
					}
					
					var pfcl=_comparePF(pf,cl);
					pf=pfcl[0],cl=pfcl[1];
					
					var o={}
					var timeArr=[];
					
					if(!timeArr[2])timeArr.push('00');
					if(ct==="CHN"||ct==="SZ"){
						timeArr=String(rawD[31]).split(':'),time='';
						time=timeArr[0]+":"+timeArr[1]+":"+timeArr[2];
					}else if(ct==="HKG"){
						timeArr=String(rawD[4]).split(':'),time='';
						time=(timeArr[0])+":"+timeArr[1]+":"+'00';
					}else{
						time=/*dateUtils.dtos(curdate,'/')+' '+*/dateUtils.dtohm(curdate);
						//timeArr=String(rawD[4]).split(':'),time='';
						//time=(Number(timeArr[0])+12)%24+":"+timeArr[1]+":"+timeArr[2];
					}
					
					if(ct==='CHN'||ct==="SZ"){
						 o={
							name:rawD[0],
							price:rawD[3],
							pricef:Number(100*(rawD[3]-rawD[2])/rawD[2]).toFixed(2),
							time:time,
							label:labelData,
							cty:ct,
							color:cl
						}
					}else{
						 o={
							name:rawD[0],
							price:rawD[1],
							pricef:rawD[3],
							time:time,
							label:labelData,
							cty:ct,
							color:cl
						}
					}
				   
					_hqData.push(o);
					
					visual_mapHqData=_hqData;
				}
				var cdata={};
				for(i=0;i<len;i++){
					var ctt=_hqData[i].cty;
					cdata[ctt]=[_hqData[i].color,1];
					//cdata[ctt]=_hqData[i].color;
				}
				_map.updateChoropleth(cdata);
				_tip();
			})
		}
		
		function _comparePF(pf_,cl_){
			if(pf_>3){
				cl_=cfg.upColor[3];
			}else if(pf_>2&&pf_<=3){
				cl_=cfg.upColor[2];
			}else if(pf_>1&&pf_<=2){
				cl_=cfg.upColor[1];
			}else if(pf_>0&&pf_<=1){
				cl_=cfg.upColor[0];
			}
			
			if(pf_<-3){
				cl_=cfg.downColor[3];
			}else if(pf_<-2&&pf_>=-3){
				cl_=cfg.downColor[2];
			}else if(pf_<-1&&pf_>=-2){
				cl_=cfg.downColor[1];
			}else if(pf_<0&&pf_>=-1){
				cl_=cfg.downColor[0];
			}
			
			if(pf_==0)	cl_='#f3f3f3';
			
			return [pf_,cl_];
		}
		
		function _displayLabel(){
			setTimeout(function(){
				_map.labels();
				_allText=d3.selectAll('text');
				_handleText();
				_allg=d3.select('g');
			},100);
		}
		var _opacity=0.5;
		function _checkOpen(){
			var systime='http://hq.sinajs.cn/?rn='+Math.random()+'&list=sys_time',stime,stimeStr,min=0;
			
			wn_varLoader(systime,function(){
				stime=new Date();
				stime.setTime(Number(window['hq_str_sys_time'])*1000);
				window['hq_str_sys_time']=null;
				
				stime.setMinutes(stime.getMinutes()+1);
				stimeStr='';
				min=stime.getMinutes()>9?String(stime.getMinutes()):'0'+String(stime.getMinutes())
				stimeStr+=String(stime.getHours())+min;
				
				for(var i=0,len=_hqLists.length;i<len;i++){
					var rlen=_hqLists[i].status.range.length;
					_hqLists[i].status.open="c";
					
					for(var j=0;j<rlen;j++){
						if(_hqLists[i].status.range[j][0]<stimeStr && stimeStr<_hqLists[i].status.range[j][1]){
							if(_hqLists[i].status.holiday===0){
								_hqLists[i].status.open="o";
							}else{
								_hqLists[i].status.open="e";
							}
							break;
						}
					}
				}
				chartCopentimer=setInterval(function(){
					chartCopentimer=null;
					if(_opacity!==1)	_opacity=1;
					else				_opacity=0.8;
					var cdata={};
					for(i=0;i<len;i++){
						var ctt=_hqData[i].cty;
						if(_hqLists[i].status.open==='o'){
							cdata[ctt]=[_hqData[i].color,_opacity];
						}
					}
					_map.updateChoropleth(cdata);
				},1000);
			})
		}
		
		var _colors = d3.scale.category10();
		var _tipInit='a';
		function _tip(){
			var cl='',pf='';
			var pfcl=_comparePF(_hqData[_hqData.length-1].pricef,cl);
			cl=pfcl[1];pf=pfcl[0];
			
			var color=pf>=0?cfg.fupColor:cfg.fdownColor;
			_map.bubbles([
				{
				 	name: '中国香港恒生指数', latitude:22.2, longitude:114.11, radius: 2, fillKey: 'gt500'},
				],
				{
				popupTemplate: function(geo, data) {
				 	var html='';
		        		html='<div class="hoverinfo">'
		        		+'<li style="list-style:none;padding: 3px;"><span style="font-family:宋体;font-size: 14px; color: black;font-weight:bold;">'+_hqLists[_hqLists.length-1].lname +'</span></li>'
		        		+'<li style="list-style:none;padding: 3px;"><span style="font-family:Microsoft Yahei,微软雅黑,宋体;font-size: 12px; color: black;">最新价：</span>'
			 			+'<span style="font-family:Microsoft Yahei,微软雅黑, 宋体;font-size: 12px; color: '+color+';">'+_hqData[_hqLists.length-1].price+'</span></li>'
						+'<li style="list-style:none;padding: 3px;"><span style="font-family: Microsoft Yahei,微软雅黑,宋体;font-size: 12px; color: black;">涨跌幅：</span>'
						+'<span style="font-family:Microsoft Yahei,微软雅黑, 宋体;font-size: 12px; color: '+color+';">'+_hqData[_hqLists.length-1].pricef+'%</span></li>'
						+'<li style="list-style:none;padding: 3px;"><span style="font-family:Microsoft Yahei,微软雅黑, 宋体;font-size: 12px; color: black;">行情时间：</span>'
						+'<span style="font-family:Microsoft Yahei,微软雅黑, 宋体;font-size: 12px; color: black;">'+_hqData[_hqLists.length-1].time+'</span></li>'
						//+'<li style="list-style:none;padding: 3px;"><img src="'+ _hqLists[_hqLists.length-1].img +'"></li>';
		        		+'</div>';
				   return html;
				}
			});
				
			var bubble=d3.select('.bubbles');
				bubble.attr('id',"HKG");
			
			boEvtUtil.addHandler(bubble[0][0],'click',function(e_){
				_curThis=d3.select(bubble[0][0]);
				
				_clickLayer.style.display='block';
				isClickct=!isClickct;
				
				d3.selectAll('.pupop_mkt').style('display', 'block');
			    
			    if(isClickct){
		    		_popup_wmdd0.style.display='block';
		    		_popup_wm0.style.display=_popup_wm1.style.display=_popup_wm2.style.display=_popup_wm3.style.display=_popup_wm4.style.display='none';
		    		
    				_popup_wm0.style.display=_popup_wm3.style.display='block';
        			//_popup_wmdd0.style.display='none';
        			oWmtdata.mapworld.hqApi="http://hq.sinajs.cn/rn=@RN@&list=r_HSI";
        			oWmtdata.mapworld.set=[
        				["r_HSI","香港恒生指数","http://image.sinajs.cn/newchart/hk_stock/min_hollow/HSI.gif","bb","redup","http://stock.finance.sina.com.cn/hkstock/quotes/HSI.html"]
        			]
		    		
		    		wmm.Init(oWmtdata,{ wmt_tabs: 'wmt_tabs1',wmt_contents: 'wmt_contents1' });
					d3.selectAll('.pupop_mkt').style('display', 'block').style('top',e_.clientY+'px').style('left',function(){
						var cx=e_.clientX;
						if(cx>700)	cx-=400;
						return cx+'px';
					});
            	}
			});
			
			if(_tipInit==='a'){
				bubble.append("text")
			      .attr("x", function(){return Number(d3.select('.datamaps-bubble').attr('cx'))-20})
			      .attr("y", function(){return Number(d3.select('.datamaps-bubble').attr('cy'))-5})
			      .attr("id",'wdhk')
			      .style("font-size",'12px')
			      .style("font-family",'Microsoft Yahei,微软雅黑,Verdana,宋体')
			      .style("cursor",'default')
			      .style("fill", function(){var cl=fontColorLegend(_hqData[_hqData.length-1].pricef);return cl;})
			      .text(_hqLists[_hqLists.length-1].name)
				
				_createDom();	
				_setTip();
				_zoomMap();
				_tipInit='b';
			}  
		}
		var map_Lfc=['#ffffff','#ffffff','#ffffff','#23a64c','#666666','#f54545','#ffffff','#ffffff','#ffffff'];
		function fontColorLegend(zdf){
			var cl;
			if(zdf>0)	cl=map_Lfc[5];
			if(zdf>=1)	cl=map_Lfc[0];
			if(zdf>=2)	cl=map_Lfc[0];
			if(zdf>=3)	cl=map_Lfc[0];
			
			if(zdf<0)	cl=map_Lfc[3];
			if(zdf<=-1)	cl=map_Lfc[0];
			if(zdf<=-2)	cl=map_Lfc[0];
			if(zdf<=-3)	cl=map_Lfc[0];
			
			if(zdf==0)  {
				cl=map_Lfc[4];
			} 
			return cl;
		}
		
		function _createDom(){
			var fcontainer=d3.select('.dataDisplayDiv'), qhlegend=['-4','-3','-2','-1','0','1 ','2','3','4'],legendNum=qhlegend.length;
		    var legendcontainer=fcontainer.append('div');
		   		legendcontainer.style('float','right')
		   					   .style('cssFloat','right')
		   					   .style('margin-top','10px')
		  	var lglists=[];
			for(var i=0;i<legendNum;i++){
				var legenddiv=legendcontainer.append('div')
				 			.style('float','right')
				 			.style('cssFloat','right')
				 			.style('cursor','pointer')
							.style("width",'40px')
							.style("height",'10px')
							.style("padding",'2px 2px 2px 2px')
							.style("background-color",cfg.LEDENGCOLOR[i])
							.style("border","1px solid "+cfg.LEDENGCOLOR[i])
							.style("disabled","disabled")
							.style('color',cfg.lfc[i])
							.attr('id','qhld'+i)
							.on('click',function(){
								var tmp=cfg.downColor;
								cfg.downColor=cfg.upColor;
								cfg.upColor=tmp;
								
								_update();
								
								for(var j=0;j<qhlegend.length;j++){
									lglists[j].innerHTML=qhlegend[j]=0-qhlegend[j];
								}
							})		
				
				var lgdom=document.getElementById('qhld'+i);
				lglists.push(lgdom);
				
				lglists[lglists.length-1].innerHTML=qhlegend[i]+'%';
				lglists[lglists.length-1].style.font='12px helvetica,arial,sans-serif';
				
				lglists[lglists.length-1].style.textAlign='center'
				lglists[lglists.length-1].style.lineHeight='1';
			}
			
			var divUp=legendcontainer.append('div');
				lglists.push(divUp);
				divUp.innerHTML='涨';
			 
			var updownbtn=document.createElement('div');
				
			var divzoomIbtn=document.createElement('div'),divzoomObtn=document.createElement('div');
				divzoomObtn.style.position=divzoomIbtn.style.position="relative"
				divzoomObtn.id='map_divObtn';divzoomIbtn.id='map_divbtn';
				
				divzoomObtn.style.top=-_h+25+'px';
				divzoomIbtn.style.top=-_h+10+'px';
				divzoomObtn.style.left=divzoomIbtn.style.left=_w-40+'px';
				
				divzoomObtn.style.borderRadius=divzoomIbtn.style.borderRadius='2px';
				divzoomObtn.style.width=divzoomIbtn.style.width='25px';
				divzoomObtn.style.height=divzoomIbtn.style.height='25px';
				divzoomObtn.style.font=divzoomIbtn.style.font='20px helvetica,arial,sans-serif';
				divzoomObtn.style.textAlign=divzoomIbtn.style.textAlign='center';
				divzoomObtn.style.lineHeight=divzoomIbtn.style.lineHeight='25px';
				divzoomObtn.style.cursor=divzoomIbtn.style.cursor='pointer';
				divzoomObtn.style.backgroundColor=divzoomIbtn.style.backgroundColor='#EEE';
				divzoomObtn.style.border=divzoomIbtn.style.border='1px solid #000;';
				
			var btntxt=document.createElement('span'),btnOtxt=document.createElement('span');
				btntxt.style.fontSize=btnOtxt.style.fontSize='25px';
				btntxt.id="map_divtxt";btnOtxt.id="map_divOtxt";
				divzoomIbtn.appendChild(btntxt);divzoomObtn.appendChild(btnOtxt);
				btntxt.innerHTML='-';btnOtxt.innerHTML='+';//'―';
				
				_clickLayer.style.position='relative';//'absolute';
				_clickLayer.style.display='none';
				_clickLayer.width=_w;
				_clickLayer.height=_h;
				_clickLayer.style.top=-_h+'px';
				_clickLayer.style.width=_w+'px';
				_clickLayer.style.height=_h+'px';
				_clickLayer.style.background="url('images/mom_transparentBg.png')";
				
				_clickLayer.style.zIndex=999;
				//
			
			_basicMap.appendChild(divzoomIbtn);_basicMap.appendChild(divzoomObtn);_basicMap.appendChild(_clickLayer);
			
			d3.select('#map_divObtn').on('mouseover',function(){
										this.style.boxShadow='inset 0 2px 2px rgba(0, 0, 0, 0.25)';
									}).on('mouseout',function(){
										this.style.boxShadow='inset 0 2px 2px rgba(0, 0, 0, 0.05)';
									}).on('click',function(){
										_zoomIn();
								    })
			
			d3.select('#map_divbtn').on('mouseover',function(){
										this.style.boxShadow='inset 0 2px 2px rgba(0, 0, 0, 0.25)';
									}).on('mouseout',function(){
										this.style.boxShadow='inset 0 2px 2px rgba(0, 0, 0, 0.05)';
									}).on('click',function(){
										_zoomOut();
								    })
		}
		function _tipClick(){
		}
		function _setTip(){
			var bubble=d3.select('circle');
			bubble.style("fill",_hqData[_hqData.length-1].color);
		}
		
		this.update=_update;
		this.displayLabel=_displayLabel;
		this.checkOpen=_checkOpen;
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
			cfg.dom.basicMap.style.width=_pObj.cw+'px';
			cfg.dom.basicMap.style.height=_pObj.h+'px';
		}
		var _chart;
		function _init(){
			_chart=new sMap();
			_chart.update();
			_chart.displayLabel();
			_chart.checkOpen();
			chartMapTimer=setInterval(_chart.update,30000);
		}
		
		this.init=_init;
	}
	
}

var _option={};

var chartClientWidth=document.documentElement.clientWidth,chartClientEdge=20,chartLFWidth=20,
	chartVisualWidth=chartClientWidth-224-30;
	
if(!dataPanelWidth)var dataPanelWidth=chartVisualWidth-chartClientEdge;
//console.log('当前可用宽度：',chartClientWidth,'图形可用宽度：',chartClientWidth-224,'图形宽度:',chartClientWidth-224-chartClientEdge);
	
_option={
	cw:dataPanelWidth,//chartVisualWidth-chartClientEdge,
	//ch:590,
	w:dataPanelWidth,//chartVisualWidth-chartClientEdge-40,
	h:540,
	margin:40
}

var _visual_hqgszs=new visual_hqgszs(_option);
	_visual_hqgszs.init();
	

if((chartClientWidth-dataPanelWidth)<200){
	_visual_mapLeft=46;
}else{
	_visual_mapLeft=254;
}

//console.log(_visual_mapLeft,chartClientWidth,dataPanelWidth);

function onResize(){
	
}
	
function hideSidebar(){
	_visual_mapLeft=134;
};

function openSidebar(){
	_visual_mapLeft=254;
}

