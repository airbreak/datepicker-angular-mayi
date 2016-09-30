
'use strict';

angular.module('date-picker-mayi',[])
	.directive('selectMayi',function(){
		return {
			scope:{
				array:'=arraydata',
				index:'=indexdata'
			},
			restrict:'AE',
			template:'<div class="select-mayi" index="{{index}}">'+
						'<div class="selct-main-mayi">'+
							'<span class="prev-mayi"></span>'+
							'<div class="main-container-mayi">'+
								'<ul class="ul-container-mayi" >'+
									'<li ng-repeat="item in array">{{item.name}}</li>'+
								'</ul>'+
							'</div>'+
							'<span class="next-mayi"></span>'+
						'</div>'+
					'</div>',
			replace:true,
			link:function($scope,$element,$attrs){

				$element[0].querySelector('.prev-mayi').addEventListener('click',function(){
					var index = $element[0].getAttribute('index') | 0;
					if(index!==0){
						index--;
						$element[0].setAttribute('index',index);
						swipeToMonth(index);
					}
				});
				$element[0].querySelector('.next-mayi').addEventListener('click',function(){
					var index = $element[0].getAttribute('index') | 0;
					if(index!== $scope.array.length-1){
						index++;
						$element[0].setAttribute('index',index);
						swipeToMonth(index);
					}
				});
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
			restrict:'A',
			template:'',
			replace:true,
			link:function(scope,element,attrs){

			}
		}
	})

