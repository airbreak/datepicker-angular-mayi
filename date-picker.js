
'use strict';

angular.moudle('date-picker-mayi')
	.directive('selectMayi',function(){
		return {
			restrict:'AE',
			template:'<div><div class="selct-main"><ul><li ng-repeat="item in array"></li></ul></div></div>'
			replace:true
		}
	})
	.directive('datePicker',function(){
		return {
			restrict:'A',
			template:''，
			replace:true
		}
	})

