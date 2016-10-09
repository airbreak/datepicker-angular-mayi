
'use strict';

angular.module('date-picker-mayi',[])

	//横向选择器
	.directive('selectMayi',function(){
		return {
			//设置绑定策略，绑定基本的备选数据arraydata，以及 默认选中值 indexdata
			scope:{
				array:'=arraydata',
				index:'=indexdata',
				clickFn:'&clickCallBack', //点击回调方法
			},
			restrict:'AE',
			template:'<div class="select-mayi" index="{{index}}">'+
						'<div class="selct-main-mayi">'+
							'<span class="prev-mayi" ng-click="prev()"></span>'+
							'<div class="main-container-mayi">'+
								'<ul class="ul-container-mayi" >'+
									'<li ng-repeat="item in array">{{item.name}}</li>'+
								'</ul>'+
							'</div>'+
							'<span class="next-mayi" ng-click="next()"></span>'+
						'</div>'+
					'</div>',
			replace:true,
			link:function($scope,$element,$attrs){

				//上一个
				$scope.prev=function(){
					var index = $element[0].getAttribute('index') | 0;
					if(index!==0){
						index--;
						$element[0].setAttribute('index',index);
						swipeToMonth(index);
						$scope.clickFn({index:index,type:'prev'});
					}
				};

				//下一个
				$scope.next=function(){
					var index = $element[0].getAttribute('index') | 0;
					if(index!== $scope.array.length-1){
						index++;
						$element[0].setAttribute('index',index);
						swipeToMonth(index);
						$scope.clickFn({index:index,type:'next'});
					}
				};

				//滑动效果
				function swipeToMonth(index){
					var diff = index * -73 +'px';
					$element[0].querySelector('.ul-container-mayi').style.webkitTransform='translate('+diff+')';
				}

				function getNowDate(){
					var now=new Date();
					return{
						day:now.getDay(),
						month:now.getMonth(),
						years:now.getYear()
					}
				}
				swipeToMonth($scope.index | 0);
			},

			controller:function(){

			}
		}
	})
	.directive('datePicker',function(){
		return {
			restrict:'AE',
			template:'<div class="date-picker-mayi">'+
						'<div class="mayi-item month-years-box">'+
							'<div class="month-box">'+
								'<div select-mayi  arraydata="arraydata" indexdata="indexdata" click-call-back="mayiSelcteCallBack(index,type,0)"></div>'+
							'</div>'+
							'<div class="month-years">'+
								'<div select-mayi  arraydata="arraydata1" indexdata="indexdata1" click-call-back="mayiSelcteCallBack(index,type,1)"></div>'+
							'</div>'+
						'</div>'+
						'<div class="mayi-item weekdays-box">'+
							'<ul>'+
								'<li ng-repeat="item in [\'日\', \'一\', \'二\', \'三\', \'四\', \'五\', \'六\']">{{item}}</li>'+
								'<div class="clear-both"></div>'+
							'</ul>'+
						'</div>'+
						'<div class="mayi-item days-box">'+
						'<ul>'+
							'<li ng-repeat="dayInfo in monthAllDays" ng-class="{' +
								'pass: dayInfo.status==0, ' +
								'today: dayInfo.status==2,' +
								'selected: dayInfo.status==2, ' +
								'pass: dayInfo.status==0}" ng-click="chooseDay(dayInfo.num)">{{dayInfo.num}}' +
							'</li>'+
							'<div class="clear-both"></div>'+
						'</ul>'+
						'</div>'+
						'<div class="mayi-item today-tomorrow-box">'+
						'<div class="today-tomorrow-item">今天</div>'+
						'<div class="today-tomorrow-item">明天</div>'+
						'</div>'+
					'</div>',
			replace:true,
			link:function($scope,$element,$attrs){

				/*得到某个月具体的天数*/
				var mayiDayInfo=new MayiDayInfo();

				getDetailDays();
				function getDetailDays(para){
					if(!para) {
						para={};
						var now = new Date();
						para.month = now.getMonth() + 1,
						para.year = now.getFullYear();
					}
					$scope.monthAllDays = mayiDayInfo.getMonthAllDayInfo(para.year,para.month);
				}


				//当前选择的日期
				var currentDate={
					month:$scope.arraydata[$scope.indexdata].val+1,
					year:$scope.arraydata1[$scope.indexdata1].val,
					day:''
				};



				/*
				* 月变化，或者年变化时的回调方法
				* paras:
				* index-{int} 当前数组的下标
				* type-{string} 上一个，或者下一个
				* flag-{int} 控制月 0，或者是 年 1
				*/
				$scope.mayiSelcteCallBack=function(index,type,flag){
					if(flag==0){
						currentDate.month=$scope.arraydata[index].val+1;
					}else{
						currentDate.year=$scope.arraydata1[index].val;
					}
					getDetailDays(currentDate);
				};

				$scope.chooseDay=function(num){
					alert(num);
				};
			}
		}
	});


function MayiDayInfo(){

};

MayiDayInfo.prototype={

	//得到当前日历面板的 号数 所有信息
	getMonthAllDayInfo:function(year,month){
		var firstDayTime=new Date(year+'/'+month+'/'+1),  //某个月1号
			firstDayWeekDays=firstDayTime.getDay(), //1号星期几  0：日，1：星期一   ……   6：星期六
			now=new Date(),
			nowDay=now.getDate(), //几号
			isNowMonthAndYear=now.getMonth()+ 1==month && now.getFullYear()==year,  //月份和年份刚好对上当前的时间
			status= 1,
			maxDay=this.getMonthMaxDays(year,month),  //某个月的总天数
			allDays=[];

		//如果1号 是 星期天， 则不用添加上个月份的日期信息
		if(firstDayWeekDays==0){
			for(var i= 1;i<maxDay +1;i++){
				if(i==nowDay && isNowMonthAndYear){
					status=2;
				}else{
					status=1;
				}
				allDays.push({
					num:i,
					status:status
				});
			}
		}
		//添加上个月份的日期信息
		else{
			var lastMonthInfo=this.geAnotherMonthMaxDay(year,month,false);
			var diff = lastMonthInfo.num-firstDayWeekDays;
			for(var i=diff + 1;i<lastMonthInfo.num + 1;i++){
				allDays.push({
					num:i,
					status:0,
				});
			}
			for(var i= 1;i<maxDay +1;i++){
				if(i==nowDay && isNowMonthAndYear){
					status=2;
				}
				else{
					status=1;
				}
				allDays.push({
					num:i,
					status:status
				});
			}
		}

		// 下个月份的日期信息，42 代表 日期的一个面板共有42天，
		// 除去当前月份和上个月份的，剩下的 用下个月份的前几天补充
		var left=42 - allDays.length;
		for(var i=1;i<left+1;i++){
			allDays.push({
				num:i,
				status:0
			});
		}
		return allDays;
	},

	/*
	* 附近 月份 最大天数
	* para：
	* yers - {int} 年
	* month - {int} 月
	* type -{bool} 下一个月（true），上一个月份（false）
	* return - {obj}
	* {year:2016:month:10,num:31} num 总天数
	*/
	geAnotherMonthMaxDay:function(year,month,type){
		if(!type) {
			if (month == 1) {  //1月份的上个月是 去年12月
				year--;
				month = 12;
			} else {
				month--;
			}
		}else{
			if (month == 12) {  //1月份的上个月是 去年12月
				year ++;
				month = 1;
			} else {
				month ++;
			}
		}
		return{
			year:year,
			month:month,
			num:this.getMonthMaxDays(year,month)
		};
	},

	//某个月的 总天数
	getMonthMaxDays:function(year,month){
		year= year | 0;
		month =month | 0;
		var num=31;
		switch (month) {
			case 4:
			case 6:
			case 9:
			case 11:
				num = 30;
				break;
			case 2:
				num=28;
				if (year % 4 == 0) {
					if(year % 100 == 0) {
						if(year%400==0) {
							num = 29;
						}
					}else{
						num=29;
					}
				}
				break;
			default :
				break;
		}
		return num;
	},

};

