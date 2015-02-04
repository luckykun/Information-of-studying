
	$(document).ready(function() {
		$("#type_filter input[type=checkbox]").prop("checked",true);
		$('#calendar').fullCalendar({
			editable: false,
			disableDragging: true,
			header:{
				left: 'prev,next',
				center: 'title',
				right: 'today month,basicWeek,basicDay'
			},
			buttonText:{
				today:'今天',
				month:'月',
				week:'周',
				day:'天',
			},
			titleFormat:{
				month:"YYYY年 M月",
				week:"YYYY年M月D日",
				day:"YYYY年M月D日"
			},
			columnFormat:{
				month: '周dddd',
				week:"周dddd M-D",
				day:"YYYY年M月D日 星期dddd"
			},
			dayNames:['日', '一', '二', '三', '四', '五', '六'],
			events:function(start, end, timezone, callback) {
				var end = new Date((start+end)/2);
				var currentYear = end.getYear();
				var currentMonth = end.getMonth();
				$.ajax({
					type:"get",
					url:"http://vip.stock.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22ic%22,"+currentYear+","+currentMonth+"]]",
					dataType:"jsonp",
					success: function(doc){
						var events = doc[0].items;
						var newEvents = [];
						for(var key in events){
							if($("#type_filter input[type=checkbox]:eq(0)").prop("checked") == true){
								if(events[key].type == "1"){
									newEvents.push(events[key]);
								}
							}
							if($("#type_filter input[type=checkbox]:eq(1)").prop("checked") == true){
								if(events[key].type == "2"){
									newEvents.push(events[key]);
								}
							}
						}
						callback(newEvents);
					}
				});
			}
		});
		$("#type_filter label").click(function(){
			$('#calendar').fullCalendar( 'refetchEvents' );
		});
	});