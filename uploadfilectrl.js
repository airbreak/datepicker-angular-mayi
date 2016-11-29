/**
 * Created by jimmy-jiang on 2016/11/29.
 */


'use strict';

var app=angular.module('app',['angularFileUpload']);

app.controller('uploaderCtrl',['$scope','FileUploader',function($scope,FileUploader){
    $scope.uploadStatus=$scope.uploadStatus1=false;
    var uploader=$scope.uploader=new FileUploader({
        url:'http://localhost/upload/uploader.php',
        queeuLimit:1,
        removerAfterUploder:true
    });
    var uploader1=$scope.uploader1=new FileUploader({
        url:'http://localhost/upload/uploader.php',
        queeuLimit:1,
        removerAfterUploder:true
    });

    $scope.clearItems=function(){

    };

    $scope.clearItems1=function(){

    }

    uploader.onAfterAdddingFile=function(fileItem){
        $scope.fileItem=fileItem._file;
    };

    uploader1.onAfterAdddingFile=function(fileItem){
        $scope.fileItem1=fileItem._file;
    };

    uploader.onSuccessItem=function(fileItem){
        $scope.uploadStatus=true;
    };

    uploader1.onSuccessItem=function(fileItem){
        $scope.uploadStatus1=true;
    };

    $scope.UploadFile=function(){
        uploader.uploaderAll();
        uploader1.uploaderAll();
        if(upload.uploadStatus){
            console.log(1);
        } else{
            console.log('1faile');
        }
        if(upload1.uploadStatus){
            console.log(2);
        }else{
            console.log('2faile');
        }
    }

}]);