/**
 * Created by jimmy-jiang on 2016/9/30.
 */

'use strict';

angular.module('app',['date-picker-mayi'])
    .controller('indexcontroller',['$scope',function($scope){
        var arr= [
            { name:'一月',val:0},
            { name:'二月',val:1},
            { name:'三月',val:2},
            { name:'四月',val:3},
            { name:'五月',val:4},
            { name:'六月',val:5},
            { name:'七月',val:6},
            { name:'八月',val:7},
            { name:'九月',val:8},
            { name:'十月',val:9},
            { name:'十一月',val:10},
            { name:'十二月',val:11}
        ];
        $scope.arraydata=arr;
        $scope.indexdata=getIndex();

        var arr1= [
            { name:'2010',val:2010},
            { name:'2011',val:2011},
            { name:'2012',val:2012},
            { name:'2013',val:2013},
            { name:'2014',val:2014},
            { name:'2015',val:2015},
            { name:'2016',val:2016},
            { name:'2017',val:2017},
            { name:'2018',val:2018},
            { name:'2019',val:2019},
            { name:'2020',val:2020}
        ];
        $scope.arraydata1=arr1;
        $scope.indexdata1=getIndex1();

        function getIndex(){
           var current = getNowDate().month,
               len=arr.length;
            for(var i=0;i<len;i++){
                if(current==arr[i].val){
                    return i;
                }
            }
        }

        function getIndex1(){
            var current = getNowDate().years,
                len=arr1.length;
            for(var i=0;i<len;i++){
                if(current==arr1[i].val){
                    return i;
                }
            }
        }

        function getNowDate(){
            var now=new Date();
            return{
                day:now.getDay(),
                month:now.getMonth(),
                years:now.getFullYear()
            }
        }
    }]);